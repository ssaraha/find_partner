import React from 'react'
import { SquareCheckBig } from "lucide-react"
import toast from "react-hot-toast"

const CompanyItem = ({ company, setIdCompanyToRequest, onClose }) => {
    const handleChooseCompany = (e) => {
        e.preventDefault();
        setIdCompanyToRequest(company._id)
        toast.success("Company choosed successfully")
        onClose();
    }
    return (
        <div className='flex justify-between my-6'>
            <div className='flex flex-col'>
                <h3 className='text-cyan-500'>Company name</h3>
                <p className='text-thin font-md text-white/80'>{company.username}</p>
            </div>
            <button
                onClick={(e) => handleChooseCompany(e)}
                className='text-white 
                bg-blue-500 px-3 py-1
                cursor-pointer rounded-sm flex items-center justify-center gap-2'>
                <SquareCheckBig size={20} />
                Choose me
            </button>

        </div>
    )
}

export default CompanyItem
