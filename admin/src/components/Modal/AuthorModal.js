import React, { useEffect, useState } from "react";

import classes from "./asset/css/AuthorModal.module.css";

const dummyAVT = require("../../pages/asset/img/author.jpg");

function AuthorModal(props) {
  const [authorInfo, setAuthorInfo] = useState({}); //retrive data for authorMana page
  const [avatar, setAvatar] = useState(
    props.editData.image_url ? props.editData.image_url : dummyAVT
  );
  const accountInputHandler = () => {};

  // useEffect(() => {
  //   setAvatar();
  // }, [props.editData]);

  const avaChangeHandler = (e) => {
    setAuthorInfo((prev) => {
      return {
        ...prev,
        img: e.target.files[0],
      };
    });
    setAvatar(URL.createObjectURL(e.target.files[0]));
    props.setAuthorData((prev) => {
      return {
        ...prev,
        img: e.target.files[0],
      };
    });
  };

  return (
    <>
      <div className={classes.backdrop} onClick={props.onClose}></div>
      <form className={`${classes.modal} ${classes.fade} `}>
        <header className={classes.header}>
          <h2>{props.isNew ? "New Author" : "Author Detail"}</h2>
        </header>

        <div className={classes.content}>
          <div className={classes.avatar_display}>
            <img src={avatar}></img>
          </div>
          <div>
            <label>Author Avatar</label>
            <input
              className={classes.author__input__img}
              type="file"
              onChange={avaChangeHandler}
              required
            ></input>
          </div>
          <div>
            <label>Author Name</label>
            <input
              type="text"
              onChange={(e) => {
                setAuthorInfo((prev) => {
                  return { ...prev, name: e.target.value };
                });
                //props.setAuthorData(authorInfo);
                props.setAuthorData((prev) => {
                  return {
                    img: authorInfo.img,
                    name: e.target.value,
                  };
                });
              }}
              defaultValue={props.editData.name ? props.editData.name : ""}
              required
            ></input>
          </div>
        </div>
        <footer className={classes.actions}>
          <button onClick={props.onConfirm} hidden={!props.isNew}>
            Confirm
          </button>
          <button onClick={props.onUpdate} hidden={props.isNew}>
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
