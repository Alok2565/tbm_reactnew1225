<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DgftDirector extends Model
{
    use HasFactory;

    protected $table = 'dgft_directors';
    protected $fillable = [
        'dgft_user_id',
        'name'
    ];
    protected $hidden = ['dgft_user_id', 'created_at', 'updated_at'];
}
