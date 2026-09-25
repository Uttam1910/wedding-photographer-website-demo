import { ArrowRight } from 'lucide-react'
import { categories, type CategoryId } from '../data/portfolio'
import Img from './Img'
import Reveal from './Reveal'

export default function PortfolioIntro({ onSelect }: { onSelect: (id: CategoryId | 'all') => void }) {
  return (
    <section id="portfolio" aria-labelledby="portfolio-intro-title" className="bg-ivory py-14 lg:py-16">
      <div className="mx-auto grid grid-cols-1 max-w-[1440px] gap-8 px-5 sm:px-8 lg:grid-cols-[260px_1fr] lg:gap-10 lg:px-12 xl:grid-cols-[300px_1fr]">
        <Reveal className="flex flex-col justify-center">
          <p className="eyebrow text-gold-deep">Our Portfolio</p>
          <h2 id="portfolio-intro-title" className="display mt-3 text-[40px] lg:text-[46px]">
            Moments <br className="hidden lg:block" />
            That Matter
          </h2>
          <p className="mt-4 max-w-[340px] text-[14px] leading-relaxed text-muted">
            From intimate ceremonies to grand celebrations, we capture the real moments that tell your unique story.
          </p>
          <button type="button" onClick={() => onSelect('all')} className="link-arrow mt-6 self-start text-ink">
            Explore Portfolio <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
        </Reveal>

        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 pb-2 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-5 lg:gap-4 lg:overflow-visible lg:px-0 lg:pb-0">
          {categories.map((c, i) => (
            <Reveal as="li" key={c.id} delay={i * 70} className="w-[62%] shrink-0 snap-start sm:w-[38%] lg:w-auto">
              <button
                type="button"
                onClick={() => onSelect(c.id)}
                className="group block w-full text-left"
                aria-label={`${c.title} — ${c.subtitle}. Show ${c.title.toLowerCase()} photos`}
              >
                <span className="block aspect-[4/3.3] overflow-hidden bg-sand">
                  <Img photo={c.cover} sizes="(min-width: 1024px) 18vw, 60vw" className="zoom-img" />
                </span>
                <span className="mt-3 flex items-center justify-between gap-2">
                  <span className="text-[14px] font-medium text-ink">{c.title}</span>
                  <ArrowRight className="h-4 w-4 -translate-x-1 text-gold-deep opacity-0 transition duration-300 group-hover:translate-x-0 group-hover:opacity-100" strokeWidth={1.5} />
                </span>
                <span className="mt-0.5 block text-[12px] text-muted">{c.subtitle}</span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  )
}
