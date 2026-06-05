document.addEventListener('DOMContentLoaded', function () {
    renderPaymentTable();
    const refreshButton = document.getElementById('refreshStatus');
    if (refreshButton) {
        refreshButton.addEventListener('click', function () {
            renderPaymentTable();
            Swal.fire({
                icon: 'success',
                title: 'Statuts mis à jour',
                timer: 1400,
                showConfirmButton: false,
            });
        });
    }
});

function renderPaymentTable() {
    const invoice = AssikpaData.getCurrent();
    const paymentEmpty = document.getElementById('paymentEmpty');
    const paymentTable = document.getElementById('paymentTable');
    const paymentBody = document.getElementById('paymentBody');

    if (!invoice || !invoice.locataires || invoice.locataires.length === 0) {
        paymentEmpty.classList.remove('d-none');
        paymentTable.classList.add('d-none');
        return;
    }

    paymentEmpty.classList.add('d-none');
    paymentTable.classList.remove('d-none');
    paymentBody.innerHTML = invoice.locataires
        .map((locataire) => {
            const badgeClass = locataire.statut === 'Payé' ? 'badge-paid' : 'badge-due';
            return `
                <tr>
                    <td>${locataire.nom}</td>
                    <td>${locataire.kwt}</td>
                    <td><strong>${AssikpaData.formatCurrency(locataire.montant_du)}</strong></td>
                    <td>
                        <select class="form-select payment-status" data-name="${locataire.nom}">
                            <option value="À payer" ${locataire.statut === 'À payer' ? 'selected' : ''}>À payer</option>
                            <option value="Payé" ${locataire.statut === 'Payé' ? 'selected' : ''}>Payé</option>
                        </select>
                    </td>
                </tr>
            `;
        })
        .join('');

    document.getElementById('paymentMontantTotal').textContent = AssikpaData.formatCurrency(invoice.montant_total);
    document.getElementById('paymentMontantGeneral').textContent = AssikpaData.formatCurrency(invoice.total_general);

    document.querySelectorAll('.payment-status').forEach((select) => {
        select.addEventListener('change', function () {
            const name = this.getAttribute('data-name');
            AssikpaData.updatePaymentStatus(name, this.value);
            Swal.fire({
                icon: 'success',
                title: `${name} est maintenant ${this.value}`,
                timer: 1200,
                showConfirmButton: false,
            });
        });
    });
}
