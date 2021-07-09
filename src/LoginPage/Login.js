import React, { useEffect, useState } from "react";
import UsernameInput from "./components/UsernameInput";
import PasswordInput from "./components/PasswordInput";
import "./LoginPage.css";
import "./../store/actions/callActions";

const Login = (props) => {
  const {
    email,
    setEmail,
    password,
    setPassword,
    handleLogin,
    handleSignup,
    hasAccount,
    setHasAccount,
    emailError,
    passwordError,
  } = props;

  return (
    <section>
      <div>
        <UsernameInput
          email={email}
          setEmail={setEmail}
          emailError={emailError}
        />
        <PasswordInput
          password={password}
          setPassword={setPassword}
          passwordError={passwordError}
        />
        <div className="btnContainer">
          {hasAccount ? (
            <>
              <button
                className="login-page_button background_main_color text_main_color"
                onClick={handleLogin}
              >
                Sign In
              </button>
              <p className="account-options">
                Don't have an account ? {""}
                <span
                  className="toggle-options"
                  onClick={() => setHasAccount(!hasAccount)}
                >
                  Sign up
                </span>
              </p>
            </>
          ) : (
            <>
              <button
                className="login-page_button background_main_color text_main_color"
                onClick={handleSignup}
              >
                Sign up
              </button>
              <p className="account-options">
                Have an account ?{" "}
                <span
                  className="toggle-options"
                  onClick={() => setHasAccount(!hasAccount)}
                >
                  Sign in
                </span>
              </p>
            </>
          )}
        </div>
      </div>
    </section>
  );
};

export default Login;
