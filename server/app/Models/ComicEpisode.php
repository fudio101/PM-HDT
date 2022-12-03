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
//        'published_date',
        'likes',
        'views'
    ];

    protected $hidden = [
        'deleted_at',
        'created_at',
        'updated_at',
        'user_id',
        'comic',
        'cooldown'
    ];

    protected $appends = ['image_urls'];

    public function getImageUrlsAttribute()
    {
        $images = Storage::allFiles("comics/{$this->comic->slug}/{$this->episode_number}");
        $imageUrls = [];
        foreach ($images as $image) {
            $imageUrls[] = Storage::temporaryUrl($image, now()->addMinutes(30));
        }
        return $imageUrls;
    }

    public function getCooldownAttribute($value)
    {
        if ($value !== 0) {
            return $value;
        }
        $imageUrls = $this->image_urls;

        $godWidth = config("constants.god_width");
        $totalHeight = 0;

        foreach ($imageUrls as $imageUrl) {
            [$width, $height, $type, $attr] = getimagesize($imageUrl);
            $totalHeight += $height * ($width / $godWidth);
        }

        $result = (int) round($totalHeight * config("constants.god_number"));

        $this->setAttribute('cooldown', $result)->save();

        return $result;
    }

    public function getListOfEpisodeNumberAttribute()
    {
        return $this->comic->episodes->pluck('episode_number');
    }

    public function comic()
    {
        return $this->belongsTo(Comic::class);
    }
}
