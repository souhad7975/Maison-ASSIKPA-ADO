@extends('layouts.app')

@section('content')
<div class="row gy-4">
    <div class="col-12">
        <div class="card border-0 shadow-sm p-4 mb-4">
            <h1 class="page-title mb-2">Reçus PDF</h1>
            <p class="mb-0">Visualisez le reçu de la dernière facture et imprimez-le ou sauvegardez-le en PDF.</p>
        </div>
    </div>

    <div class="col-12">
        <div class="card form-section border-0 p-4" id="receiptCard">
            <div id="receiptEmpty" class="text-center py-5">
                <i class="fa-solid fa-file-pdf fa-3x text-muted mb-3"></i>
                <p class="text-muted mb-0">Aucune facture sauvegardée pour générer un reçu.</p>
                <p class="text-muted">Commencez par créer une facture sur la page Factures.</p>
            </div>

            <div id="receiptContent" class="d-none">
                <div class="mb-4">
                    <h3 class="mb-1">Reçu de facture</h3>
                    <p class="text-muted" id="receiptDate"></p>
                </div>
                <div class="mb-4">
                    <div class="row g-3">
                        <div class="col-md-4">
                            <div class="p-3 bg-light rounded-4">
                                <small class="text-uppercase text-muted">Montant facture</small>
                                <h5 class="mt-2" id="receiptMontantFacture"></h5>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="p-3 bg-light rounded-4">
                                <small class="text-uppercase text-muted">KWT total</small>
                                <h5 class="mt-2" id="receiptKwtTotal"></h5>
                            </div>
                        </div>
                        <div class="col-md-4">
                            <div class="p-3 bg-light rounded-4">
                                <small class="text-uppercase text-muted">Total à payer</small>
                                <h5 class="mt-2" id="receiptTotalGeneral"></h5>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="table-responsive mb-4">
                    <table class="table align-middle">
                        <thead>
                            <tr>
                                <th>Locataire</th>
                                <th>KWT</th>
                                <th>Montant dû</th>
                            </tr>
                        </thead>
                        <tbody id="receiptBody"></tbody>
                    </table>
                </div>

                <button id="printReceipt" class="btn btn-primary">Imprimer le reçu</button>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/assikpa-data.js') }}"></script>
<script src="{{ asset('js/recus.js') }}"></script>
@endsection
