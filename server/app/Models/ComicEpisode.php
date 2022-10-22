<?php

namespace App\Models;

use App\Http\Traits\AddUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class ComicEpisode extends Model
{
    use HasFactory, AddUser;

    protected $fillable = [
        'comic_id',
        'episode_number',
        'published_date',
        'likes',
        'views'
    ];
}
