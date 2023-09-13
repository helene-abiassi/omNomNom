// import React from 'react'


function SearchBox() {
const cuisinesArray = ["African","Asian","American","British","Cajun","Caribbean","Chinese","Eastern European",
"European","French","German","Greek","Indian","Irish","Italian","Japanese","Jewish","Korean","Latin American",
"Mediterranean",'Mexican',"Middle Eastern","Nordic","Southern","Spanish","Thai","Vietnamese"]

const dietsArray = ["Gluten Free", "Ketogenic", "Vegetarian", "Lacto-Vegetarian", "Ovo-Vegetarian", "Vegan", 
"Pescetarian", "Paleo"]

  return (
    <div>
    
       <input className="searchByIngBox" type="text" placeholder='Search by Ingredients'/>  
       <p>Enter up to 3 ingredients, separated by a ,comma,</p>
       <form >   
       <select name="cuisine" id="cuisine">
                <option value={'All'}>Choose cuisine</option>
                {cuisinesArray.map((cuisine, idc) => {
                  return <option key={idc} value={cuisine}>{cuisine}</option>
                })}
                </select>
              </form>
<form action="">
{dietsArray.map((diet:string, idd:number) => {
                  return <div><input type="checkbox" id={idd} value={diet} /> <label for={diet}> {diet}</label><br></br></div>
                })}
</form>




    </div>
  )
}

export default SearchBox