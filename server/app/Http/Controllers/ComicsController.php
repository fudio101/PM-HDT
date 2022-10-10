<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Category;
use App\Models\Comics;
use App\Models\ComicsCategory;
use Illuminate\Http\Request;

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
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $newList=$this->comics->getAll()->map(function ($value,$index){
            $value->author_id_text=$value->author->name;
           return $value;
        });
        return  response()->json([
            'status'=>true,
            'list'=>$newList,
        ]);
    }


    /**
     * Store a newly created resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @return \Illuminate\Http\Response
     */
    public function store(Request $request)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|max:255',
                'published_date' => 'required',
                'author_id' => 'required',
                'category_id'=>'required|array',
                'category_id.*'=>'exists:categories,id',

            ]);
            $comics=$this->comics->create($request->only(['name','published_date','author_id','description','status']));
            foreach ($request->category_id as $value) {
                $this->comics_category->create([
                    'comic_id'=>$comics->id,
                    'category_id'=>$value,
                ]);
            };
            return response()->json([
                'status'=>true,
                'message'=>'Add success comics!',
               ]);
        } catch (Throwable $err) {
            return response()->json([
                'status'=>false,
                'message'=>'Add error comics!',
                'error'=>$err->getMessage(),
            ]);
        }
    }

    /**
     * Display the specified resource.
     *
     * @param Comics $id
     * @return \Illuminate\Http\Response
     */
    public function show(Comics $comic)
    {
       return response()->json([
           'status'=>$comic->author_id_text,
           'comics'=>$comic,
       ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Comics $comic
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Comics $comic)
    {
        try {
            $validated = $request->validate([
                'name' => 'required|max:255',
                'published_date' => 'required',
                'author_id' => 'required',
                'category_id'=>'required',
            ]);
            $comics=$this->comics->update($request->only(['name','published_date','author_id','description','status']));
            foreach ($request->category_id as $value) {
                $this->comics_category->update([
                    'comic_id'=>$comics->id,
                    'category_id'=>$value,
                ]);
            };
            return response()->json([
                'status'=>true,
                'message'=>'Add success comics!',

            ]);
        } catch (Throwable $err) {
            return response()->json([
                'status'=>false,
                'message'=>'Add error comics!',
                'error'=>$err->getMessage(),
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
        $comic->delete();
        return response()->json([
            'status'=>true,
        'message'=>'Delete success comics!'
        ]);
    }
}
