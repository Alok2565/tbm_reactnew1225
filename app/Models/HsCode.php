<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class HsCode extends Model
{
    use HasFactory;

    protected $table = 'hs_codes';
    protected $fillable = ['hs_code', 'desc', 'status'];
}
