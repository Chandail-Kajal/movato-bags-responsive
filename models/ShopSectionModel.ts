import mongoose from "mongoose";

const shopSectionSchema = new mongoose.Schema(
  {
    image: { type: String, required: true },

    isActive: { type: Boolean, default: true },

    order: { type: Number, default: 0 },

    categoryType: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CategoryType",
      required: true,
    },

    categories: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
      },
    ],
  },
  { timestamps: true }
);

export const ShopSectionModel =
  mongoose.models.ShopSection ||
  mongoose.model("ShopSection", shopSectionSchema);