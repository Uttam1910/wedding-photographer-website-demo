import { Expand } from 'lucide-react'
import { useMemo, useState } from 'react'
import { photos } from '../data/images'
import { categories, portfolio, type CategoryId, type PortfolioItem } from '../data/portfolio'
import { useMediaQuery } from '../hooks/useMediaQuery'
import { countHoles, type Span } from '../lib/gridPack'
import Img from './Img'
import Lightbox from './Lightbox'

const PAGE = 12
export type Filter = CategoryId | 'all'

/** Portraits take two rows; every third landscape becomes a 2×2 feature tile. */
function spansFor(items: PortfolioItem[]): Span[] {
  let landscapes = 0
  return items.map((item) => {
    if (photos[item.photo].orientation === 'portrait') return { w: 1, h: 2 }
    return landscapes++ % 3 === 0 ? { w: 2, h: 2 } : { w: 1, h: 1 }
  })
}

function* permutations<T>(arr: T[]): Generator<T[]> {
  const a = arr.slice()
  const c = new Array(a.length).fill(0)
  yield a.slice()
  let i = 0
  while (i < a.length) {
    if (c[i] < i) {
      const j = i % 2 === 0 ? 0 : c[i]
      ;[a[i], a[j]] = [a[j], a[i]]
      yield a.slice()
      c[i] += 1
      i = 0
    } else {
      c[i] = 0
      i += 1
    }
  }
}

const TAIL = 6

/**
 * Picks how many items to show (near `target`) and, if needed, reorders the last few tiles
 * and resizes their landscapes so the editorial grid ends flush with no trailing gaps.
 */
function layout(items: PortfolioItem[], target: number, cols: number): { order: PortfolioItem[]; spans: Span[] } {
  const max = items.length
  const counts = target >= max ? [max] : [target, target + 1, target - 1, target + 2, target - 2, target + 3].filter((n) => n >= 1 && n <= max)
  for (const n of counts) {
    const subset = items.slice(0, n)
    const base = spansFor(subset)
    if (countHoles(base, cols) === 0) return { order: subset, spans: base }
    const k = Math.min(TAIL, n)
    const head = subset.slice(0, n - k)
    const headSpans = base.slice(0, n - k)
    const tailIdx = Array.from({ length: k }, (_, i) => n - k + i)
    for (const perm of permutations(tailIdx)) {
      const land = perm.filter((i) => photos[subset[i].photo].orientation === 'landscape')
      for (let mask = 0; mask < 1 << land.length; mask++) {
        const tailSpans = perm.map((i) => {
          const li = land.indexOf(i)
          if (li === -1) return base[i]
          return mask & (1 << li) ? { w: 2, h: 2 } : { w: 1, h: 1 }
        })
        const spans = [...headSpans, ...tailSpans]
        if (countHoles(spans, cols) === 0) return { order: [...head, ...perm.map((i) => subset[i])], spans }
      }
    }
  }
  // Fallback: also allow wide 2×1 landscapes and 2×2 portraits among the last few tiles.
  for (const n of counts) {
    const subset = items.slice(0, n)
    const base = spansFor(subset)
    const k = Math.min(5, n)
    const head = subset.slice(0, n - k)
    const headSpans = base.slice(0, n - k)
    const tailIdx = Array.from({ length: k }, (_, i) => n - k + i)
    const options = (i: number): Span[] =>
      photos[subset[i].photo].orientation === 'landscape'
        ? [{ w: 1, h: 1 }, { w: 2, h: 2 }, { w: 2, h: 1 }]
        : [{ w: 1, h: 2 }, { w: 2, h: 2 }]
    for (const perm of permutations(tailIdx)) {
      const opts = perm.map(options)
      const total = opts.reduce((acc, o) => acc * o.length, 1)
      for (let combo = 0; combo < total; combo++) {
        let rest = combo
        const tailSpans = opts.map((o) => {
          const pick = o[rest % o.length]
          rest = Math.floor(rest / o.length)
          return pick
        })
        const spans = [...headSpans, ...tailSpans]
        if (countHoles(spans, cols) === 0) return { order: [...head, ...perm.map((i) => subset[i])], spans }
      }
    }
  }
  // Last resort: resize any one or two tiles in place.
  const order = items.slice(0, Math.min(target, max))
  const base = spansFor(order)
  const alternatives = (i: number): Span[] =>
    (photos[order[i].photo].orientation === 'landscape' ? [{ w: 1, h: 1 }, { w: 2, h: 2 }, { w: 2, h: 1 }] : [{ w: 2, h: 2 }]).filter(
      (o) => o.w !== base[i].w || o.h !== base[i].h,
    )
  for (let i = order.length - 1; i >= 0; i--) {
    for (const a of alternatives(i)) {
      const spans = base.slice()
      spans[i] = a
      if (countHoles(spans, cols) === 0) return { order, spans }
    }
  }
  for (let i = order.length - 1; i >= 0; i--) {
    for (let j = i - 1; j >= 0; j--) {
      for (const a of alternatives(i)) {
        for (const b of alternatives(j)) {
          const spans = base.slice()
          spans[i] = a
          spans[j] = b
          if (countHoles(spans, cols) === 0) return { order, spans }
        }
      }
    }
  }
  return { order, spans: base }
}

