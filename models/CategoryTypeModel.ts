import mongoose from "mongoose";

const CategoryTypeSchema = new mongoose.Schema({
  name: { type: String, required: true }, // e.g. Size, Usage, Collection
  slug: { type: String, unique: true },
});

export const CategoryTypeModel =
  mongoose.models.CategoryTypeModel ||
  mongoose.model("CategoryTypeModel", CategoryTypeSchema);
