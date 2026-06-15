window.AssikpaData = {
    currentKey: 'assikpa_current_invoice',
    historyKey: 'assikpa_invoice_history',
    settingsKey: 'assikpa_tenant_settings',

    getCurrent() {
        return JSON.parse(localStorage.getItem(this.currentKey) || 'null');
    },

    getLocataires(invoice, includeInactive = false) {
        if (!invoice || !Array.isArray(invoice.locataires)) {
            return [];
        }
        return includeInactive
            ? invoice.locataires
            : invoice.locataires.filter((locataire) => locataire.active !== false);
    },

    getTenantSettings() {
        const settings = JSON.parse(localStorage.getItem(this.settingsKey) || 'null');
        if (Array.isArray(settings) && settings.length > 0) {
            return settings;
        }
        return this.getDefaultTenantSettings();
    },

    getActiveTenantSettings() {
        return this.getTenantSettings().filter((tenant) => tenant.active !== false);
    },

    getActiveTenantCount() {
        return this.getActiveTenantSettings().length;
    },

    setTenantSettings(settings) {
        localStorage.setItem(this.settingsKey, JSON.stringify(settings));
    },

    getDefaultTenantSettings() {
        return [
            { nom: 'Locataire 1', kwt: 0, active: true },
            { nom: 'Locataire 2', kwt: 0, active: true },
            { nom: 'Locataire 3', kwt: 0, active: true },
            { nom: 'Locataire 4', kwt: 0, active: false },
            { nom: 'Locataire 5', kwt: 0, active: false },
        ];
    },

    resetTenantSettings() {
        this.setTenantSettings(this.getDefaultTenantSettings());
        return this.getDefaultTenantSettings();
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
        const year = invoice.year || createdAt.getFullYear();
        const month = invoice.month || createdAt.getMonth() + 1;
        const monthName = invoice.month_name || new Date(year, month - 1).toLocaleString('fr-FR', { month: 'long' });
        const record = {
            id: Date.now(),
            created_at: createdAt.toISOString(),
            year,
            month,
            month_name: monthName,
            montant_total: invoice.montant_total,
            montant_deplacement: invoice.montant_deplacement,
            total_general: invoice.total_general,
            kwt_total: invoice.kwt_total,
            locataires: invoice.locataires,
        };
        history.unshift(record);
        localStorage.setItem(this.historyKey, JSON.stringify(history));
    },

    invoiceExists(year, month) {
        return this.getHistory().some((record) => record.year === year && record.month === month);
    },

    saveInvoice(invoice) {
        if (this.invoiceExists(invoice.year, invoice.month)) {
            return false;
        }
        this.setCurrent(invoice);
        this.addHistory(invoice);
        return true;
    },

    clearCurrent() {
        localStorage.removeItem(this.currentKey);
    },

    deleteHistory(id) {
        const history = this.getHistory().filter((record) => record.id !== id);
        localStorage.setItem(this.historyKey, JSON.stringify(history));
        return history;
    },

    updatePaymentStatus(nom, statut) {
        const invoice = this.getCurrent();
        if (!invoice) {
            return null;
        }
        invoice.locataires = invoice.locataires.map((locataire) => {
            if (locataire.nom === nom && locataire.active !== false) {
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
