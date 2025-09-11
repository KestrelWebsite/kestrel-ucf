'use client'

import React, { useEffect, useRef } from 'react'
import Core from 'smooothy'

const teams = [
  { name: 'Team A' },
  { name: 'Team B' },
  { name: 'Team C' },
  { name: 'Team D' },
  { name: 'Team E' },
  { name: 'Team F' },
  { name: 'Team G' },
  { name: 'Team H' },
  { name: 'Team I' },
  { name: 'Team J' },
]

export default function SmoothSlider() {
  const wrapperRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!wrapperRef.current) return

    const slider = new Core(wrapperRef.current, {
      infinite: true,
      snap: true,
      snapStrength: 0.15,
      dragSensitivity: 0.01,
      scrollSensitivity: 1,
      lerpFactor: 0.15,
      virtualScroll: {
        mouseMultiplier: 0.75,
        touchMultiplier: 1.5,
        firefoxMultiplier: 30,
        passive: true,
        useKeyboard: true,
      },
      // Center one card fully at a time
      setOffset: ({ itemWidth, wrapperWidth }) => (wrapperWidth - itemWidth) / 2,
    })

    function animate() {
      slider.update()
      requestAnimationFrame(animate)
    }

    animate()
    return () => slider.destroy()
  }, [])

  return (
    <section className="min-h-[800px] w-full py-16 text-white overflow-hidden"> 
      {/* removed bg-black */}

      <div ref={wrapperRef} className="overflow-hidden w-full">
        <div data-slider className="flex">
          {[...teams, ...teams, ...teams].map((team, i) => (
            <div
              key={i}
              className="flex-shrink-0 w-[300px] h-[300px] px-4"
            >
              <div className="w-full h-full rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm flex items-center justify-center shadow-sm hover:shadow-md transition">
                <div className="text-left w-full h-full px-8 py-6 flex flex-col justify-center">
                  <div className="text-sm mb-2 text-gray-400">{i % 10}</div>
                  <div className="text-center text-lg font-semibold">{team.name}</div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
