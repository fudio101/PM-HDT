<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class Category extends Model
{
    use HasFactory;

    protected $table = 'categories';
    protected $fillable = ['name','user_id'];

    protected static function booted()
    {
        parent::booted();

        static::creating(function ($category) {
            $category->user_id = Auth::user()->id;
        });
    }
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
