<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';

    function getCategory($id)
    {
        return Category::find($id);
    }
    function getAll()
    {
        return Category::get();
    }
    function getActive()
    {
        return Category::where('status',1)->get();
    }
    function getStop()
    {
        return Category::where('status',0)->get();
    }
    function deletes($id)
    {
        return Category::where('id',$id)->delete();
    }
//    function comics(){
//        return $this->hasMany(App\Models\Comics,,)
//    }

}
