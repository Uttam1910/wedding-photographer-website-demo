import { ArrowRight, Menu, Phone, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { Link, useLocation } from 'react-router-dom'
import config, { telHref, whatsappHref } from '../config/photographer'
import { useEnquiry } from '../context/EnquiryContext'
import { navItems } from '../data/nav'
import { useModal } from '../hooks/useModal'
import Logo from './Logo'
import { InstagramIcon, WhatsappIcon } from './SocialIcons'

function useScrollSpy(enabled: boolean) {
  const [active, setActive] = useState('top')
  useEffect(() => {
    if (!enabled) return
    const ids = navItems.map((n) => n.id)
    const onScroll = () => {
      const probe = window.innerHeight * 0.35
      let current = 'top'
      for (const id of ids) {
        const el = document.getElementById(id)
        if (el && el.getBoundingClientRect().top - probe <= 0) current = id
      }
      setActive(current)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [enabled])
  return active
}

export default function Navbar() {
  const { pathname } = useLocation()
  const isHome = pathname === '/'
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const { openEnquiry } = useEnquiry()
  const active = useScrollSpy(isHome)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => setMenuOpen(false), [pathname])

  const solid = scrolled || !isHome || menuOpen

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,box-shadow,padding] duration-500 ${
        solid ? 'bg-night/95 shadow-[0_1px_0_rgba(255,255,255,0.06)] backdrop-blur-md' : 'bg-gradient-to-b from-black/55 to-transparent'
      }`}
    >
      <a href="#main" className="sr-only z-[60] bg-gold px-4 py-2 text-night focus:not-sr-only focus:absolute focus:top-2 focus:left-2">
        Skip to content
      </a>
      <div className={`mx-auto flex max-w-[1440px] items-center justify-between px-5 transition-[height] duration-500 sm:px-8 lg:px-12 ${solid ? 'h-[68px]' : 'h-[76px]'}`}>
        <Link to="/#top" aria-label={`${config.name} — home`} className="shrink-0">
          <Logo compact />
        </Link>

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-7 xl:gap-9">
            {navItems.map((item) => {
              const isActive = isHome && active === item.id
              return (
                <li key={item.id}>
                  <Link
                    to={`/#${item.id}`}
                    aria-current={isActive ? 'true' : undefined}
                    className={`relative py-2 text-[13px] tracking-[0.04em] transition-colors after:absolute after:inset-x-0 after:-bottom-0.5 after:h-px after:origin-left after:bg-gold after:transition-transform after:duration-300 ${
                      isActive ? 'text-white after:scale-x-100' : 'text-white/75 after:scale-x-0 hover:text-white hover:after:scale-x-100'
                    }`}
                  >
                    {item.label}
                  </Link>
                </li>
              )
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <button type="button" onClick={() => openEnquiry()} className="btn btn-gold hidden min-h-10 px-5 sm:inline-flex">
            Enquire Now <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            className="grid h-11 w-11 place-items-center text-white lg:hidden"
            aria-label="Open menu"
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            onClick={() => setMenuOpen(true)}
          >
            <Menu className="h-6 w-6" strokeWidth={1.4} />
          </button>
        </div>
      </div>
      <MobileMenu open={menuOpen} onClose={() => setMenuOpen(false)} active={isHome ? active : ''} />
    </header>
  )
}

function MobileMenu({ open, onClose, active }: { open: boolean; onClose: () => void; active: string }) {
  const ref = useModal<HTMLDivElement>(open, onClose)
  const { openEnquiry } = useEnquiry()
  if (!open) return null

  return createPortal(
    <div className="fixed inset-0 z-[70] lg:hidden" id="mobile-menu">
      <div className="animate-fade-in absolute inset-0 bg-black/60" onClick={onClose} aria-hidden="true" />
      <div
        ref={ref}
        role="dialog"
        aria-modal="true"
        aria-label="Site menu"
        className="animate-fade-in absolute inset-y-0 right-0 flex w-full max-w-[420px] flex-col overflow-y-auto bg-night text-white"
      >
        <div className="flex h-[68px] shrink-0 items-center justify-between px-5">
          <Logo compact />
          <button type="button" onClick={onClose} data-autofocus className="grid h-11 w-11 place-items-center" aria-label="Close menu">
            <X className="h-6 w-6" strokeWidth={1.4} />
          </button>
        </div>
        <nav aria-label="Mobile" className="px-6 pt-6">
          <ul className="divide-y divide-white/10 border-y border-white/10">
            {navItems.map((item, i) => (
              <li key={item.id} className="animate-rise-in" style={{ animationDelay: `${60 + i * 40}ms` }}>
                <Link
                  to={`/#${item.id}`}
                  onClick={onClose}
                  aria-current={active === item.id ? 'true' : undefined}
                  className={`flex items-center justify-between py-3.5 font-serif text-[28px] leading-none ${active === item.id ? 'text-gold' : 'text-white'}`}
                >
                  {item.label}
                  <span className="text-[11px] font-sans tracking-[0.2em] text-white/35">0{i + 1}</span>
                </Link>
              </li>
            ))}
          </ul>
        </nav>
        <div className="mt-auto space-y-5 px-6 pt-8 pb-[max(2rem,env(safe-area-inset-bottom))]">
          <button
            type="button"
            className="btn btn-gold w-full"
            onClick={() => {
              onClose()
              openEnquiry()
            }}
          >
            Check Availability <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
          </button>
          <div className="flex items-center justify-between text-[13px] text-white/70">
            <a href={telHref} className="flex items-center gap-2 py-2 hover:text-white">
              <Phone className="h-4 w-4" strokeWidth={1.5} /> Call
            </a>
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 hover:text-white">
              <WhatsappIcon /> WhatsApp
            </a>
            <a href={config.instagram} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 py-2 hover:text-white">
              <InstagramIcon /> Instagram
            </a>
          </div>
          <p className="text-[11px] tracking-[0.2em] text-white/40 uppercase">{config.location}</p>
        </div>
      </div>
    </div>,
    document.body,
  )
}
