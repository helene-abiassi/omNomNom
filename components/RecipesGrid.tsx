// import React from 'react'
import { useState, useEffect } from "react";
import RecipeCards from "./RecipeCards";
import SearchBox from "./SearchBox";
import { RecipeType } from "../types/customTypes";
import BackToTop from "./BackToTop";


function RecipesGrid() {
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
  const [diet, setDiet] = useState<[]>([]);

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
        query={query}
        diet={diet}
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
                  state={{ recipe: recipe }}
                />
              </div>
            );
          })
        ) : (
          <h2 style={{ color: "#FF5F1F", marginLeft: "28rem" }}>
            ....OH NO!! Come back tomorrow ☹️...
          </h2>
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
