import React, { useEffect } from 'react'

import { motion } from "framer-motion"

const RequestCompanyStat = ({
    requestsSuggestedToCompany,
    requestsAcceptedByCompany,
    requestsFinishedByCompany
}) => {

   
    // console.log("FINISHED >>> ", requestsFinishedByCompany)
    return (
        <div className='mb-8'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className='container mx-auto px-4 py-8 bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md shadow-lg'>
                <h1 className='text-white text-center text-4xl tracking-widest mb-5'>STATISTICS REQUESTS</h1>
                <div className='grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 sm:place-items-center gap-4 '>
                    <div className="max-w-sm rounded overflow-hidden border-1 border-amber-50 shadow-xl">
                        <div className="px-6 py-4">
                            <div
                                className="font-bold text-2xl mb-2 text-center 
                                bg-linear-to-r from-blue-600 via-green-500 to-indigo-400 bg-clip-text text-transparent ">
                                    {requestsSuggestedToCompany?.length > 0 ? <h1>{requestsSuggestedToCompany?.length} NEW REQUESTS</h1> : <h1>NO NEW REQUEST YET</h1> }
                                </div>
                            <p className="text-gray-200 text-sm font-thin">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <button className='inline-block 
                            bg-gray-200 rounded-full px-3 py-1 cursor-pointer hover:bg-gray-300
                            text-sm font-semibold text-gray-700
                             mr-2 mb-2'>See all</button>
                        </div>
                    </div>

                    <div className="max-w-sm rounded overflow-hidden border-1 border-amber-50 shadow-xl">
                        {/* <img className="w-full" src="/img/card-top.jpg" alt="Sunset in the mountains"> */}
                        <div className="px-6 py-4">
                            <div
                                className="font-bold text-2xl mb-2 text-center 
                                bg-linear-to-r from-rose-300 to-orange-500 bg-clip-text text-transparent ">
                                    {requestsAcceptedByCompany?.length > 0 ? <h1>{requestsAcceptedByCompany?.length} ACCEPTED REQUESTS</h1> : <h1>NO ACCEPTED REQUEST YET</h1> }
                                </div>
                            <p className="text-gray-200 text-sm font-thin">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <button className='inline-block 
                            bg-gray-200 rounded-full px-3 py-1 cursor-pointer hover:bg-gray-300
                            text-sm font-semibold text-gray-700
                             mr-2 mb-2'>See all</button>
                        </div>
                    </div>

                    <div className="max-w-sm rounded overflow-hidden border-1 border-amber-50 shadow-xl">
                        <div className="px-6 py-4">
                            <div
                                className="font-bold text-3xl mb-2 text-center 
                                bg-linear-to-r from-teal-600 to-green-800 bg-clip-text text-transparent ">
                                    {requestsFinishedByCompany?.length > 0 ? <h1>{requestsFinishedByCompany?.length} FINISHED REQUESTS</h1> : <h1>NO FINISHED REQUEST YET</h1> }
                                </div>
                            <p className="text-gray-200 text-sm font-thin">
                                Lorem ipsum dolor sit amet, consectetur adipisicing elit. Voluptatibus quia, nulla! Maiores et perferendis eaque, exercitationem praesentium nihil.
                            </p>
                        </div>
                        <div className="px-6 pt-4 pb-2">
                            <button className='inline-block 
                            bg-gray-200 rounded-full px-3 py-1 cursor-pointer hover:bg-gray-300
                            text-sm font-semibold text-gray-700
                             mr-2 mb-2'>See all</button>
                        </div>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default RequestCompanyStat
