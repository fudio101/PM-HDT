<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;
use JsonSerializable as JsonSerializableAlias;

class AdminComicInforResource extends JsonResource
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
            'categories' => $this->categories,
            'author' => $this->author,
            'country' => $this->country,
            'episodes' => AdminComicEpisodeListResource::collection($this->episodes->sortByDesc('created_at')),
        ]);
    }
}
