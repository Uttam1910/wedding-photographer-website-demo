import { ArrowRight, Camera, ChevronLeft, Gem, Heart } from 'lucide-react'
import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import config from '../config/photographer'
import { useEnquiry } from '../context/EnquiryContext'
import type { PhotoKey } from '../data/images'
import { useReducedMotion } from '../hooks/useMediaQuery'
import Img from './Img'

const slides: { photo: PhotoKey; position: string }[] = [
  { photo: 'hero-1', position: 'object-[58%_center] lg:object-[center_35%]' },
  { photo: 'hero-2', position: 'object-[62%_center] lg:object-center' },
  { photo: 'hero-3', position: 'object-[50%_center] lg:object-[center_60%]' },
]

const values = [
  { icon: Camera, label: 'Authentic Moments' },
  { icon: Heart, label: 'Timeless Memories' },
  { icon: Gem, label: 'Cinematic Storytelling' },
]

const SLIDE_MS = 7000

export default function Hero() {
  const [current, setCurrent] = useState(0)
  const [paused, setPaused] = useState(false)
  const reduceMotion = useReducedMotion()
  const { openEnquiry } = useEnquiry()

  const go = useCallback((i: number) => setCurrent((i + slides.length) % slides.length), [])

  useEffect(() => {
    if (paused || reduceMotion) return
    const t = window.setTimeout(() => go(current + 1), SLIDE_MS)
    return () => window.clearTimeout(t)
  }, [current, paused, reduceMotion, go])

  return (
    <section
      id="top"
      aria-roledescription="carousel"
      aria-label="Featured wedding photographs"
      className="relative overflow-hidden bg-night text-white"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      {/* Slides */}
      <div className="relative h-[62svh] min-h-[400px] sm:h-[68svh] lg:absolute lg:inset-y-0 lg:right-0 lg:h-auto lg:w-[70%]">
        {slides.map((s, i) => (
          <div
            key={s.photo}
            className={`hero-slide absolute inset-0 overflow-hidden ${i === current ? 'is-active' : ''}`}
            aria-hidden={i !== current}
            role="group"
            aria-roledescription="slide"
            aria-label={`${i + 1} of ${slides.length}`}
          >
            <Img photo={s.photo} sizes="(min-width: 1024px) 70vw, 100vw" priority={i === 0} className={s.position} />
          </div>
        ))}
        {/* Mobile: fade image into the text block below */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-transparent to-night lg:hidden" />
        {/* Desktop: editorial fade from the dark text column */}
        <div className="absolute inset-y-0 left-0 hidden w-[55%] bg-gradient-to-r from-night via-night/75 to-transparent lg:block" />
        <div className="absolute inset-x-0 bottom-0 hidden h-40 bg-gradient-to-t from-night/85 to-transparent lg:block" />
      </div>

      {/* Copy */}
      <div className="relative z-10 mx-auto -mt-36 max-w-[1440px] px-5 pb-10 sm:-mt-44 sm:px-8 lg:mt-0 lg:flex lg:min-h-[max(660px,min(94vh,860px))] lg:flex-col lg:justify-center lg:px-12 lg:pt-24 lg:pb-32">
        <div className="max-w-[560px]">
          <p className="eyebrow animate-rise-in text-white/85">{config.heroLabel}</p>
          <h1 className="display animate-rise-in mt-4 text-[clamp(2.7rem,5.2vw,4.9rem)] tracking-[0.01em] uppercase [animation-delay:120ms] lg:mt-6">
            {config.tagline.map((line) => (
              <span key={line} className="block">
                {line}
              </span>
            ))}
          </h1>
          <p className="animate-rise-in mt-5 max-w-[400px] text-[15px] leading-relaxed text-white/80 [animation-delay:240ms] lg:mt-7 lg:text-base">
            Timeless wedding photography and films filled with real moments, genuine emotions and unforgettable stories.
          </p>
          <div className="animate-rise-in mt-7 flex flex-wrap gap-3 [animation-delay:360ms] lg:mt-9 lg:gap-4">
            <Link to="/#portfolio" className="btn btn-gold min-w-[150px] flex-1 sm:flex-none">
              View Portfolio
            </Link>
            <button type="button" onClick={() => openEnquiry()} className="btn btn-outline-light min-w-[150px] flex-1 sm:flex-none">
              Check Availability
            </button>
          </div>
        </div>

        {/* Value indicators + slider controls */}
        <div className="mt-10 flex flex-col gap-8 lg:absolute lg:inset-x-12 lg:bottom-9 lg:mt-0 lg:flex-row lg:items-end lg:justify-between">
          <ul className="grid grid-cols-3 gap-2 border-t border-white/10 pt-6 lg:flex lg:gap-10 lg:border-0 lg:pt-0">
            {values.map(({ icon: Icon, label }) => (
              <li key={label} className="flex flex-col items-center gap-2 text-center text-[12px] leading-tight text-white/85 lg:flex-row lg:gap-3 lg:text-left lg:text-[13px]">
                <Icon className="h-6 w-6 text-gold lg:h-5 lg:w-5" strokeWidth={1.2} aria-hidden="true" />
                {label}
              </li>
            ))}
          </ul>

          <div className="flex items-center justify-center gap-3 text-white/80 lg:justify-end">
            <button type="button" onClick={() => go(current - 1)} className="grid h-10 w-10 place-items-center transition hover:text-white" aria-label="Previous slide">
              <ChevronLeft className="h-5 w-5" strokeWidth={1.3} />
            </button>
            <div className="flex items-center gap-1">
              {slides.map((s, i) => (
                <button
                  key={s.photo}
                  type="button"
                  onClick={() => go(i)}
                  aria-label={`Show slide ${i + 1}`}
                  aria-current={i === current ? 'true' : undefined}
                  className="group flex h-10 items-center gap-2 px-1.5"
                >
                  <span className={`block h-px bg-current transition-all duration-500 ${i === current ? 'w-10 bg-gold' : 'w-0'}`} />
                  <span className={`text-[12px] tracking-[0.14em] transition-colors ${i === current ? 'text-white' : 'text-white/45 group-hover:text-white/80'}`}>
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </button>
              ))}
            </div>
            <button type="button" onClick={() => go(current + 1)} className="grid h-10 w-10 place-items-center transition hover:text-white" aria-label="Next slide">
              <ArrowRight className="h-5 w-5" strokeWidth={1.3} />
            </button>
          </div>
        </div>
      </div>
    </section>
  )
}
