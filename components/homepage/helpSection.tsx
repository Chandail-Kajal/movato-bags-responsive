/* eslint-disable react/no-unescaped-entities */

/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";

export default function HelpSection() {
  const [showChat, setShowChat] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");

  const handleSend = () => {
    if (input.trim() === "") return;

    const userMsg = { text: input, type: "user" };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");


    setTimeout(() => {
      const botMsg = {
        text: "Thanks! Our team will contact you soon.",
        type: "bot",
      };
      setMessages((prev) => [...prev, botMsg]);
    }, 500);
  };

  const handleSupportClick = () => {
    window.open("https://wa.me/919999999999", "_blank");
  };

  return (
    <div className="w-full py-20 bg-[#F5F5F5] flex flex-col items-center">
      

      <h2
        className="text-3xl font-semibold text-[#3D4637] cursor-pointer"
        onClick={() => setShowChat(true)}
      >
        Still have a question?
      </h2>

      <p className="text-gray-600 mt-2 mb-6">
        We'd love to answer.
      </p>


      <button
        onClick={handleSupportClick}
        className="border border-[#3D4637] px-6 py-3 rounded-lg hover:bg-[#3D4637] hover:text-white transition"
      >
        Contact Customer Support
      </button>


      {showChat && (
        <div className="w-full max-w-md mt-8 bg-white p-4 rounded-lg shadow">
          

          <div className="h-60 overflow-y-auto mb-4">
            {messages.length === 0 && (
              <p className="text-gray-400 text-sm text-center">
                Ask your question...
              </p>
            )}

            {messages.map((msg, i) => (
              <div
                key={i}
                className={`mb-2 p-2 rounded text-sm max-w-[70%] ${
                  msg.type === "user"
                    ? "bg-[#3D4637] text-white ml-auto"
                    : "bg-gray-200 text-black"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>


          <div className="flex gap-2">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="flex-1 border px-3 py-2 rounded text-sm"
              placeholder="Type your question..."
            />
            <button
              onClick={handleSend}
              className="bg-[#3D4637] text-white px-4 rounded"
            >
              Send
            </button>
          </div>
        </div>
      )}
    </div>
  );
}