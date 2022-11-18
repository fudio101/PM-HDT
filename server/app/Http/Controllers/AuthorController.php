<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Http\Requests\StoreAuthorRequest;
use App\Http\Requests\UpdateAuthorRequest;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class AuthorController extends Controller
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
        $authors = Author::all();
        return \response()->json(['data' => $authors], ResponseAlias::HTTP_OK);
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
     * @param  StoreAuthorRequest  $request
     * @return JsonResponse
     */
    public function store(StoreAuthorRequest $request)
    {
        $author = Author::query()->create($request->only(['name']));

        // save image
        $image = $request->file('image');
        Storage::putFileAs('authors', $image, $author->id.'.'.$image->extension());

        return \response()->json(['data' => $author], ResponseAlias::HTTP_CREATED);
    }

    /**
     * Display the specified resource.
     *
     * @param  Author  $author
     * @return JsonResponse
     */
    public function show(Author $author)
    {
        return \response()->json(['data' => $author], ResponseAlias::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  Author  $author
     * @return Response
     */
    public function edit(Author $author)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateAuthorRequest  $request
     * @param  Author  $author
     * @return JsonResponse
     */
    public function update(UpdateAuthorRequest $request, Author $author)
    {
        $data = $request->only('name');
        $image = $request->file('image');
        if ($image) {
            if ($oldImage = $author->image) {
                Storage::delete($oldImage);
            }
            Storage::putFileAs('authors', $image, $author->id.'.'.$image->extension());
        }

        $result = $author->update($data);
        if ($result) {
            return \response()->json(['message' => 'Successfully update', 'data' => $author], ResponseAlias::HTTP_OK);
        }

        return \response()->json(['message' => 'Fail'], ResponseAlias::HTTP_BAD_REQUEST);
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  Author  $author
     * @return JsonResponse
     */
    public function destroy(Author $author)
    {
        if ($author->comics()->count() > 0) {
            return \response()->json(['message' => 'The author has comics that has not been deleted'],
                ResponseAlias::HTTP_NOT_FOUND);
        }
        if (Storage::exists($author->image)) {
            Storage::delete($author->image);
        }
        $result = $author->delete();

        if ($result) {
            return \response()->json(['message' => 'Successfully delete'], ResponseAlias::HTTP_OK);
        }

        return \response()->json(['message' => 'Fail'], ResponseAlias::HTTP_NOT_FOUND);
    }
}
