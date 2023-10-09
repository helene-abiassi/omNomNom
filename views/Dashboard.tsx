import { useContext } from "react";
import "../src/style/dashboard.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../src/context/AuthContext";
import BackButton from "../src/components/BackButton";

function Dashboard() {
  const { user, logOut, deleteMyUser } = useContext(AuthContext);

  const dashNavigateTo = useNavigate();

  const goBrowseDash = () => {
    dashNavigateTo("/browse");
  };

  const goMyRecipesDash = () => {
    dashNavigateTo("/my-recipes");
  };

  const goLogOutDash = () => {
    logOut();
    dashNavigateTo("/");
  };

  const deleteAccount = () => {
    deleteMyUser();
    dashNavigateTo("/");
  };

  return (
    <div className="dashboard" style={{ height: "60vh" }}>
      <div className="backHeader">
        <BackButton />
        <h2 style={{ color: "black" }}>Welcome {user?.displayName}!</h2>
      </div>

      <button value={"browse"} onClick={goBrowseDash} className="dashboardBtn">
        Browse
      </button>
      <button
        value={"recipes"}
        onClick={goMyRecipesDash}
        className="dashboardBtn"
      >
        {" "}
        My Recipes
      </button>
      <button onClick={goLogOutDash} className="dashboardBtn">
        Log out
      </button>
      <br />
      <br />
      <br />
      <br />
      <button className="resetButton" onClick={deleteAccount}>
        Delete your account
      </button>
    </div>
  );
}

export default Dashboard;
