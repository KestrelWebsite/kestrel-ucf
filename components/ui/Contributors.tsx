'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

const contributors = [
  {
    name: 'KnightHacks',
    logo: '/logos/knighthackslogo.svg',
  },
  {
    name: 'AI@UCF',
    logo: '/logos/aiucf.svg',
  },
  {
    name: 'Blue Origin',
    logo: '/logos/blueoriginlogo.svg',
    isMain: true,
  },
  {
    name: 'IEEE UCF',
    logo: '/logos/ieeeucf.png',
  },
  {
    name: 'ACM UCF',
    logo: '/logos/acmlogo.png',
  },
]

export default function Contributors() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-20">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-blue-100/10 via-transparent to-transparent blur-8xl animate-pulse-slow" />
        <div className="absolute -bottom-[0vh] left-1/2 w-[900px] h-[1000px] -translate-x-1/2 bg-blue-400/10 rounded-full blur-[160px]" />
      </div>
<h2 className="text-5xl md:text-6xl font-semibold text-white text-center mb-12">
  Our Contributors
  </h2>

      <div className="flex justify-center items-center gap-6 transition-all flex-wrap">
        {contributors.map((contributor, index) => {
          const isHovered = hoveredIndex === index
          const isMain = contributor.isMain

          return (
            <div
              key={index}
              className={classNames(
                'relative transition-all duration-300 ease-in-out flex flex-col items-center',
                {
                  'scale-125 z-10': isHovered,
                  'opacity-50': hoveredIndex !== null && !isHovered,
                  'scale-110': isMain && !isHovered,
                }
              )}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <Image
                src={contributor.logo}
                alt={contributor.name}
                width={isMain ? 500 : 170}
                height={isMain ? 500 : 170}
                className="rounded-full object-contain"
              />
              <p className="mt-3 text-white text-lg font-medium text-center">
                {contributor.name}
              </p>
            </div>
          )
        })}
      </div>
    </section>
  )
}
