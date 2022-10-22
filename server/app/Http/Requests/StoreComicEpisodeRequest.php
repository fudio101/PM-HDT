<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

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
        return [
            'comic_id'=>'required|integer|exists:comics,id',
            'episode_number'=>'required|integer|gt:0|unique:comic_episodes,episode_number',
            'published_date'=>'required|date',
        ];
    }
}
