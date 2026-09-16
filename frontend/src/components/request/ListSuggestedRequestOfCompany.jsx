import React, { useEffect } from 'react'
import RequestItemOfCompany from './RequestItemOfCompany';
import { useRequestStore } from '../../store/requestStore';



const ListRequestOfCompany = ({ requests }) => {
    const { fetchRequestOfCompany } = useRequestStore();

    useEffect(() => {
        fetchRequestOfCompany()
    }, [requests])

    return (
        <div className='grid  lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8'>
            {requests?.length > 0 && requests.map((request) => {
                return <RequestItemOfCompany
                    key={request._id} request={request} />
            })}

            {requests?.length <=0 && <h1 className='text-4xl text-blue-400 uppercase text-center w-162.5'>You have no suggested requests yet</h1> } 
        </div>
    )
}

export default ListRequestOfCompany
