import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import type { PackageChoice } from '../data/packages'
import type { EventType } from '../data/enquiry'
import { scrollToId } from '../lib/scroll'

interface EnquiryState {
  /** Package carried into the enquiry form; persists until the visitor changes it. */
  selectedPackage: PackageChoice | ''
  presetEventType: EventType | ''
  /** Increments every time the enquiry flow is opened, so the form can react (focus, highlight). */
  openCount: number
  openEnquiry: (options?: { pkg?: PackageChoice; eventType?: EventType }) => void
  setSelectedPackage: (pkg: PackageChoice | '') => void
}

const EnquiryContext = createContext<EnquiryState | null>(null)

export function EnquiryProvider({ children }: { children: ReactNode }) {
  const [selectedPackage, setSelectedPackage] = useState<PackageChoice | ''>('')
  const [presetEventType, setPresetEventType] = useState<EventType | ''>('')
  const [openCount, setOpenCount] = useState(0)
  const navigate = useNavigate()
  const { pathname } = useLocation()

  const openEnquiry = useCallback<EnquiryState['openEnquiry']>(
    (options) => {
      if (options?.pkg) setSelectedPackage(options.pkg)
      if (options?.eventType) setPresetEventType(options.eventType)
      setOpenCount((n) => n + 1)
      if (pathname !== '/') {
        navigate('/#enquire')
      } else {
        scrollToId('enquire')
        if (window.location.hash !== '#enquire') window.history.replaceState(null, '', '#enquire')
      }
    },
    [navigate, pathname],
  )

  const value = useMemo(
    () => ({ selectedPackage, presetEventType, openCount, openEnquiry, setSelectedPackage }),
    [selectedPackage, presetEventType, openCount, openEnquiry],
  )

  return <EnquiryContext.Provider value={value}>{children}</EnquiryContext.Provider>
}

// eslint-disable-next-line react-refresh/only-export-components
export function useEnquiry() {
  const ctx = useContext(EnquiryContext)
  if (!ctx) throw new Error('useEnquiry must be used inside <EnquiryProvider>')
  return ctx
}
