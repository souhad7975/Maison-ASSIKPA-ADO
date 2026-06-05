document.addEventListener('DOMContentLoaded', function () {
    renderReceipt();
});

function renderReceipt() {
    const invoice = AssikpaData.getCurrent();
    const receiptEmpty = document.getElementById('receiptEmpty');
    const receiptContent = document.getElementById('receiptContent');
    const receiptBody = document.getElementById('receiptBody');

    if (!invoice || !invoice.locataires || invoice.locataires.length === 0) {
        receiptEmpty.classList.remove('d-none');
        receiptContent.classList.add('d-none');
        return;
    }

    receiptEmpty.classList.add('d-none');
    receiptContent.classList.remove('d-none');
    document.getElementById('receiptDate').textContent = AssikpaData.formatDate(invoice.timestamp);
    document.getElementById('receiptMontantFacture').textContent = AssikpaData.formatCurrency(invoice.montant_total);
    document.getElementById('receiptKwtTotal').textContent = invoice.kwt_total;
    document.getElementById('receiptTotalGeneral').textContent = AssikpaData.formatCurrency(invoice.total_general);

    receiptBody.innerHTML = invoice.locataires
        .map((locataire) => {
            return `
                <tr>
                    <td>${locataire.nom}</td>
                    <td>${locataire.kwt}</td>
                    <td>${AssikpaData.formatCurrency(locataire.montant_du)}</td>
                </tr>
            `;
        })
        .join('');

    const printButton = document.getElementById('printReceipt');
    if (printButton) {
        printButton.addEventListener('click', function () {
            printReceipt(invoice);
        });
    }
}

function printReceipt(invoice) {
    const receiptHtml = `
        <!DOCTYPE html>
        <html lang="fr">
        <head>
            <meta charset="UTF-8">
            <title>Reçu ASSIKPA-ADO</title>
            <style>
                body { font-family: Arial, sans-serif; margin: 30px; color: #1f2937; }
                h1, h2, h3, h4, h5 { margin: 0; }
                .header { margin-bottom: 20px; }
                .section { margin-bottom: 18px; }
                table { width: 100%; border-collapse: collapse; margin-top: 12px; }
                th, td { padding: 10px 12px; border: 1px solid #d1d5db; text-align: left; }
                th { background: #f3f4f6; }
                .summary { display: grid; grid-template-columns: repeat(3, 1fr); gap: 12px; margin-top: 14px; }
                .card { padding: 14px; border: 1px solid #e5e7eb; border-radius: 12px; background: #fafafa; }
            </style>
        </head>
        <body>
            <div class="header">
                <h2>Reçu de facture</h2>
                <p>${AssikpaData.formatDate(invoice.timestamp)}</p>
            </div>
            <div class="section summary">
                <div class="card">
                    <strong>Montant facture</strong>
                    <p>${AssikpaData.formatCurrency(invoice.montant_total)}</p>
                </div>
                <div class="card">
                    <strong>KWT total</strong>
                    <p>${invoice.kwt_total}</p>
                </div>
                <div class="card">
                    <strong>Total à payer</strong>
                    <p>${AssikpaData.formatCurrency(invoice.total_general)}</p>
                </div>
            </div>
            <div class="section">
                <h4>Répartition par locataire</h4>
                <table>
                    <thead>
                        <tr>
                            <th>Locataire</th>
                            <th>KWT</th>
                            <th>Montant dû</th>
                        </tr>
                    </thead>
                    <tbody>
                        ${invoice.locataires.map(locataire => `
                            <tr>
                                <td>${locataire.nom}</td>
                                <td>${locataire.kwt}</td>
                                <td>${AssikpaData.formatCurrency(locataire.montant_du)}</td>
                            </tr>
                        `).join('')}
                    </tbody>
                </table>
            </div>
        </body>
        </html>
    `;

    const printWindow = window.open('', '_blank');
    printWindow.document.write(receiptHtml);
    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
}
