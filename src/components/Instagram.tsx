import { ArrowRight } from 'lucide-react'
import { useState } from 'react'
import config from '../config/photographer'
import { instagramFeed } from '../data/instagram'
import Img from './Img'
import Lightbox from './Lightbox'
import Reveal from './Reveal'
import { InstagramIcon } from './SocialIcons'

export default function Instagram() {
  const [index, setIndex] = useState<number | null>(null)
  return (
    <section aria-labelledby="instagram-title" className="py-12 lg:py-10">
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[210px_1fr_auto] lg:items-center lg:gap-6">
        <Reveal>
          <p className="eyebrow text-gold-deep">Follow Our Journey</p>
          <h2 id="instagram-title" className="mt-2 font-serif text-[30px] leading-none">
            {config.instagramHandle}
          </h2>
          <p className="mt-3 text-[12px] leading-relaxed text-muted">Beautiful moments, behind the scenes and real stories from our recent work.</p>
          {config.showDemoLabels && <span className="demo-tag mt-3 text-muted">Demo handle</span>}
        </Reveal>

        <ul className="grid grid-cols-3 gap-1.5 sm:grid-cols-6 sm:gap-2">
          {instagramFeed.map((photo, i) => (
            <li key={photo}>
              <button type="button" onClick={() => setIndex(i)} className="group relative block aspect-square w-full overflow-hidden bg-sand" aria-label={`Open Instagram photo ${i + 1}`}>
                <Img photo={photo} sizes="(min-width: 640px) 12vw, 33vw" className="zoom-img" />
                <span className="absolute inset-0 grid place-items-center bg-black/0 text-white opacity-0 transition group-hover:bg-black/30 group-hover:opacity-100">
                  <InstagramIcon className="h-5 w-5" />
                </span>
              </button>
            </li>
          ))}
        </ul>

        <a href={config.instagram} target="_blank" rel="noopener noreferrer" className="btn btn-gold min-h-10 self-start px-5 lg:self-center">
          Follow on Instagram <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          <span className="sr-only">(opens in a new tab)</span>
        </a>
      </div>
      <Lightbox items={instagramFeed.map((photo) => ({ photo }))} index={index} onClose={() => setIndex(null)} onIndexChange={setIndex} label="Instagram photos" />
    </section>
  )
}
