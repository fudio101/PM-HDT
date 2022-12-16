<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration {
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('bills', function (Blueprint $table) {
            $table->ulid('id');
            $table->foreignId('user_id')->constrained();
            $table->foreignId('subscription_package_id')->constrained();
            $table->unsignedDouble('subscription_package_price');
            $table->unsignedInteger('subscription_package_duration')->comment('By days');
            $table->unsignedInteger('subscription_package_duration_text');
            $table->string('status')->default('COMPLETED');
            $table->timestamps();
        });
    }

    /**
     * Reverse the migrations.
     *
     * @return void
     */
    public function down()
    {
        Schema::dropIfExists('bills');
    }
};
