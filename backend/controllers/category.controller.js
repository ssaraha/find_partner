import Category from "../models/category.model.js";

export const fetchCategories = async (req, res) => {
    try {
        const categories = await Category.find({});

        res.status(200).json({
            success: true,
            message: "Category list",
            categories
        })
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}

export const insertCategory = async (req, res) => {
    try {
        const { name } = req.body;
        
        const newCategory = new Category({
            name
        });

        await newCategory.save();


        res.status(201).json({
            success: true,
            message: "Category added successfully",
            category
        })

        console.log("CAEGORY NAME >>> ", newCategory)
    } catch (error) {
        res.status(500).json({
            message: error
        })
    }
}