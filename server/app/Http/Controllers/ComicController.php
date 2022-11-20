<?php

namespace App\Http\Controllers;

use App\Models\Author;
use App\Models\Category;
use App\Models\ComicEpisode;
use App\Models\Comic;
use App\Models\ComicCategory;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;
use Throwable;

class ComicController extends Controller
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
            'data' => Comic::all(),
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
                'author_id' => 'required|exists:authors,id,deleted_at,NULL',
                'category_id' => 'required|array',
                'category_id.*' => 'exists:categories,id,deleted_at,NULL',

            ]);

            $comic = Comic::create($request->only([
                'name', 'published_date', 'author_id', 'description', 'status'
            ]));

            foreach ($request->category_id as $value) {
                ComicCategory::create([
                    'comic_id' => $comic->id,
                    'category_id' => $value,
                ]);
            };

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
        return response()->json([
            'data' => $comic,
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
                'author_id' => 'exists:authors,id,deleted_at,NULL',
                'status' => 'integer',
                'category_id' => 'array',
                'category_id.*' => 'exists:categories,id,deleted_at,NULL',
            ]);

            $oldSlug = $comic->slug;

            $comic->update($request->only(['name', 'published_date', 'author_id', 'status']));

            // update image location
            $newSlug = $comic->slug;
            if ($oldSlug !== $newSlug) {
                // comic image
                if ($oldImage = $comic->image) {
                    $tmp = explode('/', $oldImage);
                    $tmp[1] = $newSlug;
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
                };
            }

            // save image
            $image = $request->file('image');
            if ($image) {
                if ($oldImage = $comic->image) {
                    Storage::delete($oldImage);
                }
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
        $data = Comic::search($request->search)->get();
        return response()->json([
            'data' => $data
        ], ResponseAlias::HTTP_OK);
    }

    /**
     * @param  Comic  $comic
     * @param  $episode_number
     * @return JsonResponse
     */
    public function showImageEpisode(Comic $comic, $episode_number)
    {
        $comicEpisode = $comic->getEpisode($episode_number);

        if ($comicEpisode) {
            $images = Storage::allFiles("comics/".$comic->slug."/".$comicEpisode->episode_number);
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
