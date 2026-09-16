import User from "../models/user.model.js";
import Project from "../models/project.model.js";

export const getCompaniesLinkedWithcategory = async (req, res) => {
    try {
        const { projectId } = req.params;
        const project = await Project.findById(projectId);
        if (!project) {
            return res.status(400).json({
                success: false,
                message: "Project not found"
            })
        }
        
        const companies = await User.find({ categoriesWorked: project.category._id })
        
        
        return res.status(200).json({
            success: true,
            message: "Companies related of projects",
            companies
        })
    } catch (error) {
        return res.status(500).json({
            success: false,
            message: error
        })
    }
}

export const fetchCompanyById = async (req, res) => {
    try {
        const { companyId } = req.params;
        const company = await User.findById(companyId).select('-password');
        if (!company) {
            return res.status(400).json({
                success: false,
                message: "Company not found"
            })
        }

        return res.status(200).json({
            success: true,
            message: "Company",
            company
        })
    } catch (error) {
        return res.status(400).json({
            success: false,
            message: error.message
        })
    }
}