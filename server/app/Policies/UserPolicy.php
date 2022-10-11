<?php

namespace App\Policies;

use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class UserPolicy
{
    use HandlesAuthorization;

    /**
     * Determine whether the user can view any models.
     *
     * @param  User  $user
     * @return Response
     */
    public function viewAny(User $user)
    {
        return Response::allow();
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  User  $user
     * @param  User  $model
     * @return Response
     */
    public function view(User $user, User $model)
    {
        return Response::allow();
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  User  $user
     * @return Response
     */
    public function create(User $user)
    {
        return $user->role()->id === 1
            ? Response::allow()
            : Response::deny('You not a admin.');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  User  $user
     * @param  User  $model
     * @return Response
     */
    public function update(User $user, User $model)
    {
        return $user->role()->id === 1
            ? Response::allow()
            : Response::deny('You not a admin.');
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  User  $user
     * @param  User  $model
     * @return Response
     */
    public function delete(User $user, User $model)
    {
        return $user->role()->id === 1
            ? Response::allow()
            : Response::deny('You not a admin.');
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  User  $user
     * @param  User  $model
     * @return Response
     */
    public function restore(User $user, User $model)
    {
        return $user->role()->id === 1
            ? Response::allow()
            : Response::deny('You not a admin.');
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  User  $user
     * @param  User  $model
     * @return Response
     */
    public function forceDelete(User $user, User $model)
    {
        return $user->role()->id === 1
            ? Response::allow()
            : Response::deny('You not a admin.');
    }
}
