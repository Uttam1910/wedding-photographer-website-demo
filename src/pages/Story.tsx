import { ArrowLeft, ArrowRight } from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import Img from '../components/Img'
import Lightbox from '../components/Lightbox'
import Reveal from '../components/Reveal'
import config from '../config/photographer'
import { useEnquiry } from '../context/EnquiryContext'
import type { PhotoKey } from '../data/images'
import { featuredWedding as story, type StoryChapter } from '../data/weddings'

export default function Story() {
  const { openEnquiry } = useEnquiry()
  const [index, setIndex] = useState<number | null>(null)

  const allPhotos = useMemo(() => {
    const seen = new Set<PhotoKey>()
    return story.chapters.flatMap((c) => c.photos.filter((p) => (seen.has(p) ? false : (seen.add(p), true))).map((photo) => ({ photo, caption: c.title })))
  }, [])
  const open = (photo: PhotoKey) => setIndex(allPhotos.findIndex((p) => p.photo === photo))

  useEffect(() => {
    document.title = `${story.couple} — ${story.location} | ${config.name}`
    return () => {
      document.title = `${config.name} — ${config.subtitle}`
    }
  }, [])

  return (
    <article>
      <header className="relative flex min-h-[88svh] items-end overflow-hidden bg-night text-white lg:min-h-[92vh]">
        <div className="absolute inset-0">
          <Img photo={story.hero} sizes="100vw" priority className="object-[center_25%]" />
          <div className="absolute inset-0 bg-gradient-to-t from-night via-night/35 to-black/40" />
        </div>
        <div className="relative mx-auto w-full max-w-[1440px] px-5 pb-14 sm:px-8 lg:px-12 lg:pb-20">
          <Link to="/#portfolio" className="link-arrow mb-8 text-white/75 hover:text-white">
            <ArrowLeft className="h-4 w-4" strokeWidth={1.5} /> Back to portfolio
          </Link>
          <p className="eyebrow animate-rise-in text-white/75">Featured Wedding</p>
          <h1 className="animate-rise-in mt-3 font-serif text-[clamp(3rem,8vw,7rem)] leading-[0.95] [animation-delay:120ms]">{story.couple}</h1>
          <p className="eyebrow animate-rise-in mt-5 text-gold [animation-delay:200ms]">
            {story.location} <span className="mx-2 text-white/40">•</span> {story.date}
          </p>
          <p className="animate-rise-in mt-6 max-w-[520px] text-[16px] leading-relaxed text-white/80 [animation-delay:280ms]">{story.intro}</p>
          {config.showDemoLabels && (
            <p className="mt-6 text-[11px] tracking-[0.14em] text-white/45 uppercase">Demo story · fictional couple · licensed stock photography</p>
          )}
        </div>
      </header>

      <nav aria-label="Story chapters" className="sticky top-[68px] z-30 border-b border-line bg-ivory/95 backdrop-blur">
        <ul className="no-scrollbar mx-auto flex max-w-[1440px] gap-6 overflow-x-auto px-5 text-[12px] tracking-[0.14em] whitespace-nowrap text-muted uppercase sm:px-8 lg:justify-center lg:px-12">
          {story.chapters.map((c) => (
            <li key={c.id}>
              <a href={`#chapter-${c.id}`} className="block py-4 hover:text-ink">
                {c.title}
              </a>
            </li>
          ))}
        </ul>
      </nav>

      <div className="mx-auto max-w-[1200px] px-5 sm:px-8 lg:px-12">
        {story.chapters.map((c, i) => (
          <Chapter key={c.id} chapter={c} flip={i % 2 === 1} onOpen={open} />
        ))}
      </div>

      <section className="bg-sand/60 py-16 lg:py-24">
        <Reveal className="mx-auto max-w-[760px] px-5 text-center">
          <p aria-hidden="true" className="font-serif text-[80px] leading-[0.4] text-gold">
            “
          </p>
          <blockquote className="mt-4 font-serif text-[26px] leading-snug text-ink italic sm:text-[32px]">{story.quote.text}</blockquote>
          <p className="eyebrow mt-6 text-muted">— {story.quote.by}</p>
        </Reveal>
      </section>

      <section className="bg-night py-16 text-white lg:py-20">
        <div className="mx-auto flex max-w-[1200px] flex-col gap-8 px-5 sm:px-8 lg:flex-row lg:items-end lg:justify-between lg:px-12">
          <div>
            <p className="eyebrow text-gold">Your story next?</p>
            <h2 className="mt-3 font-serif text-[40px] leading-none sm:text-[52px]">Let’s create something beautiful</h2>
            <ul className="mt-5 space-y-1 text-[13px] text-white/60">
              {story.credits.map((c) => (
                <li key={c}>{c}</li>
              ))}
            </ul>
          </div>
          <div className="flex flex-wrap gap-3">
            <button type="button" onClick={() => openEnquiry({ eventType: 'Wedding' })} className="btn btn-gold">
              Check Availability <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
            </button>
            <Link to="/#films" className="btn btn-outline-light">
              Watch the films
            </Link>
          </div>
        </div>
      </section>

      <Lightbox items={allPhotos} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} label={`${story.couple} gallery`} />
    </article>
  )
}

