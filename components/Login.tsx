import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function LogIn() {
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

  return (
    <div>
      <br />
      <div className="container">
        <form onSubmit={handleLogIn} className="signUpForm" action={"/"}>
          {/* <p>Please fill in the information below to create an account:</p> */}
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
          <button onClick={googleLogIn}>Log in with your Google account</button>
          <br />
          <label>
            <input type="checkbox" name="remember" /> Remember me
          </label>
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
