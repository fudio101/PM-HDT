import { unwrapResult } from "@reduxjs/toolkit";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";
import {
    changePassword,
    changeUserInfo,
    getUserInfo,
} from "../../redux/reducers/userSlice";
import { userInfoSelector } from "../../redux/selectors";

import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";

function UserInfoPopUp({ onClose, setVisiblePopUp, isVisiblePopUp }) {
    const [isChangePassword, setChangePassword] = useState(false);
    const dispatch = useDispatch();
    const userInfo = useSelector(userInfoSelector);
    const {
        register,
        formState: { errors },
        handleSubmit,
        watch,
        resetField,
    } = useForm({
        defaultValues: {
            name: userInfo.name,
            old_password: "",
            new_password: "",
            new_password_confirmation: "",
        },
    });

    const submitFormHandle = async () => {
        try {
            if (isChangePassword) {
                unwrapResult(
                    await dispatch(
                        changePassword({
                            old_password: watch("old_password"),
                            new_password: watch("new_password"),
                            new_password_confirmation: watch(
                                "new_password_confirmation"
                            ),
                        })
                    )
                );
                toast("Mật Khẩu Đã Được Thay Đổi", {
                    type: "success",
                });

                setVisiblePopUp(false);
                resetField("old_password");
                resetField("new_password");
                resetField("new_password_confirmation");
            } else {
                unwrapResult(
                    await dispatch(changeUserInfo({ name: watch("name") }))
                );

                await dispatch(getUserInfo());

                toast("Tên Người Dùng Đã Được Thay Đổi", {
                    type: "success",
                });

                setVisiblePopUp(false);
                resetField("name");
            }

            // navigate(from, { replace: true });
        } catch (error) {
            toast(error, {
                type: "error",
            });
        }
    };

    return (
        <>
            <div className={`${!isVisiblePopUp ? "hidden" : ""}`}>
                <div
                    className={`fixed top-0 left-0 right-0 z-50 w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full bg-black opacity-30 mx-0`}
                ></div>

                <div
                    aria-hidden="true"
                    className={`fixed flex h-screen justify-center items-center z-50  w-full p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-modal md:h-full `}
                >
                    <div className="relative w-full h-full max-w-md md:h-auto">
                        <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                            <button
                                onClick={() => {
                                    setVisiblePopUp(false);
                                    resetField("name");
                                    resetField("old_password");
                                    resetField("new_password");
                                    resetField("new_password_confirmation");
                                }}
                                type="button"
                                className="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white"
                                data-modal-toggle="authentication-modal"
                            >
                                <svg
                                    aria-hidden="true"
                                    className="w-5 h-5"
                                    fill="currentColor"
                                    viewBox="0 0 20 20"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"></path>
                                </svg>
                            </button>
                            <div className="px-6 py-6 lg:px-8">
                                <div className="text-center mb-4 text-xl w-full font-semibold text-gray-900 dark:text-white">
                                    {isChangePassword
                                        ? "Đổi Mật Khẩu"
                                        : "Chỉnh Sửa Thông Tin"}
                                </div>
                                <form
                                    className="space-y-6"
                                    onSubmit={handleSubmit(submitFormHandle)}
                                >
                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Email
                                        </label>
                                        <input
                                            disabled
                                            value={userInfo?.email}
                                            type="email"
                                            name="email"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                        />
                                    </div>

                                    {!isChangePassword ? (
                                        <div>
                                            <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                Tên
                                            </label>
                                            <input
                                                {...register("name")}
                                                type="text"
                                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                required
                                            />
                                        </div>
                                    ) : (
                                        <>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Mật Khẩu Cũ
                                                </label>
                                                <input
                                                    {...register(
                                                        "old_password",
                                                        {
                                                            required:
                                                                "Mật Khẩu là bắt buộc",
                                                            pattern: {
                                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                                                                message:
                                                                    "Mật khẩu phải chứa ít nhất 1 chữ số, 1 ký tự in hoa, 1 ký tự thường và dài ít nhất 8 ký tự",
                                                            },
                                                        }
                                                    )}
                                                    type="password"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    required
                                                />
                                                {errors.old_password && (
                                                    <p className="mt-2 text-pink-600 text-sm">
                                                        {
                                                            errors.old_password
                                                                .message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Mật Khẩu Mới
                                                </label>
                                                <input
                                                    {...register(
                                                        "new_password",
                                                        {
                                                            required:
                                                                "Mật Khẩu là bắt buộc",
                                                            pattern: {
                                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                                                                message:
                                                                    "Mật khẩu phải chứa ít nhất 1 chữ số, 1 ký tự in hoa, 1 ký tự thường và dài ít nhất 8 ký tự",
                                                            },
                                                        }
                                                    )}
                                                    type="password"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    required
                                                />
                                                {errors.new_password && (
                                                    <p className="mt-2 text-pink-600 text-sm">
                                                        {
                                                            errors.new_password
                                                                .message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                            <div>
                                                <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                                    Xác Nhận Mật Khẩu
                                                </label>
                                                <input
                                                    {...register(
                                                        "new_password_confirmation",
                                                        {
                                                            required:
                                                                "Mật Khẩu là bắt buộc",
                                                            pattern: {
                                                                value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
                                                                message:
                                                                    "Mật khẩu phải chứa ít nhất 1 chữ số, 1 ký tự in hoa, 1 ký tự thường và dài ít nhất 8 ký tự",
                                                            },
                                                        }
                                                    )}
                                                    type="password"
                                                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white"
                                                    required
                                                />
                                                {errors.new_password_confirmation && (
                                                    <p className="mt-2 text-pink-600 text-sm">
                                                        {
                                                            errors
                                                                .new_password_confirmation
                                                                .message
                                                        }
                                                    </p>
                                                )}
                                            </div>
                                        </>
                                    )}

                                    <div className="flex justify-between">
                                        <div
                                            className="block text-base text-center w-full cursor-pointer font-semibold opacity-90 text-blue-700 hover:underline dark:text-blue-300 "
                                            onClick={() =>
                                                setChangePassword(
                                                    !isChangePassword
                                                )
                                            }
                                        >
                                            {isChangePassword
                                                ? "Chỉnh Sửa Thông Tin"
                                                : "Đổi Mật Khẩu"}
                                        </div>
                                    </div>
                                    <button
                                        type="submit"
                                        className="w-full text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                    >
                                        {!isChangePassword
                                            ? "Xác Nhận"
                                            : "Đổi Mật Khẩu"}
                                    </button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <ToastContainer position="top-right" newestOnTop />
        </>
    );
}

export default UserInfoPopUp;
