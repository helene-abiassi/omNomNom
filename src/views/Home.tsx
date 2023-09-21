// import React from 'react'
// import BrowseRecipes from './BrowseRecipes'

import { useContext } from "react";
import { AuthContext } from "../src/context/AuthContext";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {" "}
      <div style={{ height: "80vh" }}>
        <img className="homePageImg" src="./public/pasta.webp" alt="" />
        <h2>Hey {user?.email}</h2>
        <p style={{ alignContent: "center" }}>
          Look for fun and colorful recipes, based off what is <br />
          left in your fridge, your favorite cuisine or preferred diet!
        </p>
        <p>Become a member and build your own hangry pantry!</p>

        <a
          style={{
            backgroundColor: "black",
            padding: "5px",
            borderRadius: "3px",
          }}
          href="browse"
        >
          Let's go!
        </a>
      </div>
    </>
  );
}

export default Home;
