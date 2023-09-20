import { ReactNode, createContext, useState } from "react";
import { RecipeType, searchProps } from "../types/customTypes";

// const apiKey = "782103823d1a4893a9bfca971f275b33"


export interface RecipeContextInterface {
    recipes: RecipeType[],
    search:searchProps,
    url: string | null,
    fetchRecipes:(url:string)=>Promise<void>,
    setQuery:(query:string)=> void
    setCuisine:(cuisine:string) => void,
    setDiet:(diet:string) => void,
}


const initialContext = {
    recipes:{
        id: 0,
        title: "",
        image: "",
        imageType: "",
        healthScore: 0,
        readyInMinutes:0,
        servings:0,
        analyzedInstructions:[
          {
            steps: [
              {
                number:0,
                steps:"",
                length:{
                  number:0,
                  unit:"",
                }
              }
            ]
        }],
        extendedIngredients: [
          {
            original:"",
            measures:{
              metric:{
                amount:0, 
                unitShort:"",
              }
            }
          }
        ]
        
    },
      search: {
        query:"",
        cuisine:"",
        diet:"",
      },   
      url:null,
      fetchRecipes:()=>Promise.resolve(),
      setQuery:()=> console.log("not initialized"),
      setCuisine:() => ("not initialized"),
      setDiet:() => ("not initialized"),
      chanegePageNumber:() => ("not initialized"),

}

interface ProviderPropsType {
    children: ReactNode;
  }

export const RecipeContext = createContext<RecipeContextInterface>(initialContext);


export const RecipeContextProvider= (props:ProviderPropsType) =>{


const [recipes, setRecipes] = useState<RecipeType[]>([
    {
      id: 0,
      title: "",
      image: "",
      imageType: "",
      healthScore: 0,
      readyInMinutes:0,
      servings:0,
      analyzedInstructions:[
        {
          steps: [
            {
              number:0,
              steps:"",
              length:{
                number:0,
                unit:"",
              }
            }
          ]
      }],
      extendedIngredients: [
        {
          original:"",
          measures:{
            metric:{
              amount:0, 
              unitShort:"",
            }
          }
        }
      ]
      
  }
  ])


  const [offset, setOffset] = useState<number>(0)
  const [query, setQuery] = useState<string>("")
const [cuisine, setCuisine] = useState<string>("")
const [diet, setDiet] = useState<string>("")
  

  const fetchRecipes = async () => {
    const url= `https://api.spoonacular.com/recipes/complexSearch?offset=${offset}&number=24&query=${query}&diet=${diet}&cuisine=${cuisine}&addRecipeInformation=true&fillIngredients=true&apiKey=${apiKey}`
    
        const response = await fetch(url);
        const data = await response.json();
        // console.log(data);
        const recipesList = data.results as RecipeType[];
        console.log(recipesList);
        setQuery(query)
        setCuisine(cuisine)
        setDiet(diet)
        setRecipes(recipesList);
      };

      const changePageNumber = (e: React.MouseEvent<HTMLButtonElement>) => {
        const eventTarget = e.target as HTMLButtonElement;
        const buttonClicked = eventTarget.value;
        if (buttonClicked === "next") {
          setOffset(offset + 24);
        }
        if (buttonClicked === "prev") {
          setOffset(offset - 24);
        }
      };
    


    return(
        <RecipeContext.Provider value={{recipes, query, cuisine, diet,  fetchRecipes, setQuery, setCuisine, setDiet,changePageNumber}}>

        {props.children}

        </RecipeContext.Provider>
    )
}


