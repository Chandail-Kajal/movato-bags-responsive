/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useMemo, useState } from "react";

type ChatMsg = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatPage() {
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      content:
        "Hi! Ask me anything about Movato products, sizes, collections, or what to choose for your trip.",
    },
  ]);
  const [isSending, setIsSending] = useState(false);
  const canSend = useMemo(() => input.trim().length > 0 && !isSending, [input, isSending]);

  async function send() {
    const message = input.trim();
    if (!message || isSending) return;

    setInput("");
    setIsSending(true);
    setMessages((m) => [...m, { role: "user", content: message }]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        
        body: JSON.stringify({ message }),
      });

      const data = (await res.json()) as
        | { success: true; reply: string }
        | { success: false; error?: string };

      if (!res.ok || !data.success) {
        const error = (data as any)?.error || "Request failed";
        setMessages((m) => [
          ...m,
          { role: "assistant", content: `Sorry — ${error}.` },
        ]);
        return;
      }

      setMessages((m) => [...m, { role: "assistant", content: data.reply }]);
    } catch (e: any) {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: "Sorry — something went wrong sending that message.",
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="min-h-screen bg-[#F5F5F5]">
      <div className="mx-auto max-w-3xl px-4 py-10">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold text-[#1f2a23]">Movato AI Chat</h1>
          <p className="text-sm text-gray-600">
            Chat with your catalog-aware assistant.
          </p>
        </div>

        <div className="rounded-2xl border border-black/10 bg-white shadow-sm">
          <div className="h-[60vh] overflow-y-auto p-4 space-y-3">
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={[
                  "max-w-[90%] rounded-2xl px-4 py-3 text-sm leading-relaxed",
                  m.role === "user"
                    ? "ml-auto bg-[#304B39] text-white"
                    : "mr-auto bg-gray-100 text-gray-900",
                ].join(" ")}
              >
                {m.content}
              </div>
            ))}
            {isSending && (
              <div className="mr-auto max-w-[90%] rounded-2xl bg-gray-100 px-4 py-3 text-sm text-gray-700">
                Thinking…
              </div>
            )}
          </div>

          <div className="border-t border-black/10 p-3">
            <div className="flex gap-2">
              <input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") send();
                }}
                placeholder="Ask: “Which luggage is best for a weekend trip?”"
                className="flex-1 rounded-xl border border-black/10 px-4 py-3 text-sm outline-none focus:ring-2 focus:ring-[#304B39]/30"
              />
              <button
                onClick={send}
                disabled={!canSend}
                className="rounded-xl bg-[#304B39] px-4 py-3 text-sm font-medium text-white disabled:opacity-50"
              >
                Send
              </button>
            </div>
            <p className="mt-2 text-xs text-gray-500">
              Tip: ask by size (cabin/medium/large), trip type, or collection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

