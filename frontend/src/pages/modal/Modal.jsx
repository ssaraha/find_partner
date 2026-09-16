import { motion, AnimatePresence } from 'framer-motion';
import { useEffect } from 'react';
import { useState } from 'react';
import ProjectDetail from '../../components/modal/ProjectDetail';
import CompanyList from '../../components/company/CompanyList';
import RequestDetail from '../../components/request/RequestDetail';

function Modal({ 
    isOpen, 
    children, 
    onClose, 
    dataType, 
    data, 
    title, 
    setIdCompanyToRequest, 
    setCurrentStatusInfo, 
    currentStatusInfo }) {

    const [typeData, setTypeData] = useState('');
    useEffect(() => {
        setTypeData(dataType)
    }, []);

    if (!isOpen) return null;
    return <div className="fixed inset-0 z-50 flex items-center justify-center ">
        {/* Backdrop */}
        <div
            onClick={onClose}
            className="fixed inset-0 bg-slate-900/80 backdrop-blur-sm transition-opacity"
        ></div>

        {/* Modal Content */}
        <div className="relative z-50 w-full 
        max-w-md md:max-w-lg lg:max-w-2xl
        transform overflow-hidden rounded-2xl bg-gray-700 
        text-left align-middle shadow-2xl transition-all border
         border-slate-100 m-4">
            <div className="flex p-6 items-center 
            justify-between border-b bg-teal-500
            border-slate-100 pb-4">
                <h3 className="text-3xl text-center  w-full
                        uppercase font-extrabold tracking-widest
                        text-white">{title}</h3>
                <button
                    onClick={onClose}
                    className="rounded-full p-1 text-slate-400 cursor-pointer  hover:bg-slate-100 hover:text-slate-600 transition-colors"
                >
                    <svg className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>
            </div>
            {/* START CONTENT */}
            <div className='p-6'>
                {typeData === "project_detail" && <ProjectDetail onClose={onClose} project={data} />}
                {typeData === "company_list" && <CompanyList onClose={onClose}
                    setIdCompanyToRequest={setIdCompanyToRequest}
                    companies={data} />}
                {typeData === "request_detail" && <RequestDetail onClose={onClose}
                    setIdCompanyToRequest={setIdCompanyToRequest}
                    currentStatusInfo={currentStatusInfo}
                    setCurrentStatusInfo={setCurrentStatusInfo}
                    request={data} />}
            </div>
            {/* END CONTENT */}
        </div>
    </div>
}

export default Modal;