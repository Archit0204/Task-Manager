import React, { useState } from "react";
import Task from "./Task";

function Tasks({ tasks, setTasks }) {

    return (
        <div className="flex flex-col justify-center gap-y-4 border-2 border-myviolet-100 bg-myviolet-100 p-8 mb-10 rounded-xl">
            {
                tasks.length === 0 ? (
                    <div className="text-white mx-auto text-2xl font-semibold">No Tasks Found</div>
                ) : (
                    tasks.map((task) => {
                        return <Task task={task} id={task._id} setTasks={setTasks}/>;
                    })
                )
            }
        </div>
    )
}

export default Tasks;
