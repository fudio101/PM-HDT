<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Throwable;

class CategoryController extends Controller
{
    protected Category $category;

    /**
     * Display a listing of the resource.
     *
     * @return void
     */
    public function __construct()
    {
        $this->category = new Category;
    }

    public function index()
    {
        return response()->json([
            'status' => true,
            'list' => $this->category->getAll()
        ]);
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
            $this->category->create($validated);
            return response()->json([
                'status' => true,
                'message' => 'Add successful category',
            ]);

        } catch (Throwable $err) {
            return response()->json([
                'status' => false,
                'message' => 'Add error category',
                'error' => $err->getMessage(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param Category $category
     * @return JsonResponse
     */
    public function show(Category $category)
    {
        return response()->json([
            'status'=>true,
            'category'=>$category,
        ]);
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param Category $category
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
                'status' => true,
                'message' => 'Update successful category',
            ]);

        } catch (Throwable $err) {
            return response()->json([
                'status' => false,
                'message' => 'Update error category',
                'error' => $err->getMessage(),
            ]);
        }
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param Category $category
     * @return JsonResponse
     **/
    public function destroy(Category $category)
    {
        if($category->delete()){
            return response()->json([
                'status' => true,
                'message' => 'Delete successful category',
            ]);
        }

    }
}
