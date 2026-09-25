import { Link } from 'react-router-dom'
import config from '../config/photographer'
import { navItems } from '../data/nav'
import Logo from './Logo'
import { FacebookIcon, InstagramIcon, YoutubeIcon } from './SocialIcons'

const socials = [
  { label: 'Instagram', href: config.instagram, Icon: InstagramIcon },
  { label: 'YouTube', href: config.youtube, Icon: YoutubeIcon },
  { label: 'Facebook', href: config.facebook, Icon: FacebookIcon },
]

export default function Footer() {
  return (
    <footer className="bg-night pb-[calc(62px+env(safe-area-inset-bottom))] text-white md:pb-0">
      <div className="mx-auto grid grid-cols-1 max-w-[1440px] gap-8 px-5 py-10 sm:px-8 lg:grid-cols-[auto_1fr_auto] lg:items-center lg:gap-10 lg:px-12">
        <Link to="/#top" aria-label={`${config.name} — back to top`} className="self-start lg:self-center">
          <Logo />
        </Link>

        <nav aria-label="Footer">
          <ul className="flex flex-wrap gap-x-6 gap-y-2 text-[13px] text-white/70 lg:justify-center">
            {navItems.map((n) => (
              <li key={n.id}>
                <Link to={`/#${n.id}`} className="py-1 hover:text-white">
                  {n.label}
                </Link>
              </li>
            ))}
            <li>
              <Link to="/privacy" className="py-1 hover:text-white">
                Privacy Policy
              </Link>
            </li>
            <li>
              <Link to="/terms" className="py-1 hover:text-white">
                Terms &amp; Conditions
              </Link>
            </li>
          </ul>
        </nav>

        <div className="flex flex-col gap-4 lg:items-end">
          <ul className="flex gap-2">
            {socials.map(({ label, href, Icon }) => (
              <li key={label}>
                <a href={href} target="_blank" rel="noopener noreferrer" aria-label={`${label} (opens in a new tab)`} className="grid h-10 w-10 place-items-center text-white/75 transition hover:text-gold">
                  <Icon className="h-[18px] w-[18px]" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-white/10">
        <div className="mx-auto flex max-w-[1440px] flex-col gap-2 px-5 py-5 text-[11px] text-white/45 sm:px-8 md:flex-row md:justify-between lg:px-12">
          <p>
            © {config.year} {config.name}. All rights reserved.
          </p>
          <p>
            Demo website — sample concept for wedding photographers. Photography licensed from{' '}
            <Link to="/credits" className="underline underline-offset-2 hover:text-white">
              Pexels
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  )
}
