"use client";

import { useState } from "react";
import { Plus, Minus } from "lucide-react";

type FAQItem = {
  question: string;
  answer: string;
};

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);
  const faqData: FAQItem[] = [
    {
      question: "Is Movato a reliable luggage brand?",
      answer:
        "Movato is a new brand built around performance and long-term use. Each suitcase is designed and tested for real-world travel conditions and backed by a 3-year international warranty.",
    },
    {
      question: "What makes Movato luggage different from other brands?",
      answer:
        "Movato focuses on rugged utility and real-world performance, prioritising durability and repeated use over cosmetic features.",
    },
    {
      question: "Is Movato an Indian brand?",
      answer:
        "Yes, Movato is an Indian brand designed for Indian travel conditions while meeting global quality standards.",
    },
    {
      question: "Why should I choose rugged utility luggage for my travels?",
      answer:
        "Rugged utility luggage is built to handle rough surfaces, and repeated lifting, making it more reliable over time.",
    },

    {
      question: "What kind of warranty does Movato offer on its products ?",
      answer:
        "Movato offers a 3-year international warranty covering manufacturing defects under normal use.",
    },

    {
      question: "How does Movato test its luggage for durability ?",
      answer:
        "Movato tests its luggage for real-world stresses like repeated lifting, impact from drops, and  long-distance ro ling.",
    },
    {
      question: "Are Movato suitcases designed for Indian travel conditions?",
      answer:
        "Yes. Movato is designed for Indian travel realities such as uneven surfaces, frequent handling, and  long multi-city journeys.",
    },
    {
      question: "How long does shipping take for Movato orders across India?",
      answer:
        "Most orders are delivered within 3–7 business days, depending on location.",
    },

    {
      question: "What is the return and refund policy for Movato bags?",
      answer:
        "Movato offers a clear return and exchange policy, with details available on the returns page.",
    },
    {
      question: "Can I buy Movato luggage offline or in stores?",
      answer:
        "Movato is available online through its own website and Amazon, and through select offline retail  partners, with availability varying by city.",
    },
  ];

  const toggleFAQ = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <div className="w-full md:max-w-5xl lg:px-2 lg:py-20 mx-auto px-6 py-16">
      <h2 className="text-3xl md:text-[26px] lg:text-[28px] font-sohne-halbfett font-semibold text-center text-[#3D4637] mb-12">
        Frequently Asked Questions
      </h2>
      <div className="space-y-6">
        {faqData.map((item, index) => {
          const isOpen = openIndex === index;
          return (
            <div key={index} className="border-b font-sans border-gray-200 pb-4">
              <div
                className="flex justify-between items-center cursor-pointer"
                onClick={() => toggleFAQ(index)}
              >
                <h3 className="text-lg md:text-base lg:text-[17px] font-semibold text-black">
                  {item.question}
                </h3>
                <div className="w-8 h-8 flex items-center justify-center rounded-xl shadow-xs border border-gray-100">
                  {isOpen ? <Minus size={16} /> : <Plus size={16} />}
                </div>
              </div>
              <div
                className={`transition-all duration-300 overflow-hidden ${isOpen ? "max-h-40 mt-3" : "max-h-0"
                  }`}
              >
                <p className="text-black text-[17px] md:text-base lg:text-[17px] leading-tight tracking-wide font-sans">
                  {item.answer}
                </p>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}