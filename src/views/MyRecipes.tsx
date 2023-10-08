import { useEffect, useContext, useState } from "react";
import AuthContext from "../src/context/AuthContext";
import {
  doc,
  onSnapshot,
  deleteDoc,
  collection,
  QuerySnapshot,
  DocumentData,
  QueryDocumentSnapshot,
} from "firebase/firestore";
import { db } from "../src/config/firebaseConfig";
import { Link } from "react-router-dom";

export interface FavoriteRecipeType {
  id: number;
  image: string;
  readyInMinutes: number;
  servings: number;
  title: string;
  url: string;
}

function MyRecipes() {
  const { user } = useContext(AuthContext);
  const [favoritesArray, setFavoritesArray] = useState<
    FavoriteRecipeType[] | null
  >(null);

  const getRealTimeFavorites = () => {
    if (user) {
      const favRef = collection(
        db,
        "favoriteRecipesCollection",
        `${user.uid}`,
        "recipes"
      );

      const unsubscribe = onSnapshot(
        favRef,
        (querySnapshot: QuerySnapshot<DocumentData>) => {
          const favArray: FavoriteRecipeType[] = [];

          querySnapshot.forEach((doc: QueryDocumentSnapshot<DocumentData>) => {
            favArray.push({
              id: doc.id,
              ...(doc.data() as FavoriteRecipeType),
            });
          });

          setFavoritesArray(favArray);
        }
      );

      return () => {
        unsubscribe();
      };
    }
  };

  const handleDeleteClick = async (id: number) => {
    try {
      if (user) {
        const docRef = doc(
          db,
          "favoriteRecipesCollection",
          `${user.uid}`,
          "recipes",
          `${id}`
        );
        if (window.confirm("Are you sure you want to delete this recipe?")) {
          await deleteDoc(docRef);
        }
        console.log("Recipe successfully deleted.");

        setFavoritesArray((prevFavorites) =>
          prevFavorites!.filter((favorite) => favorite.id !== id)
        );
      }
    } catch (error) {
      console.error("Error deleting recipe:", error);
    }
  };

  useEffect(() => {
    const unsubscribe = getRealTimeFavorites();

    return () => {
      unsubscribe!();
    };
  }, [user]);

  return (
    <div style={{ minHeight: "60vh" }}>
      <h3 style={{ color: "black" }}>
        Browse through your favorite recipes 🍳!
      </h3>
      <br />
      {favoritesArray !== null ? (
        <div className="RecipeContainer">
          {favoritesArray.length > 0 ? (
            favoritesArray.map((favorite, favIndex) => (
              <div
                className="RecipeCard"
                key={favIndex}
                style={{ height: "max-content", width: "max-content" }}
              >
                <button
                  onClick={() => handleDeleteClick(favorite.id)}
                  className="favIcon deleteIcon"
                  key={favorite.id}
                >
                  <strong>X</strong>
                </button>
                <img
                  src={favorite.image}
                  alt=""
                  style={{
                    maxHeight: "100%",
                    maxWidth: "100%",
                  }}
                />
                <h4>{favorite.title}</h4>
                <p>
                  Ready in {favorite.readyInMinutes} mins.
                  <br />
                  Serves {favorite.servings} humans.
                </p>

                <Link className="linkButton" to={`${favorite.url}`}>
                  View More
                </Link>
                <br />
              </div>
            ))
          ) : (
            <div>
              <p>Nothing saved yet...</p>
              <Link className="resetButton" to={"/browse"}>
                Browse some of our recipes 🥑
              </Link>
            </div>
          )}
        </div>
      ) : null}
      <br />
    </div>
  );
}

export default MyRecipes;
