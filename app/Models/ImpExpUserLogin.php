<?php

namespace App\Models;

use Illuminate\Foundation\Auth\User as Authenticatable;
use Tymon\JWTAuth\Contracts\JWTSubject;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ImpExpUserLogin extends Authenticatable implements JWTSubject
{
    use HasFactory;

    protected $table = 'imp_exp_user_logins';

    protected $fillable = [
        'impexp_user_id',
        'role_id',
        'iec_code',
        'email',
        'password',
        'remember_token',
        'auth_token',
        'validity_status',
        'status',
        'ip_address',
        'invalid_at'
    ];
    protected $hidden = [
        'password',
        'remember_token',
        'auth_token'
    ];
    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function impExpUser()
    {
        return $this->belongsTo(ImpExpUser::class, 'impexp_user_id', 'id');
    }

    public function histories()
    {
        return $this->hasMany(UserLoginHistory::class);
    }
}


// namespace App\Models;

// use Illuminate\Database\Eloquent\Model;
// use Tymon\JWTAuth\Contracts\JWTSubject;
// use Illuminate\Database\Eloquent\Factories\HasFactory;

// class ImpExpUserLogin extends Model implements JWTSubject
// {
//     use HasFactory;

//     protected $table = 'imp_exp_user_logins';

//     protected $fillable = [
//         'impexp_user_id',
//         'role_id',
//         'iec_code',
//         'email',
//         'password',
//         'remember_token',
//         'auth_token',
//         'validity_status',
//         'status',
//         'ip_address',
//         'invalid_at'
//     ];

//     public function getJWTIdentifier()
//     {
//         return $this->getKey();
//     }

//     public function getJWTCustomClaims()
//     {
//         return [];
//     }

//     public function impExpUser()
//     {
//         return $this->belongsTo(ImpExpUser::class, 'impexp_user_id', 'id');
//     }
//     public function histories()
//     {
//         return $this->hasMany(UserLoginHistory::class);
//     }
// }
