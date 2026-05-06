"use client";

import Image from "next/image";
import { useState } from "react";

type Slide = {
  image: string;
  title: string;
  description: string;
  primaryBtn?: string;
  secondaryBtn?: string;
};

type Props = {
  slides: Slide[];
};

export function HeroCarousel({ slides }: Props) {
  const [current, setCurrent] = useState(0);
  console.log(slides)

  const prevSlide = () => {
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const nextSlide = () => {
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="w-full overflow-hidden relative rounded-lg md:rounded-xl xl:rounded-2xl ">
      <div
        className="flex transition-transform duration-500 ease-in-out"
        style={{
          transform: `translateX(-${current * 100}%)`,
        }}
      >
        {slides.map((slide, index) => (
          <div
            key={index}
            className="w-full shrink-0 flex flex-col md:relative"
          >
            <Image
              src={slide.image}
              alt="slide"
              width={1920}
              height={1280}
              className={`w-full h-100 md:h-132 lg:h-142 xl:h-200 object-cover ${
    index === 0 ? "object-center" : "object-right"
  }`}
            />

            <div className="md:absolute md:inset-0 mb-10 mt-6 md:mt-0 flex items-end md:ml-10 lg:mb-10 xl:mb-14 xl:ml-14 md:mb-6">
              <div className="md:w-[36%] w-full text-[#3D4637] flex flex-col">
                <h1 className="font-black text-4xl font-sohne-extrafett uppercase xl:text-[110px] xl:leading-24 lg:text-[76px] lg:leading-17 md:text-7xl md:leading-16">
                  {slide.title}
                </h1>

                <p className="text-base mt-3 w-full xl:text-[22px] lg:text-[16px] md:text-md md:leading-5.5 md:mt-2 font-sans font-medium leading-5 text-[#304B39] xl:mt-4">
                  {slide.description}
                </p>

                <div className="flex flex-col mt-4 gap-3 md:mt-8 xl:mt-12 lg:mt-6 xl:text-[20px] lg:text-sm md:text-xs xl:gap-4 lg:gap-4 md:gap-3">
                  {slide.primaryBtn && (

                    <button className="bg-[#2F4A36] text-white xl:py-5.5 lg:py-4 md:py-4 md:rounded-xs py-3 rounded-md">
                      {slide.primaryBtn}
                    </button>
                  )}

                  {slide.secondaryBtn && (
                    <button className="bg-white/70 backdrop-blur px-6 xl:py-5.5 lg:py-4 md:py-4 md:rounded-xs py-3 border md:border-green-800 rounded-md">
                      {slide.secondaryBtn}
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="absolute bottom-0 right-0 flex items-center gap-3 bg-white px-4 py-2 z-10 rounded-tl-xl">
        <button onClick={prevSlide}>
          <Image
            height={12}
            width={12}
            src={"/assets/icons/arrow-btn.svg"}
            className="size-6"
            alt="prev"
          />
        </button>

        {slides.map((_, i) => (
          <button key={i} onClick={() => setCurrent(i)}>
            <Image
              height={10}
              width={10}
              src={"/assets/icons/cross-carousel-indicator.svg"}
              className={`size-4 ${i === current ? "opacity-95" : "-rotate-45"}`}
              alt={"Indicator"}
            />
          </button>
        ))}

        <button onClick={nextSlide}>
          <Image
            height={12}
            width={12}
            src={"/assets/icons/arrow-btn.svg"}
            className="size-6 rotate-180"
            alt="next"
          />
        </button>
      </div>
    </div>
  );
}
