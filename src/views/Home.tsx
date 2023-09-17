// import React from 'react'
// import BrowseRecipes from './BrowseRecipes'

function Home() {
  return (
    <> <div style={{height: "80vh" }} >
      <img className="homePageImg" src="./public/pasta.webp" alt="" />
<p style={{ alignContent: 'center'}} >Look for fun and colorful recipes, based off 
  what is <br />left in your fridge, your favorite cuisine 
  or preferred diet!</p>
  <p>Become a member and build 
your own hangry pantry!</p>

    <button><a href="browse">Let's go!</a></button>
 </div>
    </>
  )
}

export default Home
