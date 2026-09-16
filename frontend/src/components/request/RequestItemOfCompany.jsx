import { Check, CircleCheck, Heart, Star, X } from 'lucide-react'
import React, { useState } from 'react'

import { useRequestStore } from "../../store/requestStore.js"
import { useAuthStore } from '../../store/authStore.js'
import { toast } from "react-hot-toast"

import { useNavigate } from "react-router-dom";

const RequestItemOfCompany = ({ request }) => {
    const navigate = useNavigate();

    const {
        likeAndDislikeRequest,
        interessedAndUninteressedRequest,
        acceptRequest,
        declineRequest
    } = useRequestStore()
    const { user } = useAuthStore();

    const [isLike, setIsLike] = useState(request?.likes?.includes(user?._id))
    const [isInteressed, setIsInteressed] = useState(request?.interessed?.includes(user?._id))

    const handleLikeAndDislike = async (requestId) => {
        setIsLike(!isLike);
        likeAndDislikeRequest(requestId);
    }

    const handleInteressed = async (requestId) => {
        setIsInteressed(!isInteressed);
        interessedAndUninteressedRequest(requestId)
    }

    const handleAcceptRequest = async (requestId) => {
        await acceptRequest(requestId);
        navigate('/company')
        toast.success("Accepting request successfully")
    }

    const handleDeclineRequest = async (requestId) => {
        await declineRequest(requestId);

        navigate('/company');
        toast.success('You are decline a request successfully');
    }

    return (
        <div >
            <div className="max-w-sm overflow-hidden bg-white shadow-md rounded-2xl border border-gray-100 transition duration-300 hover:shadow-xl hover:-translate-y-1 ">

                <div className="">
                    <h3 className=" font-bold text-gray-900 text-center text-2xl mb-2 bg-indigo-500 px-5 py-3 text-white">{request.title}</h3>
                    <p className="text-sm text-gray-600 leading-relaxed mb-5 px-5">
                        {request.description}
                    </p>
                    <span className="inline-flex items-center rounded-md bg-blue-400/10 mx-5 py-1 text-xs font-medium text-blue-400 inset-ring inset-ring-blue-400/30 uppercase ">{request.status}</span>
                    <div className='flex space-x-3 my-4 px-5'>
                        <div
                            onClick={() => handleLikeAndDislike(request._id)}
                            className='relative bg-slate-100 rounded-md  shadow-md p-2 group cursor-pointer'>
                            {isLike ? <Heart className='' size={20} fill='#F54927' strokeWidth={0} /> : <Heart className='' size={20} />}

                            <span className='p-2 bg-rose-500 text-white 
                            font-semibold rounded-lg
                            absolute bottom-7 right-0 opacity-0
                            group-hover:opacity-75'>Like</span>
                        </div>
                        <div
                            onClick={() => handleInteressed(request._id)}
                            className='relative bg-slate-100 rounded-md  shadow-md p-2 group cursor-pointer'>
                            {isInteressed ? <Star className='bg-gold-600' size={20} fill="#F5D814" strokeWidth={0} /> : <Star className='' size={20} />}
                            <span className='p-2 bg-amber-400 text-white 
                             rounded-lg font-light
                            absolute bottom-7 left-0 opacity-0
                            group-hover:opacity-75'>Interessed</span>
                        </div>
                    </div>
                    <div className='my-4  px-5'>
                        {request.status === "created" && (
                            <div className='flex space-x-6'>
                                <button
                                    onClick={() => handleAcceptRequest(request._id)}
                                    className='flex justify-center gap-1 align-center bg-indigo-500 text-white font-normal px-3 py-2 rounded-md  cursor-pointer'>
                                    <Check size={18} className='font-extra-bold self-center' />
                                    <span>Accept</span>
                                </button>
                                <button
                                    onClick={() => handleDeclineRequest(request._id)}
                                    className='flex justify-center gap-1 
                                    align-center bg-rose-500 text-white 
                                    font-normal px-3 py-2 rounded-md  cursor-pointer'
                                >
                                    <X size={18} className='font-etra-bold self-center' />
                                    Decline
                                </button>
                            </div>
                        )}

                        {/* {request.status === "accepted" && (
                            <div className='flex space-x-6'>
                                <button className='flex justify-center gap-1 align-center bg-green-500 text-white font-normal px-3 py-2 rounded-md  cursor-pointer'>
                                    <CircleCheck size={18} className='font-extra-bold self-center' />
                                    <span>Finish</span>
                                </button>
                            </div>
                        )} */}

                    </div>
                </div>
            </div>
        </div >
    )
}

export default RequestItemOfCompany
