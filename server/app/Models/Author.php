<?php

namespace App\Models;

use App\Http\Traits\AddUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Author extends Model
{
    use HasFactory, SoftDeletes, AddUser;

    protected $table = "authors";

    protected $fillable = [
        'name'
    ];

    function comics()
    {
        return $this->hasMany('Comics::class', 'author_id', 'id');
    }
}
