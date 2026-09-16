import React from 'react'
import CompanyItem from './CompanyItem'

const CompanyList = ({ companies, setIdCompanyToRequest, onClose }) => {
    return (
        <div className="my-6">
            {companies && companies.map((company) => {
                return <CompanyItem
                    onClose={onClose}
                    key={company._id}
                    company={company}
                    setIdCompanyToRequest={setIdCompanyToRequest}
                />
            })}
        </div>
    )
}

export default CompanyList
