<?php

namespace App\Models;

use App\Http\Traits\AddUser;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class EpisodeImage extends Model
{
    use HasFactory, AddUser;

    protected $fillable = [
        'comic_episode_id',
        'image',
    ];
}
