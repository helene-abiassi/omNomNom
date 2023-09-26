import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";

function ProtecterRouteErrorPage() {
  console.log("%c protected route error page", "color:red");
  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRedirect(true);
    }, 5000);
  }, []);

  return (
    <div>
      <h3 style={{ color: "black" }}>
        You need to log in to access your recipes (duh!)
      </h3>

      <img
        className="loginImg"
        src="https://media.giphy.com/media/8abAbOrQ9rvLG/giphy.gif"
        alt=""
      />
      <p>Let us show you the way 👀 Close your eyes and count to 3...</p>
      {redirect && <Navigate to={"/login"} />}
    </div>
  );
}

export default ProtecterRouteErrorPage;
