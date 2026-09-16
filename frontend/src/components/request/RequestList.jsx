import React from 'react'

import { useRequestStore } from "../../store/requestStore.js"
import { useEffect } from 'react';

import { motion } from "framer-motion";
// import { formatDate } from "../../utils/date.js"
import { Check, Eye, List, Send, X } from 'lucide-react';

import { cutTextTo20Words } from "../../utils/text.js"

import {formatDate} from "../../utils/date";
import { usePagination } from '../../hooks/usePagination.jsx';
import Pagination from '../project/Pagination.jsx';

const RequestList = ({ setRequestId, setUserComponent }) => {
    const { requests, fetchRequestOfUser } = useRequestStore();

    useEffect(() => {
        fetchRequestOfUser();
    }, [])

    //PAGINATION
    const {
        currentPage,
        setCurrentPage, 
        dataPerPage,
        lastDataIndex,
        firstDataIndex,
        currentData,
        setCurrentData
    } = usePagination(1, 4);

    useEffect(() => {
        setCurrentData(requests?.slice(firstDataIndex, lastDataIndex))
    }, [currentPage, requests])        

    return (
        <div className='mb-8'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className=''>
                <div className='mt-4 mb-8 ml-auto'>
                    <button
                        onClick={() => setUserComponent("project")}
                        className="group relative overflow-hidden rounded-md bg-slate-500 px-6 py-3 font-semibold text-white cursor-pointer tracking-widest transition-all duration-300 flex space-x-2 hover:bg-slate-600 hover:text-white/70 mb-12">
                        <List size={25} className='font-bold' />
                        <span className="relative z-10">Project list</span>
                    </button>
                </div>
                {requests?.length > 0 ? 
                    (
                        <>
                        <h1 className='text-white text-center text-4xl tracking-widest mb-5'>My Requests</h1>
                            {currentData && currentData?.map((r) => {
                                return <div
                                    key={r._id}
                                    className='w-full pb-4 border-b border-b-amber-50 flex space-x-6 pt-4 mb-4'>
                                    <div className='w-24 h-26 rounded-md overflow-hidden flex flex-col shadow-lg'>
                                        <div className='bg-white text-center py-2'>
                                            <span className='text-xl font-bold text-blue-900'>{formatDate(r.createdAt).split(" ")[1].replace(",", "")}</span>
                                        </div>
                                        <div className='w-full text-center pt-2 bg-blue-700 text-white pb-2 basis-64'>
                                            <p className='text-md font-semibold'>
                                                {formatDate(r.createdAt).split(" ")[0]}
                                            </p>
                                            <p className='text-xs font-light'>{formatDate(r.createdAt).split(",")[1]}</p>
                                        </div>
                                    </div>
                                    <div className='flex flex-col basis-2xl'>
                                        <h3 className='text-lg text-cyan-300 font-semibold'>{r.title}</h3>
                                        <p className='text-sm text-blue-50 tracking-widest'>{cutTextTo20Words(r.description)} </p>
                                        <div className='flex flex-col my-4'>
                                            <div className='flex justify-between'>
                                                <div className='flex flex-col '>
                                                    <h6 className='text-lg text-purple-500 font-md'>Project title</h6>
                                                    <p className='text-sm font-thin text-white'>{r.project.title}</p>
                                                </div>
                                                <div className='flex flex-col'>
                                                    <h6 className='text-lg text-purple-500 font-md'>Company</h6>
                                                    <p className='text-sm font-thin text-white'>{r.company.username}</p>
                                                </div>
                                                <div className='flex flex-col '>
                                                    <h6 className='text-lg text-purple-500 font-md'>Completion tile</h6>
                                                    <p className='text-sm font-thin text-white'>{r.completionTime}</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>

                                    <div className='flex ml-auto space-x-3'>
                                    
                                        {(r.status === "created" || r.status === "accepted" || r.status === "finished" ) && <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs text-green-400 inset-ring inset-ring-green-400/30 h-8 uppercase font-bold">{r.status}</span>}
                                        {(r.status === "rejected"  ) && <span className="inline-flex items-center rounded-md bg-orange-400/10 px-2 py-1 text-xs text-orange-400 inset-ring inset-ring-orange-400/30 h-8 uppercase font-bold">{r.status}</span>}

                                        <div
                                            className='relative bg-transparent rounded-md  shadow-md p-2 group h-fit'>
                                            <span className='p-2 bg-slate-900 text-white
                                                    rounded-lg text-xs font-semibold
                                                absolute  right-0 opacity-0 bottom-8
                                                group-hover:opacity-75'>Detail</span>
                                        <Eye
                                            size={24} className='text-white 
                                            cursor-pointer font-bold' />
                                        </div>
                                    </div>

                                </div>
                            })}
                        </>
                    )
                : 
                    <h1 className='text-blue-400 text-4xl font-bold uppercase text-center'>You have not request yet.</h1>
                }
                <Pagination 
                    totalDatas={requests?.length} 
                    dataPerPage={dataPerPage}
                    // projectsPerPage={projectsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </motion.div>
            {/* <Modal
                title="Project detail"
                data={project}
                dataType="project_detail"
                isOpen={isOpen}
                onClose={handleClose}>
                <h1>Modal is opening</h1>
            </Modal> */}
        </div>
    )
}

export default RequestList
