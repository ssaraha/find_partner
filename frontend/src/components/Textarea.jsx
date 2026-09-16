import React from 'react'

const Textarea = ({ icon: Icon, ...props }) => {
    return (
        <div className='relative mb-6'>
            <div className='absolute inset-y-0 left-0 flex items-start pl-3 pt-3 pointer-events-none'>
                <Icon className="size-5 text-[#F1F1F1]" />
            </div>
            <textarea
                {...props}
                className='w-full pl-10 pr-3 py-2 bg-gray-800 bg-opacity-50 rounded-lg border border-gray-700 focus:border-white-200 focus:ring-2 focus:ring-white-400 focus:outline-none text-white placeholder-gray-400 transition duration-200'
            />
        </div>
    )
}

export default Textarea
