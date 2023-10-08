import { useContext } from "react";
import AuthContext from "../context/AuthContext";

export interface FavoriteButtonProps {
  isBlack: boolean;
  onClick: () => void;
  setIsBlack: React.Dispatch<React.SetStateAction<boolean>>;
}

function FavoriteButton({ onClick, isBlack, setIsBlack }: FavoriteButtonProps) {
  const { user } = useContext(AuthContext);

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
      >
        ❤
      </button>
    </div>
  );
}

export default FavoriteButton;
