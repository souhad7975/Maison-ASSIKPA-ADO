<?php

namespace Database\Seeders;

use App\Models\Locataire;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
  use WithoutModelEvents;

  /**
   * Seed the application's database.
   */
  public function run()
  {
    for ($i = 1; $i <= 5; $i++) {
      Locataire::create([
        'nom' => "Locataire " . $i,
      ]);
    }
  }
}