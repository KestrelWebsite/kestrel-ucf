// app/showcase/page.tsx
"use client";

import Image from "next/image";
import { SHOWCASE_EVENTS } from "@/lib/showcaseData";

export default function ShowcasePage() {
  return (
    <main className="min-h-screen bg-black text-white px-8 pt-24 pb-32">
      {/* Header Section */}
      <section className="text-center mb-20">
        <h1 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent">
          Kestrel Showcase
        </h1>
        <p className="mt-4 text-gray-300 text-lg max-w-2xl mx-auto">
          A visual journey through Kestrel’s development milestones, teamwork, and events.
        </p>
      </section>

      {/* Events */}
      <section className="space-y-32 max-w-7xl mx-auto">
        {SHOWCASE_EVENTS.map((event, index) => (
          <div key={index} className="space-y-8">
            {/* Event Header */}
            <div className="text-center">
              <h2 className="text-3xl font-semibold">{event.title}</h2>
              <p className="text-gray-400 text-sm mt-1">{event.date}</p>
            </div>

            {/* Photo Grid */}
            <div
              className="
                grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6
                justify-items-center
              "
            >
              {event.images.map((src, i) => (
                <div
                  key={i}
                  className="
                    relative w-full max-w-[420px] aspect-[4/3] overflow-hidden 
                    rounded-2xl border border-white/10 shadow-md hover:scale-[1.02]
                    transition-transform duration-300
                  "
                >
                  <Image
                    src={src}
                    alt={`${event.title} photo ${i + 1}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    priority={index === 0 && i === 0}
                  />
                </div>
              ))}
            </div>
          </div>
        ))}
      </section>
    </main>
  );
}
