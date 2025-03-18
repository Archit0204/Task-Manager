import React from "react";
import { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export default function CreateTask() {

    const [taskData, setTaskData] = useState({
        title: "", description: "", deadline: "", priority: "Low"
    });

    const navigate = useNavigate();

    function changeHandler(event) {
        setTaskData((prev) => (
            {
                ...prev, [event.target.name]: event.target.value
            }
        ));
    }

    async function createHandler() {

        const postData = JSON.stringify(taskData);

        try {
            const token = localStorage.getItem("token");
            const response = await fetch(`${process.env.REACT_APP_API_URL}/api/v1/task/create`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${token}`
                },
                body: postData
            });

            const data = await response.json();
            console.log(data);

            if (data.success) {
                toast.success("Task Added");

                navigate("/dashboard");
            }
            else {
                toast.error("Error Adding Task");
            }
        }
        catch (err) {
            toast.error("Error Creating Task");
        }
    }

    return (
        <div className="flex flex-col w-[90%] max-w-[400px] p-5 gap-y-4">
            <p className="text-2xl font-bold text-myviolet-100">Create New Task</p>

            <div className="flex flex-col gap-y-6 border-2 p-5 border-myviolet-100 rounded-xl">
                <form className="flex flex-col gap-y-3">
                    <label>
                        <p className="font-medium text-base mb-2">Title</p>
                        <input className="focus:outline-none w-full py-1 px-2 border border-myviolet-100 rounded-md" type="text" name="title" onChange={changeHandler} placeholder="Enter the Title" value={taskData.title} required />
                    </label>

                    <label>
                        <p className="font-medium text-base mb-2">Description</p>
                        <textarea className="focus:outline-none w-full py-1 px-2 border border-myviolet-100 rounded-md" name="description" cols="30" rows="5" onChange={changeHandler} placeholder="Enter Description" value={taskData.description} required></textarea>
                    </label>

                    <div className="flex gap-x-10 items-center">
                        <label>
                            <p className="font-medium text-base mb-2">Deadline</p>
                            <input className="focus:outline-none w-full py-1 px-2 border border-myviolet-100 rounded-md" type="date" name="deadline" onChange={changeHandler} value={taskData.deadline} required />
                        </label>

                        <label>
                            <p className="font-medium text-base mb-2">Priority</p>
                            <select onChange={changeHandler} className="border border-myviolet-100 rounded-md py-1 px-2" name="priority" value={taskData.priority}>
                                <option value="Low">Low</option>
                                <option value="Medium">Medium</option>
                                <option value="High">High</option>
                            </select>
                        </label>
                    </div>

                </form>

                <div className="w-full flex items-center justify-end gap-x-5">
                    <button className="bg-myviolet-100 py-1 px-3 rounded-lg text-white" onClick={createHandler}>Create</button>
                    <button className="bg-red-600 py-1 px-3 rounded-lg text-white" onClick={() => navigate(-1)}>Back</button>
                </div>
            </div>


        </div>
    )

}