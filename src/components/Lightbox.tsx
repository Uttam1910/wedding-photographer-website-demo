import { ChevronLeft, ChevronRight, X } from 'lucide-react'
import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { imgSrc, photos, type PhotoKey } from '../data/images'
import { useModal } from '../hooks/useModal'

export interface LightboxItem {
  photo: PhotoKey
  caption?: string
}

interface LightboxProps {
  items: LightboxItem[]
  index: number | null
  onClose: () => void
  onIndexChange: (index: number) => void
  label?: string
}

export default function Lightbox({ items, index, onClose, onIndexChange, label = 'Photo viewer' }: LightboxProps) {
  const open = index !== null && items.length > 0
  const ref = useModal<HTMLDivElement>(open, onClose)
  const touch = useRef<{ x: number; y: number } | null>(null)

  const go = useCallback(
    (delta: number) => {
      if (index === null) return
      onIndexChange((index + delta + items.length) % items.length)
    },
    [index, items.length, onIndexChange],
  )

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight') go(1)
      if (e.key === 'ArrowLeft') go(-1)
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, go])

  // Preload neighbours so next/previous feel instant.
  useEffect(() => {
    if (index === null || items.length < 2) return
    for (const d of [1, -1]) {
      const img = new Image()
      img.src = imgSrc(items[(index + d + items.length) % items.length].photo, 'lg')
    }
  }, [index, items])

  if (!open || index === null) return null
  const item = items[index]
  const meta = photos[item.photo]

  return createPortal(
    <div
      ref={ref}
      role="dialog"
      aria-modal="true"
      aria-label={label}
      tabIndex={-1}
      className="animate-fade-in fixed inset-0 z-[80] flex flex-col bg-[#0d0a08]/97 text-white outline-none"
      onTouchStart={(e) => {
        touch.current = { x: e.touches[0].clientX, y: e.touches[0].clientY }
      }}
      onTouchEnd={(e) => {
        if (!touch.current) return
        const dx = e.changedTouches[0].clientX - touch.current.x
        const dy = e.changedTouches[0].clientY - touch.current.y
        touch.current = null
        if (Math.abs(dx) > 50 && Math.abs(dx) > Math.abs(dy) * 1.2) go(dx < 0 ? 1 : -1)
        else if (dy > 90 && Math.abs(dy) > Math.abs(dx) * 1.5) onClose()
      }}
    >
      <div className="flex items-center justify-between px-4 py-3 sm:px-6">
        <p className="eyebrow text-white/60" aria-live="polite">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </p>
        <button type="button" onClick={onClose} data-autofocus className="grid h-11 w-11 place-items-center text-white/80 transition hover:text-white" aria-label="Close viewer">
          <X className="h-6 w-6" strokeWidth={1.4} />
        </button>
      </div>

      <div className="relative flex min-h-0 flex-1 items-center justify-center px-2 sm:px-20" onClick={(e) => e.target === e.currentTarget && onClose()}>
        <img
          key={item.photo}
          src={imgSrc(item.photo, 'lg')}
          alt={meta.alt}
          className="animate-fade-in max-h-full max-w-full object-contain select-none"
          draggable={false}
        />
        {items.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => go(-1)}
              aria-label="Previous photo"
              className="absolute top-1/2 left-2 hidden h-12 w-12 -translate-y-1/2 place-items-center border border-white/25 bg-black/30 text-white/85 backdrop-blur transition hover:border-white hover:text-white sm:left-5 sm:grid"
            >
              <ChevronLeft className="h-6 w-6" strokeWidth={1.3} />
            </button>
            <button
              type="button"
              onClick={() => go(1)}
              aria-label="Next photo"
              className="absolute top-1/2 right-2 hidden h-12 w-12 -translate-y-1/2 place-items-center border border-white/25 bg-black/30 text-white/85 backdrop-blur transition hover:border-white hover:text-white sm:right-5 sm:grid"
            >
              <ChevronRight className="h-6 w-6" strokeWidth={1.3} />
            </button>
          </>
        )}
      </div>

      <div className="flex items-center justify-between gap-4 px-4 pt-3 pb-[max(1rem,env(safe-area-inset-bottom))] sm:px-6">
        <p className="min-w-0 font-serif text-lg text-white/90 italic sm:text-xl">{item.caption ?? meta.alt}</p>
        {items.length > 1 && (
          <div className="flex shrink-0 gap-2 sm:hidden">
            <button type="button" onClick={() => go(-1)} aria-label="Previous photo" className="grid h-11 w-11 place-items-center border border-white/25">
              <ChevronLeft className="h-5 w-5" strokeWidth={1.3} />
            </button>
            <button type="button" onClick={() => go(1)} aria-label="Next photo" className="grid h-11 w-11 place-items-center border border-white/25">
              <ChevronRight className="h-5 w-5" strokeWidth={1.3} />
            </button>
          </div>
        )}
        <p className="hidden shrink-0 text-[11px] tracking-[0.18em] text-white/40 uppercase sm:block">← → to browse · Esc to close</p>
      </div>
    </div>,
    document.body,
  )
}
