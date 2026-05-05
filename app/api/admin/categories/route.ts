/* eslint-disable @typescript-eslint/no-explicit-any */

import { connectDb } from "@/lib/db";
import { CategoryModel } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

const isValidId = (id: string) =>
  mongoose.Types.ObjectId.isValid(id);

export async function GET(req: NextRequest) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const type = searchParams.get("type");

    const filter: any = {};

    if (type && isValidId(type)) {
      filter.type = type;
    }

    const data = await CategoryModel.find(filter)
      .populate("type")
      .sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

export async function POST(req: NextRequest) {
  try {
    await connectDb();

    const body = await req.json();

    const { name, slug, type } = body;

    if (!name || !type) {
      return NextResponse.json(
        { success: false, message: "Missing fields" },
        { status: 400 }
      );
    }

    if (!isValidId(type)) {
      return NextResponse.json(
        { success: false, message: "Invalid type" },
        { status: 400 }
      );
    }

    const item = await CategoryModel.create({
      name,
      slug,
      type,
    });

    return NextResponse.json({ success: true, data: item });
  } catch (error: any) {
    return NextResponse.json(
      { success: false, message: error.message },
      { status: 500 }
    );
  }
}

export async function PUT(req: NextRequest) {
  try {
    await connectDb();

    const { id, name, slug, type } = await req.json();

    if (!isValidId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    const updated = await CategoryModel.findByIdAndUpdate(
      id,
      { name, slug, type },
      { new: true }
    );

    return NextResponse.json({ success: true, data: updated });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}

import { ShopSectionModel } from "@/models";

export async function DELETE(req: NextRequest) {
  try {
    await connectDb();

    const { searchParams } = new URL(req.url);
    const id = searchParams.get("id");

    if (!id || !isValidId(id)) {
      return NextResponse.json(
        { success: false, message: "Invalid ID" },
        { status: 400 }
      );
    }

    // ❗ Prevent delete if used in shop sections
    const inUse = await ShopSectionModel.findOne({
      categories: id,
    });

    if (inUse) {
      return NextResponse.json(
        {
          success: false,
          message: "Category is used in shop sections",
        },
        { status: 400 }
      );
    }

    await CategoryModel.findByIdAndDelete(id);

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ success: false }, { status: 500 });
  }
}