// import React from 'react'
import { useState, useEffect } from 'react'
import RecipeCards from './RecipeCards'

const apiKey= "649ac07b69a74c6b9346b453f3d52d72";

export interface RecipeType {
    id: number,
    title: string,
    image: string,
    imageType: string,
}
function Recipes() {

const [recipes, setRecipes] = useState<RecipeType[]>([
    {
        id: 0,
        title: "",
        image: "",
        imageType: "",
    }
])
const [url, setUrl] = useState<string>(
    `https://api.spoonacular.com/recipes/complexSearch?apiKey=${apiKey}`
  );

// console.log(url);

const fetchRecipes = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log("data :>> ", data);
    const recipesList = data.results as RecipeType[];
    console.log(recipesList);
    // const infoData = data.info as InfoType;

    // console.log("recipesList :>> ", recipesList);
    setRecipes(recipesList);
  };

  useEffect(() => {
    fetchRecipes(url);
  }, [url]);



  return (
    <div>
        <h2>Recipes:</h2>

        <div className='RecipeContainer'>
  {recipes ? (
    recipes.map((recipe) => {
      return (
        <div key={recipe.id} >
          <RecipeCards recipe ={recipe} />
        </div>
      );
    })
  ) : (
    <h1>....WHAT???...</h1>
  )}
</div>
        
    </div>
  )
}

export default Recipes