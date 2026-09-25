import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import config from '../config/photographer'
import Img from './Img'
import Philosophy from './Philosophy'
import Reveal from './Reveal'

const stats = [
  { value: '5+', label: 'Years Experience' },
  { value: '200+', label: 'Happy Couples' },
  { value: '500+', label: 'Weddings Captured' },
]

export default function About() {
  const [expanded, setExpanded] = useState(false)
  return (
    <section id="about" aria-labelledby="about-title" className="py-14 lg:py-16">
      <div className="grid grid-cols-1 gap-10 md:grid-cols-[1fr_1fr] lg:grid-cols-[1.05fr_1fr_0.85fr] lg:gap-8">
        <Reveal className="flex flex-col justify-center">
          <p className="eyebrow text-gold-deep">About Us</p>
          <h2 id="about-title" className="display mt-3 text-[40px] lg:text-[44px]">
            More Than <br />
            Just Photos
          </h2>
          <p className="mt-5 text-[14px] leading-relaxed text-muted">
            We are a passionate team of wedding photographers and filmmakers, dedicated to capturing your most precious moments with authenticity, artistry and heart.
          </p>
          <div id="our-story" hidden={!expanded} className="mt-4 space-y-3 text-[14px] leading-relaxed text-muted">
            <p>
              {config.name} began with two friends, one borrowed camera and a cousin’s wedding in Pune. Today we are a small team of photographers and filmmakers who still work the
              same way: quietly, closely and with a lot of heart.
            </p>
            <p>We take a limited number of weddings each season so every couple gets our full attention — from the first call to the final album.</p>
          </div>

          <dl className="mt-7 grid grid-cols-3 gap-3">
            {stats.map((s) => (
              <div key={s.label}>
                <dt className="sr-only">{s.label}</dt>
                <dd className="font-serif text-[30px] leading-none text-gold-deep">{s.value}</dd>
                <dd className="mt-1.5 text-[11px] leading-snug text-muted">{s.label}</dd>
              </div>
            ))}
          </dl>
          {config.showDemoLabels && <p className="mt-3 text-[10px] tracking-[0.14em] text-muted/80 uppercase">Demo figures for illustration</p>}

          <button
            type="button"
            onClick={() => setExpanded((v) => !v)}
            aria-expanded={expanded}
            aria-controls="our-story"
            className="btn mt-6 self-start bg-gold-deep px-5 text-white hover:bg-brown"
          >
            {expanded ? 'Close Our Story' : 'Our Story'}
            <ArrowRight className={`h-4 w-4 transition-transform ${expanded ? '-rotate-90' : ''}`} strokeWidth={1.5} />
          </button>
        </Reveal>

        <Reveal delay={120} className="relative min-h-[360px] overflow-hidden bg-sand md:min-h-[420px]">
          <Img photo="photographer" sizes="(min-width: 1024px) 26vw, (min-width: 768px) 50vw, 100vw" className="absolute inset-0 object-[center_30%] grayscale" />
        </Reveal>

        <Reveal delay={220} className="flex items-center md:col-span-2 lg:col-span-1">
          <Philosophy className="mx-auto max-w-[420px] lg:max-w-none" />
        </Reveal>
      </div>
    </section>
  )
}
