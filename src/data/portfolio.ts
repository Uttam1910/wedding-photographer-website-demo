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
  { id: 'events', title: 'Events', subtitle: 'Special occasions', cover: 'ev-decor' },
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
  { photo: 'bn-couple', category: 'weddings', caption: 'A Bengali wedding' },
  { photo: 'cp-garden-1', category: 'couples', caption: 'Garden portraits' },
  { photo: 'ev-mehndi', category: 'events', caption: 'Mehndi details' },
  { photo: 'bride-palms-1', category: 'weddings', caption: 'Bridal portrait' },
  { photo: 'eng-bokeh-2', category: 'engagements', caption: 'Laughter under the lights' },
  { photo: 'pw-fort-2', category: 'pre-wedding', caption: 'Beneath the dome' },
  { photo: 'groom-sherwani', category: 'weddings', caption: 'The groom' },
  { photo: 'cp-intimate', category: 'couples', caption: 'A quiet moment' },
  { photo: 'ev-sangeet', category: 'events', caption: 'Sangeet night' },
  { photo: 'vr-bride-light', category: 'weddings', caption: 'Getting ready — Varanasi' },
  { photo: 'eng-hands', category: 'engagements', caption: 'Hands, held' },
  { photo: 'pw-amer', category: 'pre-wedding', caption: 'Amer Fort — Jaipur' },
  { photo: 'cp-temple', category: 'couples', caption: 'Temple lights' },
  { photo: 'ev-haldi-3', category: 'events', caption: 'Haldi with the girls' },
  { photo: 'bride-red-lehenga', category: 'weddings', caption: 'Bridal portrait in sandstone' },
  { photo: 'eng-bokeh-3', category: 'engagements', caption: 'Engagement evening' },
  { photo: 'pw-red-beach', category: 'pre-wedding', caption: 'Red on the shore' },
  { photo: 'cp-bw', category: 'couples', caption: 'In black and white' },
  { photo: 'ev-decor', category: 'events', caption: 'Reception décor' },
  { photo: 'vr-embrace', category: 'weddings', caption: 'Wedding portraits' },
  { photo: 'bn-bride-veil', category: 'weddings', caption: 'Under the veil' },
  { photo: 'eng-bokeh-4', category: 'engagements', caption: 'Red lights, close embrace' },
  { photo: 'pw-fort-3', category: 'pre-wedding', caption: 'Lilac afternoon' },
  { photo: 'cp-pink', category: 'couples', caption: 'Blush portraits' },
  { photo: 'ev-mehndi-couple', category: 'events', caption: 'Mehndi & chooda' },
  { photo: 'bride-veil-pink', category: 'weddings', caption: 'Blush veil' },
  { photo: 'groom-rajput', category: 'weddings', caption: 'A Rajput groom' },
  { photo: 'eng-jeep', category: 'engagements', caption: 'Vintage ride' },
  { photo: 'pw-embrace', category: 'pre-wedding', caption: 'Soft pastels' },
  { photo: 'cp-tree', category: 'couples', caption: 'Under the old tree' },
  { photo: 'ev-haldi-2', category: 'events', caption: 'Turmeric & blessings' },
  { photo: 'bride-garden', category: 'weddings', caption: 'Morning of the wedding' },
  { photo: 'pw-garden', category: 'pre-wedding', caption: 'Garden stroll' },
  { photo: 'cp-garden-2', category: 'couples', caption: 'Sage & brick' },
  { photo: 'ev-henna', category: 'events', caption: 'Henna, held' },
  { photo: 'cp-stage', category: 'couples', caption: 'First dance' },
  { photo: 'bride-portrait', category: 'weddings', caption: 'Bridal portrait' },
  { photo: 'vr-bride-2', category: 'weddings', caption: 'Details of a bride' },
]
