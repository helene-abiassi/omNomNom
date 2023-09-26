import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function LogIn() {
  console.log("%c login", "color:green");

  const { logIn, googleLogIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirectTo = useNavigate();

  const handleEmailEntry = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePswEntry = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logIn(email, password);
    redirectTo("/dashboard");
  };

  const handleGoogleLogIn = (e: ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    googleLogIn();
  };

  return (
    <div>
      <br />
      <div className="container">
        <form onSubmit={handleLogIn} className="signUpForm" action={"/"}>
          <p>Fill in the information below to log in:</p>

          <label htmlFor="email">Email:</label>
          <input
            onChange={handleEmailEntry}
            className="searchInputBox"
            type="text"
            placeholder="Enter e-mail..."
            name="email"
            autoComplete="current-email"
          />
          <br />
          <label htmlFor="psw">Password:</label>

          <input
            onChange={handlePswEntry}
            className="searchInputBox"
            type="password"
            placeholder="Enter password..."
            name="psw"
            autoComplete="current-password"
          />

          <br />
          <button onClick={handleGoogleLogIn}>
            Log in with your Google account
          </button>
          <br />
          <br />
          <button type="submit" className="signupbtn">
            Login
          </button>
        </form>

        <img className="loginImg" src="./public/DONUT-copy.png" alt="" />
      </div>
      <br />
      <p>
        Don't have an account yet? <a href="signup">Sign up!</a>
      </p>

      <br />
    </div>
  );
}

export default LogIn;
