import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, getUserInfo } from "../../store/actions/userAction";
import { useNavigate } from "react-router-dom";

// import LoginForm from "./forms/LoginForm";
// import SignUpForm from "./forms/SignUpForm";
import LoadingSpinner from "../../components/UI/LoadingSpinner";

import classes from "./AuthForm.module.css";
const AuthForm = () => {
  const { loading, error, userToken, userInfo } = useSelector(
    (state) => state.user
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { register, handleSubmit } = useForm();

  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  useEffect(() => {
    if (userToken && Object.keys(userInfo).length !== 0) {
      toast("Welcome Back!", {
        type: "success",
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 3000);
    }
    // navigate("/dashboard");
  }, [userToken, userInfo, navigate]);

  useEffect(() => {
    if (userToken) {
      dispatch(getUserInfo());
    }
  }, [userToken, dispatch]);

  useEffect(() => {
    toast(error, {
      type: "error",
    });
  }, [error]);

  const submitForm = (data) => {
    dispatch(userLogin(data));
  };

  return (
    <div className={classes.wrap_login} onSubmit={handleSubmit(submitForm)}>
      <section className={classes.auth}>
        <h1>{isLogin ? "USER LOGIN" : "SIGN UP"}</h1>
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
                <label htmlFor="email">Enter Email</label>
                <input type="email" {...register("email")} required />
              </div>
              <div className={classes.control}>
                <label htmlFor="password">Enter Username</label>
                <input type="text" {...register("name")} required />
              </div>
              <div className={classes.control}>
                <label htmlFor="password">Enter Password</label>
                <input type="password" {...register("password")} required />
              </div>
            </div>
          )}
          <div className={classes.actions}>
            <button disabled={loading}>
              {isLogin ? "Login" : "Create Account"}
            </button>
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
