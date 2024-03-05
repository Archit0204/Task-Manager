import React from "react";
import LoginForm from "../components/LoginForm";

function Login({setIsLoggedIn}) {

    return (
        <div className="h-screen flex justify-center items-center">
            <LoginForm setIsLoggedIn={setIsLoggedIn}/> 
        </div>
    )
}

export default Login;