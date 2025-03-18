import React, { useState } from "react";
import toast from "react-hot-toast";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai"
import { useNavigate } from "react-router-dom";

function SignupForm() {

    const [formData, setFormData] = useState({
        firstName: "", lastName: "", email: "", password: "", confirmPassword: ""
    });

    const [showPassword, setShowPassword] = useState(false);
    const [confirmShowPassword, setConfirmShowPassword] = useState(false);

    const navigate = useNavigate();

    async function submitHandler(event) {
        event.preventDefault();
        const postData = JSON.stringify(formData);

        try {
            const response = await fetch(`${process.env.API_URL}/api/v1/auth/signup`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: postData
            });

            const data = await response.json();

            console.log(data);

            if (data.success) {
                toast.success("Signed Up");
                navigate("/login");
            }
            else {
                toast.error("Error Signing Up");
            }
        }
        catch (err) {
            toast.error("Error Signing Up");
        }
    }

    function changeHandler(event) {
        setFormData((prev) => (
            {
                ...prev, [event.target.name]: event.target.value
            }
        ))
    }

    return (
        <div className="flex flex-col gap-y-5 max-w-[400px] w-[90%] h-[70%] max-h-[500px] border-2 border-myviolet-100 rounded-xl py-8 px-12">
            <div className="text-3xl font-bold text-myviolet-100">Welcome to FocadoX!</div>
            <form onSubmit={submitHandler} className="flex flex-col gap-y-5">
                <div className="flex justify-between gap-x-4">
                    <label>
                        <p className="font-medium text-base mb-2">First Name</p>
                        <input className="focus:outline-none w-full py-1 px-2 border border-myviolet-100 rounded-md" type="text" name="firstName" value={formData.firstName} placeholder="First Name" onChange={changeHandler} required />
                    </label>

                    <label>
                        <p className="font-medium text-base mb-2">Last Name</p>
                        <input className="focus:outline-none w-full py-1 px-2 border border-myviolet-100 rounded-md" type="text" name="lastName" value={formData.lastName} placeholder="Last Name" onChange={changeHandler} required />
                    </label>
                </div>


                <label>
                    <p className="font-medium text-base mb-2">Email</p>
                    <input className="focus:outline-none w-full py-1 px-2 border border-myviolet-100 rounded-md" type="email" name="email" placeholder="Enter your email" onChange={changeHandler} value={formData.email} required />
                </label>

                <div className="flex justify-between gap-x-4">
                    <label className="relative">
                        <p className="font-medium text-base mb-2">Password</p>
                        <input className="focus:outline-none w-full py-1 px-2 pr-9 border border-myviolet-100 rounded-md" type={showPassword ? "text" : "password"} name="password" placeholder="Password" value={formData.password} onChange={changeHandler} required />
                        <span className="absolute right-3 bottom-2 text-myviolet-100 cursor-pointer" onClick={() => setShowPassword((prev) => !prev)}>{showPassword ? (<AiOutlineEye />) : (<AiOutlineEyeInvisible />)}</span>
                    </label>

                    <label className="relative">
                        <p className="font-medium text-base mb-2">Confirm Password</p>
                        <input className="focus:outline-none w-full py-1 px-2 pr-9 border border-myviolet-100 rounded-md" type={confirmShowPassword ? "text" : "password"} name="confirmPassword" placeholder="Confirm" value={formData.confirmPassword} onChange={changeHandler} required />
                        <span className="absolute right-3 bottom-2 text-myviolet-100 cursor-pointer" onClick={() => setConfirmShowPassword((prev) => !prev)}>{confirmShowPassword ? (<AiOutlineEye />) : (<AiOutlineEyeInvisible />)}</span>
                    </label>

                </div>

                <button className="w-full mt-4 bg-myviolet-100 rounded-lg py-2 text-white text-lg font-semibold">Sign Up</button>
            </form>
        </div>
    )

}

export default SignupForm;