document.addEventListener('DOMContentLoaded', function () {
    const factureForm = document.getElementById('factureForm');
    const newInvoiceButton = document.getElementById('newInvoiceButton');

    if (factureForm) {
        factureForm.addEventListener('submit', function (event) {
            event.preventDefault();
            calculateInvoice();
        });
    }

    if (newInvoiceButton) {
        newInvoiceButton.addEventListener('click', function () {
            AssikpaData.clearCurrent();
            resetInvoiceForm();
        });
    }

    initializePeriodSelectors();
    initializeTenantRows();
    loadLastInvoice();
});

function initializePeriodSelectors() {
    const yearSelect = document.getElementById('invoiceYear');
    const monthSelect = document.getElementById('invoiceMonth');
    if (!yearSelect || !monthSelect) {
        return;
    }

    const currentYear = new Date().getFullYear();
    const years = [currentYear - 1, currentYear, currentYear + 1];

    yearSelect.innerHTML = years
        .map((year) => `<option value="${year}">${year}</option>`)
        .join('');

    monthSelect.innerHTML = Array.from({ length: 12 }, (_, index) => {
        const monthValue = index + 1;
        const monthName = new Date(0, index).toLocaleString('fr-FR', { month: 'long' });
        return `<option value="${monthValue}">${monthName}</option>`;
    }).join('');

    yearSelect.value = currentYear;
    monthSelect.value = new Date().getMonth() + 1;
}

function getSelectedInvoicePeriod() {
    const year = parseInt(document.getElementById('invoiceYear')?.value, 10);
    const month = parseInt(document.getElementById('invoiceMonth')?.value, 10);
    const monthName = new Date(year, month - 1).toLocaleString('fr-FR', { month: 'long' });
    return { year, month, month_name: monthName };
}

function initializeTenantRows() {
    const tenantRows = document.getElementById('tenantRows');
    const calculateButton = document.querySelector('#factureForm button[type="submit"]');
    if (!tenantRows) {
        return;
    }

    tenantRows.innerHTML = '';
    const activeTenants = AssikpaData.getTenantSettings().filter((tenant) => tenant.active !== false);

    if (activeTenants.length === 0) {
        tenantRows.innerHTML = '<div class="alert alert-warning">Aucun locataire actif. Activez des locataires depuis la page Paramètres.</div>';
        if (calculateButton) {
            calculateButton.setAttribute('disabled', 'disabled');
        }
        return;
    }

    activeTenants.forEach((settings) => {
        addTenantRow(settings);
    });
    if (calculateButton) {
        calculateButton.removeAttribute('disabled');
    }
}

function addTenantRow(locataire = {}) {
    const tenantRows = document.getElementById('tenantRows');
    if (!tenantRows) {
        return;
    }

    const rowCount = tenantRows.children.length + 1;
    const row = document.createElement('div');
    row.className = 'row g-3 mb-3 tenant-row';
    row.innerHTML = `
        <div class="col-lg-6">
            <label class="form-label">Locataire ${rowCount}</label>
            <input type="text" class="form-control locataire-name" value="${locataire.nom || `Locataire ${rowCount}`}" placeholder="Nom du locataire" readonly>
        </div>
        <div class="col-lg-6">
            <label class="form-label">KWT</label>
            <input type="number" class="form-control kwt-input" min="0" step="0.01" value="${locataire.kwt ?? 0}" placeholder="Consommation" required>
        </div>
    `;

    tenantRows.appendChild(row);
}

function rebuildTenantLabels() {
    document.querySelectorAll('.tenant-row').forEach((row, index) => {
        const label = row.querySelector('.form-label');
        if (label) {
            label.textContent = `Locataire ${index + 1}`;
        }
    });
}

function getInvoiceLocataires() {
    return Array.from(document.querySelectorAll('.tenant-row')).map((row, index) => {
        const nomInput = row.querySelector('.locataire-name');
        const kwtInput = row.querySelector('.kwt-input');

        return {
            nom: nomInput?.value.trim() || `Locataire ${index + 1}`,
            kwt: parseFloat(kwtInput?.value) || 0,
            active: true,
        };
    });
}

