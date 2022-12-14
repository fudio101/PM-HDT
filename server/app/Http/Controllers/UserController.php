<?php

namespace App\Http\Controllers;

use App\Http\Requests\StoreUserRequest;
use App\Http\Requests\UpdateUserRequest;
use App\Models\User;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Storage;
use Symfony\Component\HttpFoundation\Response as ResponseAlias;

class UserController extends Controller
{
    /**
     * Use middleware.
     *
     * @return void
     */
    public function __construct()
    {
        $this->middleware('auth:api');
    }

    /**
     * Display a listing of the resource.
     *
     * @return JsonResponse
     */
    public function index()
    {
        $users = User::all();
        return \response()->json(['data' => $users], ResponseAlias::HTTP_OK);
    }

    /**
     * Show the form for creating a new resource.
     *
     * @return Response
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     *
     * @param  StoreUserRequest  $request
     * @return JsonResponse
     */
    public function store(StoreUserRequest $request)
    {
        $data = $request->only([
            'name',
            'email',
            'password',
            'role_id'
        ]);

        $data['password'] = Hash::make($data['password']);
        $user = User::query()->create($data);

        // save image
        $image = $request->file('image');
        if ($image) {
            Storage::putFileAs('users', $image, $user->id.'.'.$image->extension());
        }

        return \response()->json(['data' => $user], ResponseAlias::HTTP_OK);
    }

    /**
     * Display the specified resource.
     *
     * @param  User  $user
     * @return JsonResponse
     */
    public function show(User $user)
    {
        return \response()->json(['data' => $user], ResponseAlias::HTTP_OK);
    }

    /**
     * Show the form for editing the specified resource.
     *
     * @param  User  $user
     * @return Response
     */
    public function edit(User $user)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     *
     * @param  UpdateUserRequest  $request
     * @param  User  $user
     * @return JsonResponse
     */
    public function update(UpdateUserRequest $request, User $user)
    {
        $data = $request->only([
            'name',
            'password',
            'role_id'
        ]);

        if (empty($data['password'])) {
            unset($data['password']);
        } else {
            $data['password'] = Hash::make($data['password']);
        }
        $result = $user->update($data);

        // save image
        $image = $request->file('image');
        if ($image) {
            if ($oldImage = $user->image) {
                Storage::delete($oldImage);
            }
            Storage::putFileAs('users', $image, $user->id.'.'.$image->extension());
        }

        if ($result) {
            return \response()->json(['message' => 'Successfully update', 'data' => $user], ResponseAlias::HTTP_OK);
        }

        return \response()->json(['message' => 'Fail'], ResponseAlias::HTTP_NOT_FOUND);

    }

    /**
     * Remove the specified resource from storage.
     *
     * @param  User  $user
     * @return JsonResponse
     */
    public function destroy(User $user)
    {
        $result = $user->delete();

        if ($result) {
            return \response()->json(['message' => 'Successfully delete'], ResponseAlias::HTTP_OK);
        }

        return \response()->json(['message' => 'Fail'], ResponseAlias::HTTP_NOT_FOUND);

    }
}
