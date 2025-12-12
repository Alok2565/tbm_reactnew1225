<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class HomeSliderRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true; // Allow the request to proceed
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'banner_title' => 'required|string|max:255',
            'banner_slug'  => 'required|string|max:255|unique:home_sliders,banner_slug',
            'image' =>   'nullable|mimes:png,jpg,jpeg|max:2048',
        ];
    }
}
