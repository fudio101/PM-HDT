<?php

namespace App\Http\Controllers;

use App\Models\Category;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Throwable;

class CategoryController extends Controller
{
    protected $category;

    /**
     * Display a listing of the resource.
     *
     * @return Response
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
            $this->category->create($request->only(['name']));
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
     * @param int $id
     * @return JsonResponse
     */
    public function update(Request $request, $id)
    {
        $category=$this->category->getCategory($id);
        if($category==null){
            return response()->json([
                'status' => false,
                'message' => 'Category dose not exit!',

            ]);
        }
        try {
            $validated = $request->validate([
                'name' => 'required|unique:categories|max:255',
            ]);
            $category->update($request->only(['name']));
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
     * @param int $id
     * @return JsonResponse
     */
    public function destroy($id)
    {
        if($this->category->deletes($id)){
            return response()->json([
                'status' => true,
                'message' => 'Delete successful category',
            ]);
        }
       return response()->json([

               'status' => false,
               'message' => 'Category does not exist',

       ]);
    }
}
