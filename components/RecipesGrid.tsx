// import React from 'react'
import { useState, useEffect } from "react";
import RecipeCards from "./RecipeCards";
import SearchBox from "./SearchBox";
import { RecipeType } from "../types/customTypes";
import BackToTop from "./BackToTop";

const apiKey = "649ac07b69a74c6b9346b453f3d52d72";
// const apiKey = "782103823d1a4893a9bfca971f275b33";

function RecipesGrid() {
  // const {recipes, query, cuisine, diet,  fetchRecipes, setQuery,
  // setCuisine, setDiet, changePageNumber} = useContext(RecipeContext)

  const [recipes, setRecipes] = useState<RecipeType[]>([
    {
      id: 0,
      title: "",
      image: "",
      imageType: "",
      healthScore: 0,
      readyInMinutes: 0,
      servings: 0,
      analyzedInstructions: [
        {
          steps: [
            {
              number: 0,
              steps: "",
              length: {
                number: 0,
                unit: "",
              },
            },
          ],
        },
      ],
      extendedIngredients: [
        {
          original: "",
          measures: {
            metric: {
              amount: 0,
              unitShort: "",
            },
          },
        },
      ],
    },
  ]);

  const [offset, setOffset] = useState<number>(0);
  const [query, setQuery] = useState<string>("");
  const [cuisine, setCuisine] = useState<string>("");
  const [diet, setDiet] = useState<string>("");

  const fetchRecipes = async () => {
    const url = `https://api.spoonacular.com/recipes/complexSearch?offset=${offset}&number=24&query=${query}&diet=${diet}&cuisine=${cuisine}&addRecipeInformation=true&fillIngredients=true&apiKey=${apiKey}`;

    const response = await fetch(url);
    const data = await response.json();
    // console.log(data);
    const recipesList = data.results as RecipeType[];
    console.log(recipesList);
    setQuery(query);
    setCuisine(cuisine);
    setDiet(diet);
    setRecipes(recipesList);
  };

  const changePageNumber = (e: React.MouseEvent<HTMLButtonElement>) => {
    const eventTarget = e.target as HTMLButtonElement;
    const buttonClicked = eventTarget.value;
    if (buttonClicked === "next") {
      setOffset(offset + 24);
      document.documentElement.scrollTop = 0;
    }
    if (buttonClicked === "prev") {
      setOffset(offset - 24);
      document.documentElement.scrollTop = 0;
    }
  };

  useEffect(() => {
    fetchRecipes();
  }, [query, offset, cuisine, diet]);

  return (
    <>
      <br />
      <SearchBox
        setQuery={setQuery}
        setCuisine={setCuisine}
        setDiet={setDiet}
      />
      <div className="RecipeContainer">
        {recipes ? (
          recipes.map((recipe, idRec) => {
            return (
              <div key={idRec}>
                <RecipeCards
                  key={"1" + recipe.id}
                  recipe={recipe}
                  query={query}
                  cuisine={cuisine}
                  diet={diet}
                  offset={offset}
                />
              </div>
            );
          })
        ) : (
          <h1>....WHAT???...</h1>
        )}
      </div>
      <BackToTop />

      <div className="pagination">
        <button
          style={{ fontSize: "18pt" }}
          value={"prev"}
          onClick={changePageNumber}
        >
          ←{" "}
        </button>
        <button
          style={{ fontSize: "18pt" }}
          value={"next"}
          onClick={changePageNumber}
        >
          {" "}
          →
        </button>
      </div>
    </>
  );
}

export default RecipesGrid;
