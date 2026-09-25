import { Link } from 'react-router-dom'
import config from '../config/photographer'
import LegalPage from './LegalPage'

export default function Terms() {
  return (
    <LegalPage eyebrow="Legal" title="Terms & Conditions" updated="September 2026">
      <section>
        <h2>About this website</h2>
        <p>
          This is a demonstration website concept for wedding photographers. {config.name} is a fictional studio; couples, testimonials, statistics, prices and contact details shown are
          sample content.
        </p>
      </section>
      <section>
        <h2>Bookings &amp; payments</h2>
        <p>No bookings, availability checks or payments are processed on this site. A live studio would set out its booking deposit, rescheduling and cancellation terms here.</p>
      </section>
      <section>
        <h2>Photography</h2>
        <p>
          Photographs on this demo are licensed from Pexels under the Pexels License and are used to illustrate the design only. See{' '}
          <Link to="/credits" className="underline">
            photo credits
          </Link>
          .
        </p>
      </section>
      <section>
        <h2>Usage rights (sample clause)</h2>
        <p>A live studio would describe here how clients may print and share their photographs, and how the studio may use selected images in its portfolio with consent.</p>
      </section>
    </LegalPage>
  )
}
