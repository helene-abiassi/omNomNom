import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import "../src/style/App.css";
import Home from "../views/Home";
import BrowseRecipes from "../views/BrowseRecipes";
import MyRecipes from "../views/MyRecipes";
import RecipeDetails from "../views/RecipeDetails";
import Login from "../views/Login";
import Signup from "../views/Signup";
import Dashboard from "../views/Dashboard";
import ErrorPage from "../views/ErrorPage";
import { AuthContextProvider } from "./context/AuthContext";
import { db } from "./config/firebaseConfig";
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  console.log("db :>> ", db);
  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Root />} errorElement={<ErrorPage />}>
        <Route index element={<Home />} />
        <Route path="browse" element={<BrowseRecipes />} />
        <Route
          path="browse/:recipeId"
          element={
            <ProtectedRoute>
              <RecipeDetails />
            </ProtectedRoute>
          }
        />
        <Route
          path="my-recipes"
          element={
            <ProtectedRoute>
              <MyRecipes />
            </ProtectedRoute>
          }
        />
        <Route
          path="dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route path="signup" element={<Signup />} />
        <Route path="login" element={<Login />} /> //!
      </Route>
    )
  );

  return (
    <>
      <AuthContextProvider>
        <RouterProvider router={router} />
        <Footer />
      </AuthContextProvider>
    </>
  );
}
const Root = () => {
  return (
    <>
      <NavBar />
      <img
        className="mainLogoTxt"
        src="./public/logo-txt2.png"
        alt="omNomNom"
      />

      <Outlet />
    </>
  );
};

export default App;
