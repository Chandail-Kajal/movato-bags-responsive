/* eslint-disable @typescript-eslint/no-explicit-any */

export const runtime = "nodejs";

import { connectDb } from "@/lib/db";
import { ProductModel } from "@/models/ProductModel";

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

  return new OpenAI({
    apiKey,
  });
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
      image: p.image,
      categories,
      links: primaryCategory
        ? {
          categoryType:
            `/products/${primaryCategory.type?.slug}`,
          category:
            `/products/${primaryCategory.type?.slug}/${primaryCategory.slug}`,
          product:
            `/products/${primaryCategory.type?.slug}/${primaryCategory.slug}/${productSlug}`,
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
        {
          status: 400,
        }
      );
    }

    const catalog = await getCatalogContextForAI();

    const client = getOpenAIClient();

    const completion =
      await client.chat.completions.create({
        model:
          process.env.OPENAI_MODEL ||
          "gpt-4.1-mini",

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
                            <img>
                              <button>
                                <br>

            STYLE RULES:
                - Use inline styles only
                - Make product cards modern and clean
                - Add rounded corners
                - Add spacing and borders
                - Product image should look like ecommerce product card
                - View Product should look like a button

            For product cards use this exact structure:

      <div style="border:1px solid #e5e5e5;border-radius:16px;padding:16px;margin-top:16px;background:#ffffff;">

        <img
           src="IMAGE_URL"
          alt="PRODUCT_NAME"
          style="
          width:100%;
          height:220px;
          object-fit:cover;
          border-radius:12px;
        "
        />

      <div style="margin-top:12px;">

          <strong style="font-size:18px;">
            PRODUCT_NAME
          </strong>

          <p style="margin-top:8px;color:#666;">
             PRODUCT_DESCRIPTION
          </p>

            <p style="
               margin-top:8px;
              font-weight:bold;
              font-size:18px;
            ">
              ₹PRICE
            </p>

           <a
            href="PRODUCT_LINK"
            style="text-decoration:none;"
          >
          <button
            style="
            margin-top:12px;
            background:black;
            color:white;
            border:none;
            padding:12px 18px;
            border-radius:10px;
            cursor:pointer;
            font-weight:600;
            "
          >
            View Product
          </button>
          </a>

        </div>

       </div>

            Example response:

          <div>
            <p>
              I found some great large travel bags for you.
            </p>

              PRODUCT_CARDS_HERE
          </div>
            `,
          },

          {
            role: "system",

            content: `
          CATALOG:
              ${JSON.stringify(catalog)}
            `,
          },

          {
            role: "user",

            content: message,
          },
        ],
      });

    const reply =
      completion.choices?.[0]?.message?.content?.trim() ||
      `
        <div>
          <p>
            Sorry, I couldn't generate a response.
          </p>
        </div>
      `;

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
      {
        status: 500,
      }
    );
  }
}