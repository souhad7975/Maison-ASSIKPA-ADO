@extends('layouts.app')

@section('content')
<div class="row gy-4">
    <div class="col-12">
        <div class="card border-0 shadow-sm p-4 mb-4">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
                <div>
                    <h1 class="page-title mb-1">Paiements</h1>
                    <p class="mb-0">Validez les paiements des locataires après calcul de la facture. Vous pouvez marquer chaque locataire comme payé.</p>
                </div>
                <div class="text-end">
                    <span class="badge bg-info text-dark py-2 px-3">Statut de paiement</span>
                </div>
            </div>
        </div>
    </div>

    <div class="col-12">
        <div class="card form-section border-0 p-4">
            <div id="paymentEmpty" class="text-center py-5">
                <i class="fa-solid fa-circle-exclamation fa-3x text-muted mb-3"></i>
                <p class="text-muted mb-2">Aucune facture trouvée.</p>
                <a href="{{ route('factures.index') }}" class="btn btn-primary">Créer une facture</a>
            </div>

            <div id="paymentTable" class="d-none">
                <div class="table-responsive mb-4">
                    <table class="table align-middle">
                        <thead>
                            <tr>
                                <th>Locataire</th>
                                <th>KWT</th>
                                <th>Montant dû</th>
                                <th>Statut</th>
                            </tr>
                        </thead>
                        <tbody id="paymentBody"></tbody>
                    </table>
                </div>
                <div class="d-flex justify-content-between align-items-center flex-column flex-md-row gap-3">
                    <div>
                        <h5>Total facture : <span id="paymentMontantTotal">0 F</span></h5>
                        <h5>Total avec déplacement : <span id="paymentMontantGeneral">0 F</span></h5>
                    </div>
                    <button id="refreshStatus" class="btn btn-outline-primary">Recharger les statuts</button>
                </div>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/assikpa-data.js') }}"></script>
<script src="{{ asset('js/paiements.js') }}"></script>
@endsection
