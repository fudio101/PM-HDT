import React from "react";

import classes from "../AuthForm.module.css";

function LoginForm() {
  return (
    <>
      <div className={classes.control}>
        <label htmlFor="email">Your Email</label>
        <input type="email" id="email" required />
      </div>
      <div className={classes.control}>
        <label htmlFor="password">Your Password</label>
        <input type="password" id="password" required />
      </div>
    </>
  );
}

export default LoginForm;
