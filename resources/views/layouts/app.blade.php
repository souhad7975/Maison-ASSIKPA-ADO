<!DOCTYPE html>
<html lang="fr">

<head>

    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">

    <title>Maison ASSIKPA-ADO</title>

    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">

    <link rel="stylesheet"
    href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">

    <style>
    body {
        background: #f4f6f9;
        font-family: 'Inter', sans-serif;
    }

    .navbar-brand {
        font-weight: 700;
    }

    .navbar-nav .nav-link {
        font-weight: 500;
    }

    .page-title {
        letter-spacing: 0.02em;
    }

    .card-hero {
        background: linear-gradient(135deg, #3754db 0%, #2c7edb 100%);
        color: white;
    }

    .card-hero small {
        opacity: 0.85;
    }

    .table thead {
        background: #eef2ff;
    }

    .badge-status {
        font-size: 0.9rem;
    }

    .badge-paid {
        background: #198754;
    }

    .badge-due {
        background: #f59e0b;
    }

    .form-section {
        background: #ffffff;
        border-radius: 16px;
        box-shadow: 0 20px 40px rgba(15, 23, 42, 0.06);
    }

    @media print {
        body * {
            visibility: hidden !important;
        }

        #receiptCard,
        #receiptCard * {
            visibility: visible !important;
        }

        #receiptCard {
            position: relative;
            left: 0;
            top: 0;
            width: 100%;
        }

        .navbar,
        #printReceipt,
        .btn,
        .navbar-toggler,
        .btn-outline-secondary,
        .fa {
            display: none !important;
        }

        .card {
            box-shadow: none !important;
        }
    }
    </style>

</head>

<body>
    <nav class="navbar navbar-expand-lg navbar-dark bg-dark shadow-sm">
        <div class="container">
            <a class="navbar-brand" href="{{ route('dashboard') }}">ASSIKPA-ADO</a>
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMenu"
                aria-controls="navMenu" aria-expanded="false" aria-label="Toggle navigation">
                <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navMenu">
                <ul class="navbar-nav ms-auto align-items-center">
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('dashboard') ? 'active' : '' }}" href="{{ route('dashboard') }}">Tableau de bord</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('factures.index') ? 'active' : '' }}" href="{{ route('factures.index') }}">Factures</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('paiements.index') ? 'active' : '' }}" href="{{ route('paiements.index') }}">Paiements</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('historique.index') ? 'active' : '' }}" href="{{ route('historique.index') }}">Historique</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('recus.index') ? 'active' : '' }}" href="{{ route('recus.index') }}">Reçus</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('locataires.index') ? 'active' : '' }}" href="{{ route('locataires.index') }}">Locataires</a>
                    </li>
                    <li class="nav-item">
                        <a class="nav-link {{ request()->routeIs('parametres.index') ? 'active' : '' }}" href="{{ route('parametres.index') }}">Paramètres</a>
                    </li>
                    @if(session('user_role'))
                    <li class="nav-item mt-2 mt-lg-0 ms-lg-3">
                        <span class="badge bg-white text-dark py-2 px-3">Role: {{ ucfirst(session('user_role')) }}</span>
                    </li>
                    <li class="nav-item mt-2 mt-lg-0 ms-lg-3">
                        <form action="{{ route('logout') }}" method="POST" class="d-inline">
                            @csrf
                            <button type="submit" class="btn btn-outline-light btn-sm">Déconnexion</button>
                        </form>
                    </li>
                    @endif
                </ul>
            </div>
        </div>
    </nav>

    <main class="py-4">
        <div class="container">
            @yield('content')
        </div>
    </main>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js"></script>
    <script src="https://cdn.jsdelivr.net/npm/sweetalert2@11"></script>
    @yield('scripts')

</body>

</html>