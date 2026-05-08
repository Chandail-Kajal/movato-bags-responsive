import mongoose from "mongoose";
 
const ProductSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String },
  price: { type: Number, required: true },
  image: { type: String, required: true },

  
  // This array allows the product to have multiple categories 
  // (e.g., "Large" from Size, "Mountains" from Collection, etc.)
  categories: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category"
  }],
 
  createdAt: { type: Date, default: Date.now }
});
 
export const ProductModel =
  mongoose.models.Product ||
  mongoose.model("Product", ProductSchema);
 