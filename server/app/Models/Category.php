<?php

namespace App\Models;

use App\Http\Traits\AddUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class Category extends Model
{
    use HasFactory, SoftDeletes, AddUser;

    protected $table = 'categories';
    protected $fillable = ['name', 'user_id'];

    function comics()
    {
        return $this->belongsToMany(Comics::class, 'comic_category', 'category_id', 'comic_id');
    }


}