import express from "express";
import { fetchCategories, insertCategory } from "./../controllers/category.controller.js"

const router = express.Router();
router.get("/", fetchCategories);
router.post('/create', insertCategory)

export default router;