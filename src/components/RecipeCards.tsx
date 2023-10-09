import { Link } from "react-router-dom";
import { RecipeType } from "../types/customTypes";
import "../style/toast.css";
import FavoriteButton from "./FavoriteButton";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../context/AuthContext";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../config/firebaseConfig";

export interface FavoriteRecipeType {
  id: number;
  image: string;
  readyInMinutes: number;
  servings: number;
  title: string;
  url: string;
}

export interface RecipeCardProp {
  recipe: RecipeType | RecipeType[];
}
function RecipeCards({ recipe }: RecipeCardProp) {
  const { id, image, title, readyInMinutes, servings } = recipe as RecipeType;
  const { user } = useContext(AuthContext);
  const [isBlack, setIsBlack] = useState(false);

  const showToast = (message: string) => {
    var x = document.getElementById("toast") as HTMLBodyElement;
    x.innerHTML = message;
    x.className = "show";

    setTimeout(function () {
      x.className = x.className.replace("show", "");
    }, 3000);
  };

  const handleFavoriteClick = async () => {
    const newFavedRecipe: FavoriteRecipeType = {
      id: id,
      image: image,
      readyInMinutes: readyInMinutes,
      servings: servings,
      title: title,
      url: `browse/${id}`,
    };
    try {
      if (user) {
        const userDocRef = doc(db, "favoriteRecipesCollection", `${user.uid}`);
        const recipeDocRef = doc(userDocRef, "recipes", `${id}`);
        const docSnap = await getDoc(recipeDocRef);

        if (docSnap.exists()) {
          await deleteDoc(recipeDocRef);
          setIsBlack(false);
          showToast("Removed from favorites🥦!");
        } else {
          await setDoc(recipeDocRef, newFavedRecipe);
          setIsBlack(true);
          showToast("Added to favorites🍏!");
        }
      } else {
        console.error("User not authenticated.");
      }
    } catch (error) {
      console.error("Error toggling favorite status:", error);
    }
  };

  const checkFavoriteStatus = async () => {
    try {
      if (user) {
        const userDocRef = doc(db, "favoriteRecipesCollection", `${user.uid}`);
        const recipeDocRef = doc(userDocRef, "recipes", `${id}`);
        const docSnap = await getDoc(recipeDocRef);
        if (docSnap.exists()) {
          setIsBlack(true);
        }
      }
    } catch (error) {
      console.error("Error checking favorite status:", error);
    }
  };

  useEffect(() => {
    checkFavoriteStatus();
  }, [user, id]);

  return (
    <>
      <div id="toast"></div>

      <div className="RecipeCard" key={id}>
        <FavoriteButton
          onClick={handleFavoriteClick}
          isBlack={isBlack}
          setIsBlack={setIsBlack}
        />
        <img className="RecipeImage" src={image} alt={title} key={id} />
        <h4>{title}</h4>
        <p style={{ textAlign: "left", marginLeft: "2rem" }}>
          Ready in {readyInMinutes} mns. Serves {servings} humans
        </p>
        <Link className="linkButton" to={`${id}`} state={{ recipe: recipe }}>
          View More
        </Link>
      </div>
    </>
  );
}

export default RecipeCards;
