<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DgftBranch extends Model
{
    use HasFactory;

    protected $table = 'dgft_branches';
    protected $fillable = [
        'dgft_user_id',
        'branch_code',
        'branch_addr1',
        'branch_addr2',
        'city',
        'state',
        'pincode'
    ];
    protected $hidden = ['dgft_user_id', 'created_at', 'updated_at'];
}
