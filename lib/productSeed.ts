import { connectDb } from "@/lib/db";
import {
  ProductModel,
  CategoryModel,
} from "@/models";

const products = [
  {
    name: "Phoenix Travel Bag",
    description: "Large travel bag for mountain and weekend trips",
    price: 4999,


    categories: [
      { type: "SIZE", value: "large" },
      { type: "COLLECTION", value: "Phoenix" },
      { type: "TRIP", value: "weekend" },
    ],
  },

  {
    name: "Arizona Cabin Bag",
    description: "Medium cabin bag for business travel",
    price: 3999,

    categories: [
      { type: "SIZE", value: "cabin" },
      { type: "COLLECTION", value: "Arizona" },
      { type: "TRIP", value: "work/business" },
    ],
  },

  {
    name: "Madison Long Trip Bag",
    description: "Large luggage for long trips",
    price: 6999,

    categories: [
      { type: "SIZE", value: "large" },
      { type: "COLLECTION", value: "Madison" },
      { type: "TRIP", value: "long" },
    ],
  },
];

export const seedProducts = async () => {
  try {
    await connectDb();

    console.log("Product seeding started...");

    const existing = await ProductModel.countDocuments();

    if (existing > 0) {
      console.log("Products already exist");
      return;
    }

    for (const product of products) {
      const categoryIds = [];

      for (const cat of product.categories) {
        const categoryDoc = await CategoryModel.findOne({
          name: cat.value,
        });

        if (categoryDoc) {
          categoryIds.push(categoryDoc._id);
        }
      }

      await ProductModel.create({
        name: product.name,
        description: product.description,
        price: product.price,
        categories: categoryIds,
      
      });

      console.log(`Created product: ${product.name}`);
    }

    console.log("Product seeding complete");
    process.exit(0);

  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};