import { create } from "zustand";
import axios from "axios";

const API_URL = 'http://localhost:5000/api/requests';
axios.defaults.withCredentials = true;
export const useRequestStore = create(
    (set) => ({
        request: null,
        requests: null,
        requestsAccepted: null,
        requestsSuggestedToCompany: null,
        requestsAcceptedByCompany: null,
        requestsFinishedByCompany: null,
        fetchRequestOfUser: async () => {
            const results = await axios.get(`${API_URL}/`)
            set({ requests: results.data.requests })

            // console.log("REQUESTS OF USER >>> ", results)
            return results;
        },
        createRequest: async (title, description, owner, project, completionTime, company) => {
            const result = await axios.post(`${API_URL}/create`, {
                title,
                description,
                owner,
                project,
                completionTime,
                company
            })
        },
        fetchRequestByProject: async (projectId) => {
            const results = await axios.get(`${API_URL}/request-by-project/${projectId}`);
            return results.data.requests;
        },
        fetchRequestOfCompany: async () => {
            const response = await axios.get(`${API_URL}/request-of-company`);
            set({ requests: response.data.requests })
            
            return response.data.requests;
        },
        likeAndDislikeRequest: async (requestId) => {
            const response = await axios.get(`${API_URL}/like-dislike/${requestId}`);
        },
        interessedAndUninteressedRequest: async (requestId) => {
            const response = await axios.get(`${API_URL}/interessed/${requestId}`)
        }, 
        acceptRequest: async (requestId) => {
            const response = await axios.get(`${API_URL}/accept-request/${requestId}`);

            return response.data.request
        },
        fetchAcceptedRequests: async () => {
            const responses = await axios.get(`${API_URL}/accepted-request`);
            //console.log("RESPONSES >>> ", responses)
            set({ requestsAccepted: responses.data.requests });
        },
        declineRequest: async (requestId) => {
            const responses = await axios.get(`${API_URL}/decline/${requestId}`);
        },
        updateStatusInfo: async (requestId, statusInfo) => {
            const responses = await axios.post(`${API_URL}/update-status-info/${requestId}`, {statusInfo});

            return responses.data.request;
        },
        fetchRequestById: async (requestId) => {
            const responses = await axios.get(`${API_URL}/${requestId}`)

            return responses.data.request;
        },
        finishRequest: async (requestId) => {
            const responses = await axios.get(`${API_URL}/finish/${requestId}`);

            return responses.data.request;
        },
        fetchRequestsByStatus: async (status) => {
            const response = await axios.get(`${API_URL}/status/${status}`);

            if (status === "created") {
                set({requestsSuggestedToCompany: response.data.requests})
            }
            else if (status === "accepted") {
                set({requestsAcceptedByCompany: response.data.requests})
            }
            if (status === "finished") {
                set({requestsFinishedByCompany: response.data.requests})
            }
            
        }
    })
);

