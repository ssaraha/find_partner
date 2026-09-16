import React, { useEffect, useState } from 'react'
import Navbar from '../../components/_partials/Navbar'
import { useAuthStore } from '../../store/authStore'
import RequestCompanyStat from '../../components/request/RequestCompanyStat';
import { useRequestStore } from '../../store/requestStore';
import ListSuggestedRequestOfCompany from '../../components/request/ListSuggestedRequestOfCompany';
import { motion } from "framer-motion"
import ButtonListStatus from '../../components/request/ButtonListStatus';
import { ClipboardList, UserRoundArrowLeft } from 'lucide-react';
import ListAcceptedRequest from '../../components/request/ListAcceptedRequest';


const CompanyHomePage = () => {
    const { user, logout } = useAuthStore();
    const {
        requests,
        requestsAccepted,
        fetchAcceptedRequests,
        fetchRequestOfCompany,
        requestsSuggestedToCompany,
        requestsAcceptedByCompany,
        requestsFinishedByCompany,
        fetchRequestsByStatus
     } = useRequestStore();
    const [requestOfCompany, setRequestOfCompany] = useState([]);

    const [typeRequests, setTypeRequests] = useState('suggesstedRequests')

    const [statToFilter, setStatToFilter] = useState('all');

    useEffect(() => {
        fetchRequestOfCompany();
        fetchAcceptedRequests();
        fetchRequestsByStatus('created')
        fetchRequestsByStatus('accepted')
        fetchRequestsByStatus('finished')
    }, [])

    // console.log(requestsSuggestedToCompany)

    const filterRequests = statToFilter  === "all" ? 
        requestsAccepted : 
        requestsAccepted.filter((request) =>  request.status.toLowerCase() === statToFilter.toLowerCase())

    return (
        <div>
            <Navbar user={user} handlelogout={logout} />
            <RequestCompanyStat
                requestsAcceptedByCompany={requestsAcceptedByCompany}
                requestsSuggestedToCompany = {requestsSuggestedToCompany}
                requestsFinishedByCompany={requestsFinishedByCompany}
             />
            <div className='container mx-auto px-4 py-2 bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md shadow-lg mb-4'>
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className=''>
                    <div className='flex space-x-8 mt-10 mb-6'>
                        <button
                            onClick={() => setTypeRequests('suggesstedRequests')}
                            className='flex justify-center align-center space-x-2 py-2 px-3 bg-indigo-400 text-white rounded-md cursor-pointer'>
                            <ClipboardList size={20} />
                            <span>Suggested Requests</span>
                        </button>
                        <button
                            onClick={() => setTypeRequests('myRequests')}
                            className='flex justify-center align-center space-x-2 py-2 px-3 bg-teal-400 text-white rounded-md cursor-pointer'>
                            <UserRoundArrowLeft size={20} />
                            <span>My requests</span>
                        </button>
                    </div>
                    {
                        typeRequests === "suggesstedRequests" ? <ListSuggestedRequestOfCompany
                            requests={requests} /> : <ListAcceptedRequest 
                                requests={filterRequests} 
                                setStatToFilter={setStatToFilter}
                            />
                    }

                </motion.div>
            </div>
        </div>
    )
}

export default CompanyHomePage
