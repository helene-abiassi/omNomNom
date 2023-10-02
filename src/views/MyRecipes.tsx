import { useContext, useEffect, useState } from "react";
import AuthContext from "../src/context/AuthContext";
import { doc, getDoc } from "firebase/firestore";
import { db } from "../src/config/firebaseConfig";
import { Link } from "react-router-dom";

export interface FavoriteRecipesType {
  recipe: [
    {
      id: number;
      image: string;
      readyInMinutes: number;
      servings: number;
      title: string;
      url: string;
    }
  ];
}

function MyRecipes() {
  const { user } = useContext(AuthContext);
  const [favoritesArray, setFavoritesArray] = useState<FavoriteRecipesType[]>(
    []
  );
  const [isBlack, setIsBlack] = useState(true);

  const handleFavoriteClick = () => {
    user
      ? setIsBlack((prev) => !prev)
      : alert("You need to log in to be able to save recipes!");
  };


  const getFavorites = async () => {
    try {
      const docRef = doc(db, "favoriteRecipesCollection", `${user?.uid}`);
      const docSnap = await getDoc(docRef);
      console.log("docSnap :>> ", docSnap.data());
      if (docSnap.exists()) {
        const data = docSnap.data();
        if (data && data.recipe) {
          setFavoritesArray([{ recipe: data.recipe }]);
        } else {
          setFavoritesArray([]);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  console.log("user.uid :>> ", user.uid);

  useEffect(() => {
    getFavorites();
  }, []);

  return (
    <div>
      <p>Browse through your favorite recipes!</p>
      <br />
  
      <>
        {favoritesArray ? (
          <div className="RecipeContainer">
            {favoritesArray ? (
              favoritesArray.map((favorite, favIndex) => {
                return (
                  <div
                    className="RecipeCard"
                    key={favIndex}
                    style={{ height: "max-content", width: "max-content" }}
                  >
                    {/* <FavoriteButton /> */}
                    <button
                      style={{ color: isBlack ? "black" : "white" }}
                      onClick={handleFavoriteClick}
                      className="favIcon"
                    >
                      ❤
                    </button>

                    <img
                      style={{ width: "15rem" }}
                      src={favorite.recipe.image}
                      alt=""
                    />
                    <h4>{favorite.recipe.title}</h4>
                    <p>
                      Ready in {favorite.recipe.readyInMinutes} mns.
                      <br />
                      Serves {favorite.recipe.servings} humans.
                    </p>
                    <a
                      className="linkButton"
                      href={`/browse/${favorite.recipe.id}`}
                    >
                      View More
                    </a>
                    <br />
                  </div>
                );
              })
            ) : (
              <>
                <p>Nothing saved yet...</p>
                <Link className="resetButton" to={"/browse"}>
                  Browse some of our recipes 🥑
                </Link>
              </>
            )}
          </div>
        ) : null}
      </>
      <br />
    </div>
  );
}

export default MyRecipes;
