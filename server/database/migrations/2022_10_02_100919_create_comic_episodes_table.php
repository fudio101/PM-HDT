<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     *
     * @return void
     */
    public function up()
    {
        Schema::create('comic_episodes', function (Blueprint $table) {
            $table->id();
            $table->foreignId('comic_id')->constrained();
            $table->unsignedInteger('episode_number');
            $table->date('published_date');
            $table->unsignedBigInteger('likes')->default(0);
            $table->unsignedBigInteger('views')->default(0);
            $table->foreignId('user_id')->constrained();
            $table->softDeletes();
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
        Schema::dropIfExists('comic_episodes');
    }
};
