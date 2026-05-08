/* eslint-disable react/jsx-no-undef */
/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import DOMPurify from "isomorphic-dompurify";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";

type ChatMsg = {
  role: "user" | "assistant";
  content: string;
};

export default function ChatWidget() {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");

  const [messages, setMessages] = useState<ChatMsg[]>([
    {
      role: "assistant",
      content: `
        <div>
          <p>
            Hi! I’m <strong>Movato’s assistant</strong>.
          </p>

          <p>
            Tell me your trip type and I’ll suggest the right luggage.
          </p>
        </div>
      `,
    },
  ]);

  const [isSending, setIsSending] = useState(false);

  const canSend = useMemo(
    () => input.trim().length > 0 && !isSending,
    [input, isSending]
  );

  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    if (!open) return;

    const el = scrollRef.current;

    if (!el) return;

    el.scrollTop = el.scrollHeight;
  }, [open, messages.length, isSending]);

  async function send() {
    const message = input.trim();

    if (!message || isSending) return;

    setInput("");
    setIsSending(true);

    setMessages((m) => [
      ...m,
      {
        role: "user",
        content: message,
      },
    ]);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },

        body: JSON.stringify({
          message,
        }),
      });

      const data = (await res.json()) as
        | { success: true; reply: string }
        | { success: false; error?: string };

      if (!res.ok || !data.success) {
        const error = (data as any)?.error || "Request failed";

        setMessages((m) => [
          ...m,
          {
            role: "assistant",
            content: `
              <div>
                <p>Sorry — ${error}</p>
              </div>
            `,
          },
        ]);

        return;
      }

      const cleanHtml = DOMPurify.sanitize(data.reply);

      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: cleanHtml,
        },
      ]);
    } catch {
      setMessages((m) => [
        ...m,
        {
          role: "assistant",
          content: `
            <div>
              <p>
                Sorry — something went wrong sending that message.
              </p>
            </div>
          `,
        },
      ]);
    } finally {
      setIsSending(false);
    }
  }

  return (
    <div className="fixed bottom-4 right-4 z-100">
      {open && (
        <div className="mb-3 w-[92vw] max-w-90 overflow-hidden rounded-2xl border border-black/10 bg-white shadow-xl">
          <div className="flex items-center justify-between bg-[#304B39] px-4 py-3 text-white">
            <div className="flex flex-col">
              <div className="text-sm font-semibold leading-tight">
                Movato AI
              </div>

              <div className="text-xs leading-tight text-white/80">
                Catalog-aware assistant
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="rounded-lg px-2 py-1 text-sm text-white/90 hover:bg-white/10"
              aria-label="Close chat"
            >
              ✕
            </button>
          </div>

          <div
            ref={scrollRef}
            className="h-90 overflow-y-auto p-3 space-y-3"
          >
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={[
                  "max-w-[90%] rounded-2xl px-3 py-2 text-xs leading-relaxed",
                  m.role === "user"
                    ? "ml-auto bg-[#304B39] text-white"
                    : "mr-auto bg-gray-100 text-gray-900",
                ].join(" ")}
              >
                {m.role === "user" ? (
                  m.content
                ) : (
                  <div
                    className="prose prose-sm max-w-none prose-p:my-1 prose-ul:my-1 prose-li:my-1"
                    dangerouslySetInnerHTML={{
                      __html: m.content,
                    }}
                  />
                )}
              </div>
            ))}

            {isSending && (
              <div className="mr-auto max-w-[90%] rounded-2xl bg-gray-100 px-3 py-2 text-xs text-gray-700">
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
                  if (e.key === "Enter") {
                    send();
                  }
                }}
                placeholder="Type your message…"
                className="flex-1 rounded-xl border border-black/10 px-3 py-2 text-xs outline-none focus:ring-2 focus:ring-[#304B39]/30"
              />

              <button
                onClick={send}
                disabled={!canSend}
                className="rounded-xl bg-[#304B39] px-3 py-2 text-xs font-medium text-white disabled:opacity-50"
              >
                Send
              </button>
            </div>

            <div className="mt-2 text-[11px] text-gray-500">
              Try: “cabin luggage for weekend trip”
            </div>
          </div>
        </div>
      )}

      <button
        onClick={() => setOpen((v) => !v)}
        className="ml-auto flex h-12 w-12 items-center justify-center rounded-full shadow-lg hover:brightness-110 border-2 border-[#304B39]"
        aria-label={open ? "Close chat" : "Open chat"}
      >
        {open ? (
          <Image
            src="/assets/icons/airobot.jpg"
            height={55}
            width={55}
            alt="robot"
            className="bg-[#304B39] rounded-full"
          />
        ) : (<Image
          src="/assets/icons/airobot.jpg"
          height={55}
          width={55}
          alt="robot"
          className="rounded-full"
        />)}
      </button>
    </div>
  );
}