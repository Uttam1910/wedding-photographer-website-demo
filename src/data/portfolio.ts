import type { PhotoKey } from './images'

export type CategoryId = 'weddings' | 'engagements' | 'pre-wedding' | 'couples' | 'events'

export interface Category {
  id: CategoryId
  title: string
  subtitle: string
  cover: PhotoKey
}

export const categories: Category[] = [
  { id: 'weddings', title: 'Weddings', subtitle: 'Real stories, real emotions', cover: 'hero-3' },
  { id: 'engagements', title: 'Engagements', subtitle: 'A beautiful beginning', cover: 'eng-bokeh-1' },
  { id: 'pre-wedding', title: 'Pre-Wedding', subtitle: 'Moments before forever', cover: 'pw-fort-1' },
  { id: 'couples', title: 'Couples', subtitle: 'Love in every frame', cover: 'cp-beach' },
  { id: 'events', title: 'Events', subtitle: 'Special occasions', cover: 'ev-baraat' },
]

export interface PortfolioItem {
  photo: PhotoKey
  category: CategoryId
  caption: string
}

/** Order matters: it drives the editorial rhythm of the gallery grid. */
export const portfolio: PortfolioItem[] = [
  { photo: 'hero-2', category: 'weddings', caption: 'The varmala — Jaipur' },
  { photo: 'vr-bride-veil', category: 'weddings', caption: 'Bridal portrait — Varanasi' },
  { photo: 'eng-bokeh-1', category: 'engagements', caption: 'Golden hour engagement' },
  { photo: 'pw-fort-1', category: 'pre-wedding', caption: 'Heritage pre-wedding' },
  { photo: 'bride-gold', category: 'weddings', caption: 'The bride, in gold' },
  { photo: 'cp-beach', category: 'couples', caption: 'Just married — by the sea' },
  { photo: 'ev-haldi-petals', category: 'events', caption: 'Haldi morning' },
  { photo: 'vr-couple', category: 'weddings', caption: 'Wedding portraits — Varanasi' },
  { photo: 'eng-ring', category: 'engagements', caption: 'The ring ceremony' },
  { photo: 'pw-umbrella', category: 'pre-wedding', caption: 'Monsoon pre-wedding' },
  { photo: 'wd-temple', category: 'weddings', caption: 'Temple ceremony' },
  { photo: 'cp-garden-1', category: 'couples', caption: 'Garden portraits' },
  { photo: 'ev-mehndi', category: 'events', caption: 'Mehndi details' },
  { photo: 'bride-palms-1', category: 'weddings', caption: 'Bridal portrait' },
  { photo: 'eng-bokeh-2', category: 'engagements', caption: 'Laughter under the lights' },
  { photo: 'pw-fort-2', category: 'pre-wedding', caption: 'Beneath the dome' },
  { photo: 'groom-sherwani', category: 'weddings', caption: 'The groom' },
  { photo: 'cp-veil', category: 'couples', caption: 'A quiet moment' },
  { photo: 'ev-sangeet', category: 'events', caption: 'Sangeet night' },
  { photo: 'vr-bride-light', category: 'weddings', caption: 'Getting ready — Varanasi' },
  { photo: 'eng-hands', category: 'engagements', caption: 'Hands, held' },
  { photo: 'pw-amer', category: 'pre-wedding', caption: 'Amer Fort — Jaipur' },
  { photo: 'cp-arch-sunset', category: 'couples', caption: 'Sunset through the arch' },
  { photo: 'ev-mehndi-night', category: 'events', caption: 'Mehndi night with the girls' },
  { photo: 'bride-red-lehenga', category: 'weddings', caption: 'Bridal portrait in sandstone' },
  { photo: 'eng-bokeh-3', category: 'engagements', caption: 'Engagement evening' },
  { photo: 'pw-lake', category: 'pre-wedding', caption: 'Laughter by the lake' },
  { photo: 'cp-punjabi', category: 'couples', caption: 'Beneath the dupatta' },
  { photo: 'ev-baraat', category: 'events', caption: 'The baraat arrives' },
  { photo: 'vr-embrace', category: 'weddings', caption: 'Wedding portraits' },
  { photo: 'bride-red-veil', category: 'weddings', caption: 'Under the red veil' },
  { photo: 'eng-rings', category: 'engagements', caption: 'Exchanging rings' },
  { photo: 'pw-fort-3', category: 'pre-wedding', caption: 'Lilac afternoon' },
  { photo: 'cp-garden-kiss', category: 'couples', caption: 'Garden embrace' },
  { photo: 'ev-mehndi-couple', category: 'events', caption: 'Mehndi & chooda' },
  { photo: 'bride-veil-pink', category: 'weddings', caption: 'Blush veil' },
  { photo: 'groom-arch', category: 'weddings', caption: 'The groom, framed in sandstone' },
  { photo: 'eng-garden', category: 'engagements', caption: 'Engagement portraits' },
  { photo: 'pw-embrace', category: 'pre-wedding', caption: 'Soft pastels' },
  { photo: 'cp-golden', category: 'couples', caption: 'Morning light' },
  { photo: 'ev-ritual', category: 'events', caption: 'Rituals & blessings' },
  { photo: 'bride-emerald', category: 'weddings', caption: 'Emerald & gold' },
  { photo: 'pw-river', category: 'pre-wedding', caption: 'Golden hour by the river' },
  { photo: 'cp-doorway', category: 'couples', caption: 'The blue door' },
  { photo: 'ev-juttis', category: 'events', caption: 'The groom’s juttis' },
  { photo: 'cp-taj', category: 'couples', caption: 'Destination — Agra' },
  { photo: 'bride-pearl', category: 'weddings', caption: 'Bridal portrait in pearls' },
  { photo: 'vr-bride-2', category: 'weddings', caption: 'Details of a bride' },
]
