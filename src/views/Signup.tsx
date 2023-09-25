import { useLocation } from "react-router-dom";
import Comments from "../src/components/Comments";
import BackButton from "../src/components/BackButton";
import BackToTop from "../src/components/BackToTop";

function RecipeDetails() {
  const location = useLocation();
  const { recipe } = location.state;
  // console.log("recipe :>> ", recipe);

  const saveToFavorites = () => {
    console.log("Saved!");
  };

  const handleFavoriteCLick = () => {
    saveToFavorites();
  };

  return (
    <div style={{ color: "black" }}>
      <BackButton />
      <h3 style={{ textAlign: "center" }}>{recipe.title}</h3>

      <img
        style={{ width: "40%", marginBottom: "0%" }}
        src={recipe.image}
        alt={recipe.name}
      />
      <div className="recipeCard">
        <div>
          <button onClick={handleFavoriteCLick} className="favIcon">
            ❤ 0
          </button>

          <h4>Ingredients:</h4>

          <ul>
            {recipe.extendedIngredients.map((ingredient, ingInd) => {
              return (
                <>
                  <li key={ingInd}>
                    {ingredient.original} ({ingredient.measures.metric.amount}{" "}
                    {ingredient.measures.metric.unitShort})
                  </li>
                </>
              );
            })}
          </ul>
          <h4>Instructions: </h4>
          <ul>
            {recipe.analyzedInstructions[0].steps.map((step) => {
              return (
                <li style={{ width: "80%" }}>
                  <strong>Step {step.number}:</strong> {step.step}
                </li>
              );
            })}
          </ul>
        </div>
      </div>
      <BackToTop />
      <h3>Comments:</h3>
      <Comments />
    </div>
  );
}

export default RecipeDetails;
