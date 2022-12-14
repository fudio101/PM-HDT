<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreComicEpisodeRequest;
use App\Http\Requests\UpdateComicEpisodeRequest;
use App\Models\ComicEpisode;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Throwable;

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
                'comic_id', 'episode_number'
            ]));

            $comic = $comicEpisode->comic;
            $comicSlug = $comic->slug;

            // Delete old image of comic episode
            $oldImages = Storage::allFiles("comics/".$comicSlug."/".$comicEpisode->episode_number);
            foreach ($oldImages as $image) {
                Storage::delete($image);
            }

            $images = $request->file('images');
            $imageOrder = (array) $request->input('imageOrder');

            $images = $this->sortImages($images, $imageOrder);

            $comicEpisodeNumber = $comicEpisode->episode_number;
            foreach ($images as $index => $image) {
                Storage::putFileAs('comics/'.$comicSlug.'/'.$comicEpisodeNumber, $image,
                    $index.'.'.$image->extension());
            }

            $comicEpisode->append('cooldown');

            return \response()->json(['data' => $comicEpisode], ResponseAlias::HTTP_CREATED);
        } catch (Throwable $exception) {
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
        return \response()->json(['data' => $comicEpisode->append('image_urls')], ResponseAlias::HTTP_OK);
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
        try {
            $oldEpisodeNumber = $comicEpisode->episode_number;

            $result = $comicEpisode->update($request->only(['episode_number']));

            $newEpisodeNumber = $comicEpisode->episode_number;
            //update episode folder
            if ($oldEpisodeNumber !== $newEpisodeNumber) {
                $oldFiles = Storage::allFiles("comics/".$comicEpisode->comic->slug."/".$oldEpisodeNumber);
                foreach ($oldFiles as $oldFile) {
                    $tmp = explode('/', $oldFile);
                    $tmp[2] = $newEpisodeNumber;
                    $tmp = implode("/", $tmp);
                    Storage::move($oldFile, $tmp);
                }
            }

            $comic = $comicEpisode->comic;
            $comicSlug = $comic->slug;

            $images = $request->file('images');
            $imageOrder = (array) $request->input('imageOrder');

            if ($images && $imageOrder) {
                // Delete old image of comic episode
                $oldImages = Storage::allFiles("comics/".$comicSlug."/".$newEpisodeNumber);
                foreach ($oldImages as $image) {
                    if (Storage::exists($image)) {
                        Storage::delete($image);
                    }
                }

                $images = $this->sortImages($images, $imageOrder);

                // put new file to folder
                foreach ($images as $index => $image) {
                    Storage::putFileAs('comics/'.$comicSlug.'/'.$newEpisodeNumber, $image,
                        $index.'.'.$image->extension());
                }
            } elseif (!$images && $imageOrder) {

                // move file to temp folder
                $oldImages = Storage::allFiles("comics/".$comicSlug."/".$newEpisodeNumber);
                foreach ($oldImages as $image) {
                    if (Storage::exists($image)) {
                        $tmp = explode('/', $image);
                        array_splice($tmp, 3, 0, "tmp");
                        $tmp = implode("/", $tmp);
                        Storage::move($image, $tmp);
                    }
                }

                // move file from tmp folder back with new order
                $dir = "comics/".$comicSlug."/".$newEpisodeNumber;
                foreach ($imageOrder as $index => $name) {
                    $extension = explode(".", $name)[1];
                    $tmpDir = $dir."/tmp/".$name;
                    $newDir = $dir."/".$index.".".$extension;
                    Storage::move($tmpDir, $newDir);
                }

                //delete tmp folder
                Storage::deleteDirectory($dir."/tmp");

            }

            if ($result) {
                $comicEpisode->append('cooldown');
                return \response()->json([
                    'message' => 'Successfully update',
                    'data' => $comicEpisode
                ],
                    ResponseAlias::HTTP_OK);
            }

            return \response()->json(['message' => 'Fail'], ResponseAlias::HTTP_BAD_REQUEST);
        } catch (Throwable $exception) {
            return \response()->json(['message' => $exception->getMessage()], ResponseAlias::HTTP_BAD_REQUEST);
        }
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
//
//    public function getImages(ComicEpisode $comicEpisode)
//    {
//        $images = $comicEpisode->episodeImages;
//
//        return \response()->json(['data' => $images], ResponseAlias::HTTP_OK);
//    }
}
