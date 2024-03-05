import React, { useState } from "react";
import Task from "./Task";
import { GoSearch } from "react-icons/go";
import toast from "react-hot-toast";

function Tasks({ tasks, setTasks, searchHandler, filterHandler, filterChangeHandler, removeFilterHandler, search, filter, setSearch }) {




    return (
        <div className="flex flex-col justify-center gap-y-6 border-2 border-myviolet-100 bg-myviolet-100 p-8 mb-10 rounded-xl">
            <div className="flex flex-col gap-y-5">
                <div className="relative flex items-center min-w-[250px] w-[30%]">
                    <input className="w-full border border-myviolet-100 focus:outline-none pl-3 pr-12 py-2 rounded-lg" type="text" placeholder="Search" value={search} onChange={(event) => setSearch(event.target.value)} />
                    <button onClick={searchHandler} className="absolute right-5"><GoSearch /></button>
                </div>

                <div className="flex flex-col gap-y-5 min-w-[200px] w-[20%]">
                    <label className="flex gap-x-5 items-center">
                        <p className="font-medium text-base mb-2 text-white">Sort by Priority:</p>
                        <select onChange={filterChangeHandler} className="border focus:outline-none border-myviolet-100 rounded-md py-1 px-2" name="priority" value={filter}>
                            <option value="Low">Low</option>
                            <option value="Medium">Medium</option>
                            <option value="High">High</option>
                        </select>
                    </label>
                </div>

                <div className="flex gap-x-5">
                    <button onClick={filterHandler} className="text-myviolet-100 bg-white rounded-md px-2 py-1 font-semibold">Filter Results</button>
                    <button onClick={removeFilterHandler} className="text-myviolet-100 bg-white rounded-md px-2 py-1 font-semibold">Remove Filters</button>
                </div>
            </div>

            {
                tasks.length === 0 ? (
                    <div className="text-white mx-auto text-2xl font-semibold">No Tasks Found</div>
                ) : (
                    <div className="flex flex-col justify-center gap-y-4">
                        <h1 className="text-white text-4xl font-semibold">Your Tasks</h1>
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
