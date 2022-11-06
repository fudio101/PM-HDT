<?php

namespace App\Http\Controllers;

use App\Models\ComicEpisode;
use App\Models\EpisodeImage;
use App\Http\Requests\StoreEpisodeImageRequest;
use App\Http\Requests\UpdateEpisodeImageRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Throwable;

class EpisodeImageController extends Controller
{
    /**
     * Use middleware.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $episodeImages = EpisodeImage::all();
        return \response()->json(['data' => $episodeImages], ResponseAlias::HTTP_OK);
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreEpisodeImageRequest  $request
     * @return JsonResponse
     */
    public function store(StoreEpisodeImageRequest $request)
    {
        try {
            $comicEpisodeId = $request->input(['comic_episode_id']);

            // Delete old image of comic episode
            $oldImages = EpisodeImage::query()->where('comic_episode_id', $comicEpisodeId);
            if (!is_null($oldImages)) {
                $oldImagesArr = $oldImages->get();
                foreach ($oldImagesArr as $item) {
                    $image = $item->image;
                    if (Storage::exists($image)) {
                        Storage::delete($image);
                    }
                }
                $oldImages->delete();
            }

            $comicEpisode = ComicEpisode::query()->find($comicEpisodeId);
            $comic = $comicEpisode->comic;

            $images = $request->file('images');
            $imageOrder = (array) $request->input('imageOrder');
            $images = $this->sortImages($images, $imageOrder);
            $episodeImages = [];
            foreach ($images as $index => $image) {
                $imagePath = Storage::putFileAs('comic/'.$comic->slug.'/'.$comicEpisode->id, $image,
                    $index.'.'.$image->extension());

                $data = array_merge($request->only(['comic_episode_id']), ['image' => $imagePath]);

                $episodeImages[] = EpisodeImage::query()->create($data);
            }

            return \response()->json(['data' => $episodeImages], ResponseAlias::HTTP_CREATED);
        } catch (Throwable $exception) {
            return \response()->json(['message' => $exception->getMessage()], ResponseAlias::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  EpisodeImage  $episodeImage
     * @return JsonResponse
     */
    public function show(EpisodeImage $episodeImage)
    {
        return \response()->json(['data' => $episodeImage], ResponseAlias::HTTP_OK);
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
}
