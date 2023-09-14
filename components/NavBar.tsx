// import React from 'react'
import { Link } from "react-router-dom"

function NavBar() {
  return (
    <>
        <div className="navBar">
            <nav>
                <Link to="/"><i className="fa fa-home"></i></Link>
                <span> | </span>
                <Link to="browse">Browse</Link> 
                <span> | </span>
                <Link to="my-recipes">My Recipes</Link>
                <span> | </span>
                <div className="loginNavBar"><Link to="sign-up">Log in/ Sign up</Link></div>
            </nav>

            <header>
                <img className="mainLogo" src="./public/logo.png" alt="" />
            </header>
        </div>
        
    </>
  )
}

export default NavBar
