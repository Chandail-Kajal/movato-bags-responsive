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
          // <div
          //   key={index}
          //   className="w-full shrink-0 flex flex-col md:relative"
          // >
          //   <Image
          //     src={slide.image}
          //     alt="slide"
          //     width={1920}
          //     height={1280}
          //     className="w-full h-72 md:max-lg:h-120 lg:h-200 object-cover"
          //   />

          //   <div className="md:absolute md:inset-0 flex items-end md:ml-10 md:m-5">
          //     <div className="md:w-[35%] w-full text-[#3D4637] flex flex-col gap-2">
          //       <h1 className="font-black font-sohne-extrafett uppercase sm:max-md:text-4xl md:max-lg:text-5xl lg:max-xl:text-7xl xl:text-[110px] md:leading-24 leading-tight text-3xl">
          //         {slide.title}
          //       </h1>

          //       <p className="text-base lg:max-xl:text-lg xl:text-[24px] font-sans font-medium leading-tight md:mt-3 text-gray-700">
          //         {slide.description}
          //       </p>

          //       <div className="flex flex-col md:mt-8 md:mb-6 text-[20px] gap-6">
          //         {slide.primaryBtn && (
          //           <button className="bg-[#2F4A36] text-white md:py-5 py-3 rounded-sm">
          //             {slide.primaryBtn}
          //           </button>
          //         )}

          //         {slide.secondaryBtn && (
          //           <button className="bg-white/70 backdrop-blur px-6 md:py-5 py-3 border rounded-sm">
          //             {slide.secondaryBtn}
          //           </button>
          //         )}
          //       </div>
          //     </div>
          //   </div>
          // </div>
          <div
            key={index}
            className="w-full shrink-0 flex flex-col lg:relative md:max-lg:relative sm:max-md:relative"
          >

            <Image
              src={slide.image}
              alt="slide"
              width={1920}
              height={1280}
              className="
      w-full object-cover
      
      h-72
      sm:max-md:h-80
      md:max-lg:h-120
      lg:h-200
    "
            />
            <div
              className="
      flex items-end
      
      lg:absolute lg:inset-0 lg:ml-10 lg:m-5
      md:max-lg:absolute md:max-lg:inset-0 md:max-lg:ml-8 md:max-lg:m-4
      sm:max-md:mt-4
    "
            >
              <div
                className="
        text-[#3D4637] flex flex-col gap-2
        
        w-full
        md:max-lg:w-[50%]
        lg:w-[35%]
      "
              >

                <h1
                  className="
          font-black font-sohne-extrafett uppercase
          
          text-3xl
          sm:max-md:text-4xl
          md:max-lg:text-5xl
          lg:text-7xl
          xl:text-[110px]
          
          leading-tight
          md:max-lg:leading-[60px]
          lg:leading-[80px]
          xl:leading-[110px]
        "
                >
                  {slide.title}
                </h1>
                <p
                  className="
          font-sans font-medium text-gray-700
          
          text-sm
          sm:max-md:text-base
          md:max-lg:text-lg
          lg:text-xl
          xl:text-[24px]
          
          leading-tight
          
          sm:max-md:mt-2
          md:max-lg:mt-3
          lg:mt-4
        "
                >
                  {slide.description}
                </p>
                <div
                  className="
          flex flex-col gap-4
          
          sm:max-md:mt-4
          md:max-lg:mt-6
          lg:mt-8
          
          sm:max-md:mb-4
          md:max-lg:mb-5
          lg:mb-6
        "
                >
                  {slide.primaryBtn && (
                    <button
                      className="
              bg-[#2F4A36] text-white rounded-sm
              py-1
              sm:max-md:py-3
              md:max-lg:py-4
              lg:py-5
            "
                    >
                      {slide.primaryBtn}
                    </button>
                  )}

                  {slide.secondaryBtn && (
                    <button
                      className="
              bg-white/70 backdrop-blur border rounded-sm px-6
              py-1
              sm:max-md:py-3
              md:max-lg:py-4
              lg:py-5
            "
                    >
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
