import React, { useEffect, useState } from "react";
import classes from "./asset/css/EditUser.module.css";
import Select from "react-select";
import { useForm } from "react-hook-form";

const accountTypeOptions = [
  { value: "Agent", label: "Agent", id: 2 },
  { value: "Admin", label: "Admin", id: 1 },
];

function EditUser(props) {
  const { register, handleSubmit } = useForm();

  const accountInputHandler = (e) => {
    props.setInputData((prev) => ({
      ...prev,
      role: e.id,
    }));
  };

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
          <h2>{props.isNew ? "New User" : "User Detail"}</h2>
        </header>
        <form onChange={handleSubmit(onSubmit)}>
          <div className={classes.content}>
            <div>
              <label>Roles</label>
              <Select
                closeMenuOnSelect={true}
                defaultValue={[
                  accountTypeOptions[props.userSelectedData.role_id - 1],
                ]}
                options={accountTypeOptions}
                onChange={accountInputHandler}
              />
            </div>
            {props.isNew ? (
              <div>
                <label>Email </label>
                <input
                  type="email"
                  {...register("email")}
                  defaultValue={props.userSelectedData.email}
                ></input>
              </div>
            ) : (
              ""
            )}
            <div>
              <label>Name</label>
              <input
                type="text"
                {...register("name")}
                defaultValue={props.userSelectedData.name}
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
            <button onClick={props.onUpdate} hidden={props.isNew}>
              Update
            </button>
            <button onClick={props.onDelete} hidden={props.isNew}>
              Delete
            </button>
            <button onClick={props.onConfirm} hidden={!props.isNew}>
              Confirm
            </button>
            <button onClick={props.onClose}>Cancel</button>
          </footer>
        </form>
      </div>
    </>
  );
}

export default EditUser;
