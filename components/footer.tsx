import Image from "next/image";
import React from "react";

export type LinkItem =
    | string
    | {
        title: string;
        caption: string;
    };

export type Section = {
    title: string;
    links: LinkItem[];
    col: number;
};

export function FooterColumn({ title, links }: Section) {
    return (
        <div className="flex flex-col md:gap-4">
            <h3 className="text-[#B9D531] font-semibold font-sohne-halbfett tracking-wider md:text-sm text-md">{title}</h3>
            <div className="flex flex-col gap-2">
                {links.map((item, index) => {
                    if (typeof item === "string") {
                        return (
                            <p
                                key={index}
                                className="text-gray-300 text-sm md:text-[13px] hover:text-white tracking-normal cursor-pointer"
                            >
                                {item}
                            </p>
                        );
                    }
                    return (
                        <div key={index} className="flex flex-col gap-0">
                            <p className="text-gray-300 text-sm hover:text-white cursor-pointer font-sans">
                                {item.title}
                            </p>
                            <span className="text-xs font-sans text-gray-300/70">
                                {item.caption}
                            </span>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default function Footer() {
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

    const col2: Section[] = [
        {
            col: 2,
            title: "WHY MOVATO",
            links: [
                "Built to Perform",
                "Materials & Durability",
                "Wheels, Locks & Zippers",
                "Warranty & After-Sales Support",
                "Performance Journal (Blog)",
            ],
        },
        {
            col: 2,
            title: "ABOUT MOVATO",
            links: [
                "Built to Perform",
                "Materials & Durability",
                "Wheels, Locks & Zippers",
                "Warranty & After-Sales Support",
                "Performance Journal (Blog)",
            ],
        },
        {
            col: 2,
            title: "BULK ORDERS",
            links: [
                "For gifting & corporate orders",
                "WhatsApp us at +918904892616",
                "bulk@movatobags.com",
            ],
        },
    ];

    const col3: Section[] = [
        {
            col: 3,
            title: "SUPPORT & SERVICES",
            links: [
                "Track Your Order",
                "Returns & Exchanges",
                "Claim My Warranty",
                "All Reviews",
                "FAQs",
                "Privacy Policy",
                "Shipping Policy",
                "Terms & Conditions",
                "Contact Us",
            ],
        },
    ];

    return (
        <footer className="bg-[#304B39] text-white md:px-16 md:pt-14 md:pb-2 px-4 py-2 relative overflow-hidden " style={{ backgroundImage: 'url("/assets/Website-Footer.png")' }}>
            <div className="absolute inset-0 opacity-20 -z-10">
                <Image
                    src="/assets/images/header-1.jpeg"
                    fill
                    alt="footer background"
                    className="object-cover"
                />
            </div>

            <div className="md:grid md:grid-cols-4 md:gap-8 flex flex-col relative">
                <div className="flex flex-col gap-6 md:gap-4">
                    <div>
                        <Image
                            src="/assets/images/Frame-50.svg"
                            width={290}
                            height={60}
                            alt="footer"
                        />
                        <p className="w-[95%] text-xs font-sans font-thin md:text-[13px] leading-tight text-white/80 mt-6 tracking-wide">
                            Movato designs performance-driven
                            luggage for real travel, from daily work trips
                            to long journeys. Thoughtfully engineered. Rigorously tested.
                            Built to move with you—wherever life takes you.
                        </p>
                        <h1 className="pt-3 leading-normal">#BuiltToPerform</h1>
                    </div>


                    <div className="flex gap-3 md:mt-2">
                        {Array.from({ length: 4 }).map((_, index) => <div key={`black_box_${index}`} className="h-12 md:h-14 aspect-square bg-[#2B2F33] rounded"></div>
                        )}
                    </div>


                    <div className="flex flex-col font-sans leading-normal md:mt-8 lg:gap-8 md:gap-3">
                        <h3 className="text-[#B9D531] font-semibold text-md font-sohne-dreivierfett leading-tight ">
                            CUSTOMER SUPPORT
                        </h3>
                        <p className="text-xs text-gray-300 mt-2 lg:mt-4">
                            Call/WhatsApp: +91 99999 99999
                        </p>
                        <p className="text-xs text-gray-300 lg:mt-4">
                            Email: support@movatobags.com
                        </p>
                        <p className="text-xs text-gray-300 lg:mt-4">
                            Monday - Saturday / 10 AM - 7 PM
                        </p>
                    </div>


                    <div className="font-sans md:mt-8">
                        <h3 className="text-[#B9D531] font-semibold md:text-md font-sohne-dreivierfett lg:mt-10 ">
                            STAY UPDATED
                        </h3>
                        <div className="flex mt-2 bg-white lg:mt-4">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-3 py-2 text-black text-sm w-full"
                            />
                            <button className="bg-[#2F392D] px-4">→</button>
                        </div>
                        <p className="mt-6 text-xs md:text-[11px] font-sans font-thin text-white/70">
                            Product launches, performance insights, and travel stories —
                            straight from the Movato team. No spam. No noise.Just things worth knowing.
                        </p>
                    </div>
                </div>
                <div className="md:col-span-3 md:grid md:grid-cols-3 md:gap-18 md:pl-26 font-sans flex flex-col">
                    <div className="flex flex-col gap-4 md:gap-6">
                        {col1.map((section, index) => (
                            <FooterColumn key={index} {...section} />
                        ))}
                    </div>

                    <div className="flex flex-col gap-4">
                        {col2.map((section, index) => (
                            <FooterColumn key={index} {...section} />
                        ))}
                    </div>

                    <div className="flex flex-col gap-4">
                        {col3.map((section, index) => (
                            <FooterColumn key={index} {...section} />
                        ))}
                    </div>
                </div>
            </div>


            <div className="border-t border-gray-600 mt-10 md:mt-4 md:pt-4 text-center text-sm text-gray-400">
                © 2026 MOVATO. All rights reserved.
            </div>
        </footer>
    );
}