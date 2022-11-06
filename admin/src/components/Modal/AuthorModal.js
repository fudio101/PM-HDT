import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";

import classes from "./asset/css/AuthorModal.module.css";

const accountTypeOptions = [
  { value: "admin", label: "Admin" },
  { value: "admin1", label: "admin1" },
];

const dummyAVT = require("../../pages/asset/img/author.jpg");

function AuthorModal(props) {
  const [avatar, setAvatar] = useState(dummyAVT);
  const { register, handleSubmit } = useForm();
  const accountInputHandler = () => {};

  const avaChangeHandler = (e) => {
    setAvatar(URL.createObjectURL(e.target.files[0]));
  };

  return (
    <>
      <div className={classes.backdrop} onClick={props.onClose}></div>
      <form className={`${classes.modal} ${classes.fade} `}>
        <header className={classes.header}>
          <h2>Author Detail</h2>
        </header>

        <div className={classes.content}>
          <div className={classes.avatar_display}>
            <img src={avatar}></img>
          </div>
          <div>
            <label>Author Avatar</label>
            <input
              type="file"
              {...register("avt")}
              onChange={avaChangeHandler}
              required
            ></input>
          </div>
          <div>
            <label>Author Name</label>
            <input type="text" {...register("name")} required></input>
          </div>
        </div>
        <footer className={classes.actions}>
          <button onClick={props.onConfirm} hidden={!props.isNew}>
            Confirm
          </button>
          <button onClick={props.onConfirm} hidden={props.isNew}>
            Update
          </button>
          <button onClick={props.onDelete} hidden={props.isNew}>
            Delete
          </button>
          <button onClick={props.onClose} hidden={false}>
            Cancel
          </button>
        </footer>
      </form>
    </>
  );
}

export default AuthorModal;
