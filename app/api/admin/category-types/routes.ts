/* eslint-disable @typescript-eslint/no-explicit-any */

import { connectDb } from "@/lib/db";
import { CategoryTypeModel } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import mongoose from "mongoose";

const isValidId = (id: string) =>
    mongoose.Types.ObjectId.isValid(id);

export async function GET() {
    try {
        await connectDb();

        const data = await CategoryTypeModel.find().sort({ createdAt: -1 });

        return NextResponse.json({ success: true, data });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function POST(req: NextRequest) {
    try {
        await connectDb();

        const body = await req.json();

        const { name, slug } = body;

        if (!name) {
            return NextResponse.json(
                { success: false, message: "Name required" },
                { status: 400 }
            );
        }

        const item = await CategoryTypeModel.create({ name, slug });

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

        const { id, name, slug } = await req.json();

        if (!isValidId(id)) {
            return NextResponse.json(
                { success: false, message: "Invalid ID" },
                { status: 400 }
            );
        }

        const updated = await CategoryTypeModel.findByIdAndUpdate(
            id,
            { name, slug },
            { new: true }
        );

        return NextResponse.json({ success: true, data: updated });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

import { CategoryModel } from "@/models";

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

        // ❗ Prevent delete if categories exist
        const hasCategories = await CategoryModel.findOne({ type: id });

        if (hasCategories) {
            return NextResponse.json(
                {
                    success: false,
                    message: "Cannot delete. Categories exist.",
                },
                { status: 400 }
            );
        }

        await CategoryTypeModel.findByIdAndDelete(id);

        return NextResponse.json({ success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}