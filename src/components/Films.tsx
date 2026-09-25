import { ArrowRight, Play } from 'lucide-react'
import { useState } from 'react'
import config from '../config/photographer'
import { films, type Film } from '../data/films'
import FilmModal from './FilmModal'
import Img from './Img'
import Reveal from './Reveal'

export default function Films() {
  const [active, setActive] = useState<Film | null>(null)
  return (
    <section id="films" aria-labelledby="films-title" className="bg-night text-white">
      <div className="grid grid-cols-1 gap-8 px-5 py-12 sm:px-8 lg:grid-cols-[250px_1fr] lg:gap-6 lg:px-10 lg:py-10 xl:grid-cols-[230px_1fr]">
        <Reveal className="flex flex-col justify-center">
          <p className="eyebrow text-white/65">Wedding Films</p>
          <h2 id="films-title" className="mt-3 font-serif text-[36px] leading-none lg:text-[38px]">
            Relive the Magic
          </h2>
          <p className="mt-4 text-[13px] leading-relaxed text-white/70">
            Cinematic wedding films that let you experience your day again through every emotion, glance and celebration.
          </p>
          <button type="button" onClick={() => setActive(films[0])} className="btn btn-gold mt-6 min-h-10 self-start px-5">
            Watch Our Films <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
          {config.showDemoLabels && <p className="mt-3 text-[10px] tracking-[0.14em] text-white/40 uppercase">Demo previews</p>}
        </Reveal>

        <ul className="no-scrollbar -mx-5 flex snap-x snap-mandatory gap-3 overflow-x-auto px-5 sm:-mx-8 sm:px-8 lg:mx-0 lg:grid lg:grid-cols-3 lg:overflow-visible lg:px-0">
          {films.map((film, i) => (
            <Reveal as="li" key={film.id} delay={i * 90} className="w-[78%] shrink-0 snap-center sm:w-[45%] lg:w-auto">
              <button type="button" onClick={() => setActive(film)} className="group relative block aspect-[4/3.1] w-full overflow-hidden text-left" aria-label={`Play ${film.couple} — ${film.title}`}>
                <Img photo={film.cover} sizes="(min-width: 1024px) 20vw, 78vw" className="zoom-img" />
                <span className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/10 transition-colors group-hover:via-black/20" />
                <span className="absolute top-1/2 left-1/2 grid h-14 w-14 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/80 bg-black/25 backdrop-blur-sm transition duration-500 group-hover:scale-110 group-hover:bg-gold group-hover:text-night">
                  <Play className="ml-0.5 h-5 w-5" strokeWidth={1.4} fill="currentColor" />
                </span>
                <span className="absolute right-3 bottom-3 left-3">
                  <span className="block text-[14px] font-medium">{film.couple}</span>
                  <span className="mt-0.5 flex justify-between text-[12px] text-white/70">
                    {film.title}
                    <span className="tabular-nums">{film.duration}</span>
                  </span>
                </span>
              </button>
            </Reveal>
          ))}
        </ul>
      </div>
      <FilmModal film={active} onClose={() => setActive(null)} onSelect={setActive} />
    </section>
  )
}
