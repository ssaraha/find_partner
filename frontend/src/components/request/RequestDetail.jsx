import { CalendarDays, Captions, CircleCheck, Info, SquarePen, Timer, UserPlus } from 'lucide-react'
import React, { useState } from 'react'
import toast from "react-hot-toast"
import { useRequestStore } from '../../store/requestStore'
import { useEffect } from 'react'

const RequestDetail = ({ request, onClose, setCurrentStatusInfo, currentStatusInfo }) => {
    const {
        updateStatusInfo,
        fetchRequestById
    } = useRequestStore()
    const [selectedValue, setSelectedValue] = useState(request?.statusInfo);
    // const [currentRequest, setCurrentRequest] = useState("");
    const handleChange = (event) => {
        setSelectedValue(event.target.value);
        setCurrentStatusInfo(event.target.value)

    };
    const handleUpdateSubmit = async (e, requestId) => {
        e.preventDefault();
        await updateStatusInfo(requestId, selectedValue)
        toast.success("Request status updated successfully");
        onClose();
    }

    return (
        <div>
            <div className='flex justify-between mb-4'>
                <div className='flex flex-col space-y-2'>
                    <div className='flex gap-3 text-white font-bold '>
                        <Captions size={24} />
                        <p className='text-md'>Title</p>
                    </div>
                    <p className='text-white/80 text-md font-thin'>{request.title}</p>
                </div>
                <div className='flex flex-col space-y-2'>
                    <div className='flex gap-3 text-white font-bold '>
                        <UserPlus size={24} />
                        <p className='text-md'>Created by</p>
                    </div>
                    <p className='text-white/80 text-md font-thin'>{request.owner.username}</p>
                </div>
            </div>
            <div className='flex justify-between mb-4'>
                <div className='flex flex-col space-y-2'>
                    <div className='flex gap-3 text-white font-bold '>
                        <Info size={24} />
                        <p className='text-md'>Status</p>

                    </div>
                    {(request.status === "created" || request.status === "accepted") && <span className="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 inset-ring inset-ring-blue-400/30 w-fit uppercase">{request.status}</span>}
                    {request.status === "rejected" && <span className="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 inset-ring inset-ring-yellow-400/20 w-fit uppercase">{request.status}</span>}
                    {request.status === "finished" && <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20 w-fit uppercase">{request.status}</span>}
                </div>
                <div className='flex flex-col space-y-2'>
                    <div className='flex gap-3 text-white font-bold '>
                        <Timer size={24} />
                        <p className='text-md'>Completion time</p>
                    </div>
                    <p className='text-white/80 text-md font-thin'>
                        {request.completionTime}
                    </p>
                </div>
            </div>
            {/* <hr className='w-full h-0.5 my-2 bg-white' /> */}
            <h3 className='font-semibold text-white text-lg'>Update Status evolution</h3>
            <form onSubmit={(e) => handleUpdateSubmit(e, request._id)}>
                <label htmlFor="status-select" className='block my-4 text-white font-light'>Choose a value: </label>
                <select
                    name='statusInfo'
                    className='w-full pl-2 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-white-200 focus:ring-2 focus:ring-white-400 focus:outline-none text-white placeholder-gray-400 transition duration-200'
                    id="status-select" value={currentStatusInfo} onChange={handleChange}>
                    <option value="10">10</option>
                    <option value="30">30</option>
                    <option value="50">50</option>
                    <option value="70">70</option>
                    <option value="100">100</option>
                </select>
                {/* <p>Selected Fruit: {selectedValue}</p> */}
                <button
                    className='flex justify-center gap-1 align-center bg-indigo-500 text-white font-normal px-3 py-2 rounded-md  cursor-pointer my-6'>
                    <SquarePen size={18} className='font-extra-bold self-center' />
                    <span>Update</span>
                </button>
            </form>
        </div>
    )
}

export default RequestDetail
