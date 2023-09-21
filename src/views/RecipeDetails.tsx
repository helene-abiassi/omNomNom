// import React from 'react'
// import { useParams } from 'react-router-dom'
// import RecipeCards from '../components/RecipeCards';
import { useLocation } from "react-router-dom";

function RecipeDetails() {
  const location = useLocation();
  const { recipe } = location.state;
  console.log("recipe :>> ", recipe);

  return (
    <div style={{ color: "black" }}>
      <h3 style={{ textAlign: "center" }}>{recipe.title}</h3>

      <img
        style={{ width: "40%", marginBottom: "0%" }}
        src={recipe.image}
        alt={recipe.name}
      />
      <div className="recipeCard">
        <div>
          <button className="favIcon">❤ 0</button>

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
      <h3>Comments:</h3>
    </div>
  );
}

export default RecipeDetails;
