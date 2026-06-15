@extends('layouts.app')

@section('content')
<div class="row gy-4">
    <div class="col-12">
        <div class="card border-0 shadow-sm p-4 mb-4">
            <h1 class="page-title mb-2">Paramètres</h1>
            <p class="mb-0">Configurez les règles de calcul pour les factures et les frais de déplacement.</p>
        </div>
    </div>

    <div class="col-lg-6">
        <div class="card form-section border-0 p-4">
            <h5 class="mb-3">Règles de facturation</h5>
            <ul class="list-group list-group-flush">
                <li class="list-group-item py-2">Locataires actifs : <strong id="activeTenantCount">0</strong></li>
                <li class="list-group-item py-2">Frais de déplacement total : <strong>1 000 F</strong></li>
                <li class="list-group-item py-2">Frais de déplacement par locataire : <strong>200 F</strong></li>
                <li class="list-group-item py-2">Formule : <strong>(KWT locataire / KWT total) × Montant facture + 200 F</strong></li>
            </ul>
            <div class="mt-4">
                <h6>Conseils</h6>
                <p class="text-muted small mb-2">La page Factures n’affiche que les locataires marqués actifs ici.</p>
                <p class="text-muted small mb-0">Pour ajouter un locataire, utilisez le bouton ci-contre puis sauvegardez.</p>
            </div>
        </div>
    </div>

    <div class="col-lg-6">
        <div class="card form-section border-0 p-4">
            <div class="d-flex flex-column flex-sm-row justify-content-between align-items-start gap-3 mb-3">
                <div>
                    <h5 class="mb-1">Locataires</h5>
                    <p class="text-muted small mb-0">Gérez le nom et le statut des locataires actifs.</p>
                </div>
                <div class="d-flex gap-2 flex-wrap">
                    <button id="addTenantSetting" type="button" class="btn btn-outline-primary">Ajouter</button>
                    <button id="saveTenantSettings" type="button" class="btn btn-primary">Enregistrer</button>
                </div>
            </div>

            <div class="table-responsive">
                <table class="table table-borderless table-sm align-middle mb-3">
                    <thead>
                        <tr>
                            <th>Nom</th>
                            <th>Statut</th>
                            <th class="text-end">Action</th>
                        </tr>
                    </thead>
                    <tbody id="tenantSettingsList"></tbody>
                </table>
            </div>

            <button id="resetTenantSettings" type="button" class="btn btn-outline-secondary">Réinitialiser</button>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/assikpa-data.js') }}"></script>
<script src="{{ asset('js/parametres.js') }}"></script>
@endsection
