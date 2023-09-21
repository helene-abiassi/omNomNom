import { ReactNode, useContext, useEffect, useState } from "react";
import { AuthContext } from "../src/context/AuthContext";
// import { isUserAuth } from "../src/utilities/isUserAutht.js";
import { Navigate } from "react-router-dom";
import { useIsAuth } from "../src/hooks/useIsAuth";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { user } = useContext(AuthContext);

  const allowAccess = useIsAuth();

  const [redirect, setRedirect] = useState(false);
  useEffect(() => {
    setTimeout(() => {
      setRedirect(true);
    }, 5000);
  }, []);

  return (
    // !FIGURE OUT HOW TO FIX PROTECT ROUTE, whenever we refresh it should stay in the Protected Route
    //! =>PUT LOADER WHILE IT TAKES A SECOND TO REFRESH

    //+ THIN

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
