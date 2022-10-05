<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Author extends Model
{
    use HasFactory;

    protected $table;

    function getAuthor($id)
    {
        Author::find($id);
    }

    function getAll()
    {
        Author::get();
    }
    function comics(){
        return $this->hasMany('Comics::class','author_id','id');
    }
}
