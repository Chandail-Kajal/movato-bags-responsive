"use client";
import Image from "next/image";
import icon1 from "@/assets/icons/icon-1.svg";
import React from "react";

export default function SupportSection() {

  const data = {
    heading: "Support That\nTravels with you",
    subheading:
      "From warranty coverage to customer support, Movato provides a friction-free ownership experience.",
    buttonText: "Shop Now",
    imageUrl: "/assets/images/support-1.jpg",

    features: [
      {
        path: "/assets/icons/icon-1.svg",
        title: "3-YEAR INTERNATIONAL WARRANTY",
        description:
          "Coverage designed for real-world travel, not fine print.",
      },
      {
        path: "/assets/icons/icon-2.svg",
        title: "DEDICATED CUSTOMER SUPPORT",
        description:
          "Support teams that understand travel issues and respond when it matters.",
      },
      {
        path: "/assets/icons/icon-3.svg",
        title: "BUILT FOR LONG-TERM OWNERSHIP",
        description:
          "Designed to perform consistently across years of frequent travel not just a few trips.",
      },
    ],
  };

  return (
    <section className="md:px-0 md:pt-10 px-4 py-2">
      <div className="md:grid md:grid-cols-2 md:gap-16 items-center flex flex-col">
        <div>
          <h1 className="xl:text-[60px] lg:max-xl:text-5xl md:max-lg::text-4xl text-3xl font-sohne-halbfett text-[#2f4635] leading-tight whitespace-pre-wrap">
            {data.heading}
          </h1>
          <p className="text-gray-600 md:mt-4 xl:text-[24px] lg:max-xl:text-lg md:max-lg:text-md text-base max-w-xl">
            {data.subheading}
          </p>
          <div className="flex md:flex-row md:gap-10 mt-10 flex-col gap-4 xl:gap-2">
            {data.features.map((feature, index) => (
              <div key={index} className="flex flex-col xl:gap-6 gap-2">
                <Image alt={feature.title} className="xl:h-17.5 xl:w-17.5 h-14 w-14 text-black" src={feature.path} width={100} height={100}></Image>
                <h3 className="text-orange-500 font-sans w-[80%] font-semibold lg:max-xl:text-md text-sm xl:text-[24px] uppercase">
                  {feature.title}
                </h3>
                <p className="text-[#304B39] lg:max-xl:text-sm text-xs xl:text-[16px] w-[80%] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          <button className="md:mt-14 mt-4 border-2 border-[#3D4637] rounded-sm px-25 py-3.75 text-[#304B39] text-[20px] hover:bg-[#2f4635] hover:text-white transition">
            {data.buttonText}
          </button>
        </div>
        <div className="relative w-full rounded-[30px] md:h-230 h-90 mt-4 overflow-hidden">
          <Image
            src={data.imageUrl}
            alt="support"
            fill
            className="object-cover"
          />
        </div>
      </div>
    </section>
  );
}