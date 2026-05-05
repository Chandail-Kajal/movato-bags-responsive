import mongoose from "mongoose";

const CategoryTypeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // Size, Usage, Collection
  slug: { type: String, unique: true },
});

export const CategoryTypeModel =
  mongoose.models.CategoryType ||
  mongoose.model("CategoryType", CategoryTypeSchema);