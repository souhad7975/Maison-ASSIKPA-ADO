window.AssikpaData = {
    currentKey: 'assikpa_current_invoice',
    historyKey: 'assikpa_invoice_history',

    getCurrent() {
        return JSON.parse(localStorage.getItem(this.currentKey) || 'null');
    },

    setCurrent(invoice) {
        localStorage.setItem(this.currentKey, JSON.stringify(invoice));
    },

    getHistory() {
        return JSON.parse(localStorage.getItem(this.historyKey) || '[]');
    },

    addHistory(invoice) {
        const history = this.getHistory();
        const createdAt = new Date();
        const record = {
            id: Date.now(),
            created_at: createdAt.toISOString(),
            year: createdAt.getFullYear(),
            month: createdAt.getMonth() + 1,
            month_name: createdAt.toLocaleString('fr-FR', { month: 'long' }),
            montant_total: invoice.montant_total,
            montant_deplacement: invoice.montant_deplacement,
            total_general: invoice.total_general,
            kwt_total: invoice.kwt_total,
            locataires: invoice.locataires,
        };
        history.unshift(record);
        localStorage.setItem(this.historyKey, JSON.stringify(history));
    },

    saveInvoice(invoice) {
        this.setCurrent(invoice);
        this.addHistory(invoice);
    },

    updatePaymentStatus(nom, statut) {
        const invoice = this.getCurrent();
        if (!invoice) {
            return null;
        }
        invoice.locataires = invoice.locataires.map((locataire) => {
            if (locataire.nom === nom) {
                return {
                    ...locataire,
                    statut,
                };
            }
            return locataire;
        });
        this.setCurrent(invoice);
        return invoice;
    },

    formatCurrency(value) {
        return new Intl.NumberFormat('fr-FR').format(value) + ' F';
    },

    formatDate(timestamp) {
        return new Date(timestamp).toLocaleString('fr-FR', {
            dateStyle: 'medium',
            timeStyle: 'short',
        });
    },
};
