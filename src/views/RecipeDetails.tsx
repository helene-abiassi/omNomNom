import { useLocation } from "react-router-dom";
import Comments from "../src/components/Comments";
import BackButton from "../src/components/BackButton";
import BackToTop from "../src/components/BackToTop";
import FavoriteButton from "../src/components/FavoriteButton";
import { useContext, useEffect, useState } from "react";
import AuthContext from "../src/context/AuthContext";
import { deleteDoc, doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../src/config/firebaseConfig";
import { FavoriteRecipeType } from "./MyRecipes";
import { RecipeType } from "../src/types/customTypes";

function RecipeDetails() {
  const location = useLocation();
  const { recipe } = location.state as RecipeType;

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
        const recipeDocRef = doc(userDocRef, "recipes", `${recipe.id}`);
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
    window.scrollTo(0, 0);
    checkFavoriteStatus();
  }, [user, recipe.id]);

  return (
    <div style={{ color: "black" }}>
      <div id="toast"></div>

      <div className="backHeader">
        <BackButton />
        <h2 style={{ textAlign: "center" }}>{recipe.title}</h2>
      </div>

      <img className="recipePageImg" src={recipe.image} alt={recipe.name} />
      <div className="recipeCard">
        <div>
          <div className="recipePageHeader">
            <h3>Ingredients:</h3>
            <div id="toast"></div>

            <FavoriteButton
              onClick={handleFavoriteClick}
              recipe={recipe}
              isBlack={isBlack}
              setIsBlack={setIsBlack}
            />
          </div>

          <ul>
            {recipe.extendedIngredients.map((ingredient, ingInd: number) => {
              return (
                <div key={ingInd}>
                  <li key={ingInd}>
                    {ingredient.original} ({ingredient.measures.metric.amount}{" "}
                    {ingredient.measures.metric.unitShort})
                  </li>
                </div>
              );
            })}
          </ul>
          <h3>Instructions: </h3>
          <ul>
            {recipe.analyzedInstructions[0].steps.map(
              (step, stepInd: number) => {
                return (
                  <>
                    <li key={stepInd} style={{ width: "80%" }}>
                      <strong>Step {step.number}:</strong> <br />
                      {step.step}
                    </li>
                    {/* <br /> */}
                  </>
                );
              }
            )}
          </ul>
        </div>
      </div>
      <BackToTop />
      <Comments />
    </div>
  );
}

export default RecipeDetails;
