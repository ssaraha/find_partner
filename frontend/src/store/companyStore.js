import { create } from "zustand";

import axios from "axios";

const API_URL = 'http://localhost:5000/api/companies';
axios.defaults.withCredentials = true;

export const useCompanyStore = create(
    (set) => ({
        company: null,
        companies: null,
        fetchCompaniesRelatedWithProject: async (projectId) => {
            try {
                const response = await axios.get(`${API_URL}/companies-linked-with-project/${projectId}`);
                set({companies: response.data.companies})
            } catch (error) {
                console.log("ERROR >>>> ", error.message)
            }
        },
        fecthCompanyById: async (companyId) => {
            
            const response = await axios.get(`${API_URL}/${companyId}`)
            set({ company: response.data.company });
        }
    })
)