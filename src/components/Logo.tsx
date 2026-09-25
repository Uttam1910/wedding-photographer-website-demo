import config from '../config/photographer'

export function LogoMark({ className = 'h-8 w-8' }: { className?: string }) {
  return (
    <svg viewBox="0 0 40 40" className={className} aria-hidden="true" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
      <path d="M20 34V14" />
      <path d="M20 18c-6-1.4-9.4-6-8.6-12 6 .8 9.4 5.4 8.6 12Z" />
      <path d="M20 18c6-1.4 9.4-6 8.6-12-6 .8-9.4 5.4-8.6 12Z" />
      <path d="M20 26c-5 0-8.4-2.8-9.6-7 5-.6 8.4 2.2 9.6 7Z" />
      <path d="M20 26c5 0 8.4-2.8 9.6-7-5-.6-8.4 2.2-9.6 7Z" />
      <path d="M13 34h14" />
    </svg>
  )
}

export default function Logo({ tone = 'light', compact = false }: { tone?: 'light' | 'dark'; compact?: boolean }) {
  const text = tone === 'light' ? 'text-white' : 'text-ink'
  return (
    <span className={`flex items-center gap-2.5 ${text}`}>
      <LogoMark className={`${compact ? 'h-7 w-7' : 'h-9 w-9'} text-gold`} />
      <span className="flex flex-col leading-none">
        <span className={`font-serif ${compact ? 'text-[22px]' : 'text-[26px]'} font-medium tracking-[0.01em]`}>{config.name}</span>
        <span className={`mt-1 text-[7.5px] font-medium tracking-[0.34em] uppercase ${tone === 'light' ? 'text-white/70' : 'text-muted'}`}>{config.subtitle}</span>
      </span>
    </span>
  )
}
