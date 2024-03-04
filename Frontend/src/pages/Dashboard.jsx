import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Spinner from "../components/Spinner";
import Tasks from "../components/Tasks";
import toast from "react-hot-toast";

function Dashboard() {

    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    const [tasks, setTasks] = useState([]);

    function clickHandler() {
        navigate("/create");
    }

    useEffect(() => {

        async function fetchData() {
            setLoading(true);
            try {
                const token = localStorage.getItem("token")
                const response = await fetch("http://localhost:4000/api/v1/task/showTasks", {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await response.json();
                console.log(data);

                if (data.success) {
                    setTasks(data.user.tasks);
                }
            }
            catch (err) {
                toast.error("Network Problem");
            }
            setLoading(false);
        }

        fetchData()
    }, []);

    return (
        <div className="min-h-screen h-full w-[90%] max-w-[1250px] flex flex-col items-center mx-auto">
            <div className="w-full mt-32 flex flex-col gap-y-12 items-start">
                <button className="text-white text-lg font-semibold bg-myviolet-100 px-3 py-1 rounded-md" onClick={clickHandler}>Add a New Task</button>
                <div className="w-full mx-auto">
                    {
                        loading ? (<Spinner />) : (<Tasks tasks={tasks} setTasks={setTasks}/>)
                    }
                </div>
            </div>
        </div>
    )
}

export default Dashboard;