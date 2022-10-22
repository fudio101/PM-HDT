<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Throwable;

class CategoryController extends Controller
{

    /**
     * Display a listing of the resource.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index']]);
    }

    public function index()
    {
        return response()->json([
            'data' => Category::all()
        ], ResponseAlias::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return JsonResponse
     */


    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|unique:categories|max:255',
            ]);
            Category::create($validated);
            return response()->json([
                'message' => 'Add successful category',
            ], ResponseAlias::HTTP_CREATED);

        } catch (Throwable $err) {
            return response()->json([
                'message' => $err->getMessage(),
            ], ResponseAlias::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param  Category  $category
     * @return JsonResponse
     */
    public function show(Category $category)
    {
        return response()->json([
            'data' => $category,
        ], ResponseAlias:: HTTP_OK);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  Category  $category
     * @return JsonResponse
     **/
    public function update(Request $request, Category $category)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|unique:categories|max:255',
            ]);
            $category->update($validated);
            return response()->json([
                'message' => 'Update successful category!',
            ], ResponseAlias::HTTP_OK);

        } catch (Throwable $err) {
            return response()->json([
                'message' => $err->getMessage(),
            ], ResponseAlias::HTTP_BAD_REQUEST);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Category  $category
     * @return JsonResponse
     **/
    public function destroy(Category $category)
    {
        $listComics = $category->comics;

        if (count($listComics) >= 1) {
            return response()->json([
                'message' => 'The category contains comics that cannot be deleted!',
            ], ResponseAlias::HTTP_BAD_REQUEST);
        }

        if ($category->delete()) {
            return response()->json([
                'message' => 'Delete successful category!',
            ], ResponseAlias::HTTP_OK);
        }

        return response()->json([
            'message' => 'Get error when delete category!',
        ], ResponseAlias::HTTP_BAD_REQUEST);
    }
}
