// app/api/admin/products/route.ts

/* eslint-disable @typescript-eslint/no-explicit-any */

export const runtime = "nodejs";

import { connectDb } from "@/lib/db";
import { ProductModel } from "@/models";

import { NextRequest, NextResponse } from "next/server";

import fs from "fs"

export async function GET() {
  try {
    await connectDb();

    const products = await ProductModel.find()
      .sort({ createdAt: -1 });

    return NextResponse.json({
      success: true,
      data: products,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const formData = await req.formData();

    const name = formData.get("name") as string;

    const description =
      formData.get("description") as string;

    const price = Number(formData.get("price"));

    const file = formData.get("image") as File | null;

    let imagePath = "";

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${file.name}`;

      const uploadPath =
        `./public/uploads/${fileName}`;

      fs.writeFileSync(uploadPath, buffer);

      imagePath = `/uploads/${fileName}`;
    }

    const product = await ProductModel.create({
      name,
      description,
      price,
      image: imagePath,
    });

    return NextResponse.json({
      success: true,
      data: product,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}


// PUT

export async function PUT(req: NextRequest) {
  try {
    await connectDb();

    const formData = await req.formData();

    const id = formData.get("id") as string;

    const name = formData.get("name") as string;

    const description =
      formData.get("description") as string;

    const price = Number(formData.get("price"));

    const file = formData.get("image") as File | null;

    const updateData: any = {
      name,
      description,
      price,
    };

    if (file && file.size > 0) {
      const bytes = await file.arrayBuffer();

      const buffer = Buffer.from(bytes);

      const fileName = `${Date.now()}-${file.name}`;

      const uploadPath =
        `./public/uploads/${fileName}`;

      fs.writeFileSync(uploadPath, buffer);

      updateData.image = `/uploads/${fileName}`;
    }

    const updated =
      await ProductModel.findByIdAndUpdate(
        id,
        updateData,
        { new: true }
      );

    return NextResponse.json({
      success: true,
      data: updated,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}


// DELETE

export async function DELETE(req: NextRequest) {
  try {
    await connectDb();

    const searchParams =
      req.nextUrl.searchParams;

    const id = searchParams.get("id");

    await ProductModel.findByIdAndDelete(id);

    return NextResponse.json({
      success: true,
    });

  } catch (error) {
    console.log(error);

    return NextResponse.json(
      { success: false },
      { status: 500 }
    );
  }
}