let historyEventBound = false;

document.addEventListener('DOMContentLoaded', function () {
    initializeHistory();
});

function initializeHistory() {
    const history = AssikpaData.getHistory();
    const historyEmpty = document.getElementById('historyEmpty');
    const historyControls = document.getElementById('historyControls');

    if (!history || history.length === 0) {
        historyEmpty.classList.remove('d-none');
        historyControls.classList.add('d-none');
        return;
    }

    historyEmpty.classList.add('d-none');
    historyControls.classList.remove('d-none');

    const yearSelect = document.getElementById('historyYear');
    const monthSelect = document.getElementById('historyMonth');
    const clearButton = document.getElementById('historyClear');

    const years = [2026, 2027, 2028, 2029, 2030];
    const monthNames = [
        'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];

    yearSelect.innerHTML = '<option value="">Sélectionner une année</option>' + years
        .map((year) => `<option value="${year}">${year}</option>`)
        .join('');

    monthSelect.innerHTML = '<option value="">Tous les mois</option>' + monthNames
        .map((month) => `<option value="${month}">${month}</option>`)
        .join('');

    if (!historyEventBound) {
        yearSelect.addEventListener('change', renderFilteredHistory);
        monthSelect.addEventListener('change', renderFilteredHistory);
        clearButton.addEventListener('click', function () {
            yearSelect.value = '';
            monthSelect.value = '';
            renderFilteredHistory();
        });
        historyEventBound = true;
    }

    renderFilteredHistory();
}

function renderFilteredHistory() {
    const history = AssikpaData.getHistory();
    const yearSelect = document.getElementById('historyYear');
    const monthSelect = document.getElementById('historyMonth');
    const historyResults = document.getElementById('historyResults');

    const selectedYear = yearSelect.value;
    const selectedMonth = monthSelect.value;

    if (!selectedYear) {
        historyResults.classList.add('d-none');
        historyResults.innerHTML = '<div class="text-muted">Sélectionnez une année pour afficher l’historique.</div>';
        return;
    }

    const filteredByYear = history.filter((item) => String(item.year) === selectedYear);
    const monthNames = [
        'janvier', 'février', 'mars', 'avril', 'mai', 'juin',
        'juillet', 'août', 'septembre', 'octobre', 'novembre', 'décembre'
    ];
    const previousMonth = monthSelect.value;
    monthSelect.innerHTML = '<option value="">Tous les mois</option>' + monthNames
        .map((month) => `<option value="${month}">${month}</option>`)
        .join('');
    monthSelect.value = monthNames.includes(previousMonth) ? previousMonth : '';

    const selectedMonthValue = monthSelect.value;
    const invoices = selectedMonthValue
        ? filteredByYear.filter((item) => item.month_name === selectedMonthValue)
        : filteredByYear;

    if (invoices.length === 0) {
        historyResults.classList.remove('d-none');
        historyResults.innerHTML = '<div class="text-muted">Aucune facture trouvée pour cette sélection.</div>';
        return;
    }

    historyResults.classList.remove('d-none');
    historyResults.innerHTML = `
        <div class="table-responsive">
            <table class="table table-hover align-middle">
                <thead>
                    <tr>
                        <th>Date</th>
                        <th>Montant facture</th>
                        <th>Total KWT</th>
                        <th>Total général</th>
                        <th>Détails</th>
                        <th>Action</th>
                    </tr>
                </thead>
                <tbody>
                    ${invoices
                        .map((invoice) => `
                            <tr>
                                <td>${AssikpaData.formatDate(invoice.created_at)}</td>
                                <td>${AssikpaData.formatCurrency(invoice.montant_total)}</td>
                                <td>${invoice.kwt_total}</td>
                                <td>${AssikpaData.formatCurrency(invoice.total_general)}</td>
                                <td>
                                    <button class="btn btn-sm btn-outline-secondary" type="button" onclick="toggleDetails(${invoice.id})">Voir</button>
                                </td>
                                <td>
                                    <button class="btn btn-sm btn-outline-danger" type="button" onclick="confirmDelete(${invoice.id})">Supprimer</button>
                                </td>
                            </tr>
                        `)
                        .join('')}
                </tbody>
            </table>
        </div>
    `;
}

function confirmDelete(id) {
    Swal.fire({
        title: 'Supprimer cette facture ?',
        text: 'Cette action est définitive et supprimera l’enregistrement de l’historique.',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Oui, supprimer',
        cancelButtonText: 'Annuler',
    }).then((result) => {
        if (result.isConfirmed) {
            deleteInvoice(id);
        }
    });
}

function deleteInvoice(id) {
    AssikpaData.deleteHistory(id);
    Swal.fire({
        icon: 'success',
        title: 'Supprimé',
        text: 'La facture a bien été retirée de l’historique.',
        timer: 1400,
        showConfirmButton: false,
    });
    initializeHistory();
}

function toggleDetails(id) {
    const history = AssikpaData.getHistory();
    const invoice = history.find((item) => item.id === id);
    if (!invoice) {
        Swal.fire({
            icon: 'error',
            title: 'Introuvable',
            text: 'Ce reçu est introuvable dans l’historique.',
        });
        return;
    }

    const details = invoice.locataires
        .map((locataire) => `
            <tr>
                <td>${locataire.nom}</td>
                <td>${locataire.kwt}</td>
                <td>${AssikpaData.formatCurrency(locataire.montant_du)}</td>
            </tr>
        `)
        .join('');

    Swal.fire({
        title: 'Détails du calcul',
        html: `
            <div class="text-start">
                <p><strong>Date :</strong> ${AssikpaData.formatDate(invoice.created_at)}</p>
                <p><strong>Montant facture :</strong> ${AssikpaData.formatCurrency(invoice.montant_total)}</p>
                <p><strong>Total à payer :</strong> ${AssikpaData.formatCurrency(invoice.total_general)}</p>
                <h6>Répartition par locataire :</h6>
                <table class="table table-sm mt-2">
                    <thead>
                        <tr>
                            <th>Locataire</th>
                            <th>KWT</th>
                            <th>Montant dû</th>
                        </tr>
                    </thead>
                    <tbody>${details}</tbody>
                </table>
            </div>
        `,
        width: '760px',
        confirmButtonText: 'Fermer',
    });
}
