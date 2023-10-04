import { useContext } from "react";
import { Link, NavLink } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function NavBar() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div>
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
              <NavLink
                to="dashboard"
                style={({ isActive }) => ({
                  opacity: isActive ? 0 : 1,
                  cursor: isActive ? "inherit" : "pointer",
                })}
              >
                {" "}
                Hey {user?.displayName}!
              </NavLink>
            ) : (
              <div>
                <NavLink to="login"> Log In </NavLink>
                <span>|</span> <NavLink to="signup"> Sign up</NavLink>
              </div>
            )}
          </div>
        </nav>

        <header>
          <Link to={"/"}>
            <img className="mainLogo" src="./public/logo.png" alt="" />
          </Link>
        </header>
      </div>
    </>
  );
}

export default NavBar;
