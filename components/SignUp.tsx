// import React from 'react'

function SignUp() {
  return (
    <div>
      <br />
        <div className="container"> 
    <form className="signUpForm" action="/action_page.php">
      {/* <p>Please fill in the information below to create an account:</p> */}
      <p>Fill in the information below to sign up:</p>

      <label htmlFor="email">Email:</label>
      <input className="searchInputBox" type="text" placeholder='Enter e-mail...' name='email' required />
     <br /> <label htmlFor="psw">Password:</label>
        <input className="searchInputBox" type="password" placeholder='Enter password...' name='psw' required />

    <br />
        <a href="#">Sign up with your Google account</a>
      {/* <label>
      <input type="checkbox" checked={true} name="remember"/> Remember me
    </label> */}
    <p style={{textAlign:'left'}}>By creating an account, you <br />agree to our <a href="#">Terms & Privacy</a>.</p>
      <button type="submit" className="signupbtn">Sign up</button>
    </form>

  <img className="loginImg" src="./public/DONUT-copy.png" alt="" />
</div><br />
<p >Already have an account? <a href="login">Log in!</a></p>


<br />
</div>
  )
}

export default SignUp