/* eslint-disable @typescript-eslint/no-explicit-any */

import { notFound } from "next/navigation";

import { ProductModel } from "@/models/ProductModel";
import { CategoryModel } from "@/models/CategoryModel";
import { CategoryTypeModel } from "@/models/CategoryTypeModel";
import { connectDb } from "@/lib/db";

type Props = {
    params: Promise<{
        categoryType: string;
        category: string;
        productName: string;
    }>;
};

export default async function ProductPage({ params }: Props) {
    const { categoryType, category, productName } = await params;

    await connectDb();

    const categoryTypeDoc = await CategoryTypeModel.findOne({
        slug: String(categoryType).toLocaleLowerCase(),
    });

    if (!categoryTypeDoc) {
        return notFound();
    }

    const categoryDoc = await CategoryModel.findOne({
        slug: String(category).toLocaleLowerCase(),
        type: categoryTypeDoc._id,
    });

    if (!categoryDoc) {
        return notFound();
    }

    const normalizedProductName = decodeURIComponent(productName)
        .replace(/-/g, " ")
        .toLowerCase();

    const product = await ProductModel.findOne({
        categories: categoryDoc._id,
        name: {
            $regex: new RegExp(`^${normalizedProductName}$`, "i"),
        },
    }).populate({
        path: "categories",
        populate: {
            path: "type",
            model: "CategoryType",
        },
    });

    console.log(product)

    if (!product) {
        return notFound();
    }

    return (
        <div className="max-w-4xl mx-auto p-8">
            <div className="mb-6">
                <p className="text-sm text-gray-500">
                    {categoryTypeDoc.name} / {categoryDoc.name}
                </p>

                <h1 className="text-4xl font-bold mt-2">{product.name}</h1>
            </div>

            <div className="space-y-4">
                <p className="text-2xl font-semibold">
                    ${product.price.toFixed(2)}
                </p>

                <p className="text-gray-700">
                    {product.description || "No description"}
                </p>
            </div>

            <div className="mt-8">
                <h2 className="font-semibold mb-2">Categories</h2>

                <div className="flex gap-2 flex-wrap">
                    {product.categories.map((cat: any) => (
                        <span
                            key={cat._id}
                            className="px-3 py-1 bg-gray-100 rounded-full text-sm"
                        >
                            {cat.name}
                        </span>
                    ))}
                </div>
            </div>
        </div>
    );
}