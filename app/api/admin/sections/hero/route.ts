/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
export const runtime = "nodejs";

import { connectDb } from "@/lib/db";
import { HeroSectionModel } from "@/models";
import fs from "fs";
import { NextRequest, NextResponse } from "next/server";


export async function GET() {
    try {
        await connectDb();

        const heros = await HeroSectionModel.find().sort({ order: 1 });

        return NextResponse.json({ data: heros, success: true });
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 });
    }
}




export async function POST(req: NextRequest) {
    try {
        await connectDb();
        const formData = await req.formData();

        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const primaryBtn = formData.get("primaryBtn") as string;
        const secondaryBtn = formData.get("secondaryBtn") as string;
        const order = Number(formData.get("order"));

        const file = formData.get("image") as File | null;

        let imagePath = "";

        if (file && file.size > 0) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const fileName = `${Date.now()}-${file.name}`;
            const uploadPath = `./public/uploads/${fileName}`;

            fs.writeFileSync(uploadPath, buffer);

            imagePath = `/uploads/${fileName}`;
        }

        const hero = await HeroSectionModel.create({
            title,
            description,
            primaryBtn,
            secondaryBtn,
            order,
            image: imagePath, // optional
        });

        return NextResponse.json({ data: hero, success: true });
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
        const title = formData.get("title") as string;
        const description = formData.get("description") as string;
        const primaryBtn = formData.get("primaryBtn") as string;
        const secondaryBtn = formData.get("secondaryBtn") as string;

        const file = formData.get("image") as File | null;

        const updateData: any = {
            title,
            description,
            primaryBtn,
            secondaryBtn,
        };

        if (file && file.size > 0) {
            const bytes = await file.arrayBuffer();
            const buffer = Buffer.from(bytes);

            const fileName = `${Date.now()}-${file.name}`;
            const uploadPath = `./public/uploads/${fileName}`;

            fs.writeFileSync(uploadPath, buffer);

            updateData.image = `/uploads/${fileName}`;
        }

        const updatedHero = await HeroSectionModel.findByIdAndUpdate(
            id,
            updateData,
            { new: true }
        );

        return NextResponse.json({ data: updatedHero, success: true });
    } catch (error) {
        console.error(error);
        return NextResponse.json({ success: false }, { status: 500 });
    }
}

export async function PATCH(req: NextRequest) {
    try {
        await connectDb();

        const { id, isActive } = await req.json();

        const updated = await HeroSectionModel.findByIdAndUpdate(
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
        const searchParams = req.nextUrl.searchParams
        const id = searchParams.get("id")
        const result = await HeroSectionModel.deleteOne({ _id: id })
        if (result.deletedCount > 0) {
            return NextResponse.json({ success: true, deleteCount: result.deletedCount }, { status: 200 })
        }
        return NextResponse.json({ success: false }, { status: 304 })
    } catch (error) {
        return NextResponse.json({ success: false }, { status: 500 })
    }

}