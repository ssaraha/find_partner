import React from 'react'
import { useRequestStore } from '../../store/requestStore.js';
import { useAuthStore } from '../../store/authStore.js';
import { useState } from 'react';
import { CalendarDays, CircleCheck, Heart, SquarePen, Star } from 'lucide-react';
import ProgressBar from './ProgressBar.jsx';
import { useCallback } from 'react';
import Modal from '../../pages/modal/Modal.jsx';
import {cutTextTo20Words} from '../../utils/text'

import {formatDate} from "../../utils/date"

import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";

const RequestItemAcceptedOfCompany = ({ request }) => {

    const [date, setDate] = useState(formatDate(
        request?.startDate).split(' ')[1] < 10 ? 
            formatDate(request?.startDate).split(' ')[1].padStart(2, '0') : 
            formatDate(request?.startDate).split(' ')[1].replace(',', ''))
    const [month, setMonth] = useState(formatDate(request?.startDate).split(' ')[0])
    const [year, setYear] = useState(formatDate(request?.startDate).split(' ')[2].replace(',', ''))

    const navigate = useNavigate();
    const { user } = useAuthStore();
    const {finishRequest} = useRequestStore();

    const [isLike, setIsLike] = useState(request?.likes?.includes(user?._id))
    const [isInteressed, setIsInteressed] = useState(request?.interessed?.includes(user?._id))
    const [currentStatusInfo, setCurrentStatusInfo] = useState(request?.statusInfo)
    const [isOpen, setIsOpen] = useState(false);
    const handleClose = useCallback(() => setIsOpen(false), []);

    const handleFinish = async (requestId) => {
        await finishRequest(requestId);
        toast.success('Request has been finished successfully')
    }

    return (
        <div>
            <div className="max-w-sm overflow-hidden bg-white shadow-md rounded-2xl border border-gray-100 transition duration-300 hover:shadow-xl hover:-translate-y-1 ">

                <div className="">
                    <h3 className=" font-bold text-center text-2xl mb-2 bg-indigo-500 px-5 py-3 text-white">{request.title}</h3>

                    <div className='flex align-center justify-between'>
                        <div className='flex flex-col space-y-1 px-5'>
                            <span className='text-sm text-gray-900 font-bold'>Status</span>
                            {(request.status === "created" || request.status === "accepted") && <span className={`inline-flex items-center rounded-md bg-blue-400/10 px-1 py-1 text-xs font-medium text-blue-400 inset-ring inset-ring-blue-400/30 uppercase w-fit`} >{request.status}</span>}
                            {(request.status === "rejected") && <span className={`inline-flex items-center rounded-md bg-orange-400/10 px-1 py-1 text-xs  font-medium text-orange-400 inset-ring inset-ring-orange-400/30 uppercase w-fit`} >{request.status}</span>}
                            {(request.status === "finished") && <span className={`inline-flex items-center rounded-md bg-green-400/10 px-1 py-1 text-xs  font-medium text-green-400 inset-ring inset-ring-green-400/30 uppercase w-fit`} >{request.status}</span>}
                        </div>
                        <div className='flex flex-col space-y-1 px-5'>
                            <span className='text-sm text-gray-900 font-bold'>Created by</span>
                            <p className='text-sm text-gray-600  mb-5 leading-2'>{request.owner.username}</p>
                        </div>
                    </div>

                    <div className='flex align-center justify-between'>
                        <div className='flex flex-col space-x-3 my-4 px-5'>
                            <span className='text-sm text-gray-900 font-bold'>Completion time</span>
                            <p className="text-sm text-gray-600  mb-5 leading-2">{request.completionTime}</p>
                        </div>
                        <div className='flex flex-col space-x-3 my-4 px-5'>
                            <span className='text-sm text-gray-900 font-bold'>Start date</span>
                            <p className="text-sm text-gray-600  mb-5 leading-2">{`${date} ${month} ${year}`}</p>
                        </div>
                    </div>

                    <div className='flex flex-col space-x-3 my-4 px-5'>
                        <span className='text-sm text-gray-900 font-bold'>Status evolution %</span>
                        <ProgressBar progress={currentStatusInfo} />
                    </div>
                    {/* <div className='flex flex-col space-x-3 my-4 px-5'>
                        <span className='text-sm text-gray-900 font-bold'>Created by</span>
                        <p className='text-sm text-gray-600  mb-5 leading-2'>{request.owner.username}</p>
                    </div> */}
                    <div className='flex flex-col space-y-1 px-5'>
                        <span className='text-sm text-gray-900 font-bold'>Description</span>
                        <p className="text-sm text-gray-600  mb-5 leading-normal">
                            {cutTextTo20Words(request.description)}
                        </p>
                    </div>
                    <div className='flex space-x-3 my-4 px-5'>
                        <div
                            className='relative bg-slate-100 rounded-md  shadow-md p-2 group'>
                            {isLike ? <Heart className='' size={20} fill='#F54927' strokeWidth={0} /> : <Heart className='' size={20} />}

                            <span className='p-2 bg-rose-500 text-white
                            font-semibold rounded-lg
                            absolute bottom-7 right-0 opacity-0
                            group-hover:opacity-75'>Like</span>
                        </div>
                        <div
                            className='relative bg-slate-100 rounded-md  shadow-md p-2 group'>
                            {isInteressed ? <Star className='bg-gold-600' size={20} fill="#F5D814" strokeWidth={0} /> : <Star className='' size={20} />}
                            <span className='p-2 bg-amber-400 text-white
                             rounded-lg font-light
                            absolute bottom-7 left-0 opacity-0
                            group-hover:opacity-75'>Interessed</span>
                        </div>
                    </div>
                    <div className='my-4  px-5 '>
                        {request.status === "accepted" && (
                            <div className='flex space-x-4'>
                                <div className='flex space-x-6'>
                                    <button
                                        onClick={() => setIsOpen(true)}
                                        className='flex justify-center gap-1 align-center bg-indigo-500 text-white font-normal px-3 py-2 rounded-md  cursor-pointer'>
                                        <SquarePen size={18} className='font-extra-bold self-center' />
                                        <span>Update status</span>
                                    </button>
                                </div>
                                <div className='flex space-x-6'>
                                    <button
                                    onClick={() => handleFinish(request._id)}
                                    className='flex justify-center gap-1 align-center bg-green-500 text-white font-normalpx-3 py-2 rounded-md px-2  cursor-pointer'>
                                        <CircleCheck size={18} className='font-extra-bold self-center' />
                                        <span>Finish</span>
                                    </button>
                                </div>
                            </div>

                        )}
                    </div>
                </div>
            </div>
            <Modal
                currentStatusInfo={currentStatusInfo}
                setCurrentStatusInfo={setCurrentStatusInfo}
                title="Request detail"
                data={request}
                dataType="request_detail"
                isOpen={isOpen}
                onClose={handleClose}>
                <h1>Modal is opening</h1>
            </Modal>
        </div>
    )
}

export default RequestItemAcceptedOfCompany
