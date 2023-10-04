import { useContext, useState } from "react";
import AuthContext from "../context/AuthContext";

function FavoriteButton({ onClick }) {
  const { user } = useContext(AuthContext);
  const [isBlack, setIsBlack] = useState(false);

  const toggleFavoriteClick = () => {
    if (user) {
      setIsBlack((prev) => !prev);
      onClick();
    } else {
      alert("You need to log in to be able to save recipes!");
    }
  };

  return (
    <div>
      <button
        style={{ color: isBlack ? "black" : "white" }}
        onClick={toggleFavoriteClick}
        className="favIcon"
        isBlack={isBlack}
        setIsBlack={setIsBlack}
      >
        ❤
      </button>
    </div>
  );
}

export default FavoriteButton;
