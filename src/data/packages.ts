import type { PhotoKey } from './images'

export type PackageId = 'essential' | 'signature' | 'premium'

export interface Package {
  id: PackageId
  name: string
  price: string
  cover: PhotoKey
  popular?: boolean
  summary: string
  features: string[]
}

export const packages: Package[] = [
  {
    id: 'essential',
    name: 'Essential',
    price: '₹35,000+',
    cover: 'rings-box',
    summary: 'For intimate ceremonies and court weddings.',
    features: ['4 Hours Coverage', '200+ Edited Photos', 'Online Gallery'],
  },
  {
    id: 'signature',
    name: 'Signature',
    price: '₹65,000+',
    cover: 'hero-3',
    popular: true,
    summary: 'Our most-loved collection for the full wedding day.',
    features: ['Full Day Coverage', '500+ Edited Photos', 'Cinematic Teaser', 'Online Gallery'],
  },
  {
    id: 'premium',
    name: 'Premium',
    price: '₹1,20,000+',
    cover: 'vr-embrace',
    summary: 'Every ritual, every guest, told as a film and an heirloom album.',
    features: ['2 Day Coverage', '1000+ Edited Photos', 'Cinematic Film', 'Album (20 Pages)', 'Online Gallery'],
  },
]

export const packageOptions = [
  { value: 'essential', label: 'Essential — ₹35,000+' },
  { value: 'signature', label: 'Signature — ₹65,000+' },
  { value: 'premium', label: 'Premium — ₹1,20,000+' },
  { value: 'custom', label: 'Custom — let’s talk' },
] as const

export type PackageChoice = (typeof packageOptions)[number]['value']
