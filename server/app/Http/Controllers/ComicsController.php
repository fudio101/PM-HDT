<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Category;
use App\Models\Comics;
use App\Models\ComicsCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Throwable;

class ComicsController extends Controller
{
    protected $comics;
    protected $category;
    protected $author;

    public function __construct()
    {
        $this->category = new Category;
        $this->comics = new Comics;
        $this->author = new Author;
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        return response()->json([
            'list' => Comics::all(),
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
                'published_date' => 'required',
                'author_id' => 'required|exists:authors,id,deleted_at,NULL',
                'category_id' => 'required|array',
                'category_id.*' => 'exists:categories,id,deleted_at,NULL',

            ]);
            $comics = $this->comics->create($request->only([
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
                'comics' => $comics
            ]);
        } catch (Throwable $err) {
            return response()->json([
                'message' => 'Add error comics!',
                'error' => $err->getMessage(),
            ], Response::HTTP_BAD_REQUEST);
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
            'comics' => $comic,
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
                'message' => 'Update error comics!',
                'error' => $err->getMessage(),
            ]);
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
        $comic->delete();
        return response()->json([
            'status' => true,
            'message' => 'Delete success comics!'
        ]);
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

        ]);
    }

}
