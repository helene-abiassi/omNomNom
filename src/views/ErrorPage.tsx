// import React from 'react'
import { useRouteError } from 'react-router-dom'

interface RouteErrorType {
    data:string; 
    error:{
        message:string;
        status:number;
        statusText:string;
    }
}

function ErrorPage() {
    const error = useRouteError() as RouteErrorType;



  return (
    <>
        
        <h1>AAAAAAAACHTUNG</h1>

        <h3>{error.error.message}</h3>
    
    </>
  )
}

export default ErrorPage