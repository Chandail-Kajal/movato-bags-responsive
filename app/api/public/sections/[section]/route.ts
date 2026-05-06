/* eslint-disable @typescript-eslint/no-explicit-any */
import { connectDb } from "@/lib/db";
import { CategoryTypeModel, HeroSectionModel, ShopSectionModel } from "@/models";
import { NextRequest, NextResponse } from "next/server";

export async function GET(
  req: NextRequest,
  context: { params: Promise<{ section: string }> }
) {
  try {
    await connectDb();

    const { section } = await context.params;
    const searchParams = req.nextUrl.searchParams;

    let data: any[] = [];

    if (section === "hero") {
      data = await HeroSectionModel
        .find({ isActive: true })
        .sort({ order: 1 });

    } else if (section === "shop") {
      const categoryTypeSlug = searchParams.get("categorytype");

      const query: any = { isActive: true };

      if (categoryTypeSlug) {
        const typeDoc = await CategoryTypeModel.findOne({
          slug: categoryTypeSlug.toLowerCase(),
        });

        if (typeDoc) {
          query.categoryType = typeDoc._id;
        } else {
          return NextResponse.json({ data: [], success: true });
        }
      }

      data = await ShopSectionModel.find(query)
        .sort({ order: 1 })
        .populate("categoryType")
        .populate("categories");

    }
    
    else if (section === "category-types") {
      data = await CategoryTypeModel.find().sort({ name: 1 });
    }

    return NextResponse.json({ data, success: true });

  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}