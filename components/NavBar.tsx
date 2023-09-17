// import React from 'react'
import { NavLink } from "react-router-dom"

function NavBar() {
  return (
    <>
        <div className="navBar">
            <nav>
                <div className="navLeft">
                  <NavLink to="/"><i className="fa fa-home"></i></NavLink>
                  <span> | </span>
                  <NavLink to="browse">Browse</NavLink>
                  <span> | </span>
                  <NavLink to="my-recipes">My Recipes</NavLink>
                </div>
                {/* <span> | </span> */}
                <div className="loginNavBar">
                  <NavLink to="login">Log in </NavLink><span>|</span> <NavLink to="signup"> Sign up</NavLink>
                  </div>
            </nav>

            <header>
                <img className="mainLogo" src="./public/logo.png" alt="" />
            </header>
        </div>
        
    </>
  )
}

export default NavBar
