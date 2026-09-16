import React from 'react'
import { useState } from 'react';

export const usePagination = (nbCurrentPage, nbDataPerPage) => {

    const [currentPage, setCurrentPage] = useState(nbCurrentPage);
    const [dataPerPage, setDataPerPage] = useState(nbDataPerPage);
    const lastDataIndex = currentPage * dataPerPage;
    const firstDataIndex = lastDataIndex - dataPerPage;
    const [currentData, setCurrentData] = useState([]);

    return {
        currentPage,
        setCurrentPage, 
        dataPerPage,
        setDataPerPage,
        lastDataIndex,
        firstDataIndex,
        currentData,
        setCurrentData
    }
}

