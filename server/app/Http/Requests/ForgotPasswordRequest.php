<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ForgotPasswordRequest extends FormRequest
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
            'email' => [
                'required',
                'email',
                'exists:users'
            ]
        ];
    }

    public function messages()
    {
        return array_merge(parent::messages(), [
            'email.email' => 'Email không hợp lệ',
            'email.exists' => 'Email không tồn tại'
        ]);
    }
}
