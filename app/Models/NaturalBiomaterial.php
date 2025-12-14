<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NaturalBiomaterial extends Model
{
    use HasFactory;

    protected $table = 'natural_biomaterials';
    protected $fillable = ['name', 'value', 'status'];
}
