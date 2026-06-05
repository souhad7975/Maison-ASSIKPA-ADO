document.addEventListener('DOMContentLoaded', function () {
    renderTenantList();
});

function renderTenantList() {
    const invoice = AssikpaData.getCurrent();
    const tenantEmpty = document.getElementById('tenantEmpty');
    const tenantTable = document.getElementById('tenantTable');
    const tenantBody = document.getElementById('tenantBody');

    if (!invoice || !invoice.locataires || invoice.locataires.length === 0) {
        tenantEmpty.classList.remove('d-none');
        tenantTable.classList.add('d-none');
        return;
    }

    tenantEmpty.classList.add('d-none');
    tenantTable.classList.remove('d-none');

    tenantBody.innerHTML = invoice.locataires
        .map((locataire) => {
            const badgeClass = locataire.statut === 'Payé' ? 'badge-paid' : 'badge-due';
            return `
                <tr>
                    <td>${locataire.nom}</td>
                    <td>${locataire.kwt}</td>
                    <td><strong>${AssikpaData.formatCurrency(locataire.montant_du)}</strong></td>
                    <td><span class="badge badge-status ${badgeClass} text-white">${locataire.statut}</span></td>
                </tr>
            `;
        })
        .join('');
}
