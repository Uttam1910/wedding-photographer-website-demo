import { ArrowRight, Check } from 'lucide-react'
import config from '../config/photographer'
import { useEnquiry } from '../context/EnquiryContext'
import { packages } from '../data/packages'
import Img from './Img'
import Reveal from './Reveal'

export default function Packages() {
  const { openEnquiry, selectedPackage } = useEnquiry()
  return (
    <section id="packages" aria-labelledby="packages-title" className="py-14 lg:py-16">
      <Reveal>
        <p className="eyebrow text-gold-deep">Our Packages</p>
        <div className="flex flex-wrap items-end justify-between gap-2">
          <h2 id="packages-title" className="display mt-3 text-[34px] lg:text-[38px]">
            Tailored For Your Story
          </h2>
          {config.showDemoLabels && <span className="demo-tag text-muted">Demo pricing</span>}
        </div>
      </Reveal>

      <ul className="no-scrollbar -mx-5 mt-7 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pt-3 pb-3 sm:-mx-8 sm:px-8 md:mx-0 md:grid md:grid-cols-3 md:overflow-visible md:px-0 md:pb-0">
        {packages.map((pkg, i) => {
          const chosen = selectedPackage === pkg.id
          return (
            <Reveal
              as="li"
              key={pkg.id}
              delay={i * 90}
              className={`relative flex w-[78%] shrink-0 snap-center flex-col border bg-white sm:w-[46%] md:w-auto ${
                pkg.popular ? 'border-gold shadow-[0_18px_40px_-28px_rgba(90,60,20,0.55)]' : 'border-line'
              }`}
            >
              {pkg.popular && (
                <span className="absolute -top-3 left-1/2 z-10 -translate-x-1/2 bg-gold px-3 py-1 text-[10px] font-medium tracking-[0.2em] text-night uppercase">
                  Popular
                </span>
              )}
              <div className="aspect-[4/2.6] overflow-hidden bg-sand">
                <Img photo={pkg.cover} sizes="(min-width: 1280px) 12vw, (min-width: 768px) 30vw, 78vw" />
              </div>
              <div className="flex flex-1 flex-col p-4 xl:p-3.5 2xl:p-4">
                <h3 className="font-serif text-[22px] leading-tight">{pkg.name}</h3>
                <p className="mt-0.5 font-serif text-[21px] font-semibold text-ink">{pkg.price}</p>
                <ul className="mt-3 mb-5 space-y-1.5 text-[12px] text-muted">
                  {pkg.features.map((f) => (
                    <li key={f} className="flex items-start gap-2">
                      <Check className="mt-0.5 h-3.5 w-3.5 shrink-0 text-gold-deep" strokeWidth={2} aria-hidden="true" />
                      {f}
                    </li>
                  ))}
                </ul>
                <button
                  type="button"
                  onClick={() => openEnquiry({ pkg: pkg.id })}
                  className={`btn mt-auto min-h-10 w-full px-3 text-[12px] ${chosen ? 'bg-ink text-ivory hover:bg-brown' : 'bg-gold-deep text-white hover:bg-brown'}`}
                  aria-label={`Enquire about the ${pkg.name} package`}
                >
                  {chosen ? 'Selected — Enquire' : 'Enquire Now'} <ArrowRight className="h-3.5 w-3.5" strokeWidth={1.6} />
                </button>
              </div>
            </Reveal>
          )
        })}
      </ul>
      <p className="mt-4 text-[12px] text-muted">Every collection can be tailored — travel, extra days and albums are quoted separately.</p>
    </section>
  )
}
