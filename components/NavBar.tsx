// import React from 'react'
import { useContext } from "react";
import { NavLink } from "react-router-dom";
import { AuthContext } from "../src/context/AuthContext";

function NavBar() {
  const { user, setUser } = useContext(AuthContext);
  console.log(user);
  const login = () => {
    setUser({
      username: "Helene",
      email: "helene@cab,com",
    });
  };

  const logout = () => {
    setUser(null);
  };

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
              <button onClick={logout}>Log out </button>
            ) : (
              <button onClick={login}>Log in </button>
            )}
            {/* </NavLink> */}
            <span>|</span> <NavLink to="signup"> Sign up</NavLink>
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
