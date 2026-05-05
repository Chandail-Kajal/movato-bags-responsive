/* eslint-disable @typescript-eslint/no-explicit-any */
export const runtime = "nodejs";
import { connectDb } from "@/lib/db";
import { ShopSectionModel } from "@/models";
import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { NextRequest, NextResponse } from "next/server";
import { seed } from "@/lib/seed"

const uploadDir = path.join(process.cwd(), "public/uploads");

const ensureUploadDir = () => {
  if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
  }
};

const uploadImage = async (file: File) => {
  ensureUploadDir();

  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);

  const fileName = `${Date.now()}-${file.name}`;
  const filePath = path.join(uploadDir, fileName);

  fs.writeFileSync(filePath, buffer);

  return `/uploads/${fileName}`;
};

const isValidObjectId = (id: string) =>
  mongoose.Types.ObjectId.isValid(id);



export async function GET() {
  try {
    await connectDb();

    const data = await ShopSectionModel.find()
      .populate("categoryType")
      .populate("categories")
      .sort({ order: 1 });

    // await seed()

    return NextResponse.json({ data, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const formData = await req.formData();

    const imageFile = formData.get("image") as File;
    const categoryType = formData.get("categoryType") as string;
    const categories = formData.getAll("categories") as string[];

    const buttonTitle = formData.get("buttonTitle") as string;
    const caption = formData.get("caption") as string;
    const order = Number(formData.get("order") || 0);

    if (!isValidObjectId(categoryType)) {
      return NextResponse.json(
        { success: false, message: "Invalid categoryType" },
        { status: 400 }
      );
    }

    // Validate categories
    const validCategories = categories.filter((id) =>
      isValidObjectId(id)
    );

    const imageUrl =
      imageFile && imageFile.size > 0
        ? await uploadImage(imageFile)
        : "";

    const item = await ShopSectionModel.create({
      image: imageUrl,
      categoryType,
      categories: validCategories,
      buttonTitle,
      caption,
      order,
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDb();

    const formData = await req.formData();

    const id = formData.get("id") as string;
    const imageFile = formData.get("image") as File;
    const categoryType = formData.get("categoryType") as string;
    const categories = formData.getAll("categories") as string[];

    const buttonTitle = formData.get("buttonTitle") as string;
    const caption = formData.get("caption") as string;

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const updateData: any = {
      buttonTitle,
      caption,
    };

    if (isValidObjectId(categoryType)) {
      updateData.categoryType = categoryType;
    }

    if (categories.length > 0) {
      updateData.categories = categories.filter((id) =>
        isValidObjectId(id)
      );
    }

    if (imageFile && imageFile.size > 0) {
      updateData.image = await uploadImage(imageFile);
    }

    const updated = await ShopSectionModel.findByIdAndUpdate(
      id,
      updateData,
      { new: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}


export async function PATCH(req: NextRequest) {
  try {
    await connectDb();

    const { id, isActive } = await req.json();

    if (!isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const updated = await ShopSectionModel.findByIdAndUpdate(
      id,
      { isActive },
      { new: true }
    );

    return NextResponse.json({ data: updated, success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}


export async function DELETE(req: NextRequest) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !isValidObjectId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const item = await ShopSectionModel.findById(id);

    if (item?.image) {
      const filePath = path.join(process.cwd(), "public", item.image);

      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await ShopSectionModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}