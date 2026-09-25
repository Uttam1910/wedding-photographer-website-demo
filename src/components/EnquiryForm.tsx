import { ArrowRight, CalendarDays, Check, ChevronDown, Loader2 } from 'lucide-react'
import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from 'react'
import config from '../config/photographer'
import { useEnquiry } from '../context/EnquiryContext'
import { eventTypes, type EventType } from '../data/enquiry'
import { packageOptions, type PackageChoice } from '../data/packages'

interface Fields {
  eventType: EventType | ''
  date: string
  location: string
  name: string
  phone: string
  email: string
  message: string
}

type FieldName = keyof Fields | 'package'
type Errors = Partial<Record<FieldName, string>>

const empty: Fields = { eventType: '', date: '', location: '', name: '', phone: '', email: '', message: '' }

const todayISO = () => {
  const d = new Date()
  d.setMinutes(d.getMinutes() - d.getTimezoneOffset())
  return d.toISOString().slice(0, 10)
}

function validate(f: Fields, pkg: PackageChoice | ''): Errors {
  const e: Errors = {}
  if (!f.eventType) e.eventType = 'Please choose the type of event.'
  if (!f.date) e.date = 'Please pick your date.'
  else if (f.date < todayISO()) e.date = 'Please choose a date in the future.'
  if (f.location.trim().length < 2) e.location = 'Where is the celebration?'
  if (!pkg) e.package = 'Choose a package, or “Custom” if unsure.'
  if (f.name.trim().length < 2) e.name = 'Please tell us your name.'
  const digits = f.phone.replace(/\D/g, '')
  if (!f.phone.trim()) e.phone = 'Please add a phone number.'
  else if (!/^[+\d\s()-]+$/.test(f.phone) || digits.length < 10 || digits.length > 13) e.phone = 'Enter a valid phone number (10–13 digits).'
  if (!f.email.trim()) e.email = 'Please add your email address.'
  else if (!/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/.test(f.email.trim())) e.email = 'Enter a valid email address.'
  if (f.message.length > 600) e.message = 'Please keep your message under 600 characters.'
  return e
}

