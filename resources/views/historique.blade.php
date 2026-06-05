@extends('layouts.app')

@section('content')
<div class="row gy-4">
    <div class="col-12">
        <div class="card border-0 shadow-sm p-4 mb-4">
            <h1 class="page-title mb-2">Historique</h1>
            <p class="mb-0">Retrouvez tous les calculs de factures précédents et le détail des montants par locataire.</p>
        </div>
    </div>

    <div class="col-12">
        <div class="card form-section border-0 p-4">
            <div id="historyEmpty" class="text-center py-5">
                <i class="fa-solid fa-history fa-3x text-muted mb-3"></i>
                <p class="text-muted mb-0">Aucun historique pour le moment.</p>
                <p class="text-muted">Créez d'abord une facture dans la page Factures.</p>
            </div>

            <div id="historyControls" class="d-none mb-4">
                <div class="row g-3">
                    <div class="col-md-4">
                        <label class="form-label">Année</label>
                        <select id="historyYear" class="form-select">
                            <option value="">Sélectionner une année</option>
                        </select>
                    </div>
                    <div class="col-md-4">
                        <label class="form-label">Mois</label>
                        <select id="historyMonth" class="form-select">
                            <option value="">Tous les mois</option>
                        </select>
                    </div>
                    <div class="col-md-4 d-flex align-items-end">
                        <button id="historyClear" class="btn btn-outline-secondary w-100">Réinitialiser</button>
                    </div>
                </div>
            </div>

            <div id="historyResults" class="d-none"></div>
        </div>
    </div>
</div>
@endsection

@section('scripts')
<script src="{{ asset('js/assikpa-data.js') }}"></script>
<script src="{{ asset('js/historique.js') }}"></script>
@endsection
