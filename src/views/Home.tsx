import { useContext } from "react";
import { AuthContext } from "../src/context/AuthContext";
import { Link } from "react-router-dom";
import Comments from "../src/components/Comments";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <>
      <div style={{ height: "100%" }}>
        <h3 style={{ color: "black" }}>Hey {user?.displayName}🍕!</h3>
        <img className="homePageImg" src="./public/pasta.webp" alt="" />
        {/* display dofferent msg for logged in/out */}
        <br />
        <br />
        <p style={{ alignContent: "center" }}>
          Look for fun and colorful recipes, based off what is <br />
          left in your fridge, your favorite cuisine or preferred diet!
        </p>
        <p>
          <a
            style={{
              backgroundColor: "#FE347E",
              padding: "8px",
              borderRadius: "3px",
              // color: "black",
            }}
            href="/browse"
          >
            Let's go!
          </a>
        </p>
        {user ? (
          <></>
        ) : (
          <p
            style={{
              backgroundColor: "#242424",
              color: "white",
              padding: "10px",
              marginTop: "2rem",
            }}
          >
            <Link to={"/signup"}>
              Become a member and build your own hangry pantry!
            </Link>
          </p>
        )}
      </div>
      <br />
      {/* <Comments /> */}
    </>
  );
}

export default Home;
