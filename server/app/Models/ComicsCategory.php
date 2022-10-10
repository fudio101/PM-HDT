<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComicsCategory extends Model
{
    use HasFactory;
    protected $table="comic_category";
    protected $fillable = ['comic_id','category_id'];


    function getAllComics($comics_id){
        return ComicsCategory::where('comic_id',$comics_id)->get();
    }

}
