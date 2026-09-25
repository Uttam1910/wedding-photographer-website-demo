import { useEffect, type ReactNode } from 'react'
import { Link } from 'react-router-dom'
import config from '../config/photographer'

export default function LegalPage({ eyebrow, title, updated, children }: { eyebrow: string; title: string; updated?: string; children: ReactNode }) {
  useEffect(() => {
    document.title = `${title} | ${config.name}`
    return () => {
      document.title = `${config.name} — ${config.subtitle}`
    }
  }, [title])

  return (
    <div className="bg-ivory pt-[68px]">
      <header className="border-b border-line bg-sand/50">
        <div className="mx-auto max-w-[860px] px-5 py-14 sm:px-8 lg:py-20">
          <p className="eyebrow text-gold-deep">{eyebrow}</p>
          <h1 className="display mt-3 text-[44px] sm:text-[56px]">{title}</h1>
          {updated && <p className="mt-4 text-[13px] text-muted">Last updated {updated}</p>}
          {config.showDemoLabels && (
            <p className="mt-5 border-l-2 border-gold pl-4 text-[13px] leading-relaxed text-brown">
              This is placeholder copy for a demo website. It is not legal advice and should be replaced with the studio’s own reviewed policy before launch.
            </p>
          )}
        </div>
      </header>
      <div className="mx-auto max-w-[860px] space-y-8 px-5 py-12 text-[15px] leading-relaxed text-ink/85 sm:px-8 lg:py-16 [&_h2]:font-serif [&_h2]:text-[28px] [&_h2]:leading-tight [&_h2]:text-ink [&_p+p]:mt-3 [&_ul]:mt-3 [&_ul]:list-disc [&_ul]:space-y-1 [&_ul]:pl-5">
        {children}
        <p className="pt-4">
          <Link to="/" className="link-arrow text-gold-deep">
            ← Back to home
          </Link>
        </p>
      </div>
    </div>
  )
}
