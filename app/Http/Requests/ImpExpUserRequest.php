<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class ImpExpUserRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'iec_code' => 'required',
            'name' => 'required',
            'email' => 'required',
            'address' => 'required',
            'address2' => 'required',
            'department' => 'required',
            'designation' => 'required',
            'state' => 'required',
            'city' => 'required',
            'pincode' => 'required',
            'mobile_number' => 'required',

        ];
    }
}
