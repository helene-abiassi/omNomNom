// import React from 'react'
import { useState, useEffect } from 'react'
import RecipeCards from './RecipeCards'
import SearchBox from './SearchBox'



export interface RecipeType {
    id: number,
    title: string,
    image: string,
    imageType: string,
}


function RecipesGrid() {

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


const fetchRecipes = async () => {
const url=  `https://api.spoonacular.com/recipes/complexSearch?offset=${offset}&number=24&query=${query}&diet=${diet}&cuisine=${cuisine}&apiKey=${apiKey}`
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    const recipesList = data.results as RecipeType[];
    // console.log(recipesList);
    setQuery(query)
    setCuisine(cuisine)
    setDiet(diet)
    setRecipes(recipesList);
  };

  const changePageNumber = (e: React.MouseEvent<HTMLButtonElement>) => {
    // console.log("e :>> ", e);
    const eventTarget = e.target as HTMLButtonElement;
    const buttonClicked = eventTarget.value;
    if (buttonClicked === "next") {
      setOffset(offset + 24);
    }
    if (buttonClicked === "prev") {
      setOffset(offset - 24);
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [query, offset, cuisine, diet]);



  return (
    <>
<br />
<SearchBox setQuery = {setQuery} setCuisine = {setCuisine} setDiet={setDiet}/>
        <div className='RecipeContainer'>
  {recipes ? (
    recipes.map((recipe) => {
      return (
        <div key={recipe.id} >
          <RecipeCards recipe ={recipe} query={query} cuisine={cuisine} diet={diet} offset={offset} />
        </div>
      );
    })
  ) : (
    <h1>....WHAT???...</h1>
  )}
</div>

<div className="pagination">
  <button style={{fontSize:"18pt"}} value={"prev"}  onClick={changePageNumber}>← </button>
  <button style={{fontSize:"18pt"}} value={"next"}  onClick={changePageNumber}> →</button>
</div>

        
    </>
  )
}

export default RecipesGrid
