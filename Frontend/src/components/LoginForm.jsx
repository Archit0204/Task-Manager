import React, { useState } from "react";
import toast from "react-hot-toast";
import {AiOutlineEye, AiOutlineEyeInvisible} from "react-icons/ai"
import { useNavigate } from "react-router-dom";

function LoginForm({setIsLoggedIn}) {
    
    const [formData, setFormData] = useState({
        email: "", password: ""
    });
    const [showPassword, setShowPassword] = useState(false);
    const navigate = useNavigate();

    function changeHandler(event) {
        setFormData( (prevData) => (
            {
                ...prevData ,[event.target.name]: event.target.value
            }
        ))
    }

    async function submitHandler(event) {
        event.preventDefault();
        const postData = JSON.stringify(formData);

        try{
            const response = await fetch("http://localhost:4000/api/v1/auth/login", {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: postData
            });

            const data = await response.json();
            console.log(data);

            if (data.success) {
                toast.success("Logged In");

                const token = data.token;
                localStorage.setItem("token", token);

                setIsLoggedIn(true); // implement this using context api
                navigate("/dashboard");
            }
            else {
                toast.error("Error Logging In");
            }
        }
        catch(err) {
            console.log(err);
            toast.error("Error Logging In");
        }
    }

    return (
        <div className="flex flex-col gap-y-5 max-w-[400px] w-[90%] max-h-[400px] h-3/5 border-2 border-myviolet-100 rounded-xl py-8 px-12">
            <div className="text-3xl font-bold text-myviolet-100">Welcome Back, Login to FocadoX</div>
            <form onSubmit={submitHandler} className="flex flex-col gap-y-5">
                <label>
                    <p className="font-medium text-base mb-2">Email</p>
                    <input className="focus:outline-none w-full py-1 px-2 border border-myviolet-100 rounded-md" type="email" name="email" placeholder="Enter your email" onChange={changeHandler} value={formData.email} required/>
                </label>

                <label className="relative">
                    <p className="font-medium text-base mb-2">Password</p>
                    <input className="focus:outline-none w-full py-1 px-2 pr-9 border border-myviolet-100 rounded-md" type={showPassword ? "text" : "password"} name="password" placeholder="Enter your password" value={formData.password} onChange={changeHandler} required/>
                    <span className="absolute right-3 bottom-2 text-myviolet-100 cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? (<AiOutlineEye/>) : (<AiOutlineEyeInvisible/>)}</span>
                </label>

                <button className="w-full mt-4 bg-myviolet-100 rounded-lg py-2 text-white text-lg font-semibold">Login</button>
            </form>
        </div>
    )

}

export default LoginForm;