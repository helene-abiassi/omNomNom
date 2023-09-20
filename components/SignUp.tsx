// import React from 'react'
import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import AuthContext from "../src/context/AuthContext";

function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailEntry = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePswEntry = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    signUp(email, password);
  };

  // useEffect(() => {
  //   setEmail();
  //   setPassword();
  // }, []);

  return (
    <div>
      <br />
      <div className="container">
        <form className="signUpForm" onSubmit={handleSignUp}>
          <p>Fill in the information below to sign up:</p>
          <label htmlFor="email">Email:</label>
          <input
            onChange={handleEmailEntry}
            className="searchInputBox"
            type="text"
            placeholder="Enter e-mail..."
            name="email"
            required
          />
          <br /> <label htmlFor="psw">Password:</label>
          <input
            onChange={handlePswEntry}
            className="searchInputBox"
            type="password"
            placeholder="Enter password..."
            name="psw"
            required
          />
          <br />
          <a href="#">Sign up with your Google account</a>
          {/* <label>
            <input type="checkbox" checked={true} name="remember" /> Remember me
          </label> */}
          <p style={{ textAlign: "left" }}>
            By creating an account, you <br />
            agree to our <a href="#">Terms & Privacy</a>.
          </p>
          <button type="submit" className="signupbtn">
            Sign up
          </button>
        </form>

        <img className="loginImg" src="./public/DONUT-copy.png" alt="" />
      </div>
      <br />
      <p>
        Already have an account? <a href="login">Log in!</a>
      </p>
    </div>
  );
}

export default SignUp;
