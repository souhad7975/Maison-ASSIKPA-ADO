document.addEventListener('DOMContentLoaded', function () {
    const factureForm = document.getElementById('factureForm');

    if (factureForm) {
        factureForm.addEventListener('submit', function (event) {
            event.preventDefault();
            calculateInvoice();
        });
    }

    loadLastInvoice();
});

function calculateInvoice() {
    const montantTotalInput = document.getElementById('montantTotal');
    const locataireNames = Array.from(document.querySelectorAll('.locataire-name'));
    const kwtInputs = Array.from(document.querySelectorAll('.kwt-input'));

    const montantTotal = parseFloat(montantTotalInput.value) || 0;
    const locataires = locataireNames.map((input, index) => ({
        nom: input.value.trim() || `Locataire ${index + 1}`,
        kwt: parseFloat(kwtInputs[index].value) || 0,
    }));

    const kwtTotal = locataires.reduce((acc, item) => acc + item.kwt, 0);
    if (montantTotal <= 0 || kwtTotal <= 0) {
        Swal.fire({
            icon: 'warning',
            title: 'Données manquantes',
            text: 'Entrez un montant total positif et un KWT positif pour au moins un locataire.',
        });
        return;
    }

    const montantDeplacement = 1000;
    const totalGeneral = montantTotal + montantDeplacement;
    const resultat = locataires.map((locataire) => {
        const montantPart = (locataire.kwt / kwtTotal) * montantTotal;
        const montantDu = Math.round((montantPart + 200) * 100) / 100;
        return {
            ...locataire,
            montant_du: montantDu,
            statut: 'À payer',
        };
    });

    const invoice = {
        timestamp: Date.now(),
        montant_total: montantTotal,
        montant_deplacement: montantDeplacement,
        kwt_total: kwtTotal,
        total_general: totalGeneral,
        locataires: resultat,
    };

    AssikpaData.saveInvoice(invoice);
    renderInvoice(invoice);

    Swal.fire({
        icon: 'success',
        title: 'Calcul terminé',
        text: 'La répartition par locataire a été enregistrée.',
        timer: 1800,
        showConfirmButton: false,
    });
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
            return `
                <tr>
                    <td>${locataire.nom}</td>
                    <td>${locataire.kwt}</td>
                    <td><strong>${AssikpaData.formatCurrency(locataire.montant_du)}</strong></td>
                </tr>
            `;
        })
        .join('');

    factureSummary.classList.remove('d-none');
    factureEmpty.classList.add('d-none');
}

function loadLastInvoice() {
    const invoice = AssikpaData.getCurrent();
    if (invoice) {
        renderInvoice(invoice);
        document.getElementById('montantTotal').value = invoice.montant_total;
        const nameInputs = Array.from(document.querySelectorAll('.locataire-name'));
        const kwtInputs = Array.from(document.querySelectorAll('.kwt-input'));
        invoice.locataires.forEach((locataire, index) => {
            if (nameInputs[index]) {
                nameInputs[index].value = locataire.nom;
            }
            if (kwtInputs[index]) {
                kwtInputs[index].value = locataire.kwt;
            }
        });
    }
}
