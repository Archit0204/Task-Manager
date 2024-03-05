import React, { useState } from "react";
import Task from "./Task";
import { GoSearch } from "react-icons/go";
import toast from "react-hot-toast";

function Tasks({ tasks, setTasks }) {


    const [search, setSearch] = useState("");

    async function searchHandler() {
        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`http://localhost:4000/api/v1/task/search/${search}`, {
                method: 'GET',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const data = await response.json();
            // console.log(data);
            if (data.success) {
                setTasks(data.user.tasks);
            }
            // console.log(tasks);
        }
        catch (err) {
            toast.error("Network Error");
        }
    }

    return (
        <div className="flex flex-col justify-center gap-y-4 border-2 border-myviolet-100 bg-myviolet-100 p-8 mb-10 rounded-xl">
            {
                tasks.length === 0 ? (
                    <div className="text-white mx-auto text-2xl font-semibold">No Tasks Found</div>
                ) : (
                    <div className="flex flex-col justify-center gap-y-4">
                        <div className="relative flex items-center min-w-[250px] w-[30%]">
                            <input className="w-full border border-myviolet-100 focus:outline-none pl-3 pr-12 py-2 rounded-lg" type="text" placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} />
                            <button onClick={searchHandler} className="absolute right-5"><GoSearch /></button>
                        </div>
                        {
                            tasks.map((task) => {
                                return <Task task={task} id={task._id} setTasks={setTasks} />;
                            })
                        }
                    </div>
                )
            }
        </div>
    )
}

export default Tasks;
