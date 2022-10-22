<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Auth;

class Category extends Model
{
    use HasFactory,SoftDeletes;

    protected $table = 'categories';
    protected $fillable = ['name','user_id'];

    protected static function booted()
    {
        parent::booted();

        static::creating(function ($category) {
            $category->user_id = Auth::user()->id;
        });
        static::updating(function ($category) {
            $category->user_id = Auth::user()->id;
        });
    }

    function comics()
    {
        return $this->belongsToMany(Comics::class, 'comic_category', 'category_id', 'comic_id');
    }



}
