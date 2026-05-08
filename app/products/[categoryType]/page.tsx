/* eslint-disable @typescript-eslint/no-explicit-any */

import Link from "next/link";
import { notFound } from "next/navigation";
import { CategoryModel } from "@/models/CategoryModel";
import { CategoryTypeModel } from "@/models/CategoryTypeModel";
import { connectDb } from "@/lib/db";


type Props = {
    params: Promise<{
        categoryType: string;
    }>;
};

export default async function CategoryTypePage({
    params,
}: Props) {
    const { categoryType } = await params;

    await connectDb();

    const categoryTypeDoc = await CategoryTypeModel.findOne({
        slug: categoryType,
    });

    if (!categoryTypeDoc) {
        return notFound();
    }

    const categories = await CategoryModel.find({
        type: categoryTypeDoc._id,
    }).sort({ name: 1 });

    return (
        <div className="max-w-6xl mx-auto p-8">
            <div className="mb-10">
                <p className="text-sm text-gray-500">
                    Product Category Type
                </p>

                <h1 className="text-4xl font-bold mt-2">
                    {categoryTypeDoc.name}
                </h1>

                <p className="text-gray-600 mt-2">
                    {categories.length} categor
                    {categories.length === 1 ? "y" : "ies"}
                </p>
            </div>

            {categories.length === 0 ? (
                <p>No categories found.</p>
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {categories.map((category: any) => (
                        <Link
                            key={category._id}
                            href={`/products/${categoryType}/${category.slug}`}
                            className="border rounded-xl p-6 hover:shadow-lg transition"
                        >
                            <h2 className="text-2xl font-semibold">
                                {category.name}
                            </h2>

                            <p className="text-gray-600 mt-2">
                                View products
                            </p>
                        </Link>
                    ))}
                </div>
            )}
        </div>
    );
}