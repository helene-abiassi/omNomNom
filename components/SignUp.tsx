import { ChangeEvent, FormEvent, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function SignUp() {
  const { signUp } = useContext(AuthContext);

  const [displayName, setDisplayName] = useState("");
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

  const handleDisplayNameEntry = (e: ChangeEvent<HTMLInputElement>) => {
    const displayNameInput = e.target.value;
    setDisplayName(displayNameInput);
  };

  const handleEmailEntry = (e: ChangeEvent<HTMLInputElement>) => {
    const emailInput = e.target.value;
    setEmail(emailInput);
  };

  const handlePswEntry = (e: ChangeEvent<HTMLInputElement>) => {
    const pswInput = e.target.value;
    setPassword(pswInput);
  };

  const handleSignUp = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!email.includes("@") && password.length < 6) {
      alert(
        "Your email seems to be invalid. \n Your password should be at least 6 characters"
      );
      redirectTo("/signup");
    } else if (password.length < 6) {
      alert("Your password should be at least 6 characters");
      redirectTo("/signup");
    } else if (!email.includes("@")) {
      alert("Your email seems to be invalid");
      redirectTo("/signup");
    } else {
      signUp(displayName, email, password);
      redirectTo("/dashboard");
    }
  };

  useEffect(() => {
    setDisplayName(displayName); //! QUE PASA AQUI
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
            placeholder="Choose username..."
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
            type={passwordType}
            placeholder="Enter password..."
            name="psw"
            required
          />
          <span
            onClick={changePasswordType}
            className="hide-password"
            style={{ cursor: "pointer" }}
          >
            {showOrHide}
          </span>
          <button type="submit" className="signupbtn">
            Sign up
          </button>
        </form>

        <img className="loginImg" src="./public/DONUT-copy.png" alt="" />
      </div>
      <br />
      <p>
        Already have an account?{" "}
        <a className="resetButton" href="login">
          Log in!
        </a>
      </p>
    </div>
  );
}

export default SignUp;
