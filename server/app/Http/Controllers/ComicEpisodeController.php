<?php

namespace App\Http\Controllers;

use App\Models\ComicEpisode;
use App\Http\Requests\StoreComicEpisodeRequest;
use App\Http\Requests\UpdateComicEpisodeRequest;

class ComicEpisodeController extends Controller
{
    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        //
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
     * @param  \App\Http\Requests\StoreComicEpisodeRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreComicEpisodeRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\ComicEpisode  $comicEpisode
     * @return \Illuminate\Http\Response
     */
    public function show(ComicEpisode $comicEpisode)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\ComicEpisode  $comicEpisode
     * @return \Illuminate\Http\Response
     */
    public function edit(ComicEpisode $comicEpisode)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateComicEpisodeRequest  $request
     * @param  \App\Models\ComicEpisode  $comicEpisode
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateComicEpisodeRequest $request, ComicEpisode $comicEpisode)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\ComicEpisode  $comicEpisode
     * @return \Illuminate\Http\Response
     */
    public function destroy(ComicEpisode $comicEpisode)
    {
        //
    }
}
