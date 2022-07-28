<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreContactRequest;
use App\Http\Requests\UpdateContactRequest;
use App\Models\Contact;

class ContactController extends Controller
{
    public function index()
    {
        $search = request('search') ?? '';
        $orderBy = request('sortBy') ?? 'name';
        $orderDir = request('sortOrder') ?? 'asc';

        $contacts = Contact::search($search)->get();

        if($orderDir == 'asc') {
            return $contacts->sortBy($orderBy)->values();
        }

        if($orderDir == 'desc') {
            return $contacts->sortByDesc($orderBy)->values();
        }

        return $contacts;
    }

    public function store(StoreContactRequest $request)
    {
        return Contact::create($request->all());
    }

    public function show(Contact $contact)
    {
        return $contact;
    }

    public function update(UpdateContactRequest $request, Contact $contact)
    {
        $contact->update($request->all());
        return $contact;
    }

    public function destroy(Contact $contact)
    {
        $contact->delete();
        return response()->json(null, 204);
    }
}
