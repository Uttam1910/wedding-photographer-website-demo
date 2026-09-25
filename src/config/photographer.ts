/**
 * Everything a studio would customise lives here: brand, contact details,
 * social links, service areas, colours and demo labelling.
 * Contact values below are placeholders for the demo — replace before launch.
 */
const photographerConfig = {
  name: 'lens & love',
  subtitle: 'Wedding Photography',
  tagline: ['Your story.', 'Beautifully', 'preserved.'],
  heroLabel: 'Weddings • Couples • Stories',

  phone: '+91 00000 00000',
  email: 'hello@example.com',
  /** Digits only, with country code — used for wa.me links. */
  whatsapp: '910000000000',
  whatsappMessage: 'Hi lens & love! I would like to check availability for my wedding.',

  instagram: 'https://instagram.com/lensandlove',
  instagramHandle: '@lensandlove',
  youtube: 'https://youtube.com/',
  facebook: 'https://facebook.com/',

  location: 'Mumbai • Goa • Pune • Destination Weddings',
  serviceAreas: ['Mumbai', 'Goa', 'Pune', 'Destination Weddings'],
  studioHours: 'Mon – Sat, 10am – 7pm',

  /** Brand palette — applied as CSS variables at startup. */
  colors: {
    ivory: '#f6f1ea',
    sand: '#ede4d6',
    ink: '#1d1915',
    night: '#15110d',
    gold: '#c3a06a',
    goldDeep: '#9c7a45',
    brown: '#5b4632',
    muted: '#766a5d',
    line: '#ddd1bf',
  },

  /** Shows "demo" notes next to prices, stats, reviews, contact details, etc. */
  showDemoLabels: true,
  year: 2026,
} as const

export type PhotographerConfig = typeof photographerConfig
export default photographerConfig

export const telHref = `tel:${photographerConfig.phone.replace(/[^+\d]/g, '')}`
export const mailHref = `mailto:${photographerConfig.email}?subject=${encodeURIComponent('Wedding enquiry')}`
export const whatsappHref = `https://wa.me/${photographerConfig.whatsapp}?text=${encodeURIComponent(photographerConfig.whatsappMessage)}`
