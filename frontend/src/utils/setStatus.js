import { useState } from "react";

export const setStatusProject = (statusProject) => {
    const [status, setStatus] = useState("")
        switch (statusProject) {
            case "created":
                setStatus("CREATED")
                break;
            case "inprogressed":
                setStatus("IN PROGRESS")
                break;
            case "finished":
                setStatus("FINISHED")
                break;
            default:
        }
    
        return status;
    }