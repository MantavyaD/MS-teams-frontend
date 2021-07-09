import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import logo from "../resources/logo.png";
import { setUsername } from "../store/actions/dashboardActions";
import { registerNewUser, userLoggedOut } from "../utils/wssConnection/wssConnection";
import Login from "./Login";
import "./LoginPage.css";
import fire from "./fire";
import Dashboard from "../Dashboard/Dashboard";
import store from "../store/store";
import { stopBothVideoAndAudio } from "./../utils/webRTC/webRTCHandler";


const LoginPage = ({ saveUsername }) => {
  const [user, setUser] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [hasAccount, setHasAccount] = useState(false);

  const clearInputs = () => {
    setEmail("");
    setPassword("");
  };

  const clearErrors = () => {
    setEmailError("");
    setPasswordError("");
  };

  const handleLogin = () => {

    clearErrors();
    fire
      .auth()
      .signInWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        // signed in
        var user=userCredentials.user;
        handleSubmitButtonPressed();
      })
      .catch((err) => {
        switch (err.code) {
          case "auth/invalid-email":
          case "auth/user-disabled":
          case "auth/user-not-found":
            setEmailError("Invalid email!");
            break;
          case "auth/wrong-password":
            setPasswordError("Wrong Password!");
            break;
        }
      });
  };

  const handleSignup = () => {

    clearErrors();
    fire
      .auth()
      .createUserWithEmailAndPassword(email, password)
      .then((userCredentials) => {
        // signed in
        var user=userCredentials.user;
        handleSubmitButtonPressed();
      })
        .catch((err) => {
          switch (err.code) {
            case "auth/email-already-in-use":
              setEmailError("There exists an account with this email");
              break;
            case "auth/invalid-email":
              setEmailError("Invalid email!");
              break;
            case "auth/weak-password":
              setPasswordError("Password should have atleast 6 characters");
              break;
          }
      }
      );
  };

  const handleLogout = () => {
    fire.auth().signOut();
    const localStream = store.getState().call.localStream;
    stopBothVideoAndAudio(localStream);
    userLoggedOut(email);
  };

  const authListener = () => {
    fire.auth().onAuthStateChanged((user) => {
      if (user) {
        clearInputs();
        setUser(user);
      } else {
        setUser("");
      }
    });
  };

  useEffect(() => {
    authListener();
  }, []);

  // when the submit button is pressed
  const handleSubmitButtonPressed = () => {
    var sEmails = email.split("@");
    var name = sEmails[0];
    // var name=email.split("@");
    registerNewUser(name); // registers the user
    saveUsername(name);
  };

  return (
    <div className="login-page_container background_main_color">
      {user ? (
          <div>
            <Dashboard handleLogout={handleLogout}/>
          </div>
      ) : (
        <div className="login-page_login_box background_secondary_color">
          <div className="login-page_logo_container">
            <img className="login-page_logo_image" src={logo} alt="MS Teams" />
          </div>
          <div className="login-page_title_container">
            <h2>Get on Board</h2>
          </div>
          <Login
            email={email}
            setEmail={setEmail}
            password={password}
            setPassword={setPassword}
            handleLogin={handleLogin}
            handleSignup={handleSignup}
            hasAccount={hasAccount}
            setHasAccount={setHasAccount}
            emailError={emailError}
            passwordError={passwordError}
          />
        </div>
      )}
    </div>
  );
};

const mapActionsToProps = (dispatch) => {
  return {
    saveUsername: (username) => dispatch(setUsername(username)),
  };
};

export default connect(null, mapActionsToProps)(LoginPage);
