import React, { createElement, useState } from "react";

import { MdAdminPanelSettings } from "react-icons/md";
import { RiDashboard2Fill } from "react-icons/ri";
import { AiFillBook } from "react-icons/ai";
import { BiCategoryAlt, BiUserCircle } from "react-icons/bi";
import { FaFeatherAlt } from "react-icons/fa";
import { NavLink } from "react-router-dom";
import { HiMenuAlt3, HiMenu } from "react-icons/hi";
import { FiUsers } from "react-icons/fi";

import {
  logout,
  updateUser,
  chanegPassword,
} from "../../../store/actions/userAction";
import { useDispatch } from "react-redux";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { trackPromise } from "react-promise-tracker";
import UserModal from "../../Modal/UserModal";

const menus = [
  { name: "Dashboard", link: "/dashboard", icon: RiDashboard2Fill },
  { name: "Comics", link: "/comic-manage", icon: AiFillBook },
  { name: "Categories", link: "/category-manage", icon: BiCategoryAlt },
  { name: "Users", link: "/user-manage", icon: FiUsers },
  { name: "Authors", link: "/author-manage", icon: FaFeatherAlt },
];

function VerticalBar() {
  const [open, setOpen] = React.useState(true);

  function getWindowWidth() {
    const { innerWidth } = window;
    return innerWidth;
  }

  React.useEffect(() => {
    function handleWindowResize() {
      if (getWindowWidth() <= 640) {
        setOpen(false);
      } else {
        setOpen(true);
      }
    }

    window.addEventListener("resize", handleWindowResize);

    return () => {
      window.removeEventListener("resize", handleWindowResize);
    };
  }, []);

  // account actions
  const [isOpen, setIsOpen] = useState(false);
  const [inputData, setInputData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const onLogoutHandler = async () => {
    try {
      unwrapResult(await dispatch(logout()));
      localStorage.clear();
      toast("Loged Out", {
        type: "success",
      });
      setTimeout(() => {
        navigate("/login");
      }, 1500);
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
  };

  const onUpdateHandler = async (e) => {
    e.preventDefault();
    console.log(inputData);
    try {
      for (let [key, value] of Object.entries(inputData)) {
        if (value === null || value === "" || key === "email") {
          delete inputData[`${key}`];
        }
      }
      unwrapResult(
        await dispatch(
          updateUser({ id: localStorage.getItem("id"), user: inputData })
        )
      );
      setIsOpen(false);
      setInputData("");
      localStorage.setItem("name", inputData.name);
      toast("User Account Update Successfully", {
        type: "success",
      });
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
  };

  //change Password

  const onChangePasswordAction = async () => {
    try {
      unwrapResult(
        await dispatch(
          chanegPassword({
            old_password: inputData.old_password,
            new_password: inputData.new_password,
            new_password_confirmation: inputData.new_password_confirmation,
          })
        )
      );
      toast("Password Changed, Check Your Email!", {
        type: "success",
      });
      setIsOpen(false);
      setInputData("");
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
  };

  const onChangePassword = (e) => {
    e.preventDefault();
    trackPromise(onChangePasswordAction());
  };

  return (
    <>
      <aside
        className={`bg-[#0e0e0e] min-h-screen ${
          open ? "w-72" : "w-16"
        } duration-500 text-gray-100 px-2`}
      >
        <div className="py-3 flex justify-end">
          {open ? (
            <HiMenu
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          ) : (
            <HiMenuAlt3
              size={26}
              className="cursor-pointer"
              onClick={() => setOpen(!open)}
            />
          )}
        </div>
        {/* {open ? (
        <NavLink
          to={"/dashboard"}
          className="no-underline cursor-pointer text-gray-600 font-bold text-lg"
        >
          <div className="p-2">Comic World</div>
        </NavLink>
      ) : (
        <div>{createElement(MdAdminPanelSettings, { size: "30" })}</div>
      )} */}

        {
          <NavLink
            to={"/dashboard"}
            className={`group flex items-center text-lg  gap-3.5 text-gray-600 font-extrabold p-3`}
          >
            <div>
              {React.createElement(MdAdminPanelSettings, { size: "30" })}
            </div>
            <h2
              style={{
                transitionDelay: `200ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Comic World
            </h2>

            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              Comic World
            </h2>
          </NavLink>
        }

        <ul className="mt-8 flex flex-col gap-4 relative z-10">
          {menus.map((menu, index) => (
            <NavLink
              to={menu.link}
              className={`group flex items-center text-base  gap-3.5 font-medium p-4 hover:bg-gray-800 rounded-md `}
              key={index}
            >
              {/* <div>{menu.icon} </div> */}
              <div>{React.createElement(menu?.icon, { size: "20" })}</div>
              <h2
                style={{
                  transitionDelay: `${index + 3}00ms`,
                }}
                className={`whitespace-pre duration-500 ${
                  !open && "opacity-0 translate-x-28 overflow-hidden"
                }`}
              >
                {menu?.name}
              </h2>

              <h2
                className={`${
                  open && "hidden"
                } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
              >
                {menu?.name}
              </h2>
            </NavLink>
          ))}
        </ul>

        {
          <NavLink
            className={`group flex items-center text-md  gap-3.5 text-gray-600 font-bold p-3 absolute bottom-2 `}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            <div>{React.createElement(BiUserCircle, { size: "30" })}</div>
            <h2
              style={{
                transitionDelay: `700ms`,
              }}
              className={`whitespace-pre duration-500 ${
                !open && "opacity-0 translate-x-28 overflow-hidden"
              }`}
            >
              Account
            </h2>

            <h2
              className={`${
                open && "hidden"
              } absolute left-48 bg-white font-semibold whitespace-pre text-gray-900 rounded-md drop-shadow-lg px-0 py-0 w-0 overflow-hidden group-hover:px-2 group-hover:py-1 group-hover:left-14 group-hover:duration-300 group-hover:w-fit  `}
            >
              Account
            </h2>
          </NavLink>
        }
      </aside>
      {/* account modal */}
      {isOpen && (
        <UserModal
          onClose={() => {
            setIsOpen(false);
            setInputData("");
          }}
          onLogout={onLogoutHandler}
          onUpdate={onUpdateHandler}
          onChangePassword={onChangePassword}
          setInputData={setInputData}
        />
      )}
      <ToastContainer position="bottom-right" newestOnTop />
    </>
  );
}

export default VerticalBar;
