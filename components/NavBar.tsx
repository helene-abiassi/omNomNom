import { useContext } from "react";
import { NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function NavBar() {
  const { user } = useContext(AuthContext);
  console.log("USER", user);

  return (
    <>
      <div className="navBar">
        <nav>
          <div className="navLeft">
            <NavLink to="/">
              <i className="fa fa-home"></i>
            </NavLink>
            <span> | </span>
            <NavLink to="browse">Browse</NavLink>
            <span> | </span>
            <NavLink to="my-recipes">My Recipes</NavLink>
          </div>

          <div className="loginNavBar">
            {user ? (
              <NavLink to="dashboard"> HALLO {user?.displayName}</NavLink>
            ) : (
              <div>
                <NavLink to="login"> Log In </NavLink>
                <span>|</span> <NavLink to="signup"> Sign up</NavLink>
              </div>
            )}
          </div>
        </nav>

        <header>
          <img className="mainLogo" src="./public/logo.png" alt="" />
        </header>
      </div>
    </>
  );
}

export default NavBar;
