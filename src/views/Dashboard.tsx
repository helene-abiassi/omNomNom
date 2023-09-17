// import React from 'react'
import '../src/style/dashboard.css'
import { useNavigate } from 'react-router-dom'

function Dashboard() {

  const dashNavigateTo = useNavigate()

const goBrowseDash = ()=>{
  dashNavigateTo("/browse")
}

const goMyRecipesDash = ()=>{
  dashNavigateTo("/my-recipes")
}

const goLogOutDash = ()=>{
  dashNavigateTo("/")
}

  return (
    <div className="dashboard" style={{height: "60vh" }}>
      <h2>Welcome {"user.name"}</h2>
      <button onClick={goBrowseDash} className="dashboardBtn">Browse</button>
      <button onClick={goMyRecipesDash} className="dashboardBtn"> My Recipes</button>
      <button onClick={goLogOutDash} className="dashboardBtn">Log out</button>

<a style={{marginTop: "5rem" }} href="/">Delete your account</a>
    



    </div>
  )
}

export default Dashboard
