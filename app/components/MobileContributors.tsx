"use client";

import React, { useState } from "react";
import Image from "next/image";
import classNames from "classnames";

const contributors = [
  { name: "KnightHacks", logo: "/logos/knighthackslogo.svg" },
  { name: "AI@UCF", logo: "/logos/aiucf.svg" },
  { name: "Blue Origin", logo: "/logos/blueoriginlogo.svg", isMain: true },
  { name: "IEEE UCF", logo: "/logos/ieeeucf.png" },
  { name: "ACM UCF", logo: "/logos/acmlogo.png" },
];

export default function MobileContributors() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  return (
    <section className="py-14">
  <h2 className="text-5xl font-semibold text-white text-center mb-10">
    Our <br /> Contributors
  </h2>

      <div className="flex justify-center items-center gap-4 flex-wrap px-4 transition-all">
        {contributors.map((contributor, index) => {
          const isHovered = hoveredIndex === index;
          const isMain = contributor.isMain;

          return (
            <div
              key={index}
              className={classNames(
                "relative transition-all duration-300 ease-in-out flex flex-col items-center",
                {
                  "scale-110 z-10": isHovered,
                  "opacity-60": hoveredIndex !== null && !isHovered,
                  "scale-105": isMain && !isHovered,
                }
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={contributor.logo}
                alt={contributor.name}
                width={isMain ? 300 : 120}
                height={isMain ? 300 : 120}
                className="rounded-full object-contain"
              />
              <p className="mt-2 text-white text-sm font-medium text-center">
                {contributor.name}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
