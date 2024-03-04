import React, { useState } from "react";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

function Task({ task, id, setTasks }) {

    const navigate = useNavigate();
    const [taskData, setTaskData] = useState({
        title: `${task.title}`,
        description: `${task.description}`,
        createdAt: `${task.createdAt}`,
        deadline: `${task.deadline.slice(0,10)}`,
        status: `${task.status}`,
        taskId: id
    });

    async function deleteHandler() {
        try {
            const token = localStorage.getItem("token");
            const res = await fetch(`http://localhost:4000/api/v1/task/deleteTask/${taskData.taskId}`, {
                method: 'DELETE',
                headers: {
                    "Authorization": `Bearer ${token}`
                }
            });
            const resData = await res.json();

            if (resData.success) {
                const response = await fetch("http://localhost:4000/api/v1/task/showTasks", {
                    method: 'GET',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await response.json();

                if (data.success) {
                    setTasks(data.user.tasks);
                }
                else {
                    toast.error("Error Loading Tasks");
                }
            }
            else {
                toast.error("Network Occurred");
            }
            
        }
        catch(err) {
            toast.error("Network Problem");
        }
    }

    function updateTask() {

        navigate("/edit", {
            state: taskData
        });
    }

    async function updateStatus() {

        try {
            const token = localStorage.getItem("token");
            if (taskData.status !== "Completed") {
                const response = await fetch(`http://localhost:4000/api/v1/task/updateStatus/${id}`, {
                    method: 'PUT',
                    headers: {
                        "Authorization": `Bearer ${token}`
                    }
                });
                const data = await response.json();
                // console.log(data);
                setTaskData((prev) => ({
                    ...prev, status: data.task.status
                }))

                toast.success("Task Completed");
            }
        }
        catch (err) {
            toast.error("Network Problem");
        }
    }

    return (
        <div className="flex flex-col gap-y-5 bg-white p-5 rounded-lg">
            <div className="flex justify-between items-center">
                <p className="font-bold text-myviolet-100 text-3xl">{taskData.title}</p>
                <p className="font-semibold">Created on <span className="text-myviolet-100">{taskData.createdAt.slice(0, 10)}</span></p>
            </div>
            <div className="w-3/5 flex flex-col gap-y-3 text-wrap break-words">
                <p className="font-medium text-base">{taskData.description}</p>
                <div className="flex justify-between items-center">
                    <p className="font-semibold">Status: <span className={
                        taskData.status === "Pending" ? "text-myviolet-100" : "text-green-600"
                    }>{taskData.status}</span></p>
                    <p className="font-semibold">Due Date: <span className="text-myviolet-100">{taskData.deadline.slice(0, 10)}</span></p>
                </div>
            </div>
            <div className="flex items-center justify-between">
                <div>
                    {
                        taskData.status === "Pending" && <div className="flex gap-x-6">
                            <button onClick={updateStatus} className="bg-myviolet-100 py-1 px-3 rounded-lg text-white">Mark as Completed</button>
                            <button onClick={updateTask} className="bg-myviolet-100 py-1 px-3 rounded-lg text-white">Edit</button>
                        </div>
                    }
                    
                </div>

                <button onClick={deleteHandler} className="bg-red-600 py-1 px-3 rounded-lg text-white">Delete</button>
            </div>
        </div>
    )
}

export default Task;