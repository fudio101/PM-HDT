<?php

namespace App\Http\Controllers;

use App\Http\Resources\AdminComicInforResource;
use App\Http\Resources\AdminComicResource;
use App\Models\Comic;
use App\Models\ComicCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Throwable;
use function response;

class ComicController extends Controller
{

    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index',]]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $data = AdminComicResource::collection(Comic::all());
        return response()->json([
            'data' => $data,
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
                'image' => 'required|image',
                'published_date' => 'required|date',
                'description' => 'string',
                'author_id' => 'required|exists:authors,id,deleted_at,NULL',
                'category_id' => 'required|array',
                'category_id.*' => 'exists:categories,id,deleted_at,NULL',
                'country_id' => 'required|exists:countries,id',
                'status' => 'integer',
            ]);

            $comic = Comic::create($request->only([
                'name', 'published_date', 'author_id', 'description', 'status', 'country_id',
            ]));

            foreach ($request->category_id as $value) {
                ComicCategory::create([
                    'comic_id' => $comic->id,
                    'category_id' => $value,
                ]);
            }

            // save image
            $image = $request->file('image');
            Storage::putFileAs('comics', $image, $comic->slug.'.'.$image->extension());

            return response()->json([
                'message' => 'Add success comics!',
                'data' => $comic
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
     * @param  Comic  $comic
     * @return JsonResponse
     */
    public function show(Comic $comic)
    {
        $data = new AdminComicInforResource($comic);
        return response()->json([
            'data' => $data,
        ]);
    }


    /**
     * Update the specified resource in storage.
     *
     * @param  Request  $request
     * @param  Comic  $comic
     * @return JsonResponse
     */
    public function update(Request $request, Comic $comic)
    {
        try {
            $validated = $request->validate([
                'name' => 'max:255',
                'image' => 'image',
                'published_date' => 'date',
                'description' => 'string',
                'author_id' => 'exists:authors,id,deleted_at,NULL',
                'country_id' => 'exists:countries,id',
                'status' => 'integer',
                'category_id' => 'array',
                'category_id.*' => 'exists:categories,id,deleted_at,NULL',
            ]);

            $oldSlug = $comic->slug;
            $oldImage = $comic->image;

            $comic->update($request->only([
                'name', 'published_date', 'author_id', 'status', 'description', 'country_id'
            ]));

            // update image location
            $newSlug = $comic->slug;
            if ($oldSlug !== $newSlug) {
                // comic image
                if ($oldImage) {
                    $tmp = explode('/', $oldImage);
                    $tmp1 = explode('.', $tmp[1]);
                    $tmp1[0] = $newSlug;
                    $tmp[1] = implode('.', $tmp1);
                    $tmp = implode("/", $tmp);
                    Storage::move($oldImage, $tmp);
                }

                // episode image
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
                ComicCategory::deletes($comic->id);
                foreach ($validated['category_id'] as $value) {
                    ComicCategory::create([
                        'comic_id' => $comic->id,
                        'category_id' => $value,
                    ]);
                }
            }

            // save image
            $image = $request->file('image');
            if ($image) {
                Storage::putFileAs('comics', $image, $newSlug.'.'.$image->extension());
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
     * @param  Comic  $comic
     * @return JsonResponse
     */
    public function destroy(Comic $comic)
    {
        $episodes = $comic->episodes();

        Storage::deleteDirectory("comics/".$comic->slug);

        $episodes->delete();

        $comic->delete();
        return response()->json([
            'message' => 'Delete success comics!'
        ], ResponseAlias::HTTP_OK);
    }
}
