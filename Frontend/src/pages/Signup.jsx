import React from "react";
import SignupForm from "../components/SignupForm";

function Signup({setIsLoggedIn}) {

    return (
        <div className="h-screen flex justify-center items-center">
            <SignupForm/>
        </div>
    )

}

export default Signup;