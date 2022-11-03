import React from "react";

import classes from "../AuthForm.module.css";

function SignUpForm() {
  return (
    <>
      <div className={classes.control}>
        <label htmlFor="email">Enter Email</label>
        <input type="email" id="email" required />
      </div>
      <div className={classes.control}>
        <label htmlFor="password">Enter Username</label>
        <input type="text" required />
      </div>
      <div className={classes.control}>
        <label htmlFor="password">Enter Password</label>
        <input type="password" id="password" required />
      </div>
    </>
  );
}

export default SignUpForm;
