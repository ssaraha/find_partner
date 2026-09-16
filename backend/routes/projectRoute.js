import express from "express"
import { createProject, fetchProjectsOfUsers, fetchProjectById, fetchProjectsByStatus } from "../controllers/project.controller.js";
import { protectRoute } from "../middleware/protectRoute.js"


const router = express.Router();

router.post('/create', protectRoute,createProject)
router.get('/', protectRoute, fetchProjectsOfUsers); 
router.get('/:projectId', protectRoute, fetchProjectById);
router.get('/status/:status', protectRoute, fetchProjectsByStatus);


export default router;