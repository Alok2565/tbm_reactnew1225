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
        Schema::create('dgft_branches', function (Blueprint $table) {
            $table->id();
            $table->integer('dgft_user_id')->nullable()->constrained('dgft_imp_exp_users')->onDelete('cascade');
            $table->string('branch_code')->nullable();
            $table->text('branch_addr1')->nullable();
            $table->text('branch_addr2')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('pincode')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('dgft_branches');
    }
};
