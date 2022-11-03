import { useState } from "react";

import LoginForm from "./auth-forms/LoginForm";
import SignUpForm from "./auth-forms/SignUpForm";

import classes from "./AuthForm.module.css";

const AuthForm = () => {
  const [isLogin, setIsLogin] = useState(true);

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState);
  };

  return (
    <div className={classes.wrap_login}>
      <section className={classes.auth}>
        <h1>{isLogin ? "USER LOGIN" : "SIGN UP"}</h1>
        <form>
          {isLogin ? <LoginForm /> : <SignUpForm />}
          <div className={classes.actions}>
            <button>{isLogin ? "Login" : "Create Account"}</button>
            <button
              type="button"
              className={classes.toggle}
              onClick={switchAuthModeHandler}
            >
              {isLogin ? "Create new account" : "Login with existing account"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
};

export default AuthForm;
