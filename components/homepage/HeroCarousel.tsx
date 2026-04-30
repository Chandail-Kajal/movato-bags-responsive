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
    <div className="w-full overflow-hidden relative rounded-[20px] ">
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
              className="w-full h-72 md:max-lg:h-120 lg:h-200 object-cover"
            />

            <div className="md:absolute md:inset-0 flex items-end md:ml-10 md:mt-28 ">
              <div className="md:w-[35%] w-full text-[#3D4637] flex flex-col md:mt-18">
                <h1 className="font-black font-sohne-extrafett uppercase xl:text-[110px] xl:leading-24 lg:text-7xl lg:leading-18 md:text-6xl md:leading-16 text-3xl ">
                  {slide.title}
                </h1>

                <p className="text-base xl:text-[24px] lg:text-lg md:text-sm md:pt-2 font-sans font-medium leading-4  text-[#28381d]">
                  {slide.description}
                </p>

                <div className="flex flex-col md:mt-8 md:mb-6 xl:text-[20px] lg:text-base md:text-sm xl:gap-6 lg:gap-4 md:gap-2">
                  {slide.primaryBtn && (
                    <button className="bg-[#2F4A36] text-white xl:py-5 lg:py-4 py-3 rounded-sm">
                      {slide.primaryBtn}
                    </button>
                  )}

                  {slide.secondaryBtn && (
                    <button className="bg-white/70 backdrop-blur px-6 xl:py-5 lg:py-4 py-3 border rounded-sm ">
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
