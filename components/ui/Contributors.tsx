'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

const contributorsTopRow = [
  {
    name: 'ACM UCF',
    logo: '/logos/acmlogo.png',
  },
  {
    name: 'KnightHacks',
    logo: '/logos/knighthackslogo.svg',
  },
  {
    name: 'IEEE UCF',
    logo: '/logos/ieeeucf.png',
  },
]

const mainContributor = {
  name: 'Blue Origin',
  logo: '/logos/blueoriginlogo.svg',
  isMain: true,
}

export default function Contributors() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-20 relative">
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-radial from-blue-100/10 via-transparent to-transparent blur-8xl animate-pulse-slow" />
        <div className="absolute -bottom-[0vh] left-1/2 w-[900px] h-[1000px] -translate-x-1/2 bg-blue-400/10 rounded-full blur-[160px]" />
      </div>

      <h2 className="text-5xl md:text-6xl font-semibold text-white text-center mb-12 relative z-10">
        Our Contributors
      </h2>

      <div className="relative z-10 flex flex-col items-center gap--5">

        <div className="w-full max-w-[2000px] mx-auto flex justify-between items-center gap-64 px-20">
          {contributorsTopRow.map((contributor, index) => {
            const isHovered = hoveredIndex === index
            return (
              <div
                key={index}
                className={classNames(
                  'relative transition-all duration-300 ease-in-out flex flex-col items-center',
                  {
                    'scale-125 z-10': isHovered,
                    'opacity-50': hoveredIndex !== null && !isHovered,
                  }
                )}
                onMouseEnter={() => setHoveredIndex(index)}
                onMouseLeave={() => setHoveredIndex(null)}
              >
                <Image
                  src={contributor.logo}
                  alt={contributor.name}
                  width={170}
                  height={170}
                  className="rounded-full object-contain"
                />
                <p className="mt-3 text-white text-lg font-medium text-center">
                  {contributor.name}
                </p>
              </div>
            )
          })}
        </div>

        <div
          className={classNames(
            'relative transition-all duration-300 ease-in-out flex flex-col items-center',
            {
              'scale-125 z-10': hoveredIndex === 999,
              'opacity-50': hoveredIndex !== null && hoveredIndex !== 999,
              'scale-110': mainContributor.isMain,
            }
          )}
          onMouseEnter={() => setHoveredIndex(999)}
          onMouseLeave={() => setHoveredIndex(null)}
        >
          <Image
            src={mainContributor.logo}
            alt={mainContributor.name}
            width={500}
            height={500}
            className="rounded-full object-contain"
          />
          <p className="mt-3 text-white text-lg font-medium text-center">
            {mainContributor.name}
          </p>
        </div>

      </div>
    </section>
  )
}
