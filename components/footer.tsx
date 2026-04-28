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
        <div className="flex flex-col gap-4">
            <h3 className="text-[#B9D531] font-semibold font-sohne-dreivierfett text-2xl">{title}</h3>
            <div className="flex flex-col gap-2">
                {links.map((item, index) => {
                    if (typeof item === "string") {
                        return (
                            <p
                                key={index}
                                className="text-gray-300 text-lg hover:text-white cursor-pointer"
                            >
                                {item}
                            </p>
                        );
                    }

                    return (
                        <div key={index}>
                            <p className="text-gray-300 text-2xl hover:text-white cursor-pointer font-sans">
                                {item.title}
                            </p>
                            <span className="text-lg font-sans text-gray-300">
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
        <footer className="bg-[#304B39] text-white md:px-10 md:py-12 px-4 py-2 relative overflow-hidden " style={{backgroundImage:'url("/assets/Website-Footer.png")'}}>
            <div className="absolute inset-0 opacity-20 -z-10">
                <Image
                    src="/assets/images/header-1.jpeg"
                    fill
                    alt="footer background"
                    className="object-cover"
                />
            </div>
            <div className="md:grid md:grid-cols-4 md:gap-8 flex flex-col relative">


                <div className="flex flex-col gap-6">
                    <div>
                        <Image
                            src="/assets/images/Frame-50.svg"
                            width={290}
                            height={60}
                            alt="footer"
                        />
                        <p className="text-sm text-gray-300 mt-6 leading-normal">
                            Movato designs performance-driven <br />
                            luggage for real travel, from daily work trips <br />
                            to long journeys. Thoughtfully engineered. Rigorously tested.
                            Built to move with you—wherever life takes you.
                        </p>
                        <h1 className="pt-8 leading-normal">#BuiltToPerform</h1>
                    </div>


                    <div className="flex gap-3">
                        <div className="w-10 h-10 bg-[#2B2F33] rounded"></div>
                        <div className="w-10 h-10 bg-[#2B2F33] rounded"></div>
                        <div className="w-10 h-10 bg-[#2B2F33] rounded"></div>
                        <div className="w-10 h-10 bg-[#2B2F33] rounded"></div>
                    </div>


                    <div className="font-sans leading-normal">
                        <h3 className="text-[#B9D531] font-semibold text-xl font-sohne-dreivierfett">
                            CUSTOMER SUPPORT
                        </h3>
                        <p className="text-sm text-gray-300 mt-2">
                            Call/WhatsApp: +91 99999 99999
                        </p>
                        <p className="text-sm text-gray-300 ">
                            Email: support@movatobags.com
                        </p>
                        <p className="text-sm text-gray-300 ">
                            Monday - Saturday / 10 AM - 7 PM
                        </p>
                    </div>


                    <div className="font-sans">
                        <h3 className="text-[#B9D531] font-semibold text-xl font-sohne-dreivierfett">
                            STAY UPDATED
                        </h3>
                        <div className="flex mt-2 bg-white">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="px-3 py-2 text-black text-sm w-full"
                            />
                            <button className="bg-[#2F392D] px-4">→</button>
                        </div>
                        <p className="mt-6 text-sm text-gray-300">
                            Product launches, performance insights, and travel stories —
                            straight from the Movato team. No spam. No noise.
                        </p>
                    </div>
                </div>


                <div className="md:col-span-3 md:grid md:grid-cols-3 md:gap-18 md:pl-26 font-sans flex flex-col">
                    <div className="flex flex-col gap-4">
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


            <div className="border-t border-gray-600 mt-10 pt-4 text-center text-sm text-gray-400">
                © 2026 MOVATO. All rights reserved.
            </div>
        </footer>
    );
}