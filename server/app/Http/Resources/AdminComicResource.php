<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable as JsonSerializableAlias;

class AdminComicResource extends JsonResource
{
    /**
     * Transform the resource into an array.
     *
     * @param  Request  $request
     * @return array|Arrayable|JsonSerializableAlias
     */
    public function toArray($request)
    {
        $data = parent::toArray($request);

        return array_merge($data, [
            'author' => $this->author,
            'episodes' => ComicEpisodeListResource::collection($this->episodes->sortByDesc('created_at')),
        ]);
    }
}
