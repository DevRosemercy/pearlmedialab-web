'use client'

import { useEffect, useRef, useState } from 'react'

export type HeroSlide = {
  type: 'image' | 'video'
  src: string
  /** Optional poster image shown until a video is ready */
  poster?: string
  /** Seconds to show an image. Videos advance when they end. Default 6 */
  duration?: number
}

const MAX_VIDEO_SECONDS = 12

export default function HeroBackground({ slides }: { slides: HeroSlide[] }) {
  const [active, setActive] = useState(0)
  const videoRefs = useRef<(HTMLVideoElement | null)[]>([])
  const count = slides.length

  const next = () => setActive((i) => (i + 1) % count)

  // Play the active video from the start, pause the others
  useEffect(() => {
    videoRefs.current.forEach((v, i) => {
      if (!v) return
      if (i === active) {
        v.currentTime = 0
        v.play().catch(() => {})
      } else {
        v.pause()
      }
    })
  }, [active])

  // Timer: images use their duration, videos use a safety cap (they also advance on "ended")
  useEffect(() => {
    if (count < 2) return
    const slide = slides[active]
    const seconds = slide.type === 'image' ? slide.duration ?? 6 : MAX_VIDEO_SECONDS
    const id = setTimeout(next, seconds * 1000)
    return () => clearTimeout(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [active, count])

  if (count === 0) return null

  return (
    <div className="absolute inset-0 z-0 bg-[#07152b]" aria-hidden="true">
      {slides.map((slide, i) => {
        const isActive = i === active
        return (
          <div
            key={`${slide.src}-${i}`}
            className="absolute inset-0 transition-opacity duration-[1400ms] ease-in-out"
            style={{ opacity: isActive ? 1 : 0 }}
          >
            {slide.type === 'video' ? (
              <video
                ref={(el) => {
                  videoRefs.current[i] = el
                }}
                src={slide.src}
                poster={slide.poster}
                muted
                playsInline
                preload={i === 0 || i === (active + 1) % count ? 'auto' : 'metadata'}
                autoPlay={i === 0}
                onEnded={() => isActive && count > 1 && next()}
                onError={() => isActive && count > 1 && next()}
                className="h-full w-full object-cover"
              />
            ) : (
              <img
                src={slide.src}
                alt=""
                loading={i === 0 ? 'eager' : 'lazy'}
                className={`hero-pan h-full w-full object-cover ${isActive ? 'hero-pan-active' : ''}`}
              />
            )}
          </div>
        )
      })}

      {/* Dark overlay so the words stay readable on any image or video */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#07152b]/80 via-[#07152b]/55 to-[#07152b]/90" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(10,79,158,0.35),_transparent_60%)]" />

      {/* Slide indicators */}
      {count > 1 && (
        <div className="absolute bottom-6 left-1/2 z-20 flex -translate-x-1/2 gap-2" aria-hidden="false">
          {slides.map((_, i) => (
            <button
              key={i}
              type="button"
              onClick={() => setActive(i)}
              aria-label={`Show slide ${i + 1}`}
              className={`h-1.5 rounded-full transition-all duration-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-white ${
                i === active ? 'w-8 bg-[#50c8ff]' : 'w-3 bg-white/40 hover:bg-white/70'
              }`}
            />
          ))}
        </div>
      )}

      <style>{`
        .hero-pan { transform: scale(1.08) translateX(0); }
        .hero-pan-active { animation: heroPan 8s ease-out forwards; }
        @keyframes heroPan {
          from { transform: scale(1.08) translateX(2%); }
          to   { transform: scale(1.14) translateX(-2%); }
        }
        @media (prefers-reduced-motion: reduce) {
          .hero-pan-active { animation: none; }
        }
      `}</style>
    </div>
  )
}