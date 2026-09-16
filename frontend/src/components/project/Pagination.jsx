import React from 'react'

const Pagination = ({
    totalDatas, 
    // projectsPerPage,
    dataPerPage,
    setCurrentPage,
    currentPage
}) => {
    let pages = [];
    
    // for (let i = 1; i <= Math.ceil(totalProjects / projectsPerPage); i++) {
    for (let i = 1; i <= Math.ceil(totalDatas / dataPerPage); i++) {
        pages.push(i);
    }
    return (
        <div className='flex gap-3 justify-center'>
            {
                pages?.map((page, index) => {
                    return <button key={index} 
                            className={`text-white cursor-pointer px-2 py-1 border-amber-50 border rounded-sm ${currentPage == page ? 'bg-blue-500' : ''}`}
                            onClick={() => setCurrentPage(page)}>{page}</button>
                        
                })
            }
        </div>
    )
}

export default Pagination
