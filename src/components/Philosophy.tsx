import config from '../config/photographer'

/** Editorial pull-quote in the studio's handwriting. */
export default function Philosophy({ className = '' }: { className?: string }) {
  return (
    <figure className={className}>
      <span aria-hidden="true" className="block font-serif text-[64px] leading-[0.4] text-gold/70">
        “
      </span>
      <blockquote className="mt-3 font-script text-[17px] leading-[2.05] text-brown sm:text-[18px]">
        We don’t just take photos, we preserve the feelings, the people and the moments you’ll want to relive forever.
      </blockquote>
      <figcaption className="mt-5 font-script text-[14px] text-muted">— Team {config.name}</figcaption>
    </figure>
  )
}
