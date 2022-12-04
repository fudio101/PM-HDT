<?php

namespace App\Http\Controllers;

use App\Http\Resources\ClientComicInforResource;
use App\Http\Resources\ClientComicResource;
use App\Http\Resources\ClientEpidoseImagesResource;
use App\Models\Category;
use App\Models\Comic;
use App\Models\ComicEpisodeView;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ClientController extends Controller
{
    /**
     * Show all comics in a category
     *
     * @param  Category  $category
     * @return JsonResponse
     */
    public function showCategory(Category $category): JsonResponse
    {
        return response()->json([
            'data' => $category->comics,
        ], ResponseAlias::HTTP_OK);
    }

    public function search(Request $request): JsonResponse
    {
        $data = ClientComicResource::collection(Comic::search($request->search)->get());//->makeHidden('episodes');
        return response()->json([
            'data' => $data
        ], ResponseAlias::HTTP_OK);
    }

    /**
     * @param  Comic  $comic
     * @return JsonResponse
     */
    public function getComic(Comic $comic): JsonResponse
    {
        $data = new ClientComicInforResource($comic);
        return response()->json(['data' => $data]);
    }

    /**
     * @param  Comic  $comic
     * @param  $episode_number
     * @return JsonResponse
     */
    public function showEpisodeImages(Comic $comic, $episode_number): JsonResponse
    {
        $comicEpisode = $comic->getEpisode($episode_number);

        if ($comicEpisode) {
            $comicEpisodeViewId = ComicEpisodeView::createViewLog($comicEpisode);
            $data = new ClientEpidoseImagesResource($comicEpisode);
            return response()->json([
                'data' => $data,
                'view' => [
                    'cooldown' => $comicEpisode->cooldown,
                    'id' => $comicEpisodeViewId
                ]
            ],
                ResponseAlias::HTTP_OK);
        }


        return response()->json([
            'message' => "Comic episode can't be found",
        ], ResponseAlias::HTTP_BAD_REQUEST);
    }

    public function acceptEpisodeView(Comic $comic, $episode_number, Request $request): JsonResponse
    {
        $validate = $request->validate([
            'view_id' => 'required|exists:comic_episode_views,id',
        ]);

        $comicEpisode = $comic->getEpisode($episode_number);

        if (ComicEpisodeView::accepotViewLog($comicEpisode, $validate["view_id"])) {
            return response()->json(['message' => "Accept view successfully",], ResponseAlias::HTTP_OK);
        }

        return response()->json([
            'message' => "Can't accept view",
        ], ResponseAlias::HTTP_BAD_REQUEST);
    }

    /**
     * @return JsonResponse
     */
    public function getJustUpdatedComics(Request $request): JsonResponse
    {
        $input = $request->validate(['number' => 'integer']);
        $number = $input['number'] ?? 20;

        $comics = Comic::all()->where('updated_time_diff_on_days', '<=', 3)->sortByDesc('updated_time')->take($number);

//        $comics->sortByDesc('updated_time');

        $data = ClientComicResource::collection($comics);

        return response()->json(['data' => $data], ResponseAlias::HTTP_OK);
    }

    public function getComicsByCategory(Category $category): JsonResponse
    {
        $comics = $category->comics;
        $data = ClientComicResource::collection($comics);
        return response()->json(['data' => $data], ResponseAlias::HTTP_OK);
    }

    public function getViewStatisticsByDay(Request $request): JsonResponse
    {
        $validate = $request->validate([
            'day' => 'required|date_format:Y-m-d'
        ]);

        $day = $validate['day'];

        $comics = Comic::getComicViewStatisticsByDay($day);

        $data = ClientComicResource::collection($comics);

        return response()->json(['data' => $data], ResponseAlias::HTTP_OK);
    }

    public function getViewStatisticsByMonth(Request $request): JsonResponse
    {
        $validate = $request->validate([
            'month' => 'required|date_format:Y-m'
        ]);

        $day = $validate['month'];

        $comics = Comic::getComicViewStatisticsByMonth($day);

        $data = ClientComicResource::collection($comics);

        return response()->json(['data' => $data], ResponseAlias::HTTP_OK);
    }
}
