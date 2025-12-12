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
        Schema::create('imp_exp_user_profiles', function (Blueprint $table) {
            $table->id();
            $table->integer('impexp_user_id')->nullable();
            $table->integer('role_id')->nullable();
            $table->string('iec_code')->nullable();
            $table->text('entity_name')->nullable();
            $table->text('address_line1')->nullable();
            $table->text('address_line2')->nullable();
            $table->string('city')->nullable();
            $table->string('state')->nullable();
            $table->string('pincode')->nullable();
            $table->integer('contact_no')->nullable();
            $table->string('email')->nullable();
            $table->string('iec_issue_date')->nullable();
            $table->string('exporter_type')->nullable();
            $table->string('pan_number')->nullable();
            $table->boolean('iec_status')->nullable();
            $table->boolean('star_status')->nullable();
            $table->string('iec_modification_date')->nullable();
            $table->string('data_as_on')->nullable();
            $table->string('nature_of_concern')->nullable();
            $table->string('validity_status')->nullable();
            $table->timestamp('created_at')->useCurrent();
            $table->timestamp('updated_at')->useCurrent()->useCurrentOnUpdate();
        });
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        Schema::dropIfExists('imp_exp_user_profiles');
    }
};
