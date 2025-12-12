<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        Schema::create('user_login_histories', function (Blueprint $table) {
            $table->id();
            $table->foreignId('user_login_id')->constrained('user_logins')->onDelete('cascade');
            $table->foreignId('user_id')->constrained('users')->onDelete('cascade');
            $table->foreignId('impexp_user_id')->nullable()->constrained('imp_exp_users')->onDelete('cascade');
            $table->string('session_id')->nullable();
            $table->string('email')->nullable();
             $table->string('browser')->nullable();
            $table->string('platform')->nullable();
            $table->string('status')->nullable();
            $table->string('ip_address')->nullable();
            $table->timestamp('login_datetime')->nullable();
            $table->timestamp('logout_datetime')->nullable();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('user_login_histories');
    }
};