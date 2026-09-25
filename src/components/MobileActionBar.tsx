import { Images, Package, SquarePen } from 'lucide-react'
import { Link } from 'react-router-dom'
import { useEnquiry } from '../context/EnquiryContext'

/** Sticky bottom actions on small screens: Portfolio | Packages | Enquire. */
export default function MobileActionBar() {
  const { openEnquiry } = useEnquiry()
  const item = 'flex flex-1 flex-col items-center justify-center gap-1 py-2 text-[11px] tracking-[0.06em] text-white/85 transition-colors hover:text-white active:text-gold'
  return (
    <nav
      aria-label="Quick actions"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-white/10 bg-night/97 pb-[env(safe-area-inset-bottom)] backdrop-blur md:hidden"
    >
      <div className="flex h-[62px] items-stretch divide-x divide-white/10">
        <Link to="/#portfolio" className={item}>
          <Images className="h-5 w-5" strokeWidth={1.3} />
          Portfolio
        </Link>
        <Link to="/#packages" className={item}>
          <Package className="h-5 w-5" strokeWidth={1.3} />
          Packages
        </Link>
        <button type="button" onClick={() => openEnquiry()} className={`${item} text-gold`}>
          <SquarePen className="h-5 w-5" strokeWidth={1.3} />
          Enquire
        </button>
      </div>
    </nav>
  )
}
