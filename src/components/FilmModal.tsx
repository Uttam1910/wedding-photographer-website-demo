import { Pause, Play, RotateCcw, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import config from '../config/photographer'
import { useEnquiry } from '../context/EnquiryContext'
import { films, type Film } from '../data/films'
import { useModal } from '../hooks/useModal'
import Img from './Img'

/** Preview runs this many real seconds, mapped onto the film's stated duration. */
const PREVIEW_SECONDS = 20

const toSeconds = (d: string) => {
  const [m, s] = d.split(':').map(Number)
  return m * 60 + s
}
const fmt = (t: number) => `${Math.floor(t / 60)}:${String(Math.floor(t % 60)).padStart(2, '0')}`

interface FilmModalProps {
  film: Film | null
  onClose: () => void
  onSelect: (film: Film) => void
}

export default function FilmModal({ film, onClose, onSelect }: FilmModalProps) {
  const ref = useModal<HTMLDivElement>(film !== null, onClose)
  if (!film) return null
  return createPortal(
    <div className="fixed inset-0 z-[80] flex items-center justify-center p-0 sm:p-6">
      <div className="animate-fade-in absolute inset-0 bg-[#0b0907]/92" onClick={onClose} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-labelledby="film-title"
        className="animate-rise-in relative flex max-h-full w-full max-w-[1100px] flex-col overflow-y-auto bg-night text-white sm:max-h-[94vh]"
      >
        <Player key={film.id} film={film} onClose={onClose} onSelect={onSelect} />
      </div>
    </div>,
    document.body,
  )
}

function Player({ film, onClose, onSelect }: { film: Film; onClose: () => void; onSelect: (film: Film) => void }) {
  const [playing, setPlaying] = useState(false)
  const [progress, setProgress] = useState(0) // 0 → 1
  const { openEnquiry } = useEnquiry()
  const total = toSeconds(film.duration)
  const ended = progress >= 1

  useEffect(() => {
    if (!playing) return
    let last = performance.now()
    let raf = 0
    const tick = (now: number) => {
      const dt = (now - last) / 1000
      last = now
      setProgress((p) => Math.min(1, p + dt / PREVIEW_SECONDS))
      raf = requestAnimationFrame(tick)
    }
    raf = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(raf)
  }, [playing])

  useEffect(() => {
    if (ended) setPlaying(false)
  }, [ended])

  const toggle = () => {
    if (ended) setProgress(0)
    setPlaying((p) => (ended ? true : !p))
  }

  return (
    <>
      <div className="flex items-center justify-between gap-4 px-4 py-3 sm:px-6">
        <div className="min-w-0">
          <p className="eyebrow text-gold">{film.title}</p>
          <h2 id="film-title" className="truncate font-serif text-[26px] leading-tight">
            {film.couple}
          </h2>
        </div>
        <button type="button" onClick={onClose} data-autofocus className="grid h-11 w-11 shrink-0 place-items-center text-white/80 hover:text-white" aria-label="Close film preview">
          <X className="h-6 w-6" strokeWidth={1.4} />
        </button>
      </div>

      <div className="relative aspect-[4/5] overflow-hidden bg-black sm:aspect-video">
        <div
          className="absolute inset-0 transition-transform ease-linear motion-reduce:transition-none"
          style={{ transform: `scale(${1 + progress * 0.12})`, transitionDuration: playing ? '300ms' : '600ms' }}
        >
          <Img photo={film.cover} sizes="(min-width: 1100px) 1100px, 100vw" alt={`Still from the ${film.couple} film`} />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/30" />

        {config.showDemoLabels && (
          <span className="demo-tag absolute top-4 left-4 bg-black/40 text-white backdrop-blur">Demo film preview — no video loaded</span>
        )}

        <button
          type="button"
          onClick={toggle}
          className={`absolute top-1/2 left-1/2 grid h-20 w-20 -translate-x-1/2 -translate-y-1/2 place-items-center rounded-full border border-white/70 bg-black/25 backdrop-blur transition duration-500 hover:scale-105 hover:bg-black/40 ${
            playing ? 'opacity-0 hover:opacity-100 focus-visible:opacity-100' : 'opacity-100'
          }`}
          aria-label={ended ? 'Replay preview' : playing ? 'Pause preview' : 'Play preview'}
        >
          {ended ? <RotateCcw className="h-7 w-7" strokeWidth={1.3} /> : playing ? <Pause className="h-7 w-7" strokeWidth={1.3} /> : <Play className="ml-1 h-7 w-7" strokeWidth={1.3} />}
        </button>

        <div className="absolute inset-x-0 bottom-0 p-4 sm:p-6">
          <p className={`max-w-[520px] font-serif text-[20px] leading-snug text-white/90 italic transition-opacity duration-700 sm:text-[24px] ${playing || progress > 0 ? 'opacity-100' : 'opacity-0'}`}>
            {ended ? 'Thank you for watching this demo preview.' : film.description}
          </p>
          <div className="mt-4 flex items-center gap-3 text-[12px] tabular-nums text-white/75">
            <button type="button" onClick={toggle} className="grid h-9 w-9 place-items-center hover:text-white" aria-label={playing ? 'Pause preview' : 'Play preview'}>
              {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
            </button>
            <span>{fmt(progress * total)}</span>
            <div
              className="relative h-[3px] flex-1 cursor-pointer bg-white/20"
              role="slider"
              tabIndex={0}
              aria-label="Preview position"
              aria-valuemin={0}
              aria-valuemax={total}
              aria-valuenow={Math.round(progress * total)}
              aria-valuetext={`${fmt(progress * total)} of ${film.duration}`}
              onClick={(e) => {
                const r = e.currentTarget.getBoundingClientRect()
                setProgress(Math.min(1, Math.max(0, (e.clientX - r.left) / r.width)))
              }}
              onKeyDown={(e) => {
                if (e.key === 'ArrowRight') setProgress((p) => Math.min(1, p + 0.05))
                if (e.key === 'ArrowLeft') setProgress((p) => Math.max(0, p - 0.05))
              }}
            >
              <span className="absolute inset-y-0 left-0 bg-gold" style={{ width: `${progress * 100}%` }} />
            </div>
            <span>{film.duration}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col gap-5 px-4 py-5 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <ul className="flex gap-2" aria-label="More films">
          {films.map((f) => (
            <li key={f.id}>
              <button
                type="button"
                onClick={() => onSelect(f)}
                aria-current={f.id === film.id ? 'true' : undefined}
                className={`relative block h-14 w-20 overflow-hidden border ${f.id === film.id ? 'border-gold' : 'border-white/15 opacity-70 hover:opacity-100'}`}
                aria-label={`Preview ${f.couple} — ${f.title}`}
              >
                <Img photo={f.cover} sizes="80px" />
              </button>
            </li>
          ))}
        </ul>
        <button
          type="button"
          className="btn btn-gold"
          onClick={() => {
            onClose()
            openEnquiry()
          }}
        >
          Enquire about a wedding film
        </button>
      </div>
    </>
  )
}
