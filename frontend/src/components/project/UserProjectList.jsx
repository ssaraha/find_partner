import React from 'react'
import moment from "moment"
import { motion } from "framer-motion"
import { useEffect } from 'react';
import { useState } from 'react';
import { useCategoryStore } from "../../store/categoryStore.js"
import { Eye, Plus, Send } from 'lucide-react';
import Modal from "../../pages/modal/Modal.jsx"
import { useCallback } from 'react';

import { formatDate } from "../../utils/date.js"

import { useRequestStore } from "../../store/requestStore.js"

import ReactPaginate from 'react-paginate';
import { useNavigate } from 'react-router-dom';
import Pagination from './Pagination.jsx';
import { usePagination } from '../../hooks/usePagination.jsx';

const UserProjectList = ({
    project,
    projects,
    // totalPages,
    fetchProjectsOfUser,
    fetchProjectById,
    setIsNewRequest,
    setProjectIdToRequest,
    setUserComponent
}) => {
    const { fetchRequestByProject } = useRequestStore();

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();

    const { categories, fetchCategories } = useCategoryStore()
    const [projectId, setProjectId] = useState(0)
    const [catToFilter, setCatToFilter] = useState('');

    const [projectList, setProjectList] = useState([]);

    //PAGINATION
    const {
        currentPage,
        setCurrentPage, 
        dataPerPage,
        lastDataIndex,
        firstDataIndex,
        currentData,
        setCurrentData
    } = usePagination(1, 4);
    

    //FILTER PROJECTS BY CATEGORY
    const filterByCategory = projects?.filter((p) => {
        if (catToFilter == "" || catToFilter == "all") {
            return projects;
        }
        else {
            
            return p.category.name.toLocaleLowerCase() === catToFilter.toLocaleLowerCase()
        }

    })

    useEffect(() => {
        setCurrentData(filterByCategory?.slice(firstDataIndex, lastDataIndex))
    }, [catToFilter, currentPage, projects])        

    const handleClose = useCallback(() => setIsOpen(false), []);

    const handleOpen = (id) => {
        setIsOpen(true);
        setProjectId(id)
        fetchProjectById(id)
    }

    useEffect(() => {
        fetchCategories();
        fetchProjectsOfUser();


    }, []);

    useEffect(() => {
        if (projects) {
            setProjectList(projects);
        }
    }, [projects])

    const handleClickRequestBtn = (projectId) => {
        setUserComponent("newRequest")
        setProjectIdToRequest(projectId)
        setIsNewRequest(true)
    }    

    return (
        <div className='mb-8'>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className=''>
                {projects?.length > 0 ? (
                    <>
                        <h1 className='text-white text-center text-4xl tracking-widest mb-5'>My Projects</h1>
                        <div className='flex space-x-5'>
                            <div className='mt-4 mb-8 align-center'>
                                <button
                                    onClick={() => setCatToFilter('all')}
                                    className="group relative overflow-hidden rounded-md bg-pink-400 px-6 py-3 font-semibold text-white hover:text-purple-600 cursor-pointer transition-all duration-300">
                                    <span className="absolute inset-0 w-full h-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                                    <span className="relative z-10">ALL</span>
                                </button>
                            </div>
                            {categories && categories.map((c) => {
                                return <div className='mt-4 mb-8 align-center' key={c._id}>
                                    <button
                                        onClick={() => setCatToFilter(c.name)}
                                        className={`group relative overflow-hidden rounded-md bg-pink-400 px-6 py-3 font-semibold text-white hover:text-purple-600 cursor-pointer transition-all duration-300 ${catToFilter == c.name ? 'bg-purple-600 ' : '' }`}>
                                        <span className="absolute inset-0 w-full h-full origin-left scale-x-0 bg-white transition-transform duration-300 ease-out group-hover:scale-x-100"></span>
                                        <span className="relative z-10">{c.name}</span>
                                    </button>
                                </div>
                            })}
                        </div>
                        {currentData && currentData.map((p) => {
                            return <div
                                key={p._id}
                                className='w-full pb-4 border-b border-b-amber-50 flex space-x-6 pt-4 mb-4'>
                                <div className='w-24 h-26 rounded-md overflow-hidden flex flex-col shadow-lg'>
                                    <div className='bg-white text-center py-2'>
                                        <span className='text-xl font-bold text-blue-900'>{formatDate(p.createdAt).split(" ")[1].replace(",", "")}</span>
                                    </div>
                                    <div className='w-full text-center pt-2 bg-blue-700 text-white pb-2 basis-64'>
                                        <p className='text-md font-semibold'>{formatDate(p.createdAt).split(" ")[0]}</p>
                                        <p className='text-xs font-light'>{formatDate(p.createdAt).split(",")[1]}</p>
                                    </div>
                                </div>
                                <div className='flex flex-col basis-2xl'>
                                    <h3 className='text-lg text-cyan-300 font-semibold'>{p.title}</h3>
                                    <p className='text-sm text-blue-50 tracking-widest'>{p.description} ...</p>
                                </div>
                                <div className='flex ml-auto space-x-3'>
                                    {/* <span className="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs text-blue-400 inset-ring inset-ring-blue-400/30 h-8 uppercase font-bold w-30">{p.status == "inprogressed" ? "in progressed" : p.status}</span> */}
                                    {(p.status === "created" || p.status === "finished" ) && <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs text-green-400 inset-ring inset-ring-green-400/30 h-8 uppercase font-bold text-center">{p.status}</span>}
                                    {(p.status === "inprogressed") && <span className="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs text-blue-400 inset-ring inset-ring-blue-400/30 h-8 uppercase font-bold text-center">{p.status}</span>}
                                    <div
                                        className='relative bg-transparent rounded-md  shadow-md p-2 group h-fit'>
                                        <span className='p-2 bg-slate-900 text-white
                                                rounded-lg text-xs font-semibold
                                            absolute  right-0 opacity-0 bottom-8
                                            group-hover:opacity-75'>Detail</span>
                                        <Eye
                                            onClick={() => handleOpen(p._id)}
                                            size={24} className='text-white 
                                                cursor-pointer font-bold' />
                                    </div>
                                    {
                                        (!p.request && p.status === "created")  &&
                                        <>
                                            <div
                                                className='relative bg-transparent rounded-md  shadow-md p-2 group h-fit'>
                                                <span className='p-2 bg-slate-900 text-white
                                                    rounded-lg text-xs font-semibold w-24
                                                    absolute bottom-8 -right-3 opacity-0
                                                    group-hover:opacity-75  text-center'>Send request</span>
                                                <Send
                                                onClick={() => handleClickRequestBtn(p._id)}
                                                size={24}
                                                className='text-blue-500 cursor-pointer font-bold' />
                                            </div>
                                        </>
                                    }

                                </div>
                            </div>
                        })}
                    </>
                ) : 
                    <h1 className='text-4xl font-bold text-blue-400 uppercase text-center'>You have not projects.</h1>
                }
                <Pagination 
                    totalDatas={filterByCategory?.length} 
                    dataPerPage={dataPerPage}
                    // projectsPerPage={projectsPerPage}
                    setCurrentPage={setCurrentPage}
                    currentPage={currentPage}
                />
            </motion.div>
            <Modal
                title="Project detail"
                data={project}
                dataType="project_detail"
                isOpen={isOpen}
                onClose={handleClose}>
                <h1>Modal is opening</h1>
            </Modal>
            
        </div>
    )
}

export default UserProjectList
