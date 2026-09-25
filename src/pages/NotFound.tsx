import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import Img from '../components/Img'
import config from '../config/photographer'

export default function NotFound() {
  useEffect(() => {
    document.title = `Page not found | ${config.name}`
    return () => {
      document.title = `${config.name} — ${config.subtitle}`
    }
  }, [])
  return (
    <section className="relative flex min-h-[100svh] items-center overflow-hidden bg-night text-white">
      <div className="absolute inset-0 opacity-45">
        <Img photo="cp-veil" sizes="100vw" priority />
      </div>
      <div className="absolute inset-0 bg-gradient-to-r from-night via-night/80 to-night/30" />
      <div className="relative mx-auto w-full max-w-[1440px] px-5 py-32 sm:px-8 lg:px-12">
        <p className="eyebrow text-gold">Error 404</p>
        <h1 className="display mt-4 text-[clamp(3rem,7vw,6rem)] uppercase">
          This moment <br /> wasn’t captured.
        </h1>
        <p className="mt-5 max-w-[420px] text-[15px] text-white/75">The page you’re looking for doesn’t exist or has moved. Let’s take you back to the stories.</p>
        <div className="mt-8 flex flex-wrap gap-3">
          <Link to="/" className="btn btn-gold">
            Back to home
          </Link>
          <Link to="/#portfolio" className="btn btn-outline-light">
            View Portfolio
          </Link>
        </div>
      </div>
    </section>
  )
}
