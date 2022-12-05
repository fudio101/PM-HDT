import React, { useEffect, useState } from "react";
import classes from "./asset/css/UserModal.module.css";
import { useForm } from "react-hook-form";

function UserModal(props) {
  const [isChangePassword, setIsChangePassword, reset] = useState(false);
  const { register, handleSubmit } = useForm();

  const onSubmit = (data) => {
    props.setInputData((prev) => ({
      ...prev,
      ...data,
    }));
  };

  // useEffect(() => {
  //   reset({
  //     data: "test",
  //   });
  // }, [isChangePassword]);

  return (
    <>
      <div className={classes.backdrop} onClick={props.onClose}></div>
      <div className={`${classes.modal} ${classes.fade} `}>
        <header className={classes.header}>
          <h2>Change Personal Info</h2>
        </header>
        <div className={classes.content}>
          <form onChange={handleSubmit(onSubmit)}>
            {!isChangePassword ? (
              <div>
                <div>
                  <label>Email</label>
                  <input
                    type="email"
                    {...register("email")}
                    placeholder={localStorage.getItem("email")}
                    readOnly
                  ></input>
                </div>
                <div>
                  <label>Name</label>
                  <input
                    type="text"
                    {...register("name")}
                    placeholder={localStorage.getItem("name")}
                  ></input>
                </div>
              </div>
            ) : (
              <div>
                <div>
                  <label>Old Password</label>
                  <input
                    type="Password"
                    required
                    {...register("old_password")}
                  ></input>
                </div>
                <div>
                  <label>New Password</label>
                  <input
                    type="Password"
                    required
                    {...register("new_password")}
                  ></input>
                </div>
                <div>
                  <label>Confirm Password</label>
                  <input
                    type="Password"
                    required
                    {...register("new_password_confirmation")}
                  ></input>
                </div>
              </div>
            )}

            <div className={classes.actions_toggle}>
              <button
                type="reset"
                className={classes.changePassword}
                onClick={() => {
                  setIsChangePassword(!isChangePassword);
                }}
              >
                {!isChangePassword ? "Change Password" : "Edit User"}
              </button>
            </div>

            <footer className={classes.actions}>
              <button onClick={props.onUpdate} hidden={isChangePassword}>
                Update
              </button>
              <button
                onClick={props.onChangePassword}
                hidden={!isChangePassword}
              >
                Change
              </button>
              <button onClick={props.onLogout}>Logout</button>
              <button onClick={props.onClose}>Cancel</button>
            </footer>
          </form>
        </div>
      </div>
    </>
  );
}

export default UserModal;
