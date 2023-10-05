import { Link } from "react-router-dom";
import { RecipeCardProp } from "../types/customTypes";
import FavoriteButton from "./FavoriteButton";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export interface FavoriteRecipeType {
  id: number;
  image: string;
  readyInMinutes: number;
  servings: number;
  title: string;
  url: string;
}

function RecipeCards({ recipe }: RecipeCardProp) {
  const { id, image, title, readyInMinutes, servings } = recipe;
  const { user } = useContext(AuthContext);

  const handleFavoriteClick = async () => {
    console.log("CLICKED :>> ");
    const newFavedRecipe: FavoriteRecipeType = {
      id: recipe.id,
      image: recipe.image,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      title: recipe.title,
      url: `browse/${recipe.id}`,
    };

    try {
      if (user) {
        const userDocRef = doc(db, "favoriteRecipesCollection", `${user.uid}`);
        const recipeDocRef = doc(userDocRef, "recipes", `${recipe.id}`);
        await setDoc(recipeDocRef, newFavedRecipe);

        console.log("Recipe added to favorites!");
      } else {
        console.error("User not authenticated.");
      }
    } catch (error) {
      console.error("Error adding recipe to favorites:", error);
    }
  };

  return (
    <>
      <div className="RecipeCard" key={recipe.id}>
        <FavoriteButton onClick={handleFavoriteClick} recipe={recipe} />
        <img className="RecipeImage" src={image} alt={title} key={id} />
        <h4>{title}</h4>
        <p style={{ textAlign: "left", marginLeft: "2rem" }}>
          Ready in {readyInMinutes} mns. Serves {servings} humans
        </p>
        <Link
          className="linkButton"
          to={`${recipe.id}`}
          state={{ recipe: recipe }}
        >
          View More
        </Link>
      </div>
    </>
  );
}

export default RecipeCards;
