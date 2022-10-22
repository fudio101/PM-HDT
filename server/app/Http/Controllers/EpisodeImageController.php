<?php

namespace App\Http\Controllers;

use App\Models\EpisodeImage;
use App\Http\Requests\StoreEpisodeImageRequest;
use App\Http\Requests\UpdateEpisodeImageRequest;

class EpisodeImageController extends Controller
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
     * @param  \App\Http\Requests\StoreEpisodeImageRequest  $request
     * @return \Illuminate\Http\Response
     */
    public function store(StoreEpisodeImageRequest $request)
    {
        //
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Models\EpisodeImage  $episodeImage
     * @return \Illuminate\Http\Response
     */
    public function show(EpisodeImage $episodeImage)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  \App\Models\EpisodeImage  $episodeImage
     * @return \Illuminate\Http\Response
     */
    public function edit(EpisodeImage $episodeImage)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  \App\Http\Requests\UpdateEpisodeImageRequest  $request
     * @param  \App\Models\EpisodeImage  $episodeImage
     * @return \Illuminate\Http\Response
     */
    public function update(UpdateEpisodeImageRequest $request, EpisodeImage $episodeImage)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  \App\Models\EpisodeImage  $episodeImage
     * @return \Illuminate\Http\Response
     */
    public function destroy(EpisodeImage $episodeImage)
    {
        //
    }
}
