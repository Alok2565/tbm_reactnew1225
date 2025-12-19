<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class SpecifyPurposeEndUse extends Model
{
    use HasFactory;

    protected $table = 'specify_purpose_end_uses';
    protected $fillable = ['name', 'value', 'status'];
}
