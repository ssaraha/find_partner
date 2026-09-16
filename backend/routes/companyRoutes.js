import express from "express";
import { protectRoute } from "../middleware/protectRoute.js"
import {
    getCompaniesLinkedWithcategory,
    fetchCompanyById
} from "../controllers/user.company.controller.js"
const router = express.Router();

router.get('/companies-linked-with-project/:projectId', protectRoute, getCompaniesLinkedWithcategory)
router.get('/:companyId', protectRoute, fetchCompanyById)
export default router;