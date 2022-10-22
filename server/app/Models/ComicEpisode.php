<?php

namespace App\Models;

use App\Http\Traits\AddUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\SoftDeletes;

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

    public function comic()
    {
        return $this->belongsTo(Comics::class);
    }
}
