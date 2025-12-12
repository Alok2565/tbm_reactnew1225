<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Branch extends Model
{
    use HasFactory;

    protected $table = 'branches';

    protected $fillable = [
        'dgft_branch_id',
        'profile_id',
        'iec_code',
        'dgft_branch_code',
        'branch_addr1',
        'branch_addr2',
        'city',
        'state',
        'pincode'
    ];
}
