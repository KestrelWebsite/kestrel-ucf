'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import classNames from 'classnames'

const contributors = [
  {
    name: 'KnightHacks',
    logo: '/logos/knighthackslogo.svg',
    description: 'KnightHacks supported the development team.',
  },
  {
    name: 'AI@UCF',
    logo: '/logos/aiucf.svg',
    description: 'AI@UCF contributed to research and AI insights.',
  },
  {
    name: 'Blue Origin',
    logo: '/logos/blueoriginlogo.svg',
    description: 'Blue Origin is our primary sponsor.',
    isMain: true,
  },
  {
    name: 'IEEE UCF',
    logo: '/logos/ieeeucf.png',
    description: 'IEEE UCF helped with hardware testing.',
  },
  {
    name: 'ACM UCF',
    logo: '/logos/acmlogo.png',
    description: 'ACM UCF provided funding for outreach.',
  },
]

export default function Contributors() {
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null)

  return (
    <section className="py-20"> {/* removed bg-black */}
      <h2 className="text-5xl md:text-6xl font-extrabold bg-gradient-to-r from-blue-400 to-purple-500 bg-clip-text text-transparent text-center mb-12">
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
                width={isMain ? 300 : 190}
                height={isMain ? 300 : 190}
                className="rounded-full object-contain"
              />
              {isHovered && (
                <div className="mt-4 w-48 text-center text-black text-sm bg-white p-2 rounded-lg shadow-lg">
                  {contributor.description}
                </div>
              )}
            </div>
          )
        })}
      </div>
    </section>
  )
}
