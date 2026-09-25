import type { PhotoKey } from './images'

export interface StoryChapter {
  id: string
  eyebrow: string
  title: string
  text: string
  photos: PhotoKey[]
  layout: 'pair' | 'wide' | 'trio' | 'feature'
}

export interface WeddingStory {
  slug: string
  couple: string
  location: string
  date: string
  intro: string
  hero: PhotoKey
  gallery: PhotoKey[]
  chapters: StoryChapter[]
  quote: { text: string; by: string }
  credits: string[]
}

export const featuredWedding: WeddingStory = {
  slug: 'aarav-meera',
  couple: 'Aarav & Meera',
  location: 'Goa',
  date: 'December 2025',
  intro:
    'A beautiful destination wedding filled with laughter, emotion and unforgettable moments by the sea.',
  hero: 'am-kiss',
  gallery: ['am-full', 'hero-3', 'am-details', 'am-garland'],
  chapters: [
    {
      id: 'ceremony',
      eyebrow: 'Chapter one',
      title: 'The Ceremony',
      text: 'The garden lawns, a short walk from the beach, came alive at dusk — wisteria overhead, lanterns glowing red, and two families gathered close as Aarav and Meera exchanged garlands.',
      photos: ['hero-3', 'am-full'],
      layout: 'feature',
    },
    {
      id: 'portraits',
      eyebrow: 'Chapter two',
      title: 'Portraits',
      text: 'Between rituals we stole ten quiet minutes. Meera’s lehenga caught every lamp in the garden; Aarav couldn’t stop smiling.',
      photos: ['am-bride', 'am-portrait'],
      layout: 'pair',
    },
    {
      id: 'details',
      eyebrow: 'Chapter three',
      title: 'The Details',
      text: 'Her grandmother’s necklace, a set of new bangles and a brass plate that has travelled through three family weddings.',
      photos: ['am-details'],
      layout: 'wide',
    },
    {
      id: 'candid',
      eyebrow: 'Chapter four',
      title: 'Candid Moments',
      text: 'The best frames were never posed — a forehead touch, a whispered joke, a hand that never quite let go.',
      photos: ['am-garland', 'am-couple', 'am-embrace'],
      layout: 'trio',
    },
    {
      id: 'reception',
      eyebrow: 'Chapter five',
      title: 'The Reception',
      text: 'Fairy lights, a string of toasts and a dance floor that stayed full long past midnight.',
      photos: ['am-lights'],
      layout: 'wide',
    },
    {
      id: 'couple',
      eyebrow: 'Chapter six',
      title: 'Just the Two of Us',
      text: 'We ended the night the way it began: with the two of them, a little tired, completely happy.',
      photos: ['am-kiss', 'am-embrace'],
      layout: 'pair',
    },
  ],
  quote: {
    text: 'We didn’t want posed pictures. We wanted to remember how it felt — and somehow, every photograph does.',
    by: 'Meera (demo story)',
  },
  credits: ['Photography & film: lens & love', 'Venue: Beachside garden lawns, North Goa (demo)', 'Décor: Wisteria & lanterns'],
}
