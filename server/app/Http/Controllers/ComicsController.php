<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Category;
use App\Models\ComicEpisode;
use App\Models\Comics;
use App\Models\ComicsCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Throwable;

class ComicsController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index', 'showImageEpisode', 'search']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        return response()->json([
            'data' => Comics::all(),
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param  Request  $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|max:255',
                'published_date' => 'required|date',
                'author_id' => 'required|exists:authors,id,deleted_at,NULL',
                'category_id' => 'required|array',
                'category_id.*' => 'exists:categories,id,deleted_at,NULL',

            ]);
            $comics = Comics::create($request->only([
                'name', 'published_date', 'author_id', 'description', 'status'
            ]));
            foreach ($request->category_id as $value) {
                ComicsCategory::create([
                    'comic_id' => $comics->id,
                    'category_id' => $value,
                ]);
            };
            return response()->json([
                'message' => 'Add success comics!',
                'data' => $comics
            ]);
        } catch (Throwable $err) {
            return response()->json([
                'message' => $err->getMessage(),
            ], ResponseAlias::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  Comics  $comic
     * @return JsonResponse
     */
    public function show(Comics $comic)
    {
        return response()->json([
            'data' => $comic,
        ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  Comics  $comic
     * @return JsonResponse
     */
    public function update(Request $request, Comics $comic)
    {
        try {
            $validated = $request->validate([
                'name' => 'max:255',
                'published_date' => 'date',
                'author_id' => 'exists:authors,id,deleted_at,NULL',
                'status' => 'integer',
                'category_id' => 'array',
                'category_id.*' => 'exists:categories,id,deleted_at,NULL',
            ]);

            $oldSlug = $comic->slug;

            $comic->update($validated);

            // update image location
            $newSlug = $comic->slug;
            if ($oldSlug !== $newSlug) {
                $oldFiles = Storage::allFiles("comics/".$oldSlug);
                foreach ($oldFiles as $oldFile) {
                    $tmp = explode('/', $oldFile);
                    $tmp[1] = $newSlug;
                    $tmp = implode("/", $tmp);
                    Storage::move($oldFile, $tmp);
                }
            }

            // update category list
            if (!empty($validated['category_id'])) {
                ComicsCategory::deletes($comic->id);
                foreach ($validated['category_id'] as $value) {
                    ComicsCategory::create([
                        'comic_id' => $comic->id,
                        'category_id' => $value,
                    ]);
                };
            }

            return response()->json([
                'message' => 'Update success comics!',
                'data' => $comic
            ]);
        } catch (Throwable $err) {
            return response()->json([
                'message' => $err->getMessage(),
            ], ResponseAlias::HTTP_BAD_REQUEST);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Comics  $comic
     * @return JsonResponse
     */
    public function destroy(Comics $comic)
    {
        $episodes = $comic->episodes();

        Storage::deleteDirectory("comics/".$comic->slug);

        $episodes->delete();

        $comic->delete();
        return response()->json([
            'message' => 'Delete success comics!'
        ], ResponseAlias::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Category  $category
     * @return JsonResponse
     */
    public function showCategory(Category $category)
    {
        return response()->json([
            'data' => $category->comics,
        ], ResponseAlias::HTTP_OK);
    }

    public function search(Request $request)
    {
        return response()->json([
            'data' => Comics::search($request->search)->get()
        ], ResponseAlias::HTTP_OK);
    }

    /**
     * @param  Comics  $comics
     * @param  $episode_number
     * @return JsonResponse
     */
    public function showImageEpisode(Comics $comics, $episode_number)
    {
        $comicEpisode = $comics->getEpisode($episode_number);

        if ($comicEpisode) {
            $images = Storage::allFiles("comics/".$comics->slug."/".$comicEpisode->episode_number);
            $imageUrls = [];
            foreach ($images as $image) {
                $imageUrls[] = Storage::temporaryUrl($image, now()->addMinutes(30));
            }
            return response()->json(['data' => $imageUrls,], ResponseAlias::HTTP_OK);
        }

        return response()->json([
            'message' => "Comic episode can't be found",
        ], ResponseAlias::HTTP_BAD_REQUEST);
    }

}
