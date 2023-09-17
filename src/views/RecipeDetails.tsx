// import React from 'react'
import { useParams } from 'react-router-dom'
import RecipeCards from '../components/RecipeCards';
import { useEffect, useState } from 'react';


function RecipeDetails({recipe}: RecipeCardProp){
// const [recipeIngredients, setRecipeIngredients] = useState([{}])
const [recipeSteps, setRecipeSteps] = useState([{}])


const {recipeId}= useParams()


// const apiKey:string = "649ac07b69a74c6b9346b453f3d52d72";
const apiKey = "782103823d1a4893a9bfca971f275b33"

const recipeUrl = `https://api.spoonacular.com/recipes/${recipeId}/analyzedInstructions?apiKey=${apiKey}`

//Fetch using Id

const fetchRecipeById = async () => {
      const response = await fetch(recipeUrl);
      const recipeData = await response.json();
// console.log('DATA :>> ', recipeData);

const recipeStpInfo=recipeData[0].steps

// setRecipeIngredients(recipeIngInfo );
setRecipeSteps(recipeStpInfo)
    };

    useEffect(() => {
      fetchRecipeById();
    }, []);


  return (
    <div style={{height:"80vh"}}>

      <h2>Time to get cooking!</h2>

      {/* <div>
      <h4>Recipe Steps</h4>
      <ol>
        {recipeSteps.map((recipeStep, stepIndex) => (
          <li key={stepIndex}><strong>Step {recipeStep.number}:</strong>{recipeStep.step}</li>
        ))}
      </ol>
    </div> */}


      <h1>Recipe Ingredients</h1>
    <div>
      <ul>
        {recipeSteps.map((recipeStep, stepIndex) => (
          <li key={stepIndex}>Step {recipeStep.number}:{recipeStep.step}
            <ul>
              {recipeSteps.steps.ingredients.map((ingredient, ingIndex) => (
                <li key={ingIndex}>{ingredient.name}</li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>




{/* 
      <div>
        <h4>Steps:</h4>
        {recipeSteps.map((recipeStep, ir) => (
          <p key={ir}>{recipeStep.step}</p>
        ))}
      </div> */}

    </div>
  )
}

export default RecipeDetails
