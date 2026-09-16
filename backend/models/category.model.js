import mongoose from "mongoose";

const categorySchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true,
        enum: ["IT", "BTP", "COMMERCE", "ENVIRONMENT"]
    }
}, { timestamp: true })

const Category = mongoose.model("Category", categorySchema);

export default Category;