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
     * @param  StoreEpisodeImageRequest  $request
     * @return JsonResponse
     */
    public function store(StoreEpisodeImageRequest $request)
    {
        $comicEpisode = ComicEpisode::query()->find($request->input(['comic_episode_id']));

        $image = $request->file('image');
        $imagePath = $image->storeAs('public', 'ga'.'.'.$image->extension());

        $data = array_merge($request->only(['comic_episode_id']), ['image' => $imagePath]);

        $episodeImage = EpisodeImage::query()->create($data);

        return \response()->json(['data' => $episodeImage], ResponseAlias::HTTP_CREATED);
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
     * Show the form for editing the specified resource.
     *
     * @param  EpisodeImage  $episodeImage
     * @return Response
     */
    public function edit(EpisodeImage $episodeImage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateEpisodeImageRequest  $request
     * @param  EpisodeImage  $episodeImage
     * @return JsonResponse
     */
    public function update(UpdateEpisodeImageRequest $request, EpisodeImage $episodeImage)
    {
        $result = $episodeImage->update($request->only(['comic_episode_id', 'image']));
        if ($result) {
            return \response()->json(['message' => 'Successfully update'], ResponseAlias::HTTP_OK);
        }

        return \response()->json(['message' => 'Fail'], ResponseAlias::HTTP_NOT_FOUND);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  EpisodeImage  $episodeImage
     * @return JsonResponse
     */
    public function destroy(EpisodeImage $episodeImage)
    {
        $result = $episodeImage->delete();

        if ($result) {
            return \response()->json(['message' => 'Successfully delete'], ResponseAlias::HTTP_OK);
        }

        return \response()->json(['message' => 'Fail'], ResponseAlias::HTTP_NOT_FOUND);
    }
}
