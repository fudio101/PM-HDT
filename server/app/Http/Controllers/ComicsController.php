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
    protected $comics_category;

    public function __construct()
    {
        $this->category = new Category;
        $this->comics = new Comics;
        $this->author = new Author;
        $this->comics_category = new ComicsCategory;
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        return response()->json([
            'list' => $this->comics->getAll(),
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
            $comics = $this->comics->create($request->only(['name', 'published_date', 'author_id', 'description', 'status']));
            foreach ($request->category_id as $value) {
                $this->comics_category->create([
                    'comic_id' => $comics->id,
                    'category_id' => $value,
                ]);
            };
            return response()->json([
                'message' => 'Add success comics!',
                'comics'=> $comics
            ]);
        } catch (Throwable $err) {
            return response()->json([
                'message' => 'Add error comics!',
                'error' => $err->getMessage(),
            ],Response::HTTP_BAD_REQUEST);
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
            'comics' => $comic,
        ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param Request $request
     * @param Comics $comic
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comics $comic)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|max:255',
                'published_date' => 'required',
                'author_id' =>'required|exists:authors,id,deleted_at,NULL',
                'category_id' => 'required|array',
                'category_id.*' => 'exists:categories,id,deleted_at,NULL',
            ]);
            $comic->update($request->only(['name', 'published_date', 'author_id', 'description', 'status']));
            $this->comics_category->deletes($comic->id);
            foreach ($request->category_id as $value) {
                $this->comics_category->create([
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
     * @param Comics $comic
     * @return \Illuminate\Http\Response
     */
    public function destroy(Comics $comic)
    {
//       $comic->delete();
//        return response()->json([
//            'status' => true,
//            'message' => 'Delete success comics!'
//        ]);
        return response()->json([
            'message' => $comic->category,
        ]);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Category $category
     * @return \Illuminate\Http\Response
     */
    public function showCategory(Category $category)
    {
        return response()->json([
            'data' => $category->comics,

        ]);
    }

}
