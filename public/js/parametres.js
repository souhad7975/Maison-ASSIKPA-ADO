document.addEventListener('DOMContentLoaded', function () {
    renderTenantSettings();

    const saveButton = document.getElementById('saveTenantSettings');
    const resetButton = document.getElementById('resetTenantSettings');
    const addButton = document.getElementById('addTenantSetting');
    const settingsList = document.getElementById('tenantSettingsList');

    if (saveButton) {
        saveButton.addEventListener('click', saveTenantSettings);
    }

    if (resetButton) {
        resetButton.addEventListener('click', resetTenantSettings);
    }

    if (addButton) {
        addButton.addEventListener('click', addTenantSetting);
    }

    if (settingsList) {
        settingsList.addEventListener('click', function (event) {
            if (event.target.matches('.remove-tenant')) {
                const row = event.target.closest('tr');
                if (row) {
                    row.remove();
                    updateActiveTenantCount();
                }
            }
        });

        settingsList.addEventListener('change', function (event) {
            if (event.target.matches('.tenant-active')) {
                updateActiveTenantCount();
            }
        });
    }
});

function renderTenantSettings() {
    const settings = AssikpaData.getTenantSettings();
    const settingsList = document.getElementById('tenantSettingsList');
    if (!settingsList) {
        return;
    }

    settingsList.innerHTML = settings
        .map((tenant, index) => tenantSettingRowHtml(tenant, index + 1))
        .join('');

    updateActiveTenantCount();
}

function updateActiveTenantCount() {
    const countElement = document.getElementById('activeTenantCount');
    if (!countElement) {
        return;
    }

    const tenantRows = Array.from(document.querySelectorAll('.tenant-setting-row'));
    if (tenantRows.length > 0) {
        const activeCount = tenantRows.filter((row) => row.querySelector('.tenant-active')?.value === '1').length;
        countElement.textContent = activeCount;
        return;
    }

    countElement.textContent = AssikpaData.getActiveTenantCount();
}

function tenantSettingRowHtml(tenant, displayIndex) {
    return `
        <tr class="tenant-setting-row">
            <td>
                <input type="text" class="form-control form-control-sm tenant-name" value="${tenant.nom}" placeholder="Nom du locataire">
            </td>
            <td>
                <select class="form-select form-select-sm tenant-active" data-index="${displayIndex}">
                    <option value="1" ${tenant.active !== false ? 'selected' : ''}>Actif</option>
                    <option value="0" ${tenant.active === false ? 'selected' : ''}>Inactif</option>
                </select>
            </td>
            <td class="text-end">
                <button type="button" class="btn btn-sm btn-outline-danger remove-tenant">Supprimer</button>
            </td>
        </tr>
    `;
}

function addTenantSetting() {
    const settingsList = document.getElementById('tenantSettingsList');
    if (!settingsList) {
        return;
    }

    const nextIndex = settingsList.children.length + 1;
    settingsList.insertAdjacentHTML('beforeend', tenantSettingRowHtml({ nom: `Locataire ${nextIndex}`, active: true }, nextIndex));
    updateActiveTenantCount();
}

function saveTenantSettings() {
    const tenantRows = Array.from(document.querySelectorAll('.tenant-setting-row'));
    const settings = tenantRows.map((row) => {
        const nameInput = row.querySelector('.tenant-name');
        const activeSelect = row.querySelector('.tenant-active');
        return {
            nom: nameInput?.value.trim() || 'Locataire',
            kwt: 0,
            active: activeSelect?.value === '1',
        };
    });

    AssikpaData.setTenantSettings(settings);
    renderTenantSettings();
    Swal.fire({
        icon: 'success',
        title: 'Paramètres sauvegardés',
        text: 'Le statut actif/inactif des locataires a été enregistré.',
        timer: 1600,
        showConfirmButton: false,
    });
}

function resetTenantSettings() {
    AssikpaData.resetTenantSettings();
    renderTenantSettings();
    Swal.fire({
        icon: 'success',
        title: 'Réinitialisé',
        text: 'Les paramètres des locataires sont revenus aux valeurs par défaut.',
        timer: 1600,
        showConfirmButton: false,
    });
}
