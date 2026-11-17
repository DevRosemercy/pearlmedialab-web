'use client'

import { useEffect, useState } from 'react'

const PHRASES = [
  'Powerful Stories.',
  'Building Brands.',
  'Quality Music Videos.',
  'Cinematic Commercials.',
  'Live Streaming.',
  'Stunning Photography.',
  'Drone Footage.',
  'Documentaries.',
  'Unforgettable Visuals.',
]

export default function RotatingHeadline() {
  const [index, setIndex] = useState(0)

  useEffect(() => {
    const id = setInterval(() => {
      setIndex((i) => (i + 1) % PHRASES.length)
    }, 2800)
    return () => clearInterval(id)
  }, [])

  return (
    <h1 className="text-5xl md:text-7xl lg:text-[6rem] font-bold text-white mb-6 leading-[0.95] tracking-tighter drop-shadow-2xl">
      <span className="block">We Create</span>

      {/* Fixed height so the page doesn't jump when the words change */}
      <span className="block relative h-[2.3em] sm:h-[1.2em] mt-2 overflow-hidden">
        <span
          key={index}
          className="rotating-word absolute inset-x-0 top-0 text-transparent bg-clip-text bg-gradient-to-r from-[#50c8ff] to-[#1ba6e8] text-4xl sm:text-5xl md:text-7xl lg:text-[5.5rem]"
        >
          {PHRASES[index]}
        </span>
      </span>

      <style>{`
        .rotating-word {
          animation: wordIn 0.7s cubic-bezier(0.22, 1, 0.36, 1) both;
        }
        @keyframes wordIn {
          from { opacity: 0; transform: translateY(40%); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (prefers-reduced-motion: reduce) {
          .rotating-word { animation: none; }
        }
      `}</style>
    </h1>
  )
}