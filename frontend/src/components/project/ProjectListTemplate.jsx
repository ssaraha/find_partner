import React from 'react'
import { List, Plus } from 'lucide-react';
import UserProjectList from './UserProjectList';
import NewProject from './NewProject';

const ProjectListTemplate = ({
    isProjectList,
    setIsProjectList,
    project,
    projects,
    fetchProjectsOfUser,
    fetchProjectById,
    setIsNewRequest,
    setProjectIdToRequest,
    setUserComponent
}) => {
    return (
        <div>
            {isProjectList ?
                <div className='mt-4 mb-8 ml-auto'>
                    <div className="flex space-x-4">
                        <button
                            onClick={() => setIsProjectList(false)}
                            className="group relative overflow-hidden rounded-md bg-blue-600 px-6 py-3 font-semibold text-white cursor-pointer tracking-widest transition-all duration-300 flex space-x-2 hover:bg-blue-700 hover:text-white/70 mb-12">
                            <Plus size={25} className='font-bold' />
                            <span className="relative z-10">New Project</span>
                        </button>
                        <button
                            onClick={() => setUserComponent("request")}
                            className="group relative overflow-hidden rounded-md bg-slate-500 px-6 py-3 font-semibold text-white cursor-pointer tracking-widest transition-all duration-300 flex space-x-2 hover:bg-slate-600 hover:text-white/70 mb-12">
                            <List size={25} className='font-bold' />
                            <span className="relative z-10">Request list</span>
                        </button>
                    </div>

                    <UserProjectList
                        setUserComponent={setUserComponent}
                        project={project}
                        projects={projects}
                        fetchProjectsOfUser={fetchProjectsOfUser}
                        fetchProjectById={fetchProjectById}
                        setIsNewRequest={setIsNewRequest}
                        setProjectIdToRequest={setProjectIdToRequest}
                    />
                </div>
                : <div className='mt-4 mb-8 ml-auto'>
                    <button
                        onClick={() => setIsProjectList(true)}
                        className="group relative overflow-hidden rounded-md bg-green-600 px-6 py-3 font-semibold text-white cursor-pointer tracking-widest transition-all duration-300 flex space-x-2 hover:bg-green800-700 hover:text-white/70 mb-12">
                        <List size={25} className='font-bold' />
                        <span className="relative z-10">Project List</span>
                    </button>
                    <NewProject />
                </div>
            }
        </div>
    )
}

export default ProjectListTemplate
