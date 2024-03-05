import React from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";

const Navbar = ({ isLoggedIn, setIsLoggedIn }) => {

    const navigate = useNavigate()

    function logoutHandler() {

        localStorage.removeItem("token");
        setIsLoggedIn(false);
        toast.success("Logged Out");
        navigate("/login");
    }

    function homeHandler() {
        localStorage.removeItem("token");
        setIsLoggedIn(false);
        navigate("/");
    }

    return (
        <div className="absolute flex flex-row items-center justify-center w-screen h-14 bg-myviolet-100">
            <div className="w-[90%] max-w-[1250px] flex justify-between">
                <p onClick={homeHandler} className="font-bold text-white text-3xl cursor-pointer">FocadoX</p>
                <div className="flex flex-row font-semibold w-96 justify-around items-center text-white">
                    <div className="flex justify-between gap-x-3">
                            <p className="cursor-pointer">About</p>
                            <p className="cursor-pointer">Contact</p>
                    </div>
                    <div>
                        {
                            isLoggedIn &&
                            <div className="flex justify-between gap-x-3">
                                <Link to="/dashboard">
                                    <p>Dashboard</p>
                                </Link>
                                <button onClick={logoutHandler}>Logout</button>
                            </div>
                        }
                        {
                            !isLoggedIn &&
                            <div className="flex justify-between gap-x-3">
                                <Link to="/login">
                                    <p>Login</p>
                                </Link>
                                <Link to="/signup">
                                    <p>Signup</p>
                                </Link>
                            </div>
                        }
                    </div>
                </div>
            </div>

        </div>
    )

}

export default Navbar;