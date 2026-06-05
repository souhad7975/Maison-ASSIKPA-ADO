<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
  /**
   * Run the migrations.
   */
  public function up()
  {
    Schema::create('factures', function (Blueprint $table) {
      $table->id();
      $table->decimal('montant_total', 10, 2);
      $table->integer('kwt');
      $table->decimal('montant_paye', 10, 2);
      $table->string('statut')->default('Non payé');
      $table->string('mois');
      $table->timestamps();
    });
  }
};
