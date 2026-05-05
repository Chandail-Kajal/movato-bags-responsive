import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
    name: { type: String, required: true }, // e.g. Large, Mountains, Phoenix
    size: { type: String },
    slug: { type: String, required: true },
    type: { type: mongoose.Schema.Types.ObjectId, ref: 'CategoryType', required: true }
});


export const CategoryModel = mongoose.models.CategoryModel || mongoose.model("CategoryModel", CategorySchema)