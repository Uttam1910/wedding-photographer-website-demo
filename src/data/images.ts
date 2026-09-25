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
  'vr-embrace': p('vr-embrace', 30707336, 'portrait', 'Groom drawing his bride close in front of a gilded backdrop'),
  'vr-bride-2': p('vr-bride-2', 30707330, 'landscape', 'Bride admiring her mehndi and bangles against deep blue stone'),
  'vr-bride-3': p('vr-bride-3', 30707335, 'portrait', 'Bride touching her earrings, head bowed under a red veil'),


  // Bridal & groom portraits
  'bride-gold': p('bride-gold', 5376556, 'portrait', 'Close portrait of a bride with nath, maang tikka and layered gold jewellery'),
  'bride-red-lehenga': p('bride-red-lehenga', 12411105, 'portrait', 'Bride in a flowing red lehenga standing in a sandstone archway'),
  'bride-palms-1': p('bride-palms-1', 27212064, 'portrait', 'Bride gazing down at her mehndi in a red and gold lehenga'),
  'bride-palms-2': p('bride-palms-2', 27212065, 'portrait', 'Bride standing among palm leaves in full bridal jewellery'),
  'bride-veil-pink': p('bride-veil-pink', 27212066, 'portrait', 'Bride beneath a sheer rose-pink veil'),
  'groom-sherwani': p('groom-sherwani', 11748430, 'portrait', 'Groom in an ivory sherwani and maroon stole before an antique tapestry'),

  // Engagements
  'eng-bokeh-1': p('eng-bokeh-1', 30289601, 'portrait', 'Engaged couple touching foreheads in front of golden bokeh lights'),
  'eng-bokeh-2': p('eng-bokeh-2', 30289596, 'portrait', 'Couple laughing together, festoon lights glowing behind them'),
  'eng-bokeh-3': p('eng-bokeh-3', 30289585, 'portrait', 'Bride-to-be in teal with her fiancé beneath warm string lights'),
  'eng-ring': p('eng-ring', 14819859, 'landscape', 'Groom slipping an engagement ring onto a hennaed hand with red bangles'),
  'eng-hands': p('eng-hands', 18628263, 'landscape', 'Couple’s hands intertwined, her mehndi and chooda in soft focus'),

  // Pre-wedding
  'pw-fort-1': p('pw-fort-1', 36967368, 'portrait', 'Couple with foreheads together in front of a pale sandstone monument'),
  'pw-umbrella': p('pw-umbrella', 36967367, 'portrait', 'Couple sharing a clear umbrella, smiling close together'),
  'pw-fort-2': p('pw-fort-2', 36967371, 'landscape', 'Couple in pastels beneath a Mughal dome on a hazy afternoon'),
  'pw-fort-3': p('pw-fort-3', 36967369, 'portrait', 'Couple standing on heritage steps in soft lilac tones'),
  'pw-embrace': p('pw-embrace', 36967370, 'portrait', 'Man holding his partner from behind in pastel outfits'),
  'pw-amer': p('pw-amer', 29231349, 'portrait', 'Couple embracing inside a carved arch at a Rajasthan fort'),

  // Couples
  'cp-garden-1': p('cp-garden-1', 19733687, 'portrait', 'Groom kissing his partner’s temple in a sunlit garden'),
  'cp-beach': p('cp-beach', 20417059, 'landscape', 'Newlyweds in wedding attire walking hand in hand along the beach'),

  // Events & ceremonies
  'ev-haldi-petals': p('ev-haldi-petals', 33508493, 'portrait', 'Bride laughing as marigold petals shower down at her haldi'),
  'ev-sangeet': p('ev-sangeet', 28589007, 'portrait', 'Couple dancing together at the sangeet beneath hanging florals'),
  'ev-mehndi': p('ev-mehndi', 28496968, 'landscape', 'Intricate bridal mehndi on hands resting on a yellow outfit'),
  'ev-mehndi-couple': p('ev-mehndi-couple', 27164132, 'landscape', 'Bride displaying her mehndi, red chooda and embroidered lehenga'),

  // Premium upgrade (Pexels) — ceremonies, portraits, couples and details
  'wd-temple': p('wd-temple', 33195531, 'portrait', 'Bride and groom in jasmine garlands seated together before a gilded temple shrine'),
  'wd-garlands': p('wd-garlands', 6544197, 'portrait', 'Smiling bride and groom in varmala garlands against a wall of fresh flowers'),
  'bride-red-veil': p('bride-red-veil', 31668770, 'portrait', 'Indian bride lifting a sheer red veil over her ivory lehenga in soft daylight'),
  'bride-pearl': p('bride-pearl', 31668771, 'portrait', 'Editorial portrait of an Indian bride in pearl jewellery, touching her nath'),
  'bride-emerald': p('bride-emerald', 11707056, 'portrait', 'Indian bride in an emerald and gold lehenga with a kundan necklace and nath'),
  'bride-palace': p('bride-palace', 8186269, 'portrait', 'Indian bride in a red lehenga standing between carved wooden palace doors'),
  'groom-arch': p('groom-arch', 20021569, 'landscape', 'Indian groom in an ivory sherwani and red safa framed by a sandstone arch'),
  'cp-punjabi': p('cp-punjabi', 29192792, 'portrait', 'Punjabi couple touching foreheads under a flowing red dupatta'),
  'cp-golden': p('cp-golden', 35625250, 'portrait', 'Groom kissing his bride’s forehead in misty golden morning light'),
  'cp-doorway': p('cp-doorway', 29192796, 'portrait', 'Sikh groom kissing his bride’s hand in a painted heritage doorway'),
  'cp-veil': p('cp-veil', 31668773, 'portrait', 'Bride and groom touching foreheads beneath her red wedding veil'),
  'cp-garden-kiss': p('cp-garden-kiss', 30155180, 'landscape', 'Couple embracing in a lush garden setting with warm evening light'),
  'cp-taj': p('cp-taj', 18286445, 'portrait', 'Couple walking hand in hand along the reflecting pool towards the misty Taj Mahal'),
  'cp-arch-sunset': p('cp-arch-sunset', 31771913, 'landscape', 'Couple holding hands inside a stone archway as the sun sets behind them'),
  'eng-garden': p('eng-garden', 30155179, 'portrait', 'Engaged couple embracing and smiling in front of a floral arch'),
  'eng-rings': p('eng-rings', 31965606, 'landscape', 'Couple exchanging gold rings, the bride’s hands covered in mehndi and bangles'),
  'ev-baraat': p('ev-baraat', 20021574, 'landscape', 'Groom arriving in the baraat under festive umbrellas at night'),
  'ev-ritual': p('ev-ritual', 7245040, 'portrait', 'Hands pouring a brass kalash over rice during a Hindu wedding ritual'),
  'ev-mehndi-night': p('ev-mehndi-night', 7686122, 'portrait', 'Bride and friends laughing together by candlelight on the mehndi evening'),
  'ev-juttis': p('ev-juttis', 27164016, 'landscape', 'Groom’s embroidered juttis laid beside his ivory sherwani'),
  'pw-lake': p('pw-lake', 31771914, 'portrait', 'Couple laughing together on the rocks beside a green lake'),
  'pw-river': p('pw-river', 32792634, 'landscape', 'Couple embracing by the river at golden hour'),

  // Details & studio
  'rings-box': p('rings-box', 11473459, 'landscape', 'Pair of gold wedding bands in a red velvet ring box'),
  photographer: p('photographer', 13828111, 'portrait', 'Black and white portrait of a photographer holding her camera up to her eye'),
} satisfies Record<string, Photo>

export type PhotoKey = keyof typeof photos

export const imgSrc = (key: PhotoKey, size: 'sm' | 'lg' = 'lg') => `/images/${key}-${size}.webp`

export const pexelsUrl = (id: number) => `https://www.pexels.com/photo/${id}/`
