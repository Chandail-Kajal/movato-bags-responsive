import mongoose from "mongoose";

const CategorySchema = new mongoose.Schema({
  name: { type: String, required: true }, // Large, Mountains
  slug: { type: String, required: true },

  type: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "CategoryType",
    required: true,
  },
});

export const CategoryModel =
  mongoose.models.Category ||
  mongoose.model("Category", CategorySchema);