import '../src/style/SearchBox.css'


import { ChangeEvent } from "react";
// import Recipes from "./RecipesGrid";

export interface searchProps {
    query: string,
    cuisine: string,
    diet: string,
  }

   interface searchFunctions {
    setQuery:(query:string)=> void
  setCuisine:(cuisine:string) => void,
  setDiet:(diet:string) => void,


  }

function SearchBox({setQuery, setCuisine, setDiet} : searchFunctions) {
    
const cuisinesArray = ["African","Asian","American","British","Cajun","Caribbean","Chinese","Eastern European",
"European","French","German","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean","Latin American",
"Mediterranean",'Mexican',"Middle Eastern","Nordic","Southern","Spanish","Thai","Vietnamese"]

const dietsArray = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", 
"Pescetarian", "Paleo"]

const handleSearchInput = (e : ChangeEvent<HTMLInputElement>,) => {
//    const casedRecipeName = recipe.toLowerCase()
const normalizedQuery = e.target.value.toLowerCase()
// console.log(normalizedQuery);
setQuery(normalizedQuery);

  }

  const handleCuisineInput = (e : ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    setCuisine(e.target.value);
  }
  
  const handleDietInput = (e : ChangeEvent<HTMLInputElement>) => {
    // console.log(e);
    setDiet(e.target.value);
  }


  return (
    <div className="mainSearchBox">
      <div className="searchBox">
      
             <div className="searchByCombo">
               <div className="searchByIngBox">
                   <input  className="searchInputBox" type="text" placeholder='Search by Ingredients...' onChange={handleSearchInput}/>
                   <p>Enter up to 3 ingredients, <br></br> separated by a ,comma,</p>
               </div>
                      <form  onChange={handleCuisineInput}>
                      <select className="searchByCuiBox" name="cuisine" id="cuisine">
                    <option value={'All'} >Search by cuisine</option>
                    {cuisinesArray.map((cuisine, idc) => {
                      return <option key={idc} value={cuisine} >{cuisine}</option>
                    })}
                    </select>
                  </form>
             </div>
      <form onChange={handleDietInput}>
      {dietsArray.map((diet:string, idd:number) => {
                    return <div className="radioButtons"><input type="checkbox" id={idd} value={diet} />
                    <label for={diet} > {diet}</label><br></br></div>
                  })}
      </form>
      </div>
    </div>
  )
}

export default SearchBox
