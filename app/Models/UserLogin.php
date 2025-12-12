<?php

namespace App\Models;

use App\Models\User;
use App\Models\UserLoginHistory;
use Tymon\JWTAuth\Contracts\JWTSubject;

use Illuminate\Foundation\Auth\User as Authenticatable;

class UserLogin extends Authenticatable implements JWTSubject
{
    protected $table = 'user_logins';

    protected $fillable = [
        'user_id',
        'role_id',
        'email',
        'password',
        'remember_token',
        'auth_token',
        'validity_status',
        'status',
        'ip_address'
    ];


    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }

    public function user()
    {
        return $this->belongsTo(User::class, 'user_id', 'id');
    }
    public function histories()
    {
        return $this->hasMany(UserLoginHistory::class);
    }
}
