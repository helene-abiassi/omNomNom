import { useContext } from "react";
import AuthContext from "../context/AuthContext";

function useIsAuth() {
  const { user } = useContext(AuthContext);

  const isAUthenticated = user !== null ? true : false;

  return isAUthenticated;
}

export { useIsAuth };
