<?php

namespace App\Http\Controllers;

use App\Models\ComicEpisode;
use App\Http\Requests\StoreComicEpisodeRequest;
use App\Http\Requests\UpdateComicEpisodeRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class ComicEpisodeController extends Controller
{
    /**
     * Use middleware.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'getImages']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $comicEpisodes = ComicEpisode::all();
        return \response()->json(['data' => $comicEpisodes], ResponseAlias::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreComicEpisodeRequest  $request
     * @return JsonResponse
     */
    public function store(StoreComicEpisodeRequest $request)
    {
        try {

            $comicEpisode = ComicEpisode::query()->create($request->only([
                'comic_id', 'episode_number', 'published_date'
            ]));

            $comic = $comicEpisode->comic;
            $comicSlug = $comic->slug;

            // Delete old image of comic episode
            $oldImages = Storage::allFiles("comics/".$comicSlug);
            foreach ($oldImages as $item) {
                $image = $item->image;
                if (Storage::exists($image)) {
                    Storage::delete($image);
                }
            }

            $images = $request->file('images');
            $imageOrder = (array) $request->input('imageOrder');
            $images = $this->sortImages($images, $imageOrder);

            $comicEpisodeId = $comicEpisode->id;
            foreach ($images as $index => $image) {
                Storage::putFileAs('comics/'.$comicSlug.'/'.$comicEpisodeId, $image, $index.'.'.$image->extension());
            }

            return \response()->json(['data' => $comicEpisode], ResponseAlias::HTTP_CREATED);
        } catch (\Throwable $exception) {
            return \response()->json(['message' => $exception->getMessage()], ResponseAlias::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  ComicEpisode  $comicEpisode
     * @return JsonResponse
     */
    public function show(ComicEpisode $comicEpisode)
    {
        return \response()->json(['data' => $comicEpisode], ResponseAlias::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  ComicEpisode  $comicEpisode
     * @return Response
     */
    public function edit(ComicEpisode $comicEpisode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateComicEpisodeRequest  $request
     * @param  ComicEpisode  $comicEpisode
     * @return JsonResponse
     */
    public function update(UpdateComicEpisodeRequest $request, ComicEpisode $comicEpisode)
    {
        $result = $comicEpisode->update($request->only(['comic_id', 'episode_number', 'published_date']));
        if ($result) {
            return \response()->json(['message' => 'Successfully update'], ResponseAlias::HTTP_OK);
        }

        return \response()->json(['message' => 'Fail'], ResponseAlias::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  ComicEpisode  $comicEpisode
     * @return JsonResponse
     */
    public function destroy(ComicEpisode $comicEpisode)
    {
        $result = $comicEpisode->delete();

        if ($result) {
            return \response()->json(['message' => 'Successfully delete'], ResponseAlias::HTTP_OK);
        }

        return \response()->json(['message' => 'Fail'], ResponseAlias::HTTP_NOT_FOUND);
    }

    /**
     * @param  array  $images
     * @param  array  $imageOrder
     * @return array
     */
    private function sortImages(array $images, array $imageOrder)
    {
        $newImages = [];
        foreach ($imageOrder as $value) {
            foreach ($images as $index => $item) {
                if ($item->getClientOriginalName() == $value) {
                    $newImages[] = $item;
                    unset($images[$index]);
                }
            }
        }
        return $newImages;
    }

    public function getImages(ComicEpisode $comicEpisode)
    {
        $images = $comicEpisode->episodeImages;

        return \response()->json(['data' => $images], ResponseAlias::HTTP_OK);
    }
}
