// import React from 'react'
import { useState, useEffect } from 'react'
import RecipeCards from './RecipeCards'
import SearchBox from './SearchBox'


const apiKey:string = "649ac07b69a74c6b9346b453f3d52d72";


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

const [offset, setOffset] = useState<number>(0)
const [query, setQuery] = useState<string>("")
const [cuisine, setCuisine] = useState<string>("")
const [diet, setDiet] = useState<string>("")
const [url, setUrl] = useState<string>(
    `https://api.spoonacular.com/recipes/complexSearch?offset=0&number=24&query=${query}&apiKey=${apiKey}` //! ADD PARAMS
  );



const fetchRecipes = async (url: string) => {
    const response = await fetch(url);
    const data = await response.json();
    console.log("data :>> ", data);
    const recipesList = data.results as RecipeType[];
    console.log(recipesList);
    setRecipes(recipesList);
  };

  useEffect(() => {
    fetchRecipes(url);
  }, [url]);



  return (
    <>
        <h2>Recipes:</h2>
<SearchBox setQuery = {setQuery} setCuisine = {setCuisine} setDiet={setDiet}/>

        <div className='RecipeContainer'>
  {recipes ? (
    recipes.map((recipe) => {
      return (
        <div key={recipe.id} >
          <RecipeCards recipe ={recipe} query={query} cuisine={cuisine} diet={diet}/>
        </div>
      );
    })
  ) : (
    <h1>....WHAT???...</h1>
  )}
</div>

<div className="pagination">
  <button value={"prev"} >← </button>
  <button value={"next"} > →</button>
</div>


{/* <button value={"prev"} onChange={changePageNumber}>← </button>
<button value={"next"} 
        onClick={changePageNumber}> →</button> */}

        
    </>
  )
}

export default Recipes
