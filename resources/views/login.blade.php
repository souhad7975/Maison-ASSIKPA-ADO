<!DOCTYPE html>
<html lang="fr">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Connexion - Maison ASSIKPA-ADO</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.2/css/all.min.css">
    <style>
    body {
        background: linear-gradient(135deg, #0f172a, #2563eb);
        min-height: 100vh;
        display: flex;
        align-items: center;
        justify-content: center;
        color: #ffffff;
    }

    .login-card {
        max-width: 500px;
        width: 100%;
        border-radius: 24px;
        padding: 2rem;
        background: rgba(255, 255, 255, 0.1);
        backdrop-filter: blur(18px);
        box-shadow: 0 30px 70px rgba(0, 0, 0, 0.25);
        border: 1px solid rgba(255, 255, 255, 0.18);
    }

    .form-control {
        border-radius: 14px;
    }

    .btn-primary {
        border-radius: 14px;
    }
    </style>
</head>

<body>
    <div class="login-card">
        <div class="text-center mb-4">
            <h1 class="h3 mb-1">Maison ASSIKPA-ADO</h1>
            <p class="text-white-75">Authentification - Admin / Locataire</p>
        </div>

        @if(session('error'))
        <div class="alert alert-danger">{{ session('error') }}</div>
        @endif

        <form method="POST" action="{{ route('login.post') }}">
            @csrf
            <div class="mb-3">
                <label for="role" class="form-label">Vous vous connectez en tant que</label>
                <select name="role" id="role" class="form-select form-control-lg" required>
                    <option value="admin">Administrateur</option>
                    <option value="locataire">Locataire</option>
                </select>
            </div>
            <div class="mb-4">
                <label for="password" class="form-label">Mot de passe</label>
                <input type="password" id="password" name="password" class="form-control form-control-lg" placeholder="Entrez le mot de passe" required>
            </div>
            <button type="submit" class="btn btn-primary btn-lg w-100">Se connecter</button>
        </form>

        <div class="text-center text-white-50 mt-4">
            <small>Veuillez entrer vos identifiants pour accéder à la plateforme.</small>
        </div>
    </div>
</body>

</html>
