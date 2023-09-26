import { ReactNode, useContext, useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { useIsAuth } from "../hooks/useIsAuth";
import ProtecterRouteErrorPage from "./ProtecterRouteErrorPage";

type ProtectedRouteProps = {
  children: ReactNode;
};

function ProtectedRoute({ children }: ProtectedRouteProps) {
  console.log("%c protected route", "color:orange");

  const { loader } = useContext(AuthContext);

  const allowAccess = useIsAuth();

  // const isRedirect = () => {
  //   setTimeout(() => {
  //     return 3;
  //   }, 5000);
  // };
  const showme = () => {
    console.log("loader", loader);
    console.log("allowAccess", allowAccess);
  };
  return (
    <div>
      {loader ? (
        <h1>LOADING....</h1>
      ) : allowAccess ? (
        children
      ) : (
        <>{loader && allowAccess && <ProtecterRouteErrorPage />}</>
      )}
    </div>
  );
}

export default ProtectedRoute;
