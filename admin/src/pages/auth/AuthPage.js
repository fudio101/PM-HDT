import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, forgotPassword } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";
import jwt_decode from "jwt-decode";

// import LoginForm from "./forms/LoginForm";
// import SignUpForm from "./forms/SignUpForm";
// import LoadingSpinner from "../../components/UI/LoadingSpinner";

import classes from "./AuthForm.module.css";
import { unwrapResult } from "@reduxjs/toolkit";
const AuthForm = () => {
  const { loading, userToken } = useSelector((state) => state.user);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  useEffect(() => {
    if (userToken) {
      const { role_id } = jwt_decode(userToken);
      if (role_id !== 3) {
        toast("Welcome Back!", {
          type: "success",
        });
        setTimeout(() => {
          navigate("/dashboard");
        }, 3000);
      } else {
        toast("Your Account Does Not Have This Permission!!!", {
          type: "error",
        });
      }
    }
    // navigate("/dashboard");
  }, [userToken, navigate]);

  // useEffect(() => {
  //   toast(error, {
  //     type: "error",
  //   });
  // }, [error]);

  const submitForm = async (data) => {
    try {
      if (isLogin) {
        unwrapResult(await dispatch(userLogin(data)));
      } else {
        unwrapResult(await dispatch(forgotPassword({ email: data.email })));
        toast("Confirmation Email Has Sent To You", {
          type: "success",
        });
      }
    } catch (error) {
      toast(error, {
        type: "error",
      });
    }
  };

  return (
    <div className={classes.wrap_login} onSubmit={handleSubmit(submitForm)}>
      <section className={classes.auth}>
        <h1 className="font-bold text-2xl text-blue-900">
          {isLogin ? "USER LOGIN" : "FORGOT PASSWORD"}
        </h1>
        <form>
          {isLogin ? (
            <div>
              <div className={classes.control}>
                <label htmlFor="email">Your Email</label>
                <input type="email" {...register("email")} required />
              </div>
              <div className={classes.control}>
                <label htmlFor="password">Your Password</label>
                <input type="password" {...register("password")} required />
              </div>
            </div>
          ) : (
            <div>
              <div className={classes.control}>
                <label htmlFor="email">Enter Your Email</label>
                <input type="email" {...register("email")} required />
              </div>
              {/* <div className={classes.control}>
                <label htmlFor="password">Enter Username</label>
                <input type="text" {...register("name")} required />
              </div>
              <div className={classes.control}>
                <label htmlFor="password">Enter Password</label>
                <input type="password" {...register("password")} required />
              </div> */}
            </div>
          )}
          <div className={classes.actions}>
            <button disabled={loading}>{isLogin ? "Login" : "Submit"}</button>
            <button
              type="reset"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Forgot Password" : "Login with existing account"}
            </button>
          </div>
        </form>
        <ToastContainer position="bottom-right" newestOnTop />
      </section>
    </div>
  );
};

export default AuthForm;
