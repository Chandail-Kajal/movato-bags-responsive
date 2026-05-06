export const runtime = "nodejs";

import { connectDb } from "@/lib/db";
import { ShopSectionModel } from "@/models";
import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

type ChatBody = {
  message?: string;
};

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY in environment");
  }
  return new OpenAI({ apiKey });
}

async function getCatalogContextForAI() {
  await connectDb();

  const shop = await ShopSectionModel.find({ isActive: true })
    .sort({ order: 1 })
    .populate("categoryType")
    .populate("categories")
    .lean();

  // Keep context small + user-friendly (avoid dumping full Mongo docs).
  const items = shop.map((s: any) => ({
    buttonTitle: typeof s.buttonTitle === "string" ? s.buttonTitle : "",
    caption: typeof s.caption === "string" ? s.caption : "",
    categoryType: s?.categoryType?.name ?? s?.categoryType?.slug ?? "",
    categories: Array.isArray(s?.categories)
      ? s.categories
          .map((c: any) => c?.name ?? c?.slug ?? "")
          .filter(Boolean)
      : [],
    image: typeof s.image === "string" ? s.image : "",
  }));

  return {
    source: "shop-sections",
    count: items.length,
    items,
  };
}

export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ChatBody;
    const message = (body?.message ?? "").trim();

    if (!message) {
      return NextResponse.json(
        { success: false, error: "Message is required" },
        { status: 400 }
      );
    }

    const catalog = await getCatalogContextForAI();
    const client = getOpenAIClient();

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",
      temperature: 0.4,
      messages: [
        {
          role: "system",
          content:
            "You are Movato's helpful shopping assistant. Use the provided catalog context to answer questions. " +
            "If the catalog context doesn't contain the info, say what you do know and ask a short follow-up question. " +
            "Be concise, friendly, and avoid hallucinating product specs.",
        },
        {
          role: "system",
          content: `Catalog context (JSON):\n${JSON.stringify(catalog)}`,
        },
        { role: "user", content: message },
      ],
    });

    const text = completion.choices?.[0]?.message?.content?.trim() || "";

    return NextResponse.json({
      success: true,
      reply: text || "Sorry — I couldn’t generate a response. Try again.",
    });
  } catch (err: any) {
    const message =
      typeof err?.message === "string" ? err.message : "Unexpected error";
    return NextResponse.json({ success: false, error: message }, { status: 500 });
  }
}

