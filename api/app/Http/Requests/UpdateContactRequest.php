<?php

namespace App\Http\Requests;

use App\Rules\LandlineNumber;
use App\Rules\PhoneNumber;
use Illuminate\Foundation\Http\FormRequest;

class UpdateContactRequest extends FormRequest
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
            'name' => 'required',
            'email' => 'required|email',
            'phone' => ['required', new PhoneNumber],
            'landline' => ['sometimes', 'nullable', new LandlineNumber],
            'address' => 'sometimes|nullable|max:120',
            'district' => 'sometimes|nullable|max:20',
            'state' => 'sometimes|nullable|max:20',
            'avatar' => 'sometimes|nullable|url',
        ];
    }
}
