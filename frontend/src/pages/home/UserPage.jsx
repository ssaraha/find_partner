import React from 'react'
import Navbar from '../../components/_partials/Navbar'
import { useAuthStore } from '../../store/authStore';
import UserStatProject from '../../components/project/UserStatProject';
import { useEffect } from 'react';
import { useProjectsStore } from '../../store/projectStore';
import UserProjectList from '../../components/project/UserProjectList';
import { useState } from 'react';

import NewProject from '../../components/project/NewProject';
import ProjectListTemplate from '../../components/project/ProjectListTemplate';
// import NewRequest from '../request/NewRequest';
import Request from "../request/Request"


const UserPage = ({
    setUserComponent,
    userComponent,
    projectIdToRequest,
    setProjectIdToRequest }) => {
    const { user, logout } = useAuthStore();

    const { 
        projects, 
        project, 
        fetchProjectsOfUser, 
        fetchProjectById, 
        fetchProjectsByStatus, 
        projectsCreated, 
        projectsInProgressed, 
        projectsFinished } = useProjectsStore()


    const [isProjectList, setIsProjectList] = useState(true);
    const [isNewRequest, setIsNewRequest] = useState(false);

    useEffect(() => {
        fetchProjectsByStatus('created');
        fetchProjectsByStatus('inprogressed');
        fetchProjectsByStatus('finished');
        
    }, [])

    useEffect(() => {
        const getProjectById = async (projectId) => {
            const result = await fetchProjectById(projectId);
        }

        getProjectById(projectIdToRequest);
    }, [projectIdToRequest]);

    return (
        <div>
            <Navbar user={user} handlelogout={logout} />
            <UserStatProject 
                projectsCreated={projectsCreated} 
                projectsInProgressed={projectsInProgressed} 
                projectsFinished={projectsFinished} />
                
            <div className='container mx-auto px-4 py-2 bg-gray-700 bg-opacity-50 backdrop-filter backdrop-blur-xl rounded-md shadow-lg mb-4'>
                {
                    userComponent !== "project" ?
                        <Request
                            projectIdToRequest={projectIdToRequest}
                            setProjectIdToRequest={setProjectIdToRequest}
                            userComponent={userComponent}
                            setUserComponent={setUserComponent} />
                        :
                        <ProjectListTemplate
                            isProjectList={isProjectList}
                            setIsProjectList={setIsProjectList}
                            project={project}
                            projects={projects}
                            fetchProjectsOfUser={fetchProjectsOfUser}
                            fetchProjectById={fetchProjectById}
                            setIsNewRequest={setIsNewRequest}
                            setProjectIdToRequest={setProjectIdToRequest}
                            setUserComponent={setUserComponent}
                        />
                }

            </div>


        </div>
    )
}

export default UserPage
