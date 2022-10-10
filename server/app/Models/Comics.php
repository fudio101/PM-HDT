<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Casts\Attribute;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Comics extends Model
{
    use HasFactory;

    protected $table = 'comics';
    protected $fillable = ['name', 'user_id', 'author_id', 'description', 'published_date', 'like', 'view', 'status'];
    protected $appends=['author_text'];

    protected static function booted()
    {
        parent::booted();

        static::creating(function ($comics) {
            $comics->user_id = Auth::user()->id;
        });
        static::updating(function ($comics) {
            $comics->user_id = Auth::user()->id;
        });
    }

    public function author_text(): Attribute
    {

        return Attribute::make(
            get: static fn($value, $attributes) => 'hahaha'
        );

    }

    function getComics($id)
    {
        return Comics::find($id);
    }

    function getAll()
    {
        return Comics::get();
    }

    function getActive($id)
    {
        return Comics::where('status', 1)->get();
    }

    function getStop($id)
    {
        return Comics::where('status', 0)->get();
    }

    function deletes($id)
    {
        return Comics::where('id', $id)->delete();
    }

    function author()
    {
        return $this->hasOne(Author::class, 'id', 'author_id');
    }

    function category()
    {
        return $this->belongsToMany(Category::class, 'comic_category', 'comic_id', 'category_id');
    }
}
