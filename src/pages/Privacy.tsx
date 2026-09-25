import config from '../config/photographer'
import LegalPage from './LegalPage'

export default function Privacy() {
  return (
    <LegalPage eyebrow="Legal" title="Privacy Policy" updated="September 2026">
      <section>
        <h2>What this demo collects</h2>
        <p>Nothing. The enquiry form on this demo website runs entirely in your browser. No names, phone numbers, emails or messages are sent, stored or shared.</p>
      </section>
      <section>
        <h2>For a live studio website</h2>
        <p>When {config.name} launches a live version, this page would explain:</p>
        <ul>
          <li>what enquiry details are collected and why (to reply to you and plan your coverage);</li>
          <li>how long they are kept and who can access them;</li>
          <li>how photographs of you are stored, delivered and — only with your consent — shared on our portfolio or social media;</li>
          <li>your right to access, correct or delete your information.</li>
        </ul>
      </section>
      <section>
        <h2>Third-party links</h2>
        <p>Links to WhatsApp, Instagram, YouTube and Facebook open those services, which have their own privacy policies.</p>
      </section>
      <section>
        <h2>Contact</h2>
        <p>
          Questions about privacy can be sent to <a className="underline" href={`mailto:${config.email}`}>{config.email}</a> (demo address).
        </p>
      </section>
    </LegalPage>
  )
}
