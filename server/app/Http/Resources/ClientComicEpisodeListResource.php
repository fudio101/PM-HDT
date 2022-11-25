<?php

namespace App\Http\Resources;

use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use Illuminate\Support\Carbon;

class ClientComicEpisodeListResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array
     */
    public function toArray($request)
    {
//        return parent::toArray($request);
        return [
            'comic_id' => $this->comic_id,
            'episode_number' => $this->episode_number,
            'published_date' => Carbon::make($this->created_at)->format('d/m/Y'),
        ];
    }
}