export default function EnquiryForm() {
  const { selectedPackage, setSelectedPackage, presetEventType, openCount } = useEnquiry()
  const [fields, setFields] = useState<Fields>(() => ({ ...empty, eventType: presetEventType }))
  const [errors, setErrors] = useState<Errors>({})
  const [touched, setTouched] = useState<Partial<Record<FieldName, boolean>>>({})
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent'>('idle')
  const [flash, setFlash] = useState(false)
  const panelRef = useRef<HTMLDivElement>(null)
  const firstFieldRef = useRef<HTMLSelectElement>(null)
  const uid = useId()
  const id = (n: string) => `${uid}-${n}`

  // Opening the enquiry flow from anywhere highlights the panel and focuses the first field.
  useEffect(() => {
    if (openCount === 0) return
    setFlash(true)
    const focusTimer = window.setTimeout(() => firstFieldRef.current?.focus({ preventScroll: true }), 650)
    const flashTimer = window.setTimeout(() => setFlash(false), 1800)
    return () => {
      window.clearTimeout(focusTimer)
      window.clearTimeout(flashTimer)
    }
  }, [openCount])

  useEffect(() => {
    if (presetEventType) setFields((f) => ({ ...f, eventType: presetEventType }))
  }, [presetEventType])

  const set = <K extends keyof Fields>(key: K, value: Fields[K]) => {
    const next = { ...fields, [key]: value }
    setFields(next)
    if (touched[key]) setErrors(validate(next, selectedPackage))
  }
  const blur = (key: FieldName) => {
    setTouched((t) => ({ ...t, [key]: true }))
    setErrors(validate(fields, selectedPackage))
  }
  const choosePackage = (value: PackageChoice | '') => {
    setSelectedPackage(value)
    if (touched.package) setErrors(validate(fields, value))
  }

  const onSubmit = (e: FormEvent) => {
    e.preventDefault()
    const errs = validate(fields, selectedPackage)
    setErrors(errs)
    setTouched({ eventType: true, date: true, location: true, package: true, name: true, phone: true, email: true, message: true })
    const firstInvalid = Object.keys(errs)[0]
    if (firstInvalid) {
      panelRef.current?.querySelector<HTMLElement>(`[name="${firstInvalid}"]`)?.focus()
      return
    }
    setStatus('sending')
    // Demo only — nothing leaves the browser.
    window.setTimeout(() => setStatus('sent'), 900)
  }

  const reset = () => {
    setFields(empty)
    setErrors({})
    setTouched({})
    setStatus('idle')
  }

  const pkgLabel = packageOptions.find((p) => p.value === selectedPackage)?.label
  const show = (k: FieldName) => (touched[k] ? errors[k] : undefined)

  return (
    <div
      ref={panelRef}
      className={`border bg-white p-5 transition-[box-shadow,border-color] duration-700 sm:p-7 ${
        flash ? 'border-gold shadow-[0_0_0_4px_rgba(195,160,106,0.25)]' : 'border-line/80 shadow-[0_24px_60px_-40px_rgba(60,40,20,0.35)]'
      }`}
    >
      <p className="eyebrow text-gold-deep">Check Availability</p>
      <h2 id="enquire-title" className="mt-2 font-serif text-[30px] leading-tight sm:text-[32px]">
        Let’s Create Something Beautiful
      </h2>

      {status === 'sent' ? (
        <div className="animate-rise-in py-8 text-center" role="status" aria-live="polite">
          <span className="mx-auto grid h-14 w-14 place-items-center rounded-full border border-gold text-gold-deep">
            <Check className="h-6 w-6" strokeWidth={1.5} />
          </span>
          <h3 className="mt-5 font-serif text-[34px] leading-none">Thank You!</h3>
          <p className="mt-3 text-[14px] text-ink/85">Your enquiry has been received for this demo.</p>
          <p className="mt-1 text-[13px] text-muted">No real enquiry has been submitted.</p>
          <dl className="mx-auto mt-6 max-w-[320px] space-y-1.5 border-t border-line pt-5 text-left text-[13px]">
            {[
              ['Event', fields.eventType],
              ['Date', new Date(fields.date + 'T00:00').toLocaleDateString('en-IN', { day: 'numeric', month: 'long', year: 'numeric' })],
              ['Location', fields.location],
              ['Package', pkgLabel ?? '—'],
            ].map(([k, v]) => (
              <div key={k} className="flex justify-between gap-4">
                <dt className="text-muted">{k}</dt>
                <dd className="text-right text-ink">{v}</dd>
              </div>
            ))}
          </dl>
          <button type="button" onClick={reset} className="btn btn-outline-dark mt-7">
            Send another enquiry
          </button>
        </div>
      ) : (
        <form noValidate onSubmit={onSubmit} className="mt-5 space-y-3" aria-describedby={id('demo-note')}>
          {selectedPackage && (
            <p className="animate-fade-in flex items-center gap-2 bg-sand/70 px-3 py-2 text-[12px] text-brown" aria-live="polite">
              <Check className="h-3.5 w-3.5" strokeWidth={2} /> {pkgLabel} selected
            </p>
          )}

          <Field id={id('event')} label="Event Type" error={show('eventType')}>
            <div className="relative">
              <select
                ref={firstFieldRef}
                id={id('event')}
                name="eventType"
                value={fields.eventType}
                onChange={(e) => set('eventType', e.target.value as EventType)}
                onBlur={() => blur('eventType')}
                aria-invalid={!!show('eventType')}
                aria-describedby={show('eventType') ? id('event-err') : undefined}
                className={`field appearance-none pr-10 ${fields.eventType ? '' : 'text-muted/80'} ${show('eventType') ? 'field-error' : ''}`}
              >
                <option value="" disabled>
                  Select event type
                </option>
                {eventTypes.map((t) => (
                  <option key={t} value={t} className="text-ink">
                    {t}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted" strokeWidth={1.5} aria-hidden="true" />
            </div>
          </Field>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            <Field id={id('date')} label="Wedding Date" error={show('date')}>
              <div className="relative">
                <input
                  id={id('date')}
                  name="date"
                  type="date"
                  min={todayISO()}
                  value={fields.date}
                  onChange={(e) => set('date', e.target.value)}
                  onBlur={() => blur('date')}
                  aria-invalid={!!show('date')}
                  aria-describedby={show('date') ? id('date-err') : undefined}
                  className={`field min-h-[46px] pr-10 [&::-webkit-calendar-picker-indicator]:opacity-0 ${fields.date ? '' : 'text-muted/80'} ${show('date') ? 'field-error' : ''}`}
                />
                <CalendarDays className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted" strokeWidth={1.5} aria-hidden="true" />
              </div>
            </Field>
            <Field id={id('location')} label="Location" error={show('location')}>
              <input
                id={id('location')}
                name="location"
                type="text"
                autoComplete="address-level2"
                placeholder="City or venue"
                value={fields.location}
                onChange={(e) => set('location', e.target.value)}
                onBlur={() => blur('location')}
                aria-invalid={!!show('location')}
                aria-describedby={show('location') ? id('location-err') : undefined}
                className={`field ${show('location') ? 'field-error' : ''}`}
              />
            </Field>
          </div>

          <Field id={id('package')} label="Package" error={show('package')}>
            <div className="relative">
              <select
                id={id('package')}
                name="package"
                value={selectedPackage}
                onChange={(e) => choosePackage(e.target.value as PackageChoice)}
                onBlur={() => blur('package')}
                aria-invalid={!!show('package')}
                aria-describedby={show('package') ? id('package-err') : undefined}
                className={`field appearance-none pr-10 ${selectedPackage ? '' : 'text-muted/80'} ${show('package') ? 'field-error' : ''}`}
              >
                <option value="" disabled>
                  Select a package
                </option>
                {packageOptions.map((p) => (
                  <option key={p.value} value={p.value} className="text-ink">
                    {p.label}
                  </option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute top-1/2 right-3 h-4 w-4 -translate-y-1/2 text-muted" strokeWidth={1.5} aria-hidden="true" />
            </div>
          </Field>

          <Field id={id('name')} label="Your Name" error={show('name')}>
            <input
              id={id('name')}
              name="name"
              type="text"
              autoComplete="name"
              value={fields.name}
              onChange={(e) => set('name', e.target.value)}
              onBlur={() => blur('name')}
              aria-invalid={!!show('name')}
              aria-describedby={show('name') ? id('name-err') : undefined}
              className={`field ${show('name') ? 'field-error' : ''}`}
            />
          </Field>

          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 xl:grid-cols-1 2xl:grid-cols-2">
            <Field id={id('phone')} label="Phone Number" error={show('phone')}>
              <input
                id={id('phone')}
                name="phone"
                type="tel"
                inputMode="tel"
                autoComplete="tel"
                placeholder="+91"
                value={fields.phone}
                onChange={(e) => set('phone', e.target.value)}
                onBlur={() => blur('phone')}
                aria-invalid={!!show('phone')}
                aria-describedby={show('phone') ? id('phone-err') : undefined}
                className={`field ${show('phone') ? 'field-error' : ''}`}
              />
            </Field>
            <Field id={id('email')} label="Email Address" error={show('email')}>
              <input
                id={id('email')}
                name="email"
                type="email"
                inputMode="email"
                autoComplete="email"
                value={fields.email}
                onChange={(e) => set('email', e.target.value)}
                onBlur={() => blur('email')}
                aria-invalid={!!show('email')}
                aria-describedby={show('email') ? id('email-err') : undefined}
                className={`field ${show('email') ? 'field-error' : ''}`}
              />
            </Field>
          </div>

          <Field id={id('message')} label="Message (Optional)" error={show('message')}>
            <textarea
              id={id('message')}
              name="message"
              rows={3}
              placeholder="Tell us a little about your plans"
              value={fields.message}
              onChange={(e) => set('message', e.target.value)}
              onBlur={() => blur('message')}
              aria-invalid={!!show('message')}
              aria-describedby={show('message') ? id('message-err') : undefined}
              className={`field resize-y ${show('message') ? 'field-error' : ''}`}
            />
          </Field>

          <button type="submit" disabled={status === 'sending'} className="btn btn-gold mt-2 w-full bg-gold-deep text-white hover:bg-brown">
            {status === 'sending' ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" /> Sending…
              </>
            ) : (
              <>
                Send Enquiry <ArrowRight className="h-4 w-4" strokeWidth={1.5} />
              </>
            )}
          </button>
          <p id={id('demo-note')} className="text-center text-[11px] text-muted">
            {config.showDemoLabels ? 'This is a demo enquiry form. No data is actually submitted.' : 'We reply within one working day.'}
          </p>
        </form>
      )}
    </div>
  )
}

function Field({ id, label, error, children }: { id: string; label: string; error?: string; children: ReactNode }) {
  return (
    <div>
      <label htmlFor={id} className="mb-1 block text-[11px] font-medium tracking-[0.08em] text-muted uppercase">
        {label}
      </label>
      {children}
      {error && (
        <p id={`${id}-err`} className="mt-1 text-[12px] text-[#a4452f]">
          {error}
        </p>
      )}
    </div>
  )
}
