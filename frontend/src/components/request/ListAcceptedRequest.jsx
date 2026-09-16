import React from 'react'
import RequestItemAcceptedOfCompany from './RequestItemAcceptedOfCompany'
import ButtonListStatus from './ButtonListStatus'

const ListAcceptedRequest = ({ requests, setStatToFilter }) => {
    // console.log("REQUESTS ACCEPTED >>> ", requests)
    return (
        <div>
            <ButtonListStatus setStatToFilter={setStatToFilter} />
            <div className='grid  lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1 gap-8'>
                {requests && requests.map((request) => {
                    return <RequestItemAcceptedOfCompany
                        key={request._id} request={request} />
                })}
                {requests.length <= 0 && <h1 className='text-4xl text-blue-400 uppercase text-center w-162.5'>You have no requests yet</h1>}
            </div>
        </div>
    )
}

export default ListAcceptedRequest
