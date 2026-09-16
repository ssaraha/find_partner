import React, { useState } from 'react'
import RequestList from '../../components/request/RequestList'
import NewRequest from '../../components/request/NewRequest'

const Request = ({
    userComponent,
    setUserComponent,
    projectIdToRequest,
    setProjectIdToRequest
}) => {
    const [requestComponennt, setRequestComponent] = useState('list')
    const [requestId, setRequestId] = useState(0);
    return (
        <div>
            {
                // requestComponennt === "list" && requestId === 0 ?
                userComponent !== "newRequest" ?
                    <RequestList
                        setUserComponent={setUserComponent}
                        setRequestId={setRequestId} />
                    : <NewRequest
                        setUserComponent={setUserComponent}
                        projectIdToRequest={projectIdToRequest}
                        setProjectIdToRequest={setProjectIdToRequest}
                        requestId={requestId} setRequestId={setRequestId} />
            }
        </div>
    )
}

export default Request
