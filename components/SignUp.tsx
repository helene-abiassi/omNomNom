import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function SignUp() {
  const { signUp } = useContext(AuthContext);
  //* no need to import user (?)

  const [displayName, setDisplayName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const redirectTo = useNavigate();

  const handleDisplayNameEntry = (e: ChangeEvent<HTMLInputElement>) => {
    setDisplayName(e.target.value);
  };

  const handleEmailEntry = (e: ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);
  };

  const handlePswEntry = (e: ChangeEvent<HTMLInputElement>) => {
    setPassword(e.target.value);
  };

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log("email, password :>> ", email, password);
    signUp(displayName, email, password);
    redirectTo("/dashboard");
  };

  useEffect(() => {
    setDisplayName(displayName);
    setEmail(email);
    setPassword(password);
  }, []);

  return (
    <div>
      <br />
      <div className="container">
        <form className="signUpForm" onSubmit={handleSignUp}>
          <p>Fill in the information below to sign up:</p>
          <label htmlFor="username">Username:</label>
          <input
            onChange={handleDisplayNameEntry}
            className="searchInputBox"
            type="text"
            placeholder="Choose a username"
            name="username"
          />
          <br />
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
