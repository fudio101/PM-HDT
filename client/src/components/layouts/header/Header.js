import React, { useEffect, useState } from "react";
import Search from "./Search";
import classes from "./Header.module.css";
import logo from "../logo.png";
import { Link, useLocation } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { userSliceInfoSelector } from "../../../redux/selectors";
import HeaderDropdown from "./HeaderDropdown";
import { getUserInfo, logout } from "../../../redux/reducers/userSlice";

function Header({ isVisible }) {
    const [navbar, setNavbar] = useState(false);
    const userInfo = useSelector(userSliceInfoSelector);
    const dispatch = useDispatch();
    let location = useLocation();

    useEffect(() => {
        dispatch(getUserInfo());
    }, [dispatch, location]);

    return (
        <nav
            className={`w-full bg-indigo-400 shadow ${
                isVisible ? "block" : "hidden"
            }`}
        >
            <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                <div>
                    <div className="flex items-center justify-between md:block">
                        <Link to={"/"}>
                            <h2 className="text-2xl font-bold text-white">
                                <img
                                    className={classes.logo}
                                    src={logo}
                                    alt="Logo"
                                />
                            </h2>
                        </Link>
                        <div className="md:hidden">
                            <button
                                className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                onClick={() => setNavbar(!navbar)}
                            >
                                {navbar ? (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                ) : (
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="w-6 h-6 text-white"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth={2}
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M4 6h16M4 12h16M4 18h16"
                                        />
                                    </svg>
                                )}
                            </button>
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        className={`flex-1 justify-self-center pb-3 mt-8 md:pb-0 md:mt-0 ${
                            navbar ? "block" : "hidden"
                        }`}
                    >
                        <div className="mt-3 space-y-2 lg:hidden md:inline-block">
                            <Search className="inline-block w-full px-4 py-2" />
                            {!userInfo ? (
                                <>
                                    <Link
                                        to={"/login"}
                                        state={{ from: location }}
                                        className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                                    >
                                        ????ng Nh???p
                                    </Link>
                                    <Link
                                        to={"/signup"}
                                        state={{ from: location }}
                                        className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                                    >
                                        ????ng K??
                                    </Link>
                                </>
                            ) : (
                                <>
                                    <div className="inline-block w-full px-4 py-2 text-center text-white rounded-md font-bold">
                                        Ch??o {userInfo.name}
                                    </div>
                                    <button className="inline-block w-full px-4 py-2 text-center text-white bg-gray-600 rounded-md shadow hover:bg-gray-800">
                                        Th??ng tin t??i kho???n
                                    </button>
                                    <button
                                        onClick={() => dispatch(logout())}
                                        className="inline-block w-full px-4 py-2 text-center text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                                    >
                                        ????ng xu???t
                                    </button>
                                </>
                            )}
                        </div>
                    </div>
                </div>
                <div className="hidden space-x-2 md:inline-block">
                    <Search className="px-4 py-2 inline-block" />
                    {!userInfo ? (
                        <>
                            <Link
                                to={"/login"}
                                state={{ from: location }}
                                className="px-4 py-2 text-white bg-gray-600 rounded-md shadow hover:bg-gray-800"
                            >
                                ????ng Nh???p
                            </Link>
                            <Link
                                to={"/signup"}
                                state={{ from: location }}
                                className="px-4 py-2 text-gray-800 bg-white rounded-md shadow hover:bg-gray-100"
                            >
                                ????ng K??
                            </Link>
                        </>
                    ) : (
                        <HeaderDropdown
                            className="px-4 py-2 inline-block"
                            name={userInfo.name}
                        />
                    )}
                </div>
            </div>
        </nav>
    );
}

export default Header;
