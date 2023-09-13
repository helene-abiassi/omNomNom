// import React from 'react'

function NavBar() {
  return (
    <>
        <div className="navBar">
            <nav>
                <a href="/"><i className="fa fa-home"></i></a>
                <span> | </span>
                <a href="/">Browse</a> 
                <span> | </span>
                <a href="/">My Recipes</a>
                <span> | </span>
                <div className="loginNavBar"><a href="/">Log in/ Sign up</a></div>
            </nav>

            <header>
                <img className="mainLogo" src="./public/logo.png" alt="" />
            </header>
        </div>
        
    </>
  )
}

export default NavBar