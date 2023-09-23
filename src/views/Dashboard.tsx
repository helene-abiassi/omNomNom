import { useContext } from "react";
import "../src/style/dashboard.css";
import { Link, useNavigate } from "react-router-dom";
import AuthContext from "../src/context/AuthContext";

function Dashboard() {
  const { user, logOut } = useContext(AuthContext);
  // console.log(user);

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

  const goBack = () => {
    dashNavigateTo("/browse", { replace: true });
  };

  return (
    <div className="dashboard" style={{ height: "60vh" }}>
      <button
        style={{
          fontSize: "18pt",
          color: "black",
          backgroundColor: "transparent",
        }}
        onClick={goBack}
      >
        ←
      </button>

      <h2 style={{ color: "black" }}>Welcome {user?.email}!</h2>
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

      <a style={{ marginTop: "5rem" }} href="/">
        Delete your account
      </a>
    </div>
  );
}

export default Dashboard;
