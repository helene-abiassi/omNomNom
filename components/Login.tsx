// import React from 'react'

function Login() {
  return (
    <div>
        <br />
        <div className="container">
    <form className="signUpForm" action="/action_page.php">
      {/* <p>Please fill in the information below to create an account:</p> */}
      <p>Fill in the information below to log in:</p>

      <label htmlFor="email">Email:</label>
      <input className="searchInputBox" type="text" placeholder='Enter e-mail...' name='email' autoComplete="current-email" required />
      <br /><label htmlFor="psw">Password:</label>

        <input className="searchInputBox" type="password" placeholder='Enter password...' name='psw'  autoComplete="current-password" required />

<br />
<a href="#">Log in with your Google account</a>
      
    
<br />
      <label>
      <input type="checkbox" checked={true} name="remember"/> Remember me 
    </label><br /> 
    {/* //! Add onChange handler for RememberMe */}
      <button type="submit" className="signupbtn">Login</button>
    </form>

    
{/* //!Use NavigateTo after submit button to dashboard */}

  <img className="loginImg" src="./public/DONUT-copy.png" alt="" />
</div><br />
<p >Don't have an account yet? <a href="signup">Sign up!</a></p>


<br />

</div>
  )
}

export default Login
