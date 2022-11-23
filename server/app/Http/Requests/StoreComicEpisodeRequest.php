<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class StoreComicEpisodeRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     *
     * @return bool
     */
    public function authorize()
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, mixed>
     */
    public function rules()
    {
        $episodeNumber = $this->input('episode_number');
        $comicId = $this->input('comic_id');
        return [
            'comic_id' => 'required|integer|exists:comics,id',
            'episode_number' => [
                'required',
                'numeric',
                'gt:0',
                Rule::unique('comic_episodes')->where(function ($query) use ($episodeNumber, $comicId) {
                    return $query->where([
                        ["episode_number", "=", $episodeNumber],
                        ["comic_id", "=", $comicId]
                    ]);
                }),
            ],
//            'images' => 'required|array',
            'images.*' => 'image',
            'imageOrder' => 'required|array',
            'imageOrder.*' => 'string',
//            'published_date' => 'required|date',
        ];
    }
}
