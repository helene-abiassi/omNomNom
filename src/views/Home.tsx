import { useContext } from "react";
import { AuthContext } from "../src/context/AuthContext";
import { Link } from "react-router-dom";

function Home() {
  const { user } = useContext(AuthContext);

  return (
    <>
      {" "}
      <div style={{ height: "80vh" }}>
        <img className="homePageImg" src="./public/pasta.webp" alt="" />
        <h2>Hey {user?.email}</h2>

        {/* display dofferent msg for logged in/out */}
        <p style={{ alignContent: "center" }}>
          Look for fun and colorful recipes, based off what is <br />
          left in your fridge, your favorite cuisine or preferred diet!
        </p>

        {user ? (
          <></>
        ) : (
          <p>
            <strong>
              <Link to={"signup"}>Become a member</Link> and build your own
              hangry pantry!
            </strong>
          </p>
        )}

        <a
          style={{
            backgroundColor: "black",
            padding: "5px",
            borderRadius: "3px",
          }}
          href="browse"
        >
          Let's go!
        </a>
      </div>
    </>
  );
}

export default Home;
