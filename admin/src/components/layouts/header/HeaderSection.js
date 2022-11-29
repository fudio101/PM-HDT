import React, { useEffect, useState } from "react";
import classes from "./HeaderSection.module.css";
import UserModal from "../../Modal/UserModal";
import { useDispatch } from "react-redux";
import {
  logout,
  updateUser,
  getUserInfo,
} from "../../../store/actions/userAction";
import { unwrapResult } from "@reduxjs/toolkit";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

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
          setInputData={setInputData}
        />
      )}
      <ToastContainer position="bottom-right" newestOnTop />
    </>
  );
}

export default HeaderSection;
