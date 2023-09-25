// import { Link } from 'react-router-dom';
import { Link, useNavigate } from "react-router-dom";
import { RecipeCardProp } from "../types/customTypes";
import BackButton from "./BackButton";
import AuthContext from "../context/AuthContext";
import { useContext } from "react";

function RecipeCards({ recipe }: RecipeCardProp) {
  const { id, image, title, readyInMinutes, servings } = recipe;
  const { user } = useContext(AuthContext);
  const navigateTo = useNavigate();

  // console.log('recipe.title :>> ', recipe.title);

  const saveToFavorites = () => {
    console.log("Saved!");
  };

  const redirectLogIn = () => {
    navigateTo("/login");
    alert("You need to be logged to be able to save recipes!");
  };

  const handleFavoriteCLick = () => {
    user ? saveToFavorites() : redirectLogIn();
  };
  return (
    <>
      <div className="RecipeCard" key={recipe.id}>
        <button onClick={handleFavoriteCLick} className="favIcon">
          ❤ 0
        </button>
        <img className="RecipeImage" src={image} alt={title} key={id} />
        <h3>{title}</h3>
        <p style={{ textAlign: "left", marginLeft: "2rem" }}>
          Ready in {readyInMinutes} mns. Serves {servings} humans
        </p>
        <Link
          className="linkButton"
          to={`${recipe.id}`}
          state={{ recipe: recipe }}
        >
          <h4>View More</h4>
        </Link>
      </div>
    </>
  );
}

export default RecipeCards;
