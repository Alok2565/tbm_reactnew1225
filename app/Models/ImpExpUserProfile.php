<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ImpExpUserProfile extends Model
{
    use HasFactory;

    protected $table = 'user_logins';

    protected $fillable = [
        'role_id',
        'user_id',
        'email',
        'password',
        'remember_token',
        'auth_token',
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

    public function userImpEXP()
    {
        return $this->belongsTo(ImpExpUser::class);
    }

    public function histories()
    {
        return $this->hasMany(UserLoginHistory::class);
    }
}
