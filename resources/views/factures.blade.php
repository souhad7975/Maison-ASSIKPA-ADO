@extends('layouts.app')

@section('content')
<div class="row gy-4">
    <div class="col-12">
        <div class="card card-hero border-0 shadow-sm p-4">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
                <div>
                    <h1 class="page-title mb-1">Factures</h1>
                    <p class="mb-0">Entrez le montant total du mois et les consommations KWT de chaque locataire. Le système calculera automatiquement la part de chacun.</p>
                </div>
                <div class="text-end">
                    <span class="badge bg-light text-dark py-2 px-3">Déplacement total : 1 000 F</span>
                    <p class="mb-0 text-white-75 mt-2">200 F / locataire</p>
                </div>
            </div>
        </div>
    </div>

    <div class="col-lg-6">
        <div class="card form-section border-0 p-4">
            <h5 class="mb-4">Formulaire de calcul</h5>
            <form id="factureForm" autocomplete="off">
                <div class="mb-4">
                    <label for="montantTotal" class="form-label">Montant total de la facture (F)</label>
                    <input type="number" id="montantTotal" class="form-control form-control-lg" step="0.01" min="0"
                        placeholder="Ex. 125000" required>
                </div>

                <div class="mb-3">
                    <p class="fw-semibold mb-2">Consommation KWT par locataire</p>
                </div>

                <div class="row g-3 mb-4">
                    @for ($i = 1; $i <= 5; $i++)
                    <div class="col-lg-6">
                        <label class="form-label">Locataire {{ $i }}</label>
                        <input type="text" class="form-control locataire-name" value="Locataire {{ $i }}"
                            placeholder="Nom du locataire" required>
                    </div>
                    <div class="col-lg-6">
                        <label class="form-label">KWT</label>
                        <input type="number" class="form-control kwt-input" min="0" step="0.01" value="0"
                            placeholder="Consommation" required>
                    </div>
                    @endfor
                </div>

                <button type="submit" class="btn btn-primary btn-lg">Calculer la répartition</button>
            </form>
        </div>
    </div>

    <div class="col-lg-6">
        <div class="card border-0 shadow-sm p-4">
            <div id="factureSummary" class="d-none">
                <h5 class="mb-3">Résumé de la facture</h5>
                <div class="row g-3 mb-4">
                    <div class="col-md-6">
                        <div class="bg-white rounded-4 p-3 shadow-sm">
                            <small class="text-uppercase text-muted">Montant total</small>
                            <h3 class="mt-2" id="summaryMontant">0 F</h3>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="bg-white rounded-4 p-3 shadow-sm">
                            <small class="text-uppercase text-muted">Total KWT</small>
                            <h3 class="mt-2" id="summaryKwt">0</h3>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="bg-white rounded-4 p-3 shadow-sm">
                            <small class="text-uppercase text-muted">Déplacement</small>
                            <h3 class="mt-2">1 000 F</h3>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="bg-white rounded-4 p-3 shadow-sm">
                            <small class="text-uppercase text-muted">Total à payer</small>
                            <h3 class="mt-2" id="summaryTotalGeneral">0 F</h3>
                        </div>
                    </div>
                </div>

                <div class="table-responsive">
                    <table class="table align-middle mb-0">
                        <thead>
                            <tr>
                                <th>Locataire</th>
                                <th>KWT</th>
                                <th>Montant dû</th>
                            </tr>
                        </thead>
                        <tbody id="factureResultBody"></tbody>
                    </table>
                </div>
            </div>

            <div id="factureEmpty" class="text-center py-5">
                <i class="fa-solid fa-file-invoice fa-3x text-muted mb-3"></i>
                <p class="text-muted mb-0">Remplissez le formulaire à gauche pour générer la répartition par locataire.</p>
            </div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/assikpa-data.js') }}"></script>
<script src="{{ asset('js/factures.js') }}"></script>
@endsection
