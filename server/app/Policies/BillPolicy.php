<?php

namespace App\Policies;

use App\Models\Bill;
use App\Models\User;
use Illuminate\Auth\Access\HandlesAuthorization;
use Illuminate\Auth\Access\Response;

class BillPolicy
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
        return ($user->getKey() === 1 || $user->getKey() === 2) ?
            Response::allow() :
            Response::deny('Bạn không có quyền thực hiện hành động này');
    }

    /**
     * Determine whether the user can view the model.
     *
     * @param  User  $user
     * @param  Bill  $bill
     * @return Response
     */
    public function view(User $user, Bill $bill)
    {
        return ($user->getKey() === 1 || $user->getKey() === 2) ?
            Response::allow() :
            Response::deny('Bạn không có quyền thực hiện hành động này');
    }

    /**
     * Determine whether the user can create models.
     *
     * @param  User  $user
     * @return Response
     */
    public function create(User $user)
    {
        return ($user->getKey() === 1 || $user->getKey() === 2) ?
            Response::allow() :
            Response::deny('Bạn không có quyền thực hiện hành động này');
    }

    /**
     * Determine whether the user can update the model.
     *
     * @param  User  $user
     * @param  Bill  $bill
     * @return Response
     */
    public function update(User $user, Bill $bill)
    {
        return ($user->getKey() === 1 || $user->getKey() === 2) ?
            Response::allow() :
            Response::deny('Bạn không có quyền thực hiện hành động này');
    }

    /**
     * Determine whether the user can delete the model.
     *
     * @param  User  $user
     * @param  Bill  $bill
     * @return Response
     */
    public function delete(User $user, Bill $bill)
    {
        return ($user->getKey() === 1 || $user->getKey() === 2) ?
            Response::allow() :
            Response::deny('Bạn không có quyền thực hiện hành động này');
    }

    /**
     * Determine whether the user can restore the model.
     *
     * @param  User  $user
     * @param  Bill  $bill
     * @return Response
     */
    public function restore(User $user, Bill $bill)
    {
        return ($user->getKey() === 1 || $user->getKey() === 2) ?
            Response::allow() :
            Response::deny('Bạn không có quyền thực hiện hành động này');
    }

    /**
     * Determine whether the user can permanently delete the model.
     *
     * @param  User  $user
     * @param  Bill  $bill
     * @return Response
     */
    public function forceDelete(User $user, Bill $bill)
    {
        return ($user->getKey() === 1 || $user->getKey() === 2) ?
            Response::allow() :
            Response::deny('Bạn không có quyền thực hiện hành động này');
    }
}
