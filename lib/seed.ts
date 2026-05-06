
import { connectDb } from "@/lib/db";
import { CategoryTypeModel, CategoryModel } from "@/models";

const categoryTypes = [
    {
        name: "SIZE",
        categories: ["large", "medium", "cabin", "set"],
    },
    {
        name: "COLLECTION",
        categories: ["Phoenix", "Arizona", "Orlando", "Madison"],
    },
    {
        name: "TRIP",
        categories: ["weekend", "work/business", "long", "frequent"],
    },
];

const slugify = (text: string) =>
    text.toLowerCase().replace(/\s+/g, "-");

export const seed = async () => {
    try {
        await connectDb();

        console.log(" Seeding started...");

        const existing = await CategoryModel.countDocuments()
        if (existing > 0) return

        for (const type of categoryTypes) {
            // 1 Create or find CategoryType
            let typeDoc = await CategoryTypeModel.findOne({
                slug: slugify(type.name),
            });

            if (!typeDoc) {
                typeDoc = await CategoryTypeModel.create({
                    name: type.name,
                    slug: slugify(type.name),
                });
                console.log(`Created type: ${type.name}`);
            } else {
                console.log(` Type exists: ${type.name}`);
            }

            // 2 Create Categories
            for (const cat of type.categories) {
                const exists = await CategoryModel.findOne({
                    slug: slugify(cat),
                    type: typeDoc._id,
                });

                if (!exists) {
                    await CategoryModel.create({
                        name: cat,
                        slug: slugify(cat),
                        type: typeDoc._id,
                    });

                    console.log(`   ↳ Created category: ${cat}`);
                } else {
                    console.log(`   ↳ Exists: ${cat}`);
                }
            }
        }

        console.log(" Seeding complete");
        process.exit(0);
    } catch (error) {
        console.error(error);
        process.exit(1);
    }
};
