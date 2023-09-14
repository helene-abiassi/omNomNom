// import { useState } from 'react'
import {
  createRoutesFromElements,
  createBrowserRouter,
  Route,
  RouterProvider,
  Outlet,
} from "react-router-dom";
import '../src/style/App.css'
// import Recipes from '../components/RecipesGrid';
import Home from "../views/Home"
import BrowseRecipes from "../views/BrowseRecipes"
import MyRecipes from "../views/MyRecipes"
import RecipeDetails from "../views/RecipeDetails";
import SignupLogin from "../views/SignupLogin"
import ErrorPage from "../views/ErrorPage"
// import Dashboard from "../views/Dashboard"
import NavBar from '../components/NavBar';
import Footer from '../components/Footer';



function App() {

  const router = createBrowserRouter(
createRoutesFromElements(
  <Route path="/" element={<Root/>} errorElement={<ErrorPage/>}>
    <Route index element={<Home/>}/>
    <Route path="browse" element={<BrowseRecipes/>}/>
    <Route path="my-recipes" element={<MyRecipes/>}/>
    <Route path="my-recipes/:name" element={<RecipeDetails/>}/>
    <Route path="sign-up" element={<SignupLogin/>}/> //! Can I create them as 1 component with 1 route 
    {/* <Route path="*" element={<ErrorPage/>}/> */}

  </Route>
)

  )


  return (
    <>
    
    <RouterProvider router={router}/>
    <Outlet/>
      <img className="mainLogoTxt" src="./public/logo-txt2.png" alt="" />
     {/* <Recipes/> */}
     <Footer/>  
    </>
  )
}
//!NavBar not showing up on error page 
const Root = () =>{
  return (
    <>
    <NavBar/> 
    <Outlet/>

    </>
  )
}

export default App
