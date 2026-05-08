/* eslint-disable @typescript-eslint/no-explicit-any */
export const runtime = "nodejs";

import { connectDb } from "@/lib/db";
import {
  ProductModel,
} from "@/models/ProductModel";

import { NextRequest, NextResponse } from "next/server";
import OpenAI from "openai";

type ChatBody = {
  message?: string;
};

function getOpenAIClient() {
  const apiKey = process.env.OPENAI_API_KEY;

  if (!apiKey) {
    throw new Error("Missing OPENAI_API_KEY");
  }

  return new OpenAI({ apiKey });
}

async function getCatalogContextForAI() {
  await connectDb();

  const products = await ProductModel.find()
    .populate({
      path: "categories",
      populate: {
        path: "type",
        model: "CategoryType",
      },
    })
    .lean();

  const formattedProducts = products.map((p: any) => {
    const categories = Array.isArray(p.categories)
      ? p.categories.map((c: any) => ({
        name: c.name,
        slug: c.slug,

        type: c.type
          ? {
            name: c.type.name,
            slug: c.type.slug,
          }
          : null,
      }))
      : [];

    const primaryCategory = categories[0];

    const productSlug = p.name
      .toLowerCase()
      .replace(/\s+/g, "-");

    return {
      id: p._id,
      name: p.name,
      description: p.description,
      price: p.price,

      categories,

      links: primaryCategory
        ? {
          categoryType: `/products/${primaryCategory.type?.slug}`,

          category: `/products/${primaryCategory.type?.slug}/${primaryCategory.slug}`,

          product: `/products/${primaryCategory.type?.slug}/${primaryCategory.slug}/${productSlug}`,
        }
        : null,
    };
  });

  return {
    totalProducts: formattedProducts.length,
    products: formattedProducts || [],
  };
}


export async function POST(req: NextRequest) {
  try {
    const body = (await req.json()) as ChatBody;

    const message = body?.message?.trim();

    if (!message) {
      return NextResponse.json(
        {
          success: false,
          error: "Message is required",
        },
        { status: 400 }
      );
    }

    const catalog = await getCatalogContextForAI();

    const client = getOpenAIClient();

    const completion = await client.chat.completions.create({
      model: process.env.OPENAI_MODEL || "gpt-4.1-mini",

      temperature: 0.3,

      messages: [
        {
          role: "system",
          content: `
                    You are Movato's AI shopping assistant.

                    Rules:
                    - Only use the provided catalog data
                    - Never invent products or prices
                    - Recommend products based on categories and descriptions
                    - Keep responses concise and helpful
                    - If no matching product exists, say so clearly
                    - Mention prices when relevant

                    IMPORTANT FORMAT RULES:
                    - Return valid HTML only
                    - Do NOT return markdown
                    - Do NOT use backticks
                    - Use semantic HTML tags only

                    Allowed tags:
                    <div>
                    <p>
                    <ul>
                    <li>
                    <strong>
                    <a>
                    <br>

                    For links:
                    - Use relative URLs exactly as provided
                    - Example:
                    <a href="/products/size/large">Large Bags</a>

                    Example response:
                    <div>
                      <p>I found two large bags for you:</p>

                      <ul>
                        <li>
                          <strong>Phoenix Travel Bag</strong><br>
                          Large travel bag for mountain and weekend trips.<br>
                          Price: $49.99<br>
                          <a href="/products/size/large/phoenix-travel-bag">
                            View product
                          </a>
                        </li>

                        <li>
                          <strong>Madison Long Trip Bag</strong><br>
                          Large luggage for long trips.<br>
                          Price: $69.99<br>
                          <a href="/products/size/large/madison-long-trip-bag">
                            View product
                          </a>
                        </li>
                      </ul>

                      <p>
                        <a href="/products/size/large">
                          Browse all large bags
                        </a>
                      </p>
                    </div>
                    `,
        },
        {
          role: "system",
          content: `CATALOG:\n${JSON.stringify(catalog)}`,
        },

        {
          role: "user",
          content: message,
        },
      ],
    });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      "Sorry, I couldn't generate a response.";

    return NextResponse.json({
      success: true,
      reply,
    });
  } catch (err: any) {
    console.error(err);

    return NextResponse.json(
      {
        success: false,
        error:
          typeof err?.message === "string"
            ? err.message
            : "Unexpected error",
      },
      { status: 500 }
    );
  }
}