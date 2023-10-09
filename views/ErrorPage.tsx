import { useNavigate, useRouteError } from "react-router-dom";
import { RouteErrorType } from "../src/types/customTypes";

function ErrorPage() {
  const error = useRouteError() as RouteErrorType;

  const navigateTo = useNavigate();
  const goBackHome = () => {
    navigateTo("/browse");
  };

  return (
    <>
      <div className="errorPage" style={{ height: "80vh", color: "black" }}>
        <h3>AAAAAACHTUNG!</h3>

        <p>{error.error?.message}</p>
        <button onClick={goBackHome}>Looks like you're lost.. Get back!</button>
      </div>
    </>
  );
}

export default ErrorPage;
