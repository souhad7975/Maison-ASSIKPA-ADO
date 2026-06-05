<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

abstract class Controller
{
    public function calcul(Request $request)
    {
        $totalFacture = $request->montant_total;
        $kwts = $request->kwt;
        $totalKwt = array_sum($kwts);
        $resultats = [];

        foreach ($kwts as $k => $kwt) {
            $montant = (($kwt / $totalKwt) * $totalFacture) + 200;
            $resultats[] = round($montant);
        }

        return response()->json($resultats);
    }
}
