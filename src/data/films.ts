import type { PhotoKey } from './images'

export interface Film {
  id: string
  couple: string
  title: string
  location: string
  duration: string
  cover: PhotoKey
  description: string
}

export const films: Film[] = [
  {
    id: 'aarav-meera',
    couple: 'Aarav & Meera',
    title: 'Goa Wedding Film',
    location: 'Goa',
    duration: '4:12',
    cover: 'am-portrait',
    description: 'An evening under lanterns and wisteria — vows, laughter and a dance floor that never emptied.',
  },
  {
    id: 'rohan-priya',
    couple: 'Rohan & Priya',
    title: 'Udaipur Wedding Film',
    location: 'Udaipur',
    duration: '5:38',
    cover: 'pw-amer',
    description: 'Sandstone arches, palace light and a family that sang through every ritual.',
  },
  {
    id: 'karan-ishita',
    couple: 'Karan & Ishita',
    title: 'Destination Wedding',
    location: 'Andaman Islands',
    duration: '3:54',
    cover: 'cp-beach',
    description: 'Barefoot vows on the shore and a sunset walk as newlyweds.',
  },
]
