<?php

namespace App\Http\Resources;

use Illuminate\Contracts\Support\Arrayable;
use Illuminate\Http\Request;
use Illuminate\Http\Resources\Json\JsonResource;

class ClientComicInforResource extends JsonResource
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
            'name' => $this->name,
            'slug' => $this->slug,
            'like' => $this->like,
            'num_of_episodes' => $this->num_of_episodes,
            'description' => $this->description,
            'published_date' => $this->published_date,
            'status' => $this->status,
            'updated_time_diff' => $this->updated_time_diff,
            'image_url' => $this->image_url,
            'author' => $this->author,
            'categories' => $this->categories,
            'episodes' => ClientComicEpisodeListResource::collection($this->episodes->sortByDesc('created_at')),
        ];
    }
}
