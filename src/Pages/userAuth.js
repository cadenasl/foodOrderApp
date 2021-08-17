import React, { useState, useContext } from "react";
import classes from "./userAuth.module.css";
import { validEmail, validPassword } from "../Regex/regex";
import cartContext from "../store/cart-context";
import { useHistory } from "react-router-dom";

const UserAuth = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(false);
  const [passwordError, setPasswordError] = useState(false);
  const [passwordComfirmationError, setPasswordComfirmationError] =
    useState("");
  const [confirmPasswordTouched, setConfirmPasswordTouched] = useState(false);
  const [passwordIsTouched, setPasswordIsTouched] = useState(false);
  const [signIn, setSignIn] = useState(true);
  const [signInError, setSignInError] = useState();
  const [signUpError, setSignUpError] = useState();

  const Auth = useContext(cartContext);
  console.log(Auth.user);
  let history = useHistory();
  const SignInOrSignUpHandler = () => {
    setSignIn(!signIn);
  };
  const nameOnChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setName(event.target.value);
  };

  const emailOnChange = (event) => {
    console.log(event.target.value);
    if (validEmail.test(event.target.value)) {
      setEmailError(false);
      setEmail(event.target.value);
    } else {
      setEmailError(true);
    }
  };
  const passwordOnChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    if (validPassword.test(event.target.value)) {
      setPasswordError(false);
      setPassword(event.target.value);
    } else setPasswordError(true);
  };
  const passwordOnChangeConfirmation = (event) => {
    event.preventDefault();
    if (event.target.value === password) {
      setPasswordComfirmationError("");
      setPassword(event.target.value);
    } else {
      setPasswordComfirmationError("password does not math");
    }
  };

  const passwordConfirmationIsTouched = () => {
    setConfirmPasswordTouched(true);
  };

  const passwordIsTouchedHandler = () => {
    setPasswordIsTouched(true);
  };

  console.log(validEmail);
  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (signIn) {
      try {
        Auth.SignIn(email, password);
        history.push("/order");
      } catch {
        setSignInError("failed to log in");
      }
    } else {
      try {
        Auth.signUp(email, password, name);

        history.push("/order");
      } catch (err) {
        console.log(err);
        setSignUpError("failed to create account");
      }
    }
  };
  let formIsValid = false;
  if (!signIn) {
    formIsValid =
      name != "" &&
      password != "" &&
      email != "" &&
      passwordComfirmationError === "";
  } else {
    formIsValid = true;
  }

  return (
    <div className={classes.formDiv}>
      <h1>Welcome to React Meals</h1>
      <h2>Please {signIn ? "Sign In" : "Sign Up"} To Order</h2>
      {signUpError && signUpError}
      {signInError && signInError}
      <form className={classes.form} onSubmit={onSubmitHandler} noValidate>
        {signIn ? null : (
          <React.Fragment>
            {" "}
            <label htmlFor="Name">Name</label>
            <input label="Name" id="Name" type="text" onChange={nameOnChange} />
          </React.Fragment>
        )}
        <label htmlFor="Email">Email</label>
        <input label="Email" id="Email" type="email" onChange={emailOnChange} />
        {emailError ? <h4>Your email is not valid</h4> : null}
        <label htmlFor="Password">Password</label>
        <input
          label="Password"
          id="Password"
          type="Password"
          onChange={passwordOnChange}
          onBlur={passwordIsTouchedHandler}
        />
        {passwordError && passwordIsTouched ? (
          <h4>password is not valid please try again</h4>
        ) : null}
        {signIn ? null : (
          <React.Fragment>
            <label htmlFor="Confirm Password">Confirm Password</label>
            <input
              label="Confirm Password"
              id="Confirm Password"
              type="Password"
              onChange={passwordOnChangeConfirmation}
              onBlur={passwordConfirmationIsTouched}
            />
            {confirmPasswordTouched && passwordComfirmationError ? (
              <h4>Passwords do not match</h4>
            ) : null}
          </React.Fragment>
        )}

        <button disabled={!formIsValid}>
          {signIn ? "sign In" : "sign Up"}
        </button>
        <button type="button" onClick={SignInOrSignUpHandler}>
          Switch to {signIn ? "sign Up" : "sign In"}
        </button>
      </form>
    </div>
  );
};

export default UserAuth;
