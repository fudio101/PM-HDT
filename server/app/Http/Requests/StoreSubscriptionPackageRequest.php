<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSubscriptionPackageRequest extends FormRequest
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
            'name' => 'required|string|min:3|max:50',
            'price' => 'required|numeric|gt:0',
            'duration' => 'required|integer|gt:0',
            'duration_text' => 'required|string|min:3|max:50',
            'description' => 'string',
            'image' => 'image'
        ];
    }
}
