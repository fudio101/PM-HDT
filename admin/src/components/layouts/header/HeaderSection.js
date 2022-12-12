import React, { useEffect, useState } from "react";
import classes from "./HeaderSection.module.css";
import UserModal from "../../Modal/UserModal";
import { useDispatch } from "react-redux";
import {
  logout,
  updateUser,
  changePassword,
} from "../../../store/actions/userAction";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import { trackPromise } from "react-promise-tracker";

function HeaderSection() {
  const [isOpen, setIsOpen] = useState(false);
  const [inputData, setInputData] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // useEffect(() => {
  //   console.log(localStorage.getItem("me"));
  // }, []);

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
          changePassword({
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
      <header className={classes.header}>
        <div className={classes.menu_icon}>
          <span className="material-icons-outlined">menu</span>
        </div>
        <div className="header_left"></div>
        <div className="header_right">
          <span
            className={`material-icons-outlined ${classes.user__logout}`}
            onClick={() => {
              setIsOpen(true);
            }}
          >
            account_circle
          </span>
        </div>
      </header>
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

export default HeaderSection;
