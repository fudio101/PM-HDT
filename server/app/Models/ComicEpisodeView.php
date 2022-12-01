<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Facades\Auth;

class ComicEpisodeView extends Model
{
    public static function createViewLog(ComicEpisode $comicEpisode)
    {
        $postViews = new ComicEpisodeView();
        $postViews->comic_episode_id = $comicEpisode->id;
        $postViews->url = request()->url();
        $postViews->session_id = request()->session()->getId();
        $postViews->user_id = (Auth::check()) ? Auth::id() : null; //this check will either put the user id or null, no need to use \Auth()->user()->id as we have an inbuild function to get auth id
        $postViews->ip = request()->getClientIp();
        $postViews->client_internet_ip = request()->ip();
        $postViews->agent = request()->header('User-Agent');
        $postViews->save();//please note to save it at lease, very important
    }
}
