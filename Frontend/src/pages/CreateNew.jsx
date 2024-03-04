import React, { useState } from "react";
import CreateTask from "../components/CreateTask";

function CreateNew() {

    return (
        <div className="min-h-screen h-full flex justify-center items-center">
            <CreateTask/>
        </div>
    )

}

export default CreateNew;