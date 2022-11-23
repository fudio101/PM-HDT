<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UpdateComicEpisodeRequest extends FormRequest
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
        $comicId = $this->route('comic_episode')->comic_id;
        return [
//            'comic_id' => 'integer|exists:comics,id',
            'episode_number' => [
                'integer',
                'gt:0',
                Rule::unique('comic_episodes')->where(function ($query) use ($episodeNumber, $comicId) {
                    return $query->where([
                        ["episode_number", "=", $episodeNumber],
                        ["comic_id", "=", $comicId]
                    ]);
                })->ignore($this->route('comic_episode')->id),
            ],
            'images.*' => 'image',
            'imageOrder' => 'array',
            'imageOrder.*' => 'string',
//            'published_date' => 'date',
        ];
    }
}
