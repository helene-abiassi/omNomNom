import { ChangeEvent, FormEvent, useContext, useState } from "react";
import AuthContext from "../src/context/AuthContext";
import { useNavigate } from "react-router-dom";

function Login() {
  const { logIn } = useContext(AuthContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailEntry = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePswEntry = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleLogIn = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    logIn(email, password);
  };

  // useEffect(() => {
  //   setEmail(email);
  //   setPassword(password);
  // }, []);

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
            required
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
            required
          />

          <br />
          <a href="#">Log in with your Google account</a>

          <br />
          <label>
            <input type="checkbox" name="remember" /> Remember me
          </label>
          <br />
          {/* //! Add onChange handler for RememberMe */}
          <button type="submit" className="signupbtn">
            Login
          </button>
        </form>

        {/* //!Use NavigateTo after submit button to dashboard */}

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

export default Login;
