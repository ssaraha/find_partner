import { create } from "zustand";
import axios from "axios";

const API_URL = 'http://localhost:5000/api/categories';
axios.defaults.withCredentials = true;

export const useCategoryStore = create(
    (set) => ({
        categories: null,
        isLoadingCategories: false,
        fetchCategories: async () => {
            try {
                set({isLoadingCategories: true})
                const response = await axios.get(`${API_URL}/`);
                set({ categories: response.data.categories, isLoadingCategories: false })
                
                return response.data.categories;
            } catch (error) {
                console.log("ERROR >>> ", error)
            }
        }
    })
);