import React, { useEffect } from 'react'
import { useAuthStore } from '../../store/authStore.js';
import Navbar from '../_partials/Navbar.jsx';
import { AlertCircle, Building2, CalendarDays, ChartBarStacked, Info, NotepadText, Send, TextAlignJustify, TextAlignJustifyIcon, Timer } from 'lucide-react';
import { formatDate } from "../../utils/date.js"
import Input from '../Input.jsx';
import Textarea from '../Textarea.jsx';
import { useProjectsStore } from "../../store/projectStore.js"
import Modal from '../../pages/modal/Modal.jsx';
import { useState } from 'react';
import { useCompanyStore } from "../../store/companyStore.js";
import { useCallback } from 'react';
import { useRequestStore } from "../../store/requestStore.js";

import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

import { useFormik } from "formik";

const NewRequest = ({
    projectIdToRequest,
    setProjectIdToRequest,
    setUserComponent
}) => {
    const navigate = useNavigate();

    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuthStore();
    const { project, fetchProjectById } = useProjectsStore();
    const [idCompanyToRequest, setIdCompanyToRequest] = useState('')

    const [notifications, setNotifications] = useState([]);
   

    // const [projectId, setProjectId] = useState(project?._id)
    // const [owner, setOwner] = useState(project?.owner?.id)

    // const [title, setTitle] = useState('')
    // const [description, setDescription] = useState('')
    // const [completionTime, setCompletionTime] = useState('')


    const { company, companies, fecthCompanyById, fetchCompaniesRelatedWithProject } = useCompanyStore();
    const { createRequest } = useRequestStore()

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            completionTime: ''
            // company: ''
        },
        onSubmit: async (values) => {
            await createRequest(formik.values.title, formik.values.description, project?.owner?._id, project?._id, formik.values.completionTime, idCompanyToRequest);
            toast.success("Request created successfully");
            setUserComponent('project');
            navigate("/login");
        },
        validate: values => {
            let errors = {};

            if (!values.title) {
                errors.title = "Title is required"
            }
            if (!values.description) {
                errors.description = "Description is required"
            }
            if (!values.completionTime) {
                errors.completionTime = "Completion Time is required"
            }
            if (!idCompanyToRequest) {
                errors.company = "You must choose a company. Company Time is required"
            }

            return errors
        }
    });
    useEffect(() => {
        fetchCompaniesRelatedWithProject(projectIdToRequest);
        fetchProjectById(projectIdToRequest);
    }, []);

    useEffect(() => {
        fecthCompanyById(idCompanyToRequest)
    }, [idCompanyToRequest])

    const handleOpenCompanyModal = (event) => {
        event.preventDefault();
        setIsOpen(true);
    }

    const handleClose = useCallback(() => setIsOpen(false), []);

    return (
        <div className=''>
            {notifications.length > 0 && <h2>Vous avez notications: {notifications.length}</h2>}
            <h1 className='w-full text-center uppercase text-white/80 text-2xl py-4'>Project information</h1>
            <div className='grid lg:grid-cols-3 xl:grid-cols-3 md:grid-cols-2 sm:grid-cols-1'>
                <div className='flex flex-col my-4'>
                    <div className='flex space-x-2 align-center'>
                        <NotepadText className='text-white/80' size={20} />
                        <h3 className='text-blue-600 text-lg font-semibold'>Title</h3>
                    </div>
                    <p className='text-white/80 pl-6 text-md '>{project?.title}</p>
                </div>
                <div className='flex flex-col my-4'>
                    <div className='flex space-x-2 align-center'>
                        <ChartBarStacked className='text-white/80' size={20} />
                        <h3 className='text-blue-600 text-lg font-semibold'>Category</h3>
                    </div>
                    <p className='text-white/80 pl-6 text-md '>{project?.category.name}</p>
                </div>
                <div className='flex flex-col my-4'>
                    <div className='flex space-x-2 align-center'>
                        <Info className='text-white/80' size={20} />
                        <h3 className='text-blue-600 text-lg font-semibold'>Status</h3>
                    </div>
                    {project?.status === "created" && <span className="inline-flex items-center rounded-md bg-blue-400/10 px-2 py-1 text-xs font-medium text-blue-400 inset-ring inset-ring-blue-400/30 uppercase w-fit">created</span>}
                    {project?.status === "inprogressed" && <span className="inline-flex items-center rounded-md bg-yellow-400/10 px-2 py-1 text-xs font-medium text-yellow-500 inset-ring inset-ring-yellow-400/20 uppercase w-fit">in progress</span>}
                    {project?.status === "finished" && <span className="inline-flex items-center rounded-md bg-green-400/10 px-2 py-1 text-xs font-medium text-green-400 inset-ring inset-ring-green-500/20 w-fit uppercase">finished</span>}
                </div>
                <div className='flex flex-col my-4'>
                    <div className='flex space-x-2 align-center'>
                        <CalendarDays className='text-white/80' size={20} />
                        <h3 className='text-blue-600 text-lg font-semibold'>Created at</h3>
                    </div>
                    <p className='text-white/80 pl-6 text-md '>{formatDate(project?.createdAt)}</p>
                </div>
            </div>
            <div className='grid grid-cols-1'>
                <div className='flex flex-col my-4'>
                    <div className='flex space-x-2 align-center'>
                        <TextAlignJustify className='text-white/80' size={20} />
                        <h3 className='text-blue-600 text-lg font-semibold'>Description</h3>
                    </div>
                    <p className='text-white/80 pl-6 font-thin text-sm '>{project?.description}</p>
                </div>
            </div>
            <hr className='w-full h-[3px] bg-white/60 border-0' />
            <div className=''>
                <h1 className='w-full text-center uppercase text-white/80 text-2xl py-4'>Request information</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className='grid lg:grid-cols-2 xl:grid-cols-2 md:grid-cols-1 sm:grid-cols-1 gap-6 '>
                        <input
                            placeholder='hidden'
                            type='hidden' name='company'
                            value={idCompanyToRequest}
                            onChange={() => setProjectIdToRequest(idCompanyToRequest)}
                        />
                        <input
                            placeholder='hidden'
                            type='hidden' name='project' value={project?._id} onChange={() => setProjectId(project?._id)} />
                        <input
                            placeholder='hidden'
                            type='hidden' name='owner' value={project?.owner?._id} onChange={() => setOwner(project?.owner?._id)} />
                        
                        <div className='flex flex-col gap-3'>
                            {formik.errors.title && (
                                <p className='text-red-500 mt-1 text-sm flex items-center'>
                                    <AlertCircle className='w-4 h-4 mr-2' />
                                    {formik.errors.title}
                                </p>
                            )}
                            <Input
                                icon={NotepadText}
                                type="text"
                                placeholder="Title"
                                name="title"
                                value={formik.values.title}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            {formik.errors.completionTime && (
                                <p className='text-red-500 mt-1 text-sm flex items-center'>
                                    <AlertCircle className='w-4 h-4 mr-2' />
                                    {formik.errors.completionTime}
                                </p>
                            )}
                            <Input
                                icon={Timer}
                                type="text"
                                placeholder="Completion time"
                                name="completionTime"
                                value={formik.values.completionTime}
                                onChange={formik.handleChange}
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            {formik.errors.description && (
                                <p className='text-red-500 mt-1 text-sm flex items-center'>
                                    <AlertCircle className='w-4 h-4 mr-2' />
                                    {formik.errors.description}
                                </p>
                            )}
                            <Textarea
                                icon={TextAlignJustifyIcon}
                                name='description'
                                value={formik.values.description}
                                onChange={formik.handleChange}
                                rows={5}
                                cols={40}
                                placeholder="Description..."
                            />
                        </div>
                        <div className='flex flex-col gap-3'>
                            {idCompanyToRequest == "" && (
                                <p className='text-red-500 mt-1 text-sm flex items-center'>
                                    <AlertCircle className={`w-4 h-4 mr-2`} />
                                    {formik.errors.company}
                                </p>
                            )}
                            <div className='flex flex-col'>
                                <div className='flex space-x-3 text-gray-400 mb-2'>
                                    <Building2 />
                                    <p className=''>Choose Company</p>
                                </div>
                                {idCompanyToRequest && <p className='text-white font-semibold mb-4 ml-9'>{company?.username}</p>}
                                <button
                                    onClick={(e) => handleOpenCompanyModal(e)}
                                    className='text-white font-normal bg-blue-500 px-4 py-3 cursor-pointer rounded-sm w-fit'>
                                    Click here to choose a company...</button>
                            </div>
                        </div>
                    </div>
                    <button
                        type='submit'
                        className='flex items-center px-3 py-2 bg-purple-500 mt-4 rounded-sm text-white gap-3 cursor-pointer'>
                        <Send size={20} />
                        <span className=''>Send request</span>
                    </button>
                    <Modal
                        title="Company list"
                        data={companies}
                        dataType="company_list"
                        isOpen={isOpen}
                        onClose={handleClose}
                        setIdCompanyToRequest={setIdCompanyToRequest}
                    >
                        <h1>Modal is opening</h1>
                    </Modal>
                </form>
            </div>
        </div>
    )
}

export default NewRequest
