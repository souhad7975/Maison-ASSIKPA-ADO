@extends('layouts.app')

@section('content')

<div class="container-fluid py-4">

    <!-- En-tête -->
    <div class="card bg-primary text-white border-0 shadow-lg mb-4">
        <div class="card-body">
            <div class="d-flex flex-column flex-md-row justify-content-between align-items-start gap-3">
                <div>
                    <h1 class="fw-bold mb-1">
                        🏠 Maison ASSIKPA-ADO
                    </h1>
                    <p class="mb-0">
                        Gestion intelligente des factures et paiements
                    </p>
                </div>
                <div class="text-end">
                    <span class="badge bg-white text-primary py-2 px-3">{{ isset($user_role) ? ucfirst($user_role) : 'Invité' }}</span>
                </div>
            </div>
        </div>
    </div>

    <!-- Statistiques -->
    <div class="row g-4">

        <div class="col-lg-3 col-md-6">
            <div class="card stat-card border-0 shadow">
                <div class="card-body">
                    <h6 class="text-muted">Total Facture</h6>
                    <h2 id="dashboardTotalFacture" class="text-primary fw-bold">0 F</h2>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6">
            <div class="card stat-card border-0 shadow">
                <div class="card-body">
                    <h6 class="text-muted">Total KWT</h6>
                    <h2 id="dashboardTotalKwt" class="text-success fw-bold">0</h2>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6">
            <div class="card stat-card border-0 shadow">
                <div class="card-body">
                    <h6 class="text-muted">Locataires</h6>
                    <h2 class="text-warning fw-bold">5</h2>
                </div>
            </div>
        </div>

        <div class="col-lg-3 col-md-6">
            <div class="card stat-card border-0 shadow">
                <div class="card-body">
                    <h6 class="text-muted">Paiements</h6>
                    <h2 id="dashboardTotalPaiements" class="text-danger fw-bold">0 F</h2>
                </div>
            </div>
        </div>

    </div>

    <!-- Menu principal -->
    <div class="row mt-4 g-4">

        <div class="col-lg-4">
            <a href="{{ route('factures.index') }}" class="text-decoration-none">
                <div class="card menu-card shadow border-0">
                    <div class="card-body text-center p-5">
                        <i class="fa-solid fa-bolt fa-4x text-primary"></i>
                        <h4 class="mt-3 text-dark">Factures</h4>
                    </div>
                </div>
            </a>
        </div>

        <div class="col-lg-4">
            <a href="{{ route('paiements.index') }}" class="text-decoration-none">
                <div class="card menu-card shadow border-0">
                    <div class="card-body text-center p-5">
                        <i class="fa-solid fa-money-bill-wave fa-4x text-success"></i>
                        <h4 class="mt-3 text-dark">Paiements</h4>
                    </div>
                </div>
            </a>
        </div>

        <div class="col-lg-4">
            <a href="{{ route('historique.index') }}" class="text-decoration-none">
                <div class="card menu-card shadow border-0">
                    <div class="card-body text-center p-5">
                        <i class="fa-solid fa-clock-rotate-left fa-4x text-warning"></i>
                        <h4 class="mt-3 text-dark">Historique</h4>
                    </div>
                </div>
            </a>
        </div>

        <div class="col-lg-4">
            <a href="{{ route('recus.index') }}" class="text-decoration-none">
                <div class="card menu-card shadow border-0">
                    <div class="card-body text-center p-5">
                        <i class="fa-solid fa-file-pdf fa-4x text-danger"></i>
                        <h4 class="mt-3 text-dark">Reçus PDF</h4>
                    </div>
                </div>
            </a>
        </div>

        <div class="col-lg-4">
            <a href="{{ route('locataires.index') }}" class="text-decoration-none">
                <div class="card menu-card shadow border-0">
                    <div class="card-body text-center p-5">
                        <i class="fa-solid fa-users fa-4x text-info"></i>
                        <h4 class="mt-3 text-dark">Locataires</h4>
                    </div>
                </div>
            </a>
        </div>

        <div class="col-lg-4">
            <a href="{{ route('parametres.index') }}" class="text-decoration-none">
                <div class="card menu-card shadow border-0">
                    <div class="card-body text-center p-5">
                        <i class="fa-solid fa-gear fa-4x text-secondary"></i>
                        <h4 class="mt-3 text-dark">Paramètres</h4>
                    </div>
                </div>
            </a>
        </div>

    </div>

    <!-- Graphique -->
    <div class="card border-0 shadow-lg mt-5">
        <div class="card-header bg-white">
            <h5 class="mb-0">
                📊 Consommation Mensuelle
            </h5>
        </div>

        <div class="card-body">
            <canvas id="consommationChart"></canvas>
        </div>
    </div>

</div>

@endsection

@section('scripts')

<script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
<script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
<script src="{{ asset('js/assikpa-data.js') }}"></script>
<script src="{{ asset('js/dashboard.js') }}"></script>

@endsection