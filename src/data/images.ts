/**
 * Local photo registry. Files live in /public/images as `<key>-sm.webp`
 * (≈720px) and `<key>-lg.webp` (≈1600px, 2000px for hero slides).
 * All photographs are licensed from Pexels (https://www.pexels.com/license/)
 * and used here as demo stand-ins; `pexelsId` links back to each source.
 */
export type Orientation = 'portrait' | 'landscape'

export interface Photo {
  key: string
  pexelsId: number
  orientation: Orientation
  alt: string
}

const p = (key: string, pexelsId: number, orientation: Orientation, alt: string): Photo => ({
  key,
  pexelsId,
  orientation,
  alt,
})

export const photos = {
  // Hero slides
  'hero-1': p('hero-1', 30707334, 'landscape', 'Groom in a red safa leaning in to his bride in a red lehenga against a dark jewelled backdrop'),
  'hero-2': p('hero-2', 28074925, 'landscape', 'Bride and groom bowing to each other after the varmala, surrounded by haze and sparkling lights'),
  'hero-3': p('hero-3', 18361996, 'landscape', 'Newlyweds standing beneath a floral arch hung with wisteria and red lanterns at night'),

  // Featured wedding — Aarav & Meera (one evening celebration)
  'am-kiss': p('am-kiss', 18362003, 'portrait', 'Groom kissing his bride on the forehead under festoon lights'),
  'am-portrait': p('am-portrait', 18361999, 'portrait', 'Bride smiling as the groom holds her from behind, both wearing orchid garlands'),
  'am-garland': p('am-garland', 18362000, 'portrait', 'Couple sharing a quiet moment with foreheads touching beneath lanterns'),
  'am-embrace': p('am-embrace', 18362001, 'portrait', 'Groom and bride embracing, her hand resting on his chest'),
  'am-lights': p('am-lights', 18362002, 'landscape', 'Newlyweds by the reception fairy lights, groom smiling over his bride’s shoulder'),
  'am-bride': p('am-bride', 18361994, 'portrait', 'Bride in a red lehenga and orchid garland standing among glowing garden lamps'),
  'am-couple': p('am-couple', 18361995, 'portrait', 'Bride resting against the groom’s shoulder, eyes closed, in warm festival light'),
  'am-details': p('am-details', 18361997, 'landscape', 'Bridal jewellery, bangles and a gold necklace arranged on an engraved brass plate'),
  'am-full': p('am-full', 18361998, 'portrait', 'Full-length portrait of the couple on a red carpet under a floral canopy'),

  // Varanasi wedding
  'vr-bride-veil': p('vr-bride-veil', 30707331, 'portrait', 'Bride lifting her sheer red dupatta, lit by a warm glow'),
  'vr-bride-light': p('vr-bride-light', 30707329, 'portrait', 'Bride adjusting her maang tikka in soft golden backlight'),
  'vr-couple': p('vr-couple', 30707328, 'portrait', 'Bride and groom in red and ivory posing together against a jewelled wall'),
  'vr-bride-portrait': p('vr-bride-portrait', 30707327, 'portrait', 'Bride in a red bridal lehenga looking down, veil framing her face'),
  'vr-seated': p('vr-seated', 30707333, 'portrait', 'Groom standing beside his seated bride in a lit corridor'),
  'vr-embrace': p('vr-embrace', 30707336, 'portrait', 'Groom drawing his bride close in front of a gilded backdrop'),
  'vr-bride-2': p('vr-bride-2', 30707330, 'landscape', 'Bride admiring her mehndi and bangles against deep blue stone'),
  'vr-bride-3': p('vr-bride-3', 30707335, 'portrait', 'Bride touching her earrings, head bowed under a red veil'),

  // Bengali wedding
  'bn-couple': p('bn-couple', 30171219, 'portrait', 'Bengali bride and groom in red and gold with jasmine garlands before a rose wall'),
  'bn-couple-2': p('bn-couple-2', 30171220, 'portrait', 'Groom in a topor smiling beside his bride in a red Banarasi saree'),
  'bn-bride-veil': p('bn-bride-veil', 30171229, 'landscape', 'Bengali bride raising her red veil above her head'),

  // Bridal & groom portraits
  'bride-gold': p('bride-gold', 5376556, 'portrait', 'Close portrait of a bride with nath, maang tikka and layered gold jewellery'),
  'bride-red-lehenga': p('bride-red-lehenga', 12411105, 'portrait', 'Bride in a flowing red lehenga standing in a sandstone archway'),
  'bride-palms-1': p('bride-palms-1', 27212064, 'portrait', 'Bride gazing down at her mehndi in a red and gold lehenga'),
  'bride-palms-2': p('bride-palms-2', 27212065, 'portrait', 'Bride standing among palm leaves in full bridal jewellery'),
  'bride-veil-pink': p('bride-veil-pink', 27212066, 'portrait', 'Bride beneath a sheer rose-pink veil'),
  'bride-garden': p('bride-garden', 36762663, 'portrait', 'Bride with floral kaleere smiling softly in morning light'),
  'bride-portrait': p('bride-portrait', 14819717, 'portrait', 'Bride in a gold-edged dupatta with a gentle smile'),
  'groom-sherwani': p('groom-sherwani', 11748430, 'portrait', 'Groom in an ivory sherwani and maroon stole before an antique tapestry'),
  'groom-rajput': p('groom-rajput', 6458157, 'portrait', 'Groom in a black bandhgala and saffron safa holding a ceremonial sword'),

  // Engagements
  'eng-bokeh-1': p('eng-bokeh-1', 30289601, 'portrait', 'Engaged couple touching foreheads in front of golden bokeh lights'),
  'eng-bokeh-2': p('eng-bokeh-2', 30289596, 'portrait', 'Couple laughing together, festoon lights glowing behind them'),
  'eng-bokeh-3': p('eng-bokeh-3', 30289585, 'portrait', 'Bride-to-be in teal with her fiancé beneath warm string lights'),
  'eng-bokeh-4': p('eng-bokeh-4', 30289610, 'portrait', 'Couple embracing against red and white lights at night'),
  'eng-ring': p('eng-ring', 14819859, 'landscape', 'Groom slipping an engagement ring onto a hennaed hand with red bangles'),
  'eng-hands': p('eng-hands', 18628263, 'landscape', 'Couple’s hands intertwined, her mehndi and chooda in soft focus'),
  'eng-jeep': p('eng-jeep', 30289612, 'portrait', 'Couple posing beside a vintage jeep under a curtain of lights'),

  // Pre-wedding
  'pw-fort-1': p('pw-fort-1', 36967368, 'portrait', 'Couple with foreheads together in front of a pale sandstone monument'),
  'pw-umbrella': p('pw-umbrella', 36967367, 'portrait', 'Couple sharing a clear umbrella, smiling close together'),
  'pw-fort-2': p('pw-fort-2', 36967371, 'landscape', 'Couple in pastels beneath a Mughal dome on a hazy afternoon'),
  'pw-fort-3': p('pw-fort-3', 36967369, 'portrait', 'Couple standing on heritage steps in soft lilac tones'),
  'pw-embrace': p('pw-embrace', 36967370, 'portrait', 'Man holding his partner from behind in pastel outfits'),
  'pw-red-beach': p('pw-red-beach', 20417055, 'landscape', 'Woman in a flowing red gown on a beach at sunset'),
  'pw-garden': p('pw-garden', 32878576, 'landscape', 'Couple in a saree and suit posing in a leafy garden'),
  'pw-amer': p('pw-amer', 29231349, 'portrait', 'Couple embracing inside a carved arch at a Rajasthan fort'),

  // Couples
  'cp-garden-1': p('cp-garden-1', 19733687, 'portrait', 'Groom kissing his partner’s temple in a sunlit garden'),
  'cp-garden-2': p('cp-garden-2', 19734103, 'portrait', 'Couple in sage green outfits posing by a brick wall'),
  'cp-bw': p('cp-bw', 19734102, 'portrait', 'Black and white portrait of a couple smiling towards the camera'),
  'cp-tree': p('cp-tree', 19734108, 'portrait', 'Couple leaning against a large tree, photographed in monochrome'),
  'cp-beach': p('cp-beach', 20417059, 'landscape', 'Newlyweds in wedding attire walking hand in hand along the beach'),
  'cp-temple': p('cp-temple', 36762647, 'landscape', 'Couple standing before an illuminated temple gopuram at night'),
  'cp-intimate': p('cp-intimate', 14819853, 'landscape', 'Bride leaning into her groom, eyes closed, in velvet and embroidered net'),
  'cp-stage': p('cp-stage', 14819866, 'portrait', 'Couple slow dancing under blue stage lights'),
  'cp-pink': p('cp-pink', 8621982, 'landscape', 'Groom in a turban bending to touch foreheads with his bride'),

  // Events & ceremonies
  'ev-haldi-petals': p('ev-haldi-petals', 33508493, 'portrait', 'Bride laughing as marigold petals shower down at her haldi'),
  'ev-haldi-2': p('ev-haldi-2', 30705999, 'landscape', 'Bride with eyes closed as turmeric is applied at the haldi'),
  'ev-haldi-3': p('ev-haldi-3', 30706032, 'landscape', 'Bride surrounded by friends in yellow at the haldi ceremony'),
  'ev-sangeet': p('ev-sangeet', 28589007, 'portrait', 'Couple dancing together at the sangeet beneath hanging florals'),
  'ev-mehndi': p('ev-mehndi', 28496968, 'landscape', 'Intricate bridal mehndi on hands resting on a yellow outfit'),
  'ev-mehndi-couple': p('ev-mehndi-couple', 27164132, 'landscape', 'Bride displaying her mehndi, red chooda and embroidered lehenga'),
  'ev-henna': p('ev-henna', 16814609, 'portrait', 'Groom holding his bride’s hennaed hand'),
  'ev-decor': p('ev-decor', 14819854, 'landscape', 'Reception hall draped in velvet with chandeliers of hanging flowers'),

  // Details & studio
  'rings-box': p('rings-box', 11473459, 'landscape', 'Pair of gold wedding bands in a red velvet ring box'),
  photographer: p('photographer', 13828111, 'portrait', 'Black and white portrait of a photographer holding her camera up to her eye'),
} satisfies Record<string, Photo>

export type PhotoKey = keyof typeof photos

export const imgSrc = (key: PhotoKey, size: 'sm' | 'lg' = 'lg') => `/images/${key}-${size}.webp`

export const pexelsUrl = (id: number) => `https://www.pexels.com/photo/${id}/`
