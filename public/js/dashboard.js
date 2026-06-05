document.addEventListener('DOMContentLoaded', function () {
    updateDashboard();
});

function updateDashboard() {
    const invoice = AssikpaData.getCurrent();
    const totalFactureEl = document.getElementById('dashboardTotalFacture');
    const totalKwtEl = document.getElementById('dashboardTotalKwt');
    const totalPaiementsEl = document.getElementById('dashboardTotalPaiements');
    const ctx = document.getElementById('consommationChart');

    let labels = ['Locataire 1', 'Locataire 2', 'Locataire 3', 'Locataire 4', 'Locataire 5'];
    let data = [0, 0, 0, 0, 0];

    if (invoice && invoice.locataires) {
        totalFactureEl.textContent = AssikpaData.formatCurrency(invoice.montant_total);
        totalKwtEl.textContent = invoice.kwt_total;
        totalPaiementsEl.textContent = AssikpaData.formatCurrency(invoice.total_general);
        labels = invoice.locataires.map((locataire) => locataire.nom);
        data = invoice.locataires.map((locataire) => locataire.kwt);
    }

    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: labels,
            datasets: [{
                label: 'Consommation KWT',
                data: data,
                backgroundColor: ['#0d6efd', '#198754', '#ffc107', '#dc3545', '#6610f2'],
                borderRadius: 10,
            }],
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true,
                },
            },
        },
    });

    Swal.fire({
        icon: 'success',
        title: 'Bienvenue',
        text: 'Maison ASSIKPA-ADO',
        timer: 1800,
        showConfirmButton: false,
    });
}
