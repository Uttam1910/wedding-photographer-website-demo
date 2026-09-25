import { Clock, Mail, MapPin, Phone } from 'lucide-react'
import config, { mailHref, telHref, whatsappHref } from '../config/photographer'
import Img from './Img'
import Reveal from './Reveal'
import { InstagramIcon, WhatsappIcon } from './SocialIcons'

export default function Contact() {
  const rows = [
    { icon: Phone, label: 'Phone', value: config.phone, href: telHref },
    { icon: WhatsappIcon, label: 'WhatsApp', value: 'Message us on WhatsApp', href: whatsappHref, external: true },
    { icon: Mail, label: 'Email', value: config.email, href: mailHref },
    { icon: InstagramIcon, label: 'Instagram', value: config.instagramHandle, href: config.instagram, external: true },
    { icon: Clock, label: 'Studio hours', value: config.studioHours },
  ]
  return (
    <section id="contact" aria-labelledby="contact-title" className="bg-sand/60">
      <div className="mx-auto grid grid-cols-1 max-w-[1440px] lg:grid-cols-[1fr_1.1fr]">
        <div className="relative hidden min-h-[460px] overflow-hidden lg:block">
          <Img photo="cp-beach" sizes="45vw" className="absolute inset-0 object-[40%_center]" />
          <div className="absolute inset-0 bg-gradient-to-t from-night/70 via-transparent to-transparent" />
          <p className="absolute right-10 bottom-9 left-10 font-serif text-[30px] leading-tight text-white italic">“Every love story deserves to be told beautifully.”</p>
        </div>

        <Reveal className="px-5 py-14 sm:px-8 lg:px-14 lg:py-16 xl:px-20">
          <p className="eyebrow text-gold-deep">Contact</p>
          <h2 id="contact-title" className="display mt-3 text-[40px] lg:text-[46px]">
            Say Hello
          </h2>
          <p className="mt-4 max-w-[440px] text-[14px] leading-relaxed text-muted">
            Tell us about your celebration — we usually reply within one working day. We travel for weddings across India and beyond.
          </p>

          <div className="mt-6 flex items-start gap-3 border-y border-line py-4">
            <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-gold-deep" strokeWidth={1.5} aria-hidden="true" />
            <p className="text-[13px] tracking-[0.12em] text-ink uppercase">{config.location}</p>
          </div>

          <dl className="mt-2 divide-y divide-line/70">
            {rows.map(({ icon: Icon, label, value, href, external }) => (
              <div key={label} className="flex items-center gap-4 py-3">
                <dt className="flex w-32 shrink-0 items-center gap-2.5 text-[12px] text-muted">
                  <Icon className="h-4 w-4 text-gold-deep" aria-hidden="true" />
                  {label}
                </dt>
                <dd className="min-w-0 text-[14px] break-words text-ink">
                  {href ? (
                    <a href={href} {...(external ? { target: '_blank', rel: 'noopener noreferrer' } : {})} className="underline-offset-4 hover:underline">
                      {value}
                    </a>
                  ) : (
                    value
                  )}
                </dd>
              </div>
            ))}
          </dl>

          <div className="mt-7 grid grid-cols-3 gap-2 sm:flex sm:gap-3">
            <a href={whatsappHref} target="_blank" rel="noopener noreferrer" className="btn btn-gold px-3 sm:px-6">
              <WhatsappIcon /> WhatsApp
            </a>
            <a href={telHref} className="btn btn-outline-dark px-3 sm:px-6">
              <Phone className="h-4 w-4" strokeWidth={1.5} /> Call
            </a>
            <a href={mailHref} className="btn btn-outline-dark px-3 sm:px-6">
              <Mail className="h-4 w-4" strokeWidth={1.5} /> Email
            </a>
          </div>
          {config.showDemoLabels && <p className="mt-4 text-[11px] text-muted">Demo contact details and service areas — replace in <code>src/config/photographer.ts</code>.</p>}
        </Reveal>
      </div>
    </section>
  )
}
