<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class QuantityofVolume extends Model
{
    use HasFactory;

    protected $table = 'quantityof_volumes';
    protected $fillable = ['name', 'value', 'status'];
}
