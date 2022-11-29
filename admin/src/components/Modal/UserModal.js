import React, { useEffect, useState } from "react";
import classes from "./asset/css/UserModal.module.css";
import { useForm } from "react-hook-form";

function UserModal(props) {
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    props.setInputData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  return (
    <>
      <div className={classes.backdrop} onClick={props.onClose}></div>
      <div className={`${classes.modal} ${classes.fade} `}>
        <header className={classes.header}>
          <h2>Change Personal Info</h2>
        </header>
        <form onChange={handleSubmit(onSubmit)}>
          <div className={classes.content}>
            <div>
              <label>Email</label>
              <input
                type="email"
                {...register("email")}
                defaultValue={localStorage.getItem("email")}
                readOnly
              ></input>
            </div>
            <div>
              <label>Name</label>
              <input
                type="text"
                {...register("name")}
                defaultValue={localStorage.getItem("name")}
              ></input>
            </div>
            <div>
              <label>Password</label>
              <input type="Password" required {...register("password")}></input>
            </div>
            <div>
              <label>Password</label>
              <input
                type="Password"
                required
                {...register("password_confirmation")}
              ></input>
            </div>
          </div>
          <footer className={classes.actions}>
            <button onClick={props.onUpdate}>Update</button>
            <button onClick={props.onLogout}>Logout</button>
            <button onClick={props.onClose}>Cancel</button>
          </footer>
        </form>
      </div>
    </>
  );
}

export default UserModal;
