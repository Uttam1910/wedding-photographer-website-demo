export interface Testimonial {
  id: number
  quote: string
  couple: string
  detail: string
  rating: number
}

/** Demonstration reviews — not from real clients. */
export const testimonials: Testimonial[] = [
  { id: 1, quote: 'The photos are beyond beautiful! You captured our day so perfectly.', couple: 'Priya & Rohan', detail: 'Udaipur', rating: 5 },
  { id: 2, quote: 'Professional, creative and an absolute pleasure to work with.', couple: 'Neha & Arjun', detail: 'Mumbai', rating: 5 },
  { id: 3, quote: 'Our wedding film brings back all the emotions. Thank you!', couple: 'Simran & Kunal', detail: 'Pune', rating: 5 },
  { id: 4, quote: 'They were invisible during the pheras and everywhere at once during the sangeet. Every candid is a treasure.', couple: 'Ananya & Vikram', detail: 'Goa', rating: 5 },
  { id: 5, quote: 'Our parents cried over the album. The prints feel like heirlooms already.', couple: 'Isha & Dev', detail: 'Lonavala', rating: 5 },
  { id: 6, quote: 'Calm, kind and so organised — our pre-wedding shoot felt like a date, not a photoshoot.', couple: 'Tara & Nikhil', detail: 'Jaipur', rating: 5 },
]
