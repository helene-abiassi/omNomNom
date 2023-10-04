import { useLocation } from "react-router-dom";
import Comments from "../src/components/Comments";
import BackButton from "../src/components/BackButton";
import BackToTop from "../src/components/BackToTop";
import FavoriteButton from "../src/components/FavoriteButton";
import { useContext, useEffect } from "react";
import AuthContext from "../src/context/AuthContext";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../src/config/firebaseConfig";

function RecipeDetails() {
  const location = useLocation();
  const { recipe } = location.state;

  // const { id, image, title, readyInMinutes, servings } = recipe;
  const { user } = useContext(AuthContext);

  const handleFavoriteClick = async () => {
    console.log("CLICKED :>> ");
    const newFavedRecipe: FavoriteRecipeType = {
      id: recipe.id,
      image: recipe.image,
      readyInMinutes: recipe.readyInMinutes,
      servings: recipe.servings,
      title: recipe.title,
      url: `/browse/${recipe.id}`,
    };

    try {
      if (user) {
        const userDocRef = doc(db, "favoriteRecipesCollection", `${user.uid}`);
        const recipeDocRef = doc(userDocRef, "recipes", `${recipe.id}`);
        await setDoc(recipeDocRef, newFavedRecipe);

        console.log("Recipe added to favorites!");
      } else {
        console.error("User not authenticated.");
        // You might want to handle the case where the user is not authenticated.
      }
    } catch (error) {
      console.error("Error adding recipe to favorites:", error);
    }
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div style={{ color: "black" }}>
      <div className="backHeader">
        <BackButton />
        <h2 style={{ textAlign: "center" }}>{recipe.title}</h2>
      </div>

      <img className="recipePageImg" src={recipe.image} alt={recipe.name} />
      <div className="recipeCard">
        <div>
          <div className="recipePageHeader">
            <h3>Ingredients:</h3>
            <FavoriteButton onClick={handleFavoriteClick} recipe={recipe} />
          </div>

          <ul>
            {recipe.extendedIngredients.map((ingredient, ingInd) => {
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
            {recipe.analyzedInstructions[0].steps.map((step, stepInd) => {
              return (
                <>
                  <li key={stepInd} style={{ width: "80%" }}>
                    <strong>Step {step.number}:</strong> <br />
                    {step.step}
                  </li>
                  {/* <br /> */}
                </>
              );
            })}
          </ul>
        </div>
      </div>
      <BackToTop />
      <Comments />
    </div>
  );
}

export default RecipeDetails;
