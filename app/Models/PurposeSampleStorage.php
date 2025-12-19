<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class PurposeSampleStorage extends Model
{
    use HasFactory;

    protected $table = 'purpose_sample_storages';
    protected $fillable = ['name', 'value', 'status'];
}
