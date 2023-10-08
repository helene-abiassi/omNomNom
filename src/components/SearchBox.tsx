import "../style/SearchBoxs.css";
import { ChangeEvent, useEffect, useState } from "react";
import { searchFunctions } from "../types/customTypes";

function SearchBox({
  setQuery,
  setCuisine,
  setDiet,
  diet,
  query,
}: searchFunctions) {
  const cuisinesArray = [
    "African",
    "Asian",
    "American",
    "British",
    "Cajun",
    "Caribbean",
    "Chinese",
    "Eastern European",
    "European",
    "French",
    "German",
    "Greek",
    "Indian",
    "Irish",
    "Italian",
    "Japanese",
    "Jewish",
    "Korean",
    "Latin American",
    "Mediterranean",
    "Mexican",
    "Middle Eastern",
    "Nordic",
    "Southern",
    "Spanish",
    "Thai",
    "Vietnamese",
  ];

  const dietsArray = [
    "Gluten Free",
    "Ketogenic",
    "Vegetarian",
    "Lacto-Vegetarian",
    "Ovo-Vegetarian",
    "Vegan",
    "Pescetarian",
    "Paleo",
  ];

  const [selectedCuisine, setSelectedCuisine] = useState("");

  const handleSearchInput = (e: ChangeEvent<HTMLInputElement>) => {
    const normalizedQuery = e.target.value.toLowerCase();
    setQuery(normalizedQuery);
  };

  const handleCuisineInput = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedValue: string = e.target.value;
    setCuisine(selectedValue);
    setSelectedCuisine(selectedValue);
  };

  const handleDietInput = (e: ChangeEvent<HTMLInputElement>) => {
    const selectedDiet: string = e.target.value;
    const updatedDiet: string[] = selectedDiet
      .split(",")
      .map((item: string) => item.trim());

    console.log("diet :>> ", diet);

    setDiet((prevDiet: string[]) => {
      if (prevDiet.includes(selectedDiet)) {
        return prevDiet.filter((item: string) => item !== selectedDiet);
      } else {
        return [...prevDiet, ...updatedDiet];
      }
    });
  };

  const resetFilters = () => {
    setCuisine("");
    setSelectedCuisine("");
    setQuery("");
    setDiet([]);
    const checkboxes = document.querySelectorAll<HTMLInputElement>(
      'input[type="checkbox"]'
    );
    checkboxes.forEach((checkbox) => {
      checkbox.checked = false;
    });
  };

  useEffect(() => {
    console.log("diet", diet);
  }, [diet]);

  return (
    <div className="mainSearchBox">
      <div className="searchBox">
        <div className="searchByCombo">
          <div className="searchByIngBox">
            <input
              className="searchInputBox"
              type="text"
              value={query}
              placeholder="Search..."
              onChange={handleSearchInput}
            />
          </div>
          <form>
            <select
              onChange={handleCuisineInput}
              className="searchByCuiBox"
              name="cuisine"
              id="cuisine"
              value={selectedCuisine}
            >
              <option value={""}>Search by cuisine</option>
              {cuisinesArray &&
                cuisinesArray.map((cuisine, idc) => {
                  return (
                    <option key={idc} value={cuisine}>
                      {cuisine}
                    </option>
                  );
                })}
            </select>
          </form>
          <button className="resetButton" onClick={resetFilters}>
            Reset
          </button>
        </div>
        <form className="radioButtons" onChange={handleDietInput}>
          {dietsArray.map((diet, idd) => {
            return (
              <div key={idd}>
                <input type="checkbox" id={idd} value={diet} key={idd} />
                <label key={"1" + idd} htmlFor={diet}>
                  {" "}
                  {diet}
                </label>
                <br></br>
              </div>
            );
          })}
        </form>
        <br />
      </div>
    </div>
  );
}

export default SearchBox;
