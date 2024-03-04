import React, { useState } from "react";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import GetStarted from "./pages/GetStarted";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import CreateNew from "./pages/CreateNew";
import EditTask from "./pages/EditTask";

function App() {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    return (
        <div className="min-h-screen h-full w-screen">
            <Navbar isLoggedIn={isLoggedIn} setIsLoggedIn={setIsLoggedIn}/>

            <Routes>
                <Route path="/" element={<GetStarted/>}/>
                <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} />}/>
                <Route path="/signup" element={<Signup setIsLoggedIn={setIsLoggedIn} />}/>
                <Route path="/dashboard" element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <Dashboard/>
                    </PrivateRoute>
                } />
                <Route path="/create" element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <CreateNew/>
                    </PrivateRoute>
                }/>
                <Route path="/edit" element={
                    <PrivateRoute isLoggedIn={isLoggedIn}>
                        <EditTask/>
                    </PrivateRoute>
                }/>
            </Routes>
        </div>
    )

}

export default App;