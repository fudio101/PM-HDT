<?php

namespace App\Policies;

use App\Models\SubscriptionPackage;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class SubscriptionPackagePolicy
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
     * @param  SubscriptionPackage  $subscriptionPackage
     * @return Response
     */
    public function view(User $user, SubscriptionPackage $subscriptionPackage)
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
        return ($user->role_id == 1 || $user->role_id == 2) ?
            Response::allow() :
            Response::deny('Bạn không có quyền thực hiện hành động này');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  User  $user
     * @param  SubscriptionPackage  $subscriptionPackage
     * @return Response
     */
    public function update(User $user, SubscriptionPackage $subscriptionPackage)
    {
        return ($user->role_id == 1 || $user->role_id == 2) ?
            Response::allow() :
            Response::deny('Bạn không có quyền thực hiện hành động này');
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  User  $user
     * @param  SubscriptionPackage  $subscriptionPackage
     * @return Response
     */
    public function delete(User $user, SubscriptionPackage $subscriptionPackage)
    {
        return ($user->role_id == 1 || $user->role_id == 2) ?
            Response::allow() :
            Response::deny('Bạn không có quyền thực hiện hành động này');
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  User  $user
     * @param  SubscriptionPackage  $subscriptionPackage
     * @return Response
     */
    public function restore(User $user, SubscriptionPackage $subscriptionPackage)
    {
        return ($user->role_id == 1 || $user->role_id == 2) ?
            Response::allow() :
            Response::deny('Bạn không có quyền thực hiện hành động này');
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  User  $user
     * @param  SubscriptionPackage  $subscriptionPackage
     * @return Response
     */
    public function forceDelete(User $user, SubscriptionPackage $subscriptionPackage)
    {
        return ($user->role_id == 1 || $user->role_id == 2) ?
            Response::allow() :
            Response::deny('Bạn không có quyền thực hiện hành động này');
    }
}
