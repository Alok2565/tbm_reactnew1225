<?php

namespace App\Models;

use App\Models\ImpExpUserLogin;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Factories\HasFactory;

class ImpExpUser extends Model
{
    use HasFactory;

    protected $table = 'imp_exp_users';

    protected $fillable = [
        'role_id',
        'iec_code',
        'name',
        'email',
        'address',
        'address2',
        'designation',
        'department',
        'state',
        'city',
        'pincode',
        'mobile_number',
        'status',
        'ip_address',
    ];


    public function role()
    {
        return $this->belongsTo(Role::class, 'role_id', 'id');
    }
    public function impExpUserLogin()
    {
        return $this->hasOne(ImpExpUserLogin::class, 'impexp_user_id', 'id');
    }

    public function getJWTIdentifier()
    {
        return $this->getKey();
    }

    public function getJWTCustomClaims()
    {
        return [];
    }
    /**
     * The attributes that should be hidden for serialization.
     *
     * @var list<string>
     */
    protected $hidden = [
        'password',
        'remember_token',
    ];

    /**
     * Get the attributes that should be cast.
     *
     * @return array<string, string>
     */
    protected function casts(): array
    {
        return [
            'email_verified_at' => 'datetime',
            'password' => 'hashed',
        ];
    }
}
