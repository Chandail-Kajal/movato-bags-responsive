"use client";
import Image from "next/image";
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
        path: "/assets/icons/icon-3.svg",
        title: "DEDICATED CUSTOMER SUPPORT",
        description:
        "Support teams that understand travel issues and respond when it matters.",
      },
      {
        path: "/assets/icons/icon-2.svg",
        title: "BUILT FOR LONG-TERM OWNERSHIP",
        description:
          "Designed to perform consistently across years of frequent travel not just a few trips.",
      },
    ],
  };

  return (
    <section className="md:px-0 md:pt-10 px-4 py-2">
      <div className="flex md:flex-row items-center flex-col ">
        <div className="md:w-1/2 flex flex-col justify-center">
          <h1 className="xl:text-[60px] lg:max-xl:text-5xl md:text-[42px] md:leading-10 lg:leading-12 font-semibold text-3xl font-sohne-halbfett text-[#2f4635] leading-tighter whitespace-pre-wrap">
            {data.heading}
          </h1>
          <p className="text-[#304B39] md:w-[80%] lg:w-[85%] md:text-md md:leading-tight md:mt-3 xl:text-[24px] lg:text-[18px]  text-base">
            {data.subheading}
          </p>
          <div className="flex md:flex-row justify-start md:gap-8 md:mt-6 lg:gap-10 lg:mt-10 mt-10 flex-col gap-4 xl:gap-2">
            {data.features.map((feature, index) => (
              <div key={index} className="flex flex-col md:w-40 gap-2">
                <div className="flex flex-col gap-4">
                  <Image alt={feature.title} className="xl:h-17.5 xl:w-17.5 lg:h-12 md:h-10 h-14 w-14 text-black" src={feature.path} width={100} height={100}></Image>
                  <h3 className="text-[#DB6B30] font-sans w-[80%] lg:text-[18px] md:text-[16px] md:leading-4 font-semibold lg:max-xl:text-md text-sm xl:text-[24px] uppercase">
                    {feature.title}
                  </h3>
                </div>
                <p className="text-[#304B39] md:text-[11px] md:leading-tight md:tracking-tighter text-xs xl:text-[16px] w-[80%] leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
          <button className="w-[35%] md:flex md:justify-center md:items-center md:text-[13px] lg:text-[14px] md:mt-6 lg:mt-8 py-3.5 mt-4 border border-[#3D4637] rounded-xs text-[#304B39] text-[20px] hover:bg-[#2f4635] hover:text-white transition">
            {data.buttonText}
          </button>
        </div>
        <div className="relative md:w-1/2 rounded-2xl md:h-screen h-90 mt-4 overflow-hidden">
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