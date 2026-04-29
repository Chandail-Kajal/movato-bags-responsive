/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useState } from "react";
import { FaStar, FaStarHalfAlt, FaRegStar } from "react-icons/fa";
import { ChevronLeft, ChevronRight } from "lucide-react";

type Testimonial = {
  rating: number;
  text: string;
  name: string;
  role: string;
};

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex gap-1">
      {[1, 2, 3, 4, 5].map((star) => {
        if (rating >= star) {
          return <FaStar key={star} className="text-black" size={22} />;
        } else if (rating >= star - 0.5) {
          return <FaStarHalfAlt key={star} className="text-black" size={22} />;
        } else {
          return <FaRegStar key={star} className="text-gray-400" size={22} />;
        }
      })}
    </div>
  );
}

export default function TestimonialSection() {
  const testimonials: Testimonial[] = [
    {
      rating: 4.5,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      name: "Rodger Struck",
      role: "CEO of Company Name",
    },
    {
      rating: 4,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      name: "Rodger Struck",
      role: "CEO of Company Name",
    },
    {
      rating: 3.5,
      text: "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book",
      name: "Rodger Struck",
      role: "CEO of Company Name",
    },
  ];

  const [index, setIndex] = useState(0);

  const next = () => {
    setIndex((prev) => (prev + 1) % testimonials.length);
  };

  const prev = () => {
    setIndex((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1));
  };

  return (
    <section className="bg-[#2f4635] text-white xl:py-20 xl:px-10 lg:max-xl:px-8 lg:max-xl:py-18 md:max-lg:py-14 md:max-lg:px-6 px-4 py-4 " style={{backgroundImage:'url("/assets/rating-bg.svg")'}}>
      <h2 className="xl:text-4xl lg:max-xl:text-3xl md:max-lg:text-2xl text-xl text-center md:mb-14 mb-4 font-sohne-halbfett text-[40px]">
        Trusted By Travellers Who Expect More
      </h2>

      <div className="relative flex items-center justify-center">
        <button
          onClick={prev}
          className="bg-[#d9d9d9] text-black xl:w-12 xl:h-12 h-8 w-8 rounded-full flex items-center justify-center"
        >
          <ChevronLeft />
        </button>

        <div className="grid md:grid-cols-3 w-full md:gap-8 gap-4 px-8">
          {testimonials.map((item, i) => (
            <div key={i} className="bg-[#E6E6DC] text-black xl:p-10 lg:max-xl:p-8 md:max-lg:p-6 p-4 rounded-md flex flex-col items-start justify-between">
              <div className="mb-2">
                <StarRating rating={item.rating} />
              </div>
              <p className="xl:text-[24px] lg:max-xl:text-md text-sm leading-relaxed xl:mb-6 font-sans">{item.text}</p>
              <h3 className="xl:text-[32px] lg:max-xl:text-lg md:max-lg:text-md text-base font-semibold font-sohne-halbfett">{item.name}</h3>
              <p className=" text-gray-700 xl:text-[24px] lg:max-xl:text-md text-sm font-sans">{item.role}</p>
            </div>
          ))}
        </div>

        <button
          onClick={next}
          className="bg-[#d9d9d9] text-black xl:w-12 xl:h-12 h-8 w-8 rounded-full flex items-center justify-center"
        >
          <ChevronRight />
        </button>
      </div>

      <div className="flex justify-center md:mt-12 mt-4">
        <button className="border border-white xl:px-[100px] xl:py-[20px] lg:max-xl:py-4 lg:max-xl:px-30 py-2 px-10 hover:bg-white hover:text-black transition">
          Read All Reviews
        </button>
      </div>
    </section>
  );
}
