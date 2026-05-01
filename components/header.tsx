"use client";
/* eslint-disable jsx-a11y/alt-text */
/* eslint-disable @next/next/no-img-element */
import {
  ArrowLeft,
  MenuIcon,
  Mic,
  Search,
  X,
} from "lucide-react";
import { PropsWithChildren, useState } from "react";
import { Section } from "./footer";
import Image from "next/image";

const Button = ({
  isActive = false,
  children,
  onClick,
}: PropsWithChildren<{ isActive?: boolean; onClick: () => void }>) => {
  return (
    <button
      className={`text-base xl:text-xl md:text-sm text-gray-600 text-center leading-snug hover:font-semibold tracking-tight ${isActive ? "font-normal" : "font-normal"
        }`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
function FooterColumn({ title, links }: Section) {
  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-black font-semibold font-sohne-dreivierfett text-base">
        {title}
      </h3>

      <div className="flex flex-col gap-4 ">
        {links.map((item, index) => {
          if (typeof item === "string") {
            return (
              <p key={index} className="text-black text-sm  cursor-pointer">
                {item}
              </p>
            );
          }

          return (
            <div key={index} className="flex flex-col gap-0">
              <p className="text-black text-sm  cursor-pointer font-sans">
                {item.title}
              </p>
              <span className="text-xs font-sans text-gray-600">
                {item.caption}
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default function Header() {
  const [isSidebarOpen, setSidebarOpen] = useState(false);
  const [isSearchOpen, setSearchOpen] = useState(false);
  const col1: Section[] = [
    {
      col: 1,
      title: "SHOP BY TRIP",
      links: [
        "Weekend Getaways",
        "Long Duration Trips",
        "Work/Business Trips",
        "Frequent Flyers",
        "Wedding Gifts",
      ],
    },
    {
      col: 1,
      title: "SHOP BY SIZE",
      links: ["Cabin", "Medium", "Large", "Luggage Sets"],
    },
    {
      col: 1,
      title: "SHOP BY COLLECTION",
      links: [
        {
          title: "Phoenix",
          caption: "Lightweight for everyday travel.",
        },
        {
          title: "Arizona",
          caption: "Expandable, designed to carry more.",
        },
        {
          title: "Madison",
          caption: "Scratch-resistant hard-shell luggage.",
        },
        {
          title: "Orlando",
          caption: "Front-opening for quicker access.",
        },
        {
          title: "Dallas",
          caption: "Wide-handle for max control and balance.",
        },
      ],
    },
  ];
  const [activeMenu, setActiveMenu] = useState<
    "Shop" | "Why-Movato" | "About-Us" | null
  >(null);
  function handleMenu(menu: "Shop" | "Why-Movato" | "About-Us" | null) {
    if (menu === activeMenu) {
      setActiveMenu(null);
    } else {
      setActiveMenu(menu);
    }
  }
  return (
    <div className="sticky top-0 z-50 bg-white shadow-sm">
      {isSidebarOpen && (
        <div className="fixed inset-0 z-50 text-gray-800 flex">
          <div
            className="absolute inset-0 bg-black/40"
            onClick={() => setSidebarOpen(false)}
          />

          <div className="relative w-72 bg-white h-full p-6 flex flex-col gap-6 animate-slide-in">
            <button
              onClick={() => setSidebarOpen(false)}
              className="self-end text-xl"
            >
              <X />
            </button>

            {["Shop", "Why Movato", "About Us", "Track Your Order"].map(
              (item, i) => (
                <button key={i} className="text-left text-lg font-medium">
                  {item}
                </button>
              ),
            )}
          </div>
        </div>
      )}
      {isSearchOpen && (
        <div className="fixed inset-0  text-gray-700 z-50">
          <div className="flex items-center bg-white gap-3 px-6 h-20">
            <button
              className="bg-gray-300 p-1.5 rounded-full"
              onClick={() => setSearchOpen(false)}
            >
              <ArrowLeft className="text-gray-800" />
            </button>

            <input
              autoFocus
              placeholder="Search..."
              className="w-full border-b border-r-gray-300 outline-none py-2"
            />
          </div>
        </div>
      )}
      <div className="flex md:hidden text-green-800 items-center justify-between px-4 py-6">
        <button onClick={() => setSidebarOpen(true)}>
          <MenuIcon />
        </button>

        <img src="/logo.svg" className="h-6" />

        <div className="flex items-center gap-3">
          <button
            className="p-1.5 rounded-full bg-gray-200"
            onClick={() => setSearchOpen(true)}
          >
            <Search className="w-5 h-5" />
          </button>
          <button className="p-1.5 rounded-full bg-gray-200">
            <img src="/assets/icons/Vector.svg" className="w-5 h-5" />
          </button>
          <button className="p-1.5 rounded-full bg-gray-200">
            <img src="/assets/icons/cart.svg" className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="hidden md:flex flex-col w-full">
        <div className="w-full p-1.5 xl:p-2 flex justify-center items-center bg-[#3D4637]">
          <p className="font-medium xl:text-xl text-base md:text-sm md:font-normal text-white">
            Durable. Stylish. Travel-Ready.
          </p>
        </div>
        <div className="">
          <div className="w-full bg-white grid grid-cols-3 xl:px-12 xl:py-7.5 px-8 lg:py-5 md:py-4.5 shadow-xl">
            <div className="flex md:gap-6 xl:gap-10">
              <Button
                isActive={true}
                onClick={() => {
                  handleMenu("Shop");
                }}
              >
                Shop
              </Button>
              <Button
                onClick={() => {
                  handleMenu("Why-Movato");
                }}
              >
                Why Movato
              </Button>
              <Button
                onClick={() => {
                  handleMenu("About-Us");
                }}
              >
                About Us
              </Button>
              <Button
                onClick={() => {
                  handleMenu(null);
                }}
              >
                Track Your Order
              </Button>
            </div>

            <div className="self-center justify-center object-contain flex items-center">
              <img src="/logo.svg" className="h-8 md:h-7 xl:h-10" />
            </div>

            <div className="flex items-center gap-3 justify-end">
              <div className="flex items-center bg-[#F0F0E6] px-2.5 md:h-7 lg:h-8 w-45 md:w-35 border border-gray-300 rounded-full gap-2">
                <Search className="text-gray-500 md:size-5"  />
                <input
                  type="text"
                  placeholder="Search"
                  className="text-gray-700 w-full md:text-sm placeholder:text-gray-400 bg-transparent outline-none"
                />
                <Mic className="text-gray-500 md:size-5" />
              </div>

              <div className="w-9 h-9 md:h-7 md:w-7 lg:h-8 lg:w-8 bg-[#F0F0E6] rounded-full flex items-center justify-center">
                <img src="/assets/icons/Vector.svg" className="size-5 md:size-4" />
              </div>
              <div className="w-9 h-9 md:h-7 md:w-7 lg:h-8 lg:w-8 bg-[#F0F0E6] flex items-center justify-center rounded-full">
                <img src="/assets/icons/cart.svg" className="size-5 md:size-4" />
              </div>
              <div className="w-9 h-9 md:h-7 md:w-7 lg:h-8 lg:w-8 bg-[#F0F0E6] flex items-center justify-center rounded-full">
                <img src="assets/icons/person.svg" className="size-5 md:size-4" />
              </div>
            </div>
          </div>

          {activeMenu && (
            <div className=" w-full flex flex-row gap-4 justify-between items-start bg-amber-900 absolute z-99 top-19">
              <div className="absolute inset-0 min-h-94 ">
                <Image
                  src="/assets/images/header-1.jpeg"
                  width={1920}
                  height={1280}
                  alt=""
                  className="h-full"
                />
              </div>
              <div className="absolute inset-0 w-full flex flex-row justify-between text-black">
                {activeMenu === "Shop" && (
                  <>
                    <div className="w-1/2 grid grid-cols-3 px-10 py-4 ">
                      {col1.map((value, index) => {
                        return (
                          <FooterColumn
                            col={value.col}
                            links={value.links}
                            title={value.title}
                            key={index}
                          />
                        );
                      })}
                    </div>
                    <div className=" py-4 px-10 justify-between flex flex-col items-start gap-2">
                      <Image
                        src={"/assets/images/banner-1.jpg"}
                        width={400}
                        height={400}
                        alt="banner"
                        className="h-40 object-cover"
                      />

                      <h4 className="  font-semibold font-sohne-dreivierfett">
                        Featured
                      </h4>
                      <p className="font-sans text-sm">
                        Lorem Ipsum is simply dummy text of the printing and
                        typesetting.
                      </p>

                      <button className="border-2 p-2">Shop Now</button>
                    </div>
                  </>
                )}
                {activeMenu === "Why-Movato" && (
                  <div className="flex flex-col gap-6 px-10 py-4 h-20">
                    {[
                      "built to perform",
                      "built to perform",
                      "built to perform",
                      "built to perform",
                    ].map((item, index) => {
                      return (
                        <p
                          key={index}
                          className="text-base font-sohne-dreivierfett font-semibold"
                        >
                          {item}
                        </p>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
