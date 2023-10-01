// import React from 'react'

import { useContext } from "react";
// import { useNavigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";

function FavoriteButton() {
  const { user } = useContext(AuthContext);
  // const navigateTo = useNavigate();

  const saveToFavorites = () => {
    console.log("Saved!");
  };

  const redirectLogIn = () => {
    // navigateTo("/login");
    alert("You need to log in to be able to save recipes!");
  };

  const handleFavoriteCLick = () => {
    user ? saveToFavorites() : redirectLogIn();
  };
  return (
    <div>
      {/* <input type="checkbox" value="favIcon"> */}
      {/* <label htmlFor="favIcon"> */}
      <button onClick={handleFavoriteCLick} className="favIcon">
        ❤
      </button>
      {/* </label> */}
      {/* </input> */}
    </div>
  );
}

export default FavoriteButton;
