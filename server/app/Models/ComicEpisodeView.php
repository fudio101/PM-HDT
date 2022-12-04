<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Carbon;
use Illuminate\Support\Facades\Auth;

class ComicEpisodeView extends Model
{
    /**
     * @param  ComicEpisode  $comicEpisode
     * @return mixed
     */
    public static function createViewLog(ComicEpisode $comicEpisode): mixed
    {
        $postView = new ComicEpisodeView();
        $postView->comic_episode_id = $comicEpisode->id;
        $postView->cooldown = $comicEpisode->cooldown;
        $postView->url = request()->url();
//        $postViews->session_id = request()->session()->getId();
        $postView->session_id = null;
        $postView->user_id = (Auth::check()) ? Auth::id() : null; //this check will either put the user id or null, no need to use \Auth()->user()->id as we have an inbuild function to get auth id
        $postView->ip = request()->getClientIp();
        $postView->client_internet_ip = request()->ip();
        $postView->agent = request()->header('User-Agent');
        $postView->save();//please note to save it at lease, very important
        // sample data
        // (597x139222 498s)(700x163242)(0,003050685485353)
        // (700x147037 630s)(0,0044533668867431)
        // (700x141466 630s)(0,0044533668867431)
        // (700x147600 486s)(0,0032926829268293)
        // (800x150815 580s)(700x131963)(0,0043951713737942)
        // 0.019645273559463/5 = 0.0039290547118925 (s/pixel with 700)

        return $postView->id;
    }

    /**
     * @param  ComicEpisode  $comicEpisode
     * @param  int  $viewId
     * @return bool
     */
    public static function accepotViewLog(ComicEpisode $comicEpisode, int $viewId): bool
    {
        $view = self::query()->find($viewId);
        if ($view && request()->getClientIp() === $view->ip && $view->comic_episode_id === $comicEpisode->id) {
            if ($view->accepted) {
                return true;
            }
            $cooldownTime = Carbon::make($comicEpisode->created_at)->addSeconds($comicEpisode->cooldown);
            $result = $cooldownTime->lte(now());
            if ($result) {
                $view->accepted = true;
                $view->save();
                return true;
            }
        }
        return false;
    }
}
