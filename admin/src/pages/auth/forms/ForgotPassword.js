import React from "react";
import { useForm } from "react-hook-form";

import classes from "../AuthForm.module.css";

function ForgotPassword() {
  const { register, handleSubmit } = useForm();

  return (
    <div>
      <div className={classes.control}>
        <label htmlFor="email">Enter Email</label>
        <input type="email" {...register("email")} required />
      </div>
    </div>
  );
}

export default ForgotPassword;
