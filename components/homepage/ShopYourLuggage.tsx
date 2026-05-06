/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import { fetchPublicData } from "@/lib/api";
import Image from "next/image";
import { PropsWithChildren, useEffect, useState } from "react";

const Button = ({
  children,
  isActive = false,
  onClick
}: PropsWithChildren<{ isActive?: boolean, onClick: () => void }>) => {
  return (
    <button
      onClick={onClick}
      className={`xl:text-[20px] capitalize text-[13px] flex-1 font-sans border-2 border-[#3D4637] text-[#304B39] flex items-center justify-center text-center text-nowrap rounded-xs 
md:px-6 md:py-1.5 md:rounded-xs
lg:py-2 lg:rounded-sm
xl:px-8 xl:py-3
px-2 py-1
${isActive && "font-medium border-3"}`}>
      {children}
    </button>
  );
};

export function ShopYourLuggage() {
  const [images, setImages] = useState([])
  const [types, setTypes] = useState<any[]>([])
  const [categorytype, setCategorytype] = useState<string>("size")
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    (async () => {
      const res = await fetchPublicData("category-types")
      setTypes(res || [])
    })()
  }, [])


  useEffect(() => {
    (async () => {
      const data = await fetchPublicData(
        "shop", { categorytype }
      )
      console.log(data)
      setImages(data || [])
    })()
  }, [categorytype])


  return (
    <div className="flex flex-col items-center md:pt-12.5 pt-6">
      <div className="flex flex-col gap-4 md:gap-2 xl:gap-3 w-full items-center">
        <h4 className="font-sohne-halbfett md:text-[38px] lg:text-[42px] xl:text-[60px] text-3xl text-[#3D4637] ">
          Shop Your Luggage.
        </h4>
        <p className="text-black font-sans xl:text-[21px] md:text-sm md:font-normal md:tracking-tighter text-sm leading-tight text-center font-normal">
          Different journeys demand different luggage. <br /> Choose by size,
          collection, or how you travel.
        </p>
        <div className="md:mt-4 xl:mt-8 flex flex-row xl:gap-5 md:items-center md:gap-4 gap-1">
          {
            types.map((t) => (
              <Button
                key={t._id}
                isActive={categorytype === t.slug}
                onClick={() => setCategorytype(t.slug)}
              >
                Shop By {t.name}
              </Button>
            ))
          }
        </div>
      </div>
      <div className="md:mt-8 lg:mt-9 xl:mt-12 mt-6 w-full">
        <div className="md:hidden overflow-hidden w-full">
          <div
            className="flex transition-transform duration-500 ease-in-out"
            style={{
              transform: `translateX(-${currentIndex * 100}%)`,
            }}
          >
            {images.map((img: any, index) => (
              <div
                key={`image_${index}`}
                className="min-w-full px-2"
              >
                <div className="relative h-106 rounded-xl overflow-hidden">
                  <Image
                    alt={img.image}
                    className="object-cover h-full w-full"
                    height={300}
                    width={400}
                    src={img.image}
                  />
                </div>
              </div>
            ))}
          </div>

          <div className="flex justify-center mt-3 gap-2">
            {images.map((_: any, index: number) => (
              <button
                key={index}
                onClick={() => setCurrentIndex(index)}
                className={`h-2 w-2 rounded-full transition-all ${currentIndex === index ? "bg-[#304B39] w-4" : "bg-gray-300"
                  }`}
              />
            ))}
          </div>
        </div>

        <div className="hidden md:grid grid-cols-4 xl:gap-5 md:gap-3 space-y-4 w-full">
          {images.map((img: any, index) => (
            <div
              key={`image_${index}`}
              className="relative h-106 md:h-116 md:rounded-sm lg:h-125 xl:h-178 object-cover w-full rounded-xl overflow-hidden"
            >
              <Image
                alt={img.image}
                className="object-cover h-full"
                height={300}
                width={400}
                src={img.image}
              />
            </div>
          ))}
        </div>
      </div>
      <div className="flex w-full justify-center items-center">
        <button className="md:w-[30%] xl:w-[28%] md:text-[13px] xl:text-lg xl:p-5.5 md:font-thin xl:mt-12 md:mt-8 lg:mt-9 lg:p-4 md:p-3.5 w-full mt-4 font-sans font-normal text-white text-base bg-[#304B39] p-4 rounded-sm">Shop All</button>
      </div>
    </div >
  );
}
