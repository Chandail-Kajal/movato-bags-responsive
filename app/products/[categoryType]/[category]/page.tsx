/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { notFound } from "next/navigation";

import { ProductModel } from "@/models/ProductModel";
import { CategoryModel } from "@/models/CategoryModel";
import { CategoryTypeModel } from "@/models/CategoryTypeModel";
import { connectDb } from "@/lib/db";

type Props = {
    params: Promise<{
        categoryType: string;
        category: string;
    }>;
};

export default async function CategoryPage({ params }: Props) {
    const { categoryType, category } = await params;

    await connectDb();

    const categoryTypeDoc = await CategoryTypeModel.findOne({
        slug: categoryType,
    });

    if (!categoryTypeDoc) {
        return notFound();
    }

    const categoryDoc = await CategoryModel.findOne({
        slug: category,
        type: categoryTypeDoc._id,
    });

    if (!categoryDoc) {
        return notFound();
    }

    const products = await ProductModel.find({
        categories: categoryDoc._id,
    }).sort({ createdAt: -1 });

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="mb-10">
                <p className="text-sm text-gray-500">
                    {categoryTypeDoc.name}
                </p>

                <h1 className="text-4xl font-bold mt-2">
                    {categoryDoc.name}
                </h1>

                <p className="text-gray-600 mt-2">
                    {products.length} product
                    {products.length !== 1 ? "s" : ""}
                </p>
            </div>

            {products.length === 0 ? (
                <p>No products found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {products.map((product: any) => {
                        const productSlug = product.name
                            .toLowerCase()
                            .replace(/\s+/g, "-");

                        return (
                            <Link
                                key={product._id}
                                href={`/products/${categoryType}/${category}/${productSlug}`}
                                className="border rounded-xl p-5 hover:shadow-lg transition"
                            >
                                <h2 className="text-xl font-semibold">
                                    {product.name}
                                </h2>

                                <p className="text-lg font-medium mt-2">
                                    ${product.price.toFixed(2)}
                                </p>

                                {product.description && (
                                    <p className="text-gray-600 mt-3 line-clamp-3">
                                        {product.description}
                                    </p>
                                )}
                            </Link>
                        );
                    })}
                </div>
            )}
        </div>
    );
}