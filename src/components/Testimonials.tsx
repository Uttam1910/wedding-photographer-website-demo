import { ChevronLeft, ChevronRight, Star } from 'lucide-react'
import { useState } from 'react'
import config from '../config/photographer'
import { testimonials } from '../data/testimonials'
import { useMediaQuery } from '../hooks/useMediaQuery'
import Reveal from './Reveal'

export default function Testimonials() {
  const isMd = useMediaQuery('(min-width: 768px)')
  const isXl = useMediaQuery('(min-width: 1280px)')
  const perView = isXl ? 3 : isMd ? 2 : 1
  const [start, setStart] = useState(0)
  const n = testimonials.length

  const go = (delta: number) => setStart((s) => (s + delta + n) % n)
  const visible = Array.from({ length: perView }, (_, k) => testimonials[(start + k) % n])

  return (
    <section id="testimonials" aria-labelledby="testimonials-title" aria-roledescription="carousel" className="py-12 lg:py-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[210px_1fr] lg:items-center lg:gap-6">
        <Reveal>
          <p className="eyebrow text-gold-deep">Kind Words</p>
          <h2 id="testimonials-title" className="display mt-2 text-[34px] lg:text-[36px]">
            From Our Couples
          </h2>
          {config.showDemoLabels && <span className="demo-tag mt-4 text-muted">Demo testimonials</span>}
        </Reveal>

        <div className="flex items-center gap-2 sm:gap-3">
          <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="hidden h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-ink sm:grid">
            <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
          </button>
          <ul className="grid min-w-0 flex-1 gap-3" style={{ gridTemplateColumns: `repeat(${perView}, minmax(0, 1fr))` }} aria-live="polite">
            {visible.map((t, k) => (
              <li key={`${t.id}-${k}`} className="animate-fade-in flex flex-col border border-line/80 bg-white p-5" aria-roledescription="slide" aria-label={`${((start + k) % n) + 1} of ${n}`}>
                <blockquote className="flex-1 text-[13px] leading-relaxed text-ink/85">“{t.quote}”</blockquote>
                <div className="mt-4 flex gap-0.5 text-gold" aria-label={`${t.rating} out of 5 stars`} role="img">
                  {Array.from({ length: 5 }, (_, i) => (
                    <Star key={i} className="h-3.5 w-3.5" fill={i < t.rating ? 'currentColor' : 'none'} strokeWidth={1.2} aria-hidden="true" />
                  ))}
                </div>
                <div className="mt-3 flex items-center gap-2.5">
                  <span aria-hidden="true" className="grid h-8 w-8 place-items-center rounded-full bg-sand font-serif text-[13px] text-brown">
                    {t.couple
                      .split(' & ')
                      .map((w) => w[0])
                      .join('')}
                  </span>
                  <p className="text-[12px] text-muted">
                    — {t.couple}
                    <span className="block text-[11px] text-muted/70">{t.detail}</span>
                  </p>
                </div>
              </li>
            ))}
          </ul>
          <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="hidden h-10 w-10 shrink-0 place-items-center rounded-full border border-line bg-white text-ink transition hover:border-ink sm:grid">
            <ChevronRight className="h-4 w-4" strokeWidth={1.6} />
          </button>
        </div>
      </div>

      <div className="mt-6 flex items-center justify-center gap-3 lg:ml-[216px]">
        <button type="button" onClick={() => go(-1)} aria-label="Previous testimonial" className="grid h-10 w-10 place-items-center rounded-full border border-line sm:hidden">
          <ChevronLeft className="h-4 w-4" strokeWidth={1.6} />
        </button>
        <div className="flex items-center gap-1" role="group" aria-label="Choose testimonial">
          {testimonials.map((t, i) => (
            <button key={t.id} type="button" onClick={() => setStart(i)} aria-label={`Show testimonial ${i + 1}`} aria-current={i === start ? 'true' : undefined} className="grid h-8 w-6 place-items-center">
              <span className={`block h-1.5 rounded-full transition-all duration-300 ${i === start ? 'w-5 bg-gold-deep' : 'w-1.5 bg-line'}`} />
            </button>
          ))}
        </div>
        <button type="button" onClick={() => go(1)} aria-label="Next testimonial" className="grid h-10 w-10 place-items-center rounded-full border border-line sm:hidden">
          <ChevronRight className="h-4 w-4" strokeWidth={1.6} />
        </button>
      </div>
    </section>
  )
}
