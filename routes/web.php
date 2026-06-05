<?php
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Config;
use Illuminate\Support\Facades\Route;

Route::get('/login', function () {
    return view('login');
})->name('login');

Route::post('/login', function (Request $request) {
    $role = $request->input('role');
    $password = $request->input('password');

    $adminPassword = Config::get('auth_custom.admin_password');
    $locatairePassword = Config::get('auth_custom.locataire_password');

    if ($role === 'admin' && $password === $adminPassword) {
        $request->session()->put('user_role', 'admin');
        return redirect()->route('dashboard');
    }

    if ($role === 'locataire' && $password === $locatairePassword) {
        $request->session()->put('user_role', 'locataire');
        return redirect()->route('dashboard');
    }

    return redirect()->route('login')->with('error', 'Mot de passe incorrect.');
})->name('login.post');

Route::post('/logout', function (Request $request) {
    $request->session()->invalidate();
    $request->session()->regenerateToken();
    return redirect()->route('login');
})->name('logout');

Route::middleware(['web'])->group(function () {
    Route::get('/', function (Request $request) {
        if (!$request->session()->has('user_role')) {
            return redirect()->route('login');
        }
        return view('dashboard', ['user_role' => $request->session()->get('user_role')]);
    })->name('dashboard');

    $protectedRoutes = [
        '/factures' => 'factures',
        '/paiements' => 'paiements',
        '/historique' => 'historique',
        '/recus' => 'recus',
        '/parametres' => 'parametres',
        '/locataires' => 'locataires',
    ];

    foreach ($protectedRoutes as $uri => $view) {
        Route::get($uri, function (Request $request) use ($view) {
            if (!$request->session()->has('user_role')) {
                return redirect()->route('login');
            }
            return view($view, ['user_role' => $request->session()->get('user_role')]);
        })->name($view . '.index');
    }
});
