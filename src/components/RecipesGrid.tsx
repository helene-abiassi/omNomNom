import { useState, useEffect } from "react";
import RecipeCards from "./RecipeCards";
import SearchBox from "./SearchBox";
import { RecipeType } from "../types/customTypes";
import BackToTop from "./BackToTop";

// const apiKey = "649ac07b69a74c6b9346b453f3d52d72";
// const apiKey = "782103823d1a4893a9bfca971f275b33";
// const apiKey = "e7eff027ad8b4b8c8338c713f0a6463e";

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
  const [diet, setDiet] = useState<string[]>([""]);
  const [apiKey, setApiKey] = useState("649ac07b69a74c6b9346b453f3d52d72");

  const fetchRecipes = async () => {
    const url = `https://api.spoonacular.com/recipes/complexSearch?offset=${offset}&number=24&query=${query}&diet=${diet}&cuisine=${cuisine}&addRecipeInformation=true&fillIngredients=true&apiKey=${apiKey}`;

    try {
      const response = await fetch(url);

      if (response.status === 200) {
        const data = await response.json();
        const recipesList = data.results as RecipeType[];
        console.log(recipesList);
        setQuery(query);
        setCuisine(cuisine);
        setDiet(diet);
        setRecipes(recipesList);
      } else if (response.status === 402) {
        const newApiKey = generateNewApiKey();
        const newUrl = `https://api.spoonacular.com/recipes/complexSearch?offset=${offset}&number=24&query=${query}&diet=${diet}&cuisine=${cuisine}&addRecipeInformation=true&fillIngredients=true&apiKey=${newApiKey}`;

        const newResponse = await fetch(newUrl);
        if (newResponse.status === 200) {
          const newData = await newResponse.json();
          const recipesList = newData.results as RecipeType[];
          console.log(recipesList);
          setQuery(query);
          setCuisine(cuisine);
          setDiet(diet);
          setRecipes(recipesList);
          setApiKey(newApiKey);
        }
      }
    } catch (error) {
      console.log("error :>> ", error);
    }
  };

  function generateNewApiKey() {
    const newApiKey = "782103823d1a4893a9bfca971f275b33";
    return newApiKey;
  }

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
                <RecipeCards key={"1" + recipe.id} recipe={recipe} />
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
