<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Password;

class UpdateUserRequest extends FormRequest
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
            'name' => 'string',
//            'image' => 'image',
//            'email' => 'email|unique:users,email,'.$this->user->id,
            'password' => [
                'confirmed',
                Password::min(8)->mixedCase()
            ],
            'role_id' => 'exists:roles,id|integer',
        ];
    }
}
