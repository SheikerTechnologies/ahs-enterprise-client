"use client";

import { MessageCircle } from "lucide-react";

export function WhatsAppButton({ phone }: { phone: string }) {
  // First listed phone number, digits only, with Bangladesh country code
  const raw = phone.replace(/[^\d]/g, "");
  const number = raw.startsWith("880") ? raw : `88${raw}`;
  const message = encodeURIComponent(
    "Hello AHS Enterprise, I'd like to know more about your services."
  );

  return (
    <a
      href={`https://wa.me/${number}?text=${message}`}
      target="_blank"
      rel="noopener noreferrer"
      aria-label="Chat with us on WhatsApp"
      className="fixed bottom-5 right-5 z-40 flex h-14 w-14 items-center justify-center rounded-full bg-chart-green shadow-lg shadow-black/20 transition-transform hover:scale-105 active:scale-95"
    >
      <MessageCircle className="text-white" size={26} strokeWidth={2} fill="currentColor" />
      <span className="absolute inset-0 -z-10 animate-ping rounded-full bg-chart-green/50" />
    </a>
  );
}
