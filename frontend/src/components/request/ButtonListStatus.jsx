import React from 'react'

const ButtonListStatus = ({ setStatToFilter }) => {
    return (
        <div>
            <div className=' flex space-x-3 mt-4 mb-8 align-center'>
                <button
                    onClick={() => setStatToFilter("all")}
                    className="group relative overflow-hidden rounded-md bg-pink-400 px-6 py-3 font-semibold text-white hover:text-purple-600 cursor-pointer transition-all duration-300">
                    <span className="absolute inset-0 w-full h-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                    <span className="relative z-10 uppercase font-normal">All</span>
                </button>
                <button
                    onClick={() => setStatToFilter("accepted")}
                    className="group relative overflow-hidden rounded-md bg-pink-400 px-6 py-3 font-semibold text-white hover:text-purple-600 cursor-pointer transition-all duration-300">
                    <span className="absolute inset-0 w-full h-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                    <span className="relative z-10 uppercase font-normal">Accepted</span>
                </button>
                <button
                    onClick={() => setStatToFilter("rejected")}
                    className="group relative overflow-hidden rounded-md bg-pink-400 px-6 py-3 font-semibold text-white hover:text-purple-600 cursor-pointer transition-all duration-300">
                    <span className="absolute inset-0 w-full h-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                    <span className="relative z-10 uppercase font-normal">Rejected</span>
                </button>
                <button
                    onClick={() => setStatToFilter("finished")}
                    className="group relative overflow-hidden rounded-md bg-pink-400 px-6 py-3 font-semibold text-white hover:text-purple-600 cursor-pointer transition-all duration-300">
                    <span className="absolute inset-0 w-full h-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                    <span className="relative z-10 uppercase font-normal">Finished</span>
                </button>
            </div>
        </div>
    )
}

export default ButtonListStatus
