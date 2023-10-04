import { useContext } from "react";
import LogIn from "../src/components/Login";
import "../src/style/SignupPage.css";
import AuthContext from "../src/context/AuthContext";
import { Link } from "react-router-dom";

function Login() {
  const { user, logOut } = useContext(AuthContext);
  return (
    <>
      <div style={{ height: "70vh" }}>
        {user && (
          <>
            <p>You're already logged in!</p>
            <Link className="resetButton" to="/">
              Take me home 🥕
            </Link>
            <br />
            <br />
            <button className="explore-button" onClick={logOut}>
              Log out?
            </button>
          </>
        )}
        {!user && <LogIn />}
      </div>
    </>
  );
}

export default Login;
