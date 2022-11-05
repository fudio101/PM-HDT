<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

class ComicsCategory extends Model
{
    use HasFactory;

    protected $table = "comic_category";
    protected $fillable = ['comic_id', 'category_id'];

    protected $hidden = [
        'created_at',
        'updated_at',
    ];


    static function getByComic($comic_id)
    {
        return self::where('comic_id', $comic_id)->get();
    }

    static function deletes($comics_id)
    {
        return self::where('comic_id', $comics_id)->delete();
    }

}
