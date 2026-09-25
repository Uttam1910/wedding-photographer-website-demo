import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { scrollToId } from '../lib/scroll'

/** Scrolls to `#hash` targets after navigation, otherwise resets to the top of the page. */
export default function ScrollManager() {
  const { pathname, hash, key } = useLocation()

  useEffect(() => {
    if (!hash) {
      window.scrollTo(0, 0)
      return
    }
    const id = decodeURIComponent(hash.slice(1))
    // Wait a frame so the destination page has rendered.
    let tries = 0
    let raf = 0
    const attempt = () => {
      if (scrollToId(id) || tries++ > 20) return
      raf = requestAnimationFrame(attempt)
    }
    raf = requestAnimationFrame(attempt)
    return () => cancelAnimationFrame(raf)
  }, [pathname, hash, key])

  return null
}
