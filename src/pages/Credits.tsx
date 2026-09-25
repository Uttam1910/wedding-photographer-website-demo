import { photos, pexelsUrl } from '../data/images'
import LegalPage from './LegalPage'

export default function Credits() {
  const list = Object.values(photos)
  return (
    <LegalPage eyebrow="Credits" title="Photo Credits">
      <section>
        <p>
          All photographs on this demo are free-to-use images from{' '}
          <a href="https://www.pexels.com/license/" target="_blank" rel="noopener noreferrer" className="underline">
            Pexels
          </a>{' '}
          (Pexels License — free for commercial use, attribution not required but appreciated). They stand in for a real studio’s own work. Names attached to them on this site are fictional.
        </p>
      </section>
      <section>
        <h2>Sources</h2>
        <ul className="!list-none !pl-0 grid grid-cols-1 gap-x-8 sm:grid-cols-2">
          {list.map((p) => (
            <li key={p.key} className="border-b border-line/70 py-2 text-[13px]">
              <a href={pexelsUrl(p.pexelsId)} target="_blank" rel="noopener noreferrer" className="hover:underline">
                {p.alt}
              </a>
              <span className="block text-[11px] text-muted">Pexels #{p.pexelsId}</span>
            </li>
          ))}
        </ul>
      </section>
    </LegalPage>
  )
}
