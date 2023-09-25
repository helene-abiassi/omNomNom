import { useContext } from "react";
import "../src/style/dashboard.css";
import { useNavigate } from "react-router-dom";
import AuthContext from "../src/context/AuthContext";
import BackButton from "../src/components/BackButton";

function Dashboard() {
  const { user, logOut } = useContext(AuthContext);

  console.log("USER-------", user);
  console.log("USERNAME-------", user?.dsiplayName);

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

  return (
    <div className="dashboard" style={{ height: "60vh" }}>
      <BackButton />

      <h2 style={{ color: "black" }}>Welcome {user?.email}!</h2>
      {/* <h2>TEST: {user.dsiplayName}</h2> */}
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
