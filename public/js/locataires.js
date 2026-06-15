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

    const activeCount = invoice.locataires.filter((locataire) => locataire.active !== false).length;
    const tenantCount = document.getElementById('tenantCount');
    if (tenantCount) {
        tenantCount.textContent = `${activeCount} locataires actifs`;
    }

    tenantBody.innerHTML = invoice.locataires
        .map((locataire) => {
            const badgeClass = locataire.active
                ? locataire.statut === 'Payé'
                    ? 'badge-paid'
                    : 'badge-due'
                : 'badge-secondary';
            const statut = locataire.active ? locataire.statut : 'Inactif';
            return `
                <tr class="${locataire.active ? '' : 'text-muted'}">
                    <td>${locataire.nom}${locataire.active ? '' : ' (inactif)'}</td>
                    <td>${locataire.kwt}</td>
                    <td><strong>${AssikpaData.formatCurrency(locataire.montant_du)}</strong></td>
                    <td><span class="badge badge-status ${badgeClass} text-white">${statut}</span></td>
                </tr>
            `;
        })
        .join('');
}
