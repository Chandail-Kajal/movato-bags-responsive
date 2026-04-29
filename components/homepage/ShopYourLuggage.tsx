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
      className={`xl:text-[20px] lg:text-base text-sm flex-1 font-sans border-2 border-[#3D4637] text-[#304B39] flex items-center justify-center text-center text-nowrap rounded-xs 
xl:px-4 xl:py-3
md:px-4 md:py-2.5 
px-2 py-1
${isActive && "font-medium border-3"}`}>
      {children}
    </button>
  );
};

export function ShopYourLuggage() {
  const [images, setImages] = useState([])
  const [categorytype, setCategorytype] = useState<"size" | "collection" | "trip">("size")

  const categories: Array<{ category: "size" | "collection" | "trip"; label: string }> = [
    { category: "size", label: "Shop By Size" },
    { category: "collection", label: "Shop By Collection" },
    { category: "trip", label: "Shop By Trip" },
  ]

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
    <div className="flex flex-col items-center md:pt-12.5">
      <div className="flex flex-col gap-4 w-full items-center">
        <h4 className="font-sohne-halbfett  md:text-4xl lg:text-5xl xl:text-[60px] text-3xl text-[#3D4637] ">
          Shop Your Luggage
        </h4>
        <p className="text-black font-sans text-sm lg:max-xl:text-base xl:text-[20px] leading-tight text-center font-normal">
          Different journeys demand different luggage. <br /> Choose by size,
          collection, or how you travel.
        </p>
        <div className="md:mt-4 mt-2 flex flex-row  md:items-center gap-4">
          {
            categories.map((c, index) => <Button key={`button_${index}`} isActive={categorytype === c.category} onClick={() => setCategorytype(c.category)} >{c.label}</Button>)
          }
        </div>
      </div>
      <div className="md:mt-[40px] mt-4 grid md:grid-cols-4 gap-3 w-full">
        {images.map((img: any, index) => (
          <Image
            alt={img.image}
            className="h-50 md:max-lg:h-80 lg:max-xl:h-100 xl:h-[720px] object-cover w-full rounded-xs"
            height={300}
            width={400}
            src={img.image}
            key={`image_${index}`}
          />
        ))}
      </div>
      <div className="flex w-full justify-center items-center">
        <button className="md:w-1/4 w-full md:mt-10 mt-4 font-sans font-normal text-white text-base bg-[#304B39] p-4 rounded-sm">Shop All</button>
      </div>
    </div>
  );
}
