<?php

namespace App\Models;

use App\Http\Traits\AddUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;
use Illuminate\Support\Facades\Storage;

class ComicEpisode extends Model
{
    use HasFactory, AddUser, SoftDeletes;

    protected $fillable = [
        'comic_id',
        'episode_number',
        'published_date',
        'likes',
        'views'
    ];

    protected $hidden = [
        'deleted_at',
        'created_at',
        'updated_at',
        'user_id',
        'comic'
    ];

//    protected $appends=['imageUrls'];

    public function getImageUrlsAttribute(){
        $images=Storage::allFiles("comics/{$this->comic->slug}/{$this->episode_number}");
        $imageUrls=[];
        foreach ($images as $image){
            $imageUrls[]=Storage::temporaryUrl($image,now()->addMinutes(30));
        }
        return $imageUrls;
    }

    public function comic()
    {
        return $this->belongsTo(Comic::class);
    }
}
