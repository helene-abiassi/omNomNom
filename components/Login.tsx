import { ChangeEvent, FormEvent, useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function LogIn() {
  const { logIn, googleLogIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordType, setPasswordType] = useState("password");
  const [showOrHide, setShowOrHide] = useState("show");

  const redirectTo = useNavigate();

  const changePasswordType = () => {
    if (passwordType === "password") {
      setPasswordType("text");
      setShowOrHide("hide");
      return;
    }
    setPasswordType("password");
    setShowOrHide("show");
  };

  const handleEmailEntry = (e: ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
  };

  const handlePswEntry = (e: ChangeEvent<HTMLInputElement>) => {
    const pswInput = e.target.value;
    setPassword(pswInput);
  };

  const handleLogIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!email.includes("@") && password.length < 6) {
      alert(
        "Your email seems to be invalid. \n Your password should be at least 6 characters"
      );
      redirectTo("/login");
    } else if (password.length < 6) {
      alert("Your password should be at least 6 characters");
      redirectTo("/login");
    } else if (!email.includes("@")) {
      alert("Your email seems to be invalid");
      redirectTo("/login");
    } else {
      logIn(email, password);
      redirectTo("/dashboard");
    }
  };

  // const handleGoogleLogIn = (e: ChangeEvent<HTMLInputElement>) => {
  //   e.preventDefault();
  //   googleLogIn();
  // };

  return (
    <div>
      <br />
      <div className="container">
        <form onSubmit={handleLogIn} className="signUpForm">
          <p>Fill in the information below to log in:</p>

          <label htmlFor="email">Email:</label>
          <input
            onChange={handleEmailEntry}
            className="searchInputBox"
            type="text"
            id="email"
            placeholder="Enter e-mail..."
            name="email"
            autoComplete="current-email"
          />
          <br />
          <label htmlFor="psw">Password:</label>

          <input
            onChange={handlePswEntry}
            className="searchInputBox"
            type={passwordType}
            id="password"
            placeholder="Enter password..."
            name="psw"
            autoComplete="current-password"
          />
          <span
            onClick={changePasswordType}
            className="hide-password"
            style={{ cursor: "pointer" }}
          >
            {showOrHide}
          </span>

          {/* <button className="resetButton" onClick={handleGoogleLogIn}>
            Log in with your Google account
          </button> */}
          <button type="submit" className="signupbtn">
            Login
          </button>
        </form>

        <img className="loginImg" src="./public/DONUT-copy.png" alt="" />
      </div>
      <br />

      <p>
        Don't have an account yet?{" "}
        <Link to={"/signup"} className="resetButton" replace={true}>
          Sign up!
        </Link>
      </p>
    </div>
  );
}

export default LogIn;
