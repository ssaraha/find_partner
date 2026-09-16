import { create } from "zustand";

import axios from "axios";

const API_URL = 'http://localhost:5000/api/projects';
axios.defaults.withCredentials = true;

export const useProjectsStore = create(
    (set, get) => ({
        project: null,
        projects: null,
        projectsCreated: null, 
        projectsInProgressed: null, 
        projectsFinished: null, 
        // totalPages: 1,
        isLoading: false,
        error: null,
        fetchProjectsOfUser: async () => {
            // const response = await axios.get(`${API_URL}/?page=${page}&limit=${limit}`);
            const response = await axios.get(`${API_URL}/`);
            set({projects: response.data.projects})
        },
        fetchProjectById: async (projectId) => {
            const response = await axios.get(`${API_URL}/${projectId}`);
            set({ project: response.data.project });

            return response.data.project;
        },
        createProject: async (title, description, category) => {
        // createProject: async (formData) => {
            set({isLoading: true})
            const response = await axios.post(`${API_URL}/create`, { title, description, category })
            
            // const response = await axios.post(`${API_URL}/create`, formData, {
            //     headers: {
            //         'Content-Type': 'application/json'
            //     }
            // })
            set({isLoading: false})

            return response;
        },
        fetchProjectsByStatus: async (status) => {
            const response = await axios.get(`${API_URL}/status/${status}`);

            if (status === "created") {
                set({projectsCreated: response.data.projects})
            }
            else if (status === "inprogressed") {
                set({projectsInProgressed: response.data.projects})
            }
            if (status === "finished") {
                set({projectsFinished: response.data.projects})
            }
       }
    })
)