import React from "react";
import { useNavigate } from "react-router-dom";
import FocadoX from "../components/FocadoX";

function GetStarted() {

    const navigate = useNavigate();

    function clickHandler() {
        navigate("/signup");
    }

    return (
        <div className="h-screen flex flex-col items-center justify-center">    
            <div className="flex flex-col items-start justify-center w-3/4">
                <h1 className="text-myviolet-100 text-5xl font-semibold">Welcome to FocadoX!</h1>
                <p className="font-medium text-lg mt-3">
                    Ready to say goodbye to scattered to-do lists and overwhelm? <FocadoX/> is here to help you streamline your tasks, boost your productivity, and achieve your goals.
                </p>
                
                <button className="bg-myviolet-100 py-3 px-7 rounded-lg text-white text-xl font-semibold mx-auto mt-8" onClick={clickHandler}>Get Started</button>
            </div>
        </div>
    )

}

export default GetStarted;