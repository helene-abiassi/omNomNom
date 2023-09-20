import { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "../src/context/AuthContext";
import { isUserAuth } from "../src/utilities/isUserAuth.js";
import { Navigate } from "react-router-dom";
import { useIsAuth } from "../src/hooks/useIsAuth.js";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  // const { user } = useContext(AuthContext);

  // const allowAccess = isUserAuth(user)

  const allowAccess = useIsAuth();
  // console.log(allowAccess);

  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRedirect(true);
    }, 4000);
  }, []);

  return (
    <div>
      {allowAccess ? (
        children
      ) : (
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
      )}
    </div>
  );
}

export default ProtectedRoute;
