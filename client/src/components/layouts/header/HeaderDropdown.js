import React from "react";
import { Fragment } from "react";
import { Menu, Transition } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useDispatch } from "react-redux";
import { logout } from "../../../redux/reducers/userSlice";
import UserInfoPopUp from "../../modal/UserInfoPopUp";
import { Link } from "react-router-dom";

function classNames(...classes) {
    return classes.filter(Boolean).join(" ");
}

export default function HeaderDropdown({ className, name, userInfo }) {
    const dispatch = useDispatch();
    const [isVisiblePopUp, setVisiblePopUp] = React.useState(false);

    React.useEffect(() => {
        if (isVisiblePopUp) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
    }, [isVisiblePopUp]);

    return (
        <>
            <Menu
                as="div"
                className={`relative inline-block text-left ${className}`}
            >
                <div>
                    <Menu.Button className="inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-bold text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 focus:ring-offset-gray-100">
                        Chào {name}
                        <ChevronDownIcon
                            className="-mr-1 ml-2 h-5 w-5"
                            aria-hidden="true"
                        />
                    </Menu.Button>
                </div>

                <Transition
                    as={Fragment}
                    enter="transition ease-out duration-100"
                    enterFrom="transform opacity-0 scale-95"
                    enterTo="transform opacity-100 scale-100"
                    leave="transition ease-in duration-75"
                    leaveFrom="transform opacity-100 scale-100"
                    leaveTo="transform opacity-0 scale-95"
                >
                    <Menu.Items className="absolute right-0 z-10 mt-2 w-fit origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                        <div className="py-1">
                            <Menu.Item>
                                {() => (
                                    <div
                                        className={classNames(
                                            "text-gray-900 block px-4 py-2 text-sm font-bold text-center"
                                        )}
                                    >
                                        Thời hạn còn lại:{" "}
                                        {userInfo.registration_expires_on}
                                    </div>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <Link
                                        to={"/subscription"}
                                        className={classNames(
                                            active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700",
                                            "block px-4 py-2 text-sm w-full text-center"
                                        )}
                                    >
                                        Đăng ký gói
                                    </Link>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        onClick={() => {
                                            setVisiblePopUp(!isVisiblePopUp);
                                        }}
                                        className={classNames(
                                            active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700",
                                            "block px-4 py-2 text-sm w-full"
                                        )}
                                    >
                                        Thông tin tài khoản
                                    </button>
                                )}
                            </Menu.Item>
                            <Menu.Item>
                                {({ active }) => (
                                    <button
                                        className={classNames(
                                            active
                                                ? "bg-gray-100 text-gray-900"
                                                : "text-gray-700",
                                            "block px-4 py-2 text-sm w-full"
                                        )}
                                        onClick={() => dispatch(logout())}
                                    >
                                        Đăng xuất
                                    </button>
                                )}
                            </Menu.Item>
                        </div>
                    </Menu.Items>
                </Transition>
            </Menu>

            <UserInfoPopUp
                isVisiblePopUp={isVisiblePopUp}
                setVisiblePopUp={setVisiblePopUp}
            />
        </>
    );
}