function Chapter({ chapter, flip, onOpen }: { chapter: StoryChapter; flip: boolean; onOpen: (p: PhotoKey) => void }) {
  const tile = (photo: PhotoKey, className = '', sizes = '(min-width: 1024px) 50vw, 100vw') => (
    <button key={photo} type="button" onClick={() => onOpen(photo)} className={`group relative block overflow-hidden bg-sand ${className}`} aria-label={`View larger — ${chapter.title}`}>
      <Img photo={photo} sizes={sizes} className="zoom-img absolute inset-0" />
    </button>
  )

  const text = (
    <Reveal className="flex flex-col justify-center">
      <p className="eyebrow text-gold-deep">{chapter.eyebrow}</p>
      <h2 className="display mt-3 text-[38px] lg:text-[48px]">{chapter.title}</h2>
      <p className="mt-4 max-w-[440px] text-[15px] leading-relaxed text-muted">{chapter.text}</p>
    </Reveal>
  )

  return (
    <section id={`chapter-${chapter.id}`} aria-label={chapter.title} className="scroll-mt-12 border-b border-line/70 py-14 last:border-0 lg:py-20">
      {chapter.layout === 'feature' && (
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12">
          {text}
          <div className="grid grid-cols-[1.5fr_1fr] gap-3">
            {tile(chapter.photos[0], 'aspect-[4/5] sm:aspect-auto sm:h-full sm:min-h-[420px]')}
            {tile(chapter.photos[1], 'aspect-[2/3]', '(min-width: 1024px) 25vw, 40vw')}
          </div>
        </div>
      )}
      {chapter.layout === 'pair' && (
        <div className={`grid gap-8 lg:grid-cols-[1fr_1.6fr] lg:gap-12 ${flip ? 'lg:[&>*:first-child]:order-2' : ''}`}>
          {text}
          <div className="grid grid-cols-2 gap-3">{chapter.photos.map((p, i) => tile(p, `aspect-[2/3] ${i === 1 ? 'mt-10' : ''}`, '(min-width: 1024px) 30vw, 50vw'))}</div>
        </div>
      )}
      {chapter.layout === 'wide' && (
        <div className="grid gap-8">
          <div className="lg:max-w-[640px]">{text}</div>
          {tile(chapter.photos[0], 'aspect-[3/2] w-full', '(min-width: 1200px) 1100px, 100vw')}
        </div>
      )}
      {chapter.layout === 'trio' && (
        <div className="grid gap-8">
          <div className="lg:max-w-[640px]">{text}</div>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {chapter.photos.map((p, i) => tile(p, `aspect-[2/3] ${i === 2 ? 'hidden sm:block' : ''}`, '(min-width: 1024px) 33vw, 50vw'))}
          </div>
        </div>
      )}
    </section>
  )
}
