import { ReactNode, useContext } from "react";
// import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useIsAuth } from "../hooks/useIsAuth";
import ProtecterRouteErrorPage from "./ProtecterRouteErrorPage";
import Loader from "./Loader";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { loader } = useContext(AuthContext);

  const allowAccess = useIsAuth();

  return (
    <div>
      {loader ? (
        <Loader />
      ) : allowAccess ? (
        children
      ) : (
        <ProtecterRouteErrorPage />
      )}
    </div>
  );
}

export default ProtectedRoute;