function calculateInvoice() {
    const montantTotalInput = document.getElementById('montantTotal');
    const montantTotal = parseFloat(montantTotalInput.value) || 0;
    const locataires = getInvoiceLocataires();
    const kwtTotal = locataires.reduce((acc, item) => acc + item.kwt, 0);

    if (montantTotal <= 0 || kwtTotal <= 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Données manquantes',
            text: 'Entrez un montant total positif et un KWT positif pour au moins un locataire actif.',
        });
        return;
    }

    const montantDeplacement = 1000;
    const totalGeneral = montantTotal + montantDeplacement;
    const resultat = locataires.map((locataire) => {
        if (!locataire.active) {
            return {
                ...locataire,
                montant_du: 0,
                statut: 'Inactif',
            };
        }

        const montantPart = (locataire.kwt / kwtTotal) * montantTotal;
        const montantDu = Math.round((montantPart + 200) * 100) / 100;
        return {
            ...locataire,
            montant_du: montantDu,
            statut: 'À payer',
        };
    });

    const period = getSelectedInvoicePeriod();
    if (AssikpaData.invoiceExists(period.year, period.month)) {
        Swal.fire({
            icon: 'warning',
            title: 'Facture existante',
            text: `Une facture a déjà été partagée pour ${period.month_name} ${period.year}.`,
        });
        return;
    }

    const invoice = {
        timestamp: Date.now(),
        montant_total: montantTotal,
        montant_deplacement: montantDeplacement,
        kwt_total: kwtTotal,
        total_general: totalGeneral,
        locataires: resultat,
        ...period,
    };

    if (!AssikpaData.saveInvoice(invoice)) {
        Swal.fire({
            icon: 'warning',
            title: 'Facture déjà existante',
            text: `Une facture pour ${period.month_name} ${period.year} existe déjà.`,
        });
        return;
    }

    AssikpaData.clearCurrent();
    resetInvoiceForm();

    Swal.fire({
        icon: 'success',
        title: 'Calcul terminé',
        text: 'La répartition par locataire a été enregistrée dans l’historique.',
        timer: 1600,
        showConfirmButton: false,
        willClose: () => {
            window.location.href = '/historique';
        },
    });
}

function resetInvoiceForm() {
    const factureForm = document.getElementById('factureForm');
    if (factureForm) {
        factureForm.reset();
    }
    document.getElementById('montantTotal').value = '';
    initializeTenantRows();
    initializePeriodSelectors();
    hideInvoiceSummary();
}

function hideInvoiceSummary() {
    const factureSummary = document.getElementById('factureSummary');
    const factureEmpty = document.getElementById('factureEmpty');
    if (factureSummary && factureEmpty) {
        factureSummary.classList.add('d-none');
        factureEmpty.classList.remove('d-none');
    }
}

function renderInvoice(invoice) {
    const factureSummary = document.getElementById('factureSummary');
    const factureEmpty = document.getElementById('factureEmpty');
    const factureResultBody = document.getElementById('factureResultBody');

    document.getElementById('summaryMontant').textContent = AssikpaData.formatCurrency(invoice.montant_total);
    document.getElementById('summaryKwt').textContent = invoice.kwt_total;
    document.getElementById('summaryTotalGeneral').textContent = AssikpaData.formatCurrency(invoice.total_general);

    factureResultBody.innerHTML = invoice.locataires
        .map((locataire) => {
            const badgeClass = locataire.active
                ? locataire.statut === 'Payé'
                    ? 'badge-paid'
                    : 'badge-due'
                : 'badge-secondary';
            return `
                <tr class="${locataire.active ? '' : 'text-muted'}">
                    <td>${locataire.nom}${locataire.active ? '' : ' (inactif)'}</td>
                    <td>${locataire.kwt}</td>
                    <td><strong>${AssikpaData.formatCurrency(locataire.montant_du)}</strong></td>
                    <td><span class="badge badge-status ${badgeClass} text-white">${locataire.statut}</span></td>
                </tr>
            `;
        })
        .join('');

    factureSummary.classList.remove('d-none');
    factureEmpty.classList.add('d-none');
}

function loadLastInvoice() {
    const invoice = AssikpaData.getCurrent();
    if (!invoice) {
        return;
    }

    const yearSelect = document.getElementById('invoiceYear');
    const monthSelect = document.getElementById('invoiceMonth');
    if (yearSelect && monthSelect && invoice.year && invoice.month) {
        yearSelect.value = invoice.year;
        monthSelect.value = invoice.month;
    }

    document.getElementById('montantTotal').value = invoice.montant_total;

    const tenantRows = document.querySelectorAll('.tenant-row');
    tenantRows.forEach((row) => {
        const name = row.querySelector('.locataire-name')?.value;
        const kwtInput = row.querySelector('.kwt-input');
        const match = invoice.locataires.find((locataire) => locataire.nom === name);
        if (match && kwtInput) {
            kwtInput.value = match.kwt;
        }
    });

    renderInvoice(invoice);
}
