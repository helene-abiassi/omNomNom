import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function ProtecterRouteErrorPage() {
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRedirect(true);
    }, 4000);
  }, []);

  console.log("redirect :>> ", redirect);

  return (
    <div style={{ height: "60vh" }}>
      <h3 style={{ color: "black" }}>
        You need to log in to access your recipes!
      </h3>
      <p>
        <Link className="resetButton" to="/login">
          Take me to the Log In page 🥐
        </Link>
      </p>
      <img className="redirectTwirl" src="./public/loader.png" alt="" />
    </div>
  );
}

export default ProtecterRouteErrorPage;
