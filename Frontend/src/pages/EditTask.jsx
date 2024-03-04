import React from "react";
import EditForm from "../components/EditForm";
import { useLocation } from "react-router-dom";

function EditTask() {

    const location = useLocation();
    const data = location.state;
    // console.log("Inside Edit Page")
    // console.log(data);

    return (
        <div className="min-h-screen h-full flex justify-center items-center">
            <EditForm data={data}/>
        </div>
    )

}

export default EditTask;