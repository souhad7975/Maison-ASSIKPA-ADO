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
                <li class="list-group-item">Nombre de locataires : <strong>5</strong></li>
                <li class="list-group-item">Frais de déplacement total : <strong>1 000 F</strong></li>
                <li class="list-group-item">Frais de déplacement par locataire : <strong>200 F</strong></li>
                <li class="list-group-item">Formule de répartition : <strong>(KWT locataire / KWT total) × Montant facture + 200 F</strong></li>
            </ul>
        </div>
    </div>

    <div class="col-lg-6">
        <div class="card form-section border-0 p-4">
            <h5 class="mb-3">Infos pratiques</h5>
            <p>Chaque mois, saisissez le montant de la facture totale et les consommations KWT de chaque locataire dans la page Factures.</p>
            <p>Le système calcule automatiquement le montant à payer pour chacun en fonction de sa consommation.</p>
            <p>Ensuite, gérez les règlements depuis la page Paiements et consultez vos reçus sur la page Reçus.</p>
        </div>
    </div>
</div>
@endsection
