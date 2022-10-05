<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Comics extends Model
{
    use HasFactory;

    protected $table = 'comics';

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
        return $this->hasOne('Author::class', 'author_id', 'id');
    }

    function category()
    {
        return $this->belongsToMany('Category::class', 'comic_category', 'comic_id', 'category_id');
    }
}
