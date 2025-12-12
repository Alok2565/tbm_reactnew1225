<?php

namespace App\Models;

use App\Models\DgftBranch;
use App\Models\DgftDirector;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class DgftImpExpUser extends Model
{
    use HasFactory;

    protected $table = 'dgft_imp_exp_users';

    protected $fillable = [
        'iec',
        'entityName',
        'addressLine1',
        'addressLine2',
        'city',
        'state',
        'pin',
        'contactNo',
        'email',
        'iecIssueDate',
        'exporterType',
        'pan',
        'iecStatus',
        'starStatus',
        'iecModificationDate',
        'dataAsOn',
        'natureOfConcern',
    ];

    public function directors()
    {
        return $this->hasMany(DgftDirector::class, 'dgft_user_id');
    }

    public function branches()
    {
        return $this->hasMany(DgftBranch::class, 'dgft_user_id');
    }
}
