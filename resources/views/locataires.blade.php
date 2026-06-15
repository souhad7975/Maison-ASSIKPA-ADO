@extends('layouts.app')

@section('content')
<div class="row gy-4">
    <div class="col-12">
        <div class="card border-0 shadow-sm p-4 mb-4">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
                <div>
                    <h1 class="page-title mb-1">Locataires</h1>
                    <p class="mb-0">Consultez le montant à payer par locataire et son statut de règlement.</p>
                </div>
                <div class="text-end">
                    <span id="tenantCount" class="badge bg-secondary py-2 px-3">0 locataires actifs</span>
                </div>
            </div>
        </div>
    </div>

    <div class="col-12">
        <div class="card form-section border-0 p-4">
            <div id="tenantEmpty" class="text-center py-5">
                <i class="fa-solid fa-user-group fa-3x text-muted mb-3"></i>
                <p class="text-muted mb-0">Aucune facture active pour afficher les montants.</p>
                <a href="{{ route('factures.index') }}" class="btn btn-primary">Créer une facture</a>
            </div>

            <div id="tenantTable" class="d-none">
                <div class="table-responsive">
                    <table class="table align-middle">
                        <thead>
                            <tr>
                                <th>Locataire</th>
                                <th>KWT</th>
                                <th>Montant dû</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody id="tenantBody"></tbody>
                    </table>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/assikpa-data.js') }}"></script>
<script src="{{ asset('js/locataires.js') }}"></script>
@endsection
