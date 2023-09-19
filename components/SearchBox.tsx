import '../src/style/SearchBox.css'
import { ChangeEvent } from "react";
import { searchFunctions } from '../src/types/customTypes';
// import Recipes from "./RecipesGrid";


  

function SearchBox({setQuery, setCuisine, setDiet} : searchFunctions) {
    
const cuisinesArray = ["African","Asian","American","British","Cajun","Caribbean","Chinese","Eastern European",
"European","French","German","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean","Latin American",
"Mediterranean",'Mexican',"Middle Eastern","Nordic","Southern","Spanish","Thai","Vietnamese"]

const dietsArray = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", 
"Pescetarian", "Paleo"]

const handleSearchInput = (e : ChangeEvent<HTMLInputElement>,) => {
//    const casedRecipeName = recipe.toLowerCase()
const normalizedQuery = e.target.value.toLowerCase()
setQuery(normalizedQuery);

  }

  const handleCuisineInput = (e : ChangeEvent<HTMLInputElement>) => {
    setCuisine(e.target.value);
  }
  
  const handleDietInput = (e : ChangeEvent<HTMLInputElement>) => {
    setDiet(e.target.value);
  }

  const refresh = () => window.location.reload()



  return (
    <div className="mainSearchBox">
      <div className="searchBox">
      
             <div className="searchByCombo">
               <div className="searchByIngBox">
                   <input  className="searchInputBox" type="text" placeholder='Search...' onChange={handleSearchInput}/>
                   {/* <p>Enter up to 3 ingredients, <br></br> separated by a ,comma,</p> */}
               </div>
                      <form  >
                      <select onChange={handleCuisineInput} className="searchByCuiBox" name="cuisine" id="cuisine">
                    <option value={"All"} >Search by cuisine</option>
                    {cuisinesArray && cuisinesArray.map((cuisine, idc) => {
                      return <option key={idc} value={cuisine} >{cuisine}</option>
                    })}
                    </select>
                  </form>
        <button className="resetButton" onClick={refresh}>Reset</button>
             </div>
      <form className="radioButtons" onChange={handleDietInput}>
      {dietsArray.map((diet, idd) => {
                    return <div ><input type="checkbox" id={idd} value={diet} key={idd} />
                    <label key={"1" + idd} htmlFor={diet} > {diet}</label><br></br></div>
                  })}
        
      </form><br />
      </div>
    </div>
  )
}

export default SearchBox
