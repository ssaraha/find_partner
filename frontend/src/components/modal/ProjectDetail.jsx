import { CalendarDays, Captions, Grid2x2Plus, Info, TextAlignStart, UserPlus } from 'lucide-react'
import React, { useEffect } from 'react'
import { useState } from 'react'
import { formatDate } from "../../utils/date.js"

const ProjectDetail = ({ project }) => {
    const [status, setStatus] = useState("")
    const [projectDetail, setProjectdetail] = useState(null)
    const [createdAt, setCreatedAt] = useState(null);

    useEffect(() => {
        if (project) {
            const date = new Date(project.createdAt);
            setProjectdetail(project)
            getStatus(project.status);
            setCreatedAt(formatDate(date));
        }

    }, [project])

    // console.log("PROJECT DETAIL >>> ", createdAt)

    const getStatus = (statusProject) => {
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
    }

    return (
        <div className='p-6'>
            {projectDetail && (
                <>
                    <div className='flex justify-between mb-4'>
                        <div className='flex flex-col space-y-2'>
                            <div className='flex gap-3 text-white font-bold '>
                                <Captions size={24} />
                                <p className='text-md'>Title</p>
                            </div>
                            <p className='text-white/80 text-md font-thin'>{projectDetail.title}</p>
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <div className='flex gap-3 text-white font-bold '>
                                <UserPlus size={24} />
                                <p className='text-md'>Created by</p>
                            </div>
                            <p className='text-white/80 text-md font-thin'>{projectDetail.owner.name}</p>
                        </div>
                    </div>
                    <div className='flex justify-between mb-4'>
                        <div className='flex flex-col space-y-2'>
                            <div className='flex gap-3 text-white font-bold '>
                                <Info size={24} />
                                <p className='text-md'>Status</p>
                                {status}
                            </div>
                            {projectDetail.status === "created" && <span className="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 inset-ring inset-ring-blue-400/30 w-fit">{status}</span>}
                            {projectDetail.status === "inprogressed" && <span className="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 inset-ring inset-ring-yellow-400/20 w-fit">{status}</span>}
                            {projectDetail.status === "finished" && <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20 w-fit">{status}</span>}
                        </div>
                        <div className='flex flex-col space-y-2'>
                            <div className='flex gap-3 text-white font-bold '>
                                <CalendarDays size={24} />
                                <p className='text-md'>Created at</p>
                            </div>
                            <p className='text-white/80 text-md font-thin'>
                                {createdAt}
                            </p>
                        </div>
                    </div>
                    <div className='flex justify-between mb-4'>
                        <div className='flex flex-col space-y-2'>
                            <div className='flex gap-3 text-white font-bold '>
                                <Captions size={24} />
                                <p className='text-md'>Category</p>
                            </div>
                            <p className='text-white/80 text-md font-thin'>{projectDetail.category.name}</p>
                        </div>
                        {/* <div className='flex flex-col space-y-2'>
                    <div className='flex gap-3 text-white font-bold '>
                        <Grid2x2Plus size={24} />
                        <p className='text-md'>Created by</p>
                    </div>
                    <p className='text-white/80 text-md font-thin'>{project.owner.name}</p>
                </div> */}
                    </div>
                    <div className='flex justify-between mb-4'>
                        <div className='flex flex-col space-y-2'>
                            <div className='flex gap-3 text-white font-bold '>
                                <TextAlignStart size={24} />
                                <p className='text-md'>Description</p>
                            </div>
                            <p className='text-white/80 text-md font-thin'>{projectDetail.description}</p>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}

export default ProjectDetail
