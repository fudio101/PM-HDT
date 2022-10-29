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
     * @param Request $request
     * @return JsonResponse
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|max:255',
                'published_date' => 'required',
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
     * @param Comics $comic
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
     * @param Request $request
     * @param Comics $comic
     * @return JsonResponse
     */
    public function update(Request $request, Comics $comic)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|max:255',
                'published_date' => 'required',
                'author_id' => 'required|exists:authors,id,deleted_at,NULL',
                'category_id' => 'required|array',
                'category_id.*' => 'exists:categories,id,deleted_at,NULL',
            ]);
            $comic->update($request->only(['name', 'published_date', 'author_id', 'description', 'status']));
            ComicsCategory::deletes($comic->id);
            foreach ($request->category_id as $value) {
                ComicsCategory::create([
                    'comic_id' => $comic->id,
                    'category_id' => $value,
                ]);
            };

            return response()->json([
                'message' => 'Update success comics!',

            ]);
        } catch (Throwable $err) {
            return response()->json([
                'message' => $err->getMessage(),
            ]);
        }

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Comics $comic
     * @return JsonResponse
     */
    public function destroy(Comics $comic)
    {
        $comic->delete();
        return response()->json([
            'message' => 'Delete success comics!'
        ], ResponseAlias::HTTP_OK);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Category $category
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

    public function showImageEpisode(Comics $comics, $episode_number)
    {
        return response()->json([
            'data' => ComicEpisode::getEpisode($comics->id, $episode_number)->episodeImages,
        ], ResponseAlias::HTTP_OK);
    }

}
