<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\Country;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class CountryController extends Controller
{
    public function __construct()
    {
        $this->middleware('auth:api', ['except' => ['index']]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        return response()->json([
            'data' => Country::all()
        ], ResponseAlias::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function create()
    {
        //
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
                'name' => 'required|unique:countries|max:255',
            ]);
            $country = Country::create($validated);
            return response()->json([
                'message' => 'Add successful country',
                'data' => $country,
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
     * @param Country $country
     * @return \Illuminate\Http\Response
     */
    public function show(Country $country)
    {
        return response()->json([
            'data' => $country,
        ], ResponseAlias:: HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param int $id
     * @return \Illuminate\Http\Response
     */
    public function edit($id)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param \Illuminate\Http\Request $request
     * @param Country $country
     * @return \Illuminate\Http\Response
     */
    public function update(Request $request, Country $country)
    {
        try {
            $validated = $request->validate([
                'name' => 'unique:countries|max:255',
            ]);
            $country->update($validated);
            return response()->json([
                'message' => 'Update successful country!',
                'data' => $country
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
     * @param Country $country
     * @return \Illuminate\Http\Response
     */
    public function destroy(Country $country)
    {
        $listComics = $country->comics;

        if (count($listComics) >= 1) {
            return response()->json([
                'message' => 'The country contains comics that cannot be deleted!',
            ], ResponseAlias::HTTP_BAD_REQUEST);
        }

        if ($country->delete()) {
            return response()->json([
                'message' => 'Delete successful country!',
            ], ResponseAlias::HTTP_OK);
        }

        return response()->json([
            'message' => 'Get error when delete country!',
        ], ResponseAlias::HTTP_BAD_REQUEST);
    }

}