interface PortfolioProps {
  filter: Filter
  onFilterChange: (f: Filter) => void
}

export default function Portfolio({ filter, onFilterChange }: PortfolioProps) {
  const [shown, setShown] = useState(PAGE)
  const [lightbox, setLightbox] = useState<number | null>(null)

  const isMd = useMediaQuery('(min-width: 768px)')
  const isLg = useMediaQuery('(min-width: 1024px)')
  const cols = isLg ? 4 : isMd ? 3 : 2

  const items = useMemo(() => (filter === 'all' ? portfolio : portfolio.filter((p) => p.category === filter)), [filter])
  const { visible, spans } = useMemo(() => {
    const { order, spans } = layout(items, shown, cols)
    return {
      visible: order,
      spans: spans.map((s) => (s.w === 2 ? (s.h === 2 ? 'col-span-2 row-span-2' : 'col-span-2 row-span-1') : s.h === 2 ? 'row-span-2' : 'col-span-1 row-span-1')),
    }
  }, [items, shown, cols])

  const tabs: { id: Filter; label: string; count: number }[] = [
    { id: 'all', label: 'All', count: portfolio.length },
    ...categories.map((c) => ({ id: c.id, label: c.title, count: portfolio.filter((p) => p.category === c.id).length })),
  ]

  const changeFilter = (f: Filter) => {
    onFilterChange(f)
    setShown(PAGE)
  }

  return (
    <section id="gallery" aria-labelledby="gallery-title" className="border-t border-line/70 bg-ivory pt-4 pb-16 lg:pb-20">
      <div className="mx-auto max-w-[1440px] px-5 sm:px-8 lg:px-12">
        <div className="flex flex-col gap-5 border-b border-line/70 pb-5 lg:flex-row lg:items-end lg:justify-between">
          <h2 id="gallery-title" className="sr-only">
            Portfolio gallery
          </h2>
          <div role="group" aria-label="Filter portfolio by category" className="no-scrollbar -mx-5 flex gap-1 overflow-x-auto px-5 sm:mx-0 sm:flex-wrap sm:px-0">
            {tabs.map((t) => (
              <button
                key={t.id}
                type="button"
                aria-pressed={filter === t.id}
                onClick={() => changeFilter(t.id)}
                className={`shrink-0 border px-4 py-2 text-[12px] tracking-[0.12em] uppercase transition-colors ${
                  filter === t.id ? 'border-ink bg-ink text-ivory' : 'border-transparent text-muted hover:border-line hover:text-ink'
                }`}
              >
                {t.label}
                <span className={`ml-1.5 text-[10px] ${filter === t.id ? 'text-ivory/60' : 'text-muted/60'}`}>{t.count}</span>
              </button>
            ))}
          </div>
          <p className="text-[12px] text-muted" aria-live="polite">
            Showing {visible.length} of {items.length} {filter === 'all' ? 'photographs' : `${tabs.find((t) => t.id === filter)?.label} photographs`}
          </p>
        </div>

        <div className="@container mt-5">
          <ul className="gallery-grid grid grid-flow-dense grid-cols-2 gap-2 md:grid-cols-3 md:gap-3 lg:grid-cols-4">
            {visible.map((item, i) => (
              <li key={`${filter}-${item.photo}`} className={`${spans[i]} animate-fade-in`} style={{ animationDelay: `${(i % PAGE) * 35}ms` }}>
                <button type="button" onClick={() => setLightbox(i)} className="group relative block h-full w-full overflow-hidden bg-sand" aria-label={`Open photo: ${item.caption}`}>
                  <Img
                    photo={item.photo}
                    sizes={spans[i].includes('col-span-2') ? '(min-width: 1024px) 50vw, 100vw' : '(min-width: 1024px) 25vw, 50vw'}
                    className={`zoom-img ${photos[item.photo].orientation === 'portrait' && spans[i].includes('col-span-2') ? 'object-[center_25%]' : ''}`}
                  />
                  <span className="pointer-events-none absolute inset-0 flex items-end justify-between bg-gradient-to-t from-black/60 via-black/0 to-transparent p-3 opacity-0 transition-opacity duration-300 group-hover:opacity-100 group-focus-visible:opacity-100">
                    <span className="text-left font-serif text-[17px] text-white italic">{item.caption}</span>
                    <Expand className="h-4 w-4 shrink-0 text-white/80" strokeWidth={1.5} />
                  </span>
                </button>
              </li>
            ))}
          </ul>
        </div>

        {visible.length < items.length && (
          <div className="mt-10 flex justify-center">
            <button type="button" onClick={() => setShown(visible.length + PAGE)} className="btn btn-outline-dark">
              Show more photographs
            </button>
          </div>
        )}
      </div>

      <Lightbox
        items={visible.map((v) => ({ photo: v.photo, caption: v.caption }))}
        index={lightbox}
        onClose={() => setLightbox(null)}
        onIndexChange={setLightbox}
        label="Portfolio viewer"
      />
    </section>
  )
}
