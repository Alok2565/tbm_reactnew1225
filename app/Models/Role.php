<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;

class Role extends Model
{
    //

    protected $table = 'roles';
    protected $fillable = ['role_name', 'role_slug', 'status'];

    public function users()
    {
        return $this->hasMany(User::class, 'role_id', 'id');
    }

    public function logins()
    {
        return $this->hasMany(UserLogin::class, 'role_id');
    }
}
