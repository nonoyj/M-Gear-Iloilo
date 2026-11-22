export type CategoryId =
  | 'guitars'
  | 'basses'
  | 'amps'
  | 'pedals'
  | 'keys'
  | 'drums'
  | 'studio'
  | 'mics'

export type Condition = 'Brand New' | 'Mint' | 'Excellent' | 'Very Good' | 'Good'

export interface Product {
  id: number
  image: string
  name: string
  brand: string
  category: CategoryId
  condition: Condition
  price: number
  was?: number
  shipping: number
  seller: string
  location: string
  rating: number
  reviews: number
  tag?: 'Deal' | 'New Listing' | 'Hot'
  description: string
  specs: [string, string][]
}

export const CATEGORIES: { id: CategoryId; label: string }[] = [
  { id: 'guitars', label: 'Guitars' },
  { id: 'basses', label: 'Basses' },
  { id: 'amps', label: 'Amps' },
  { id: 'pedals', label: 'Effects & Pedals' },
  { id: 'keys', label: 'Keys & Synths' },
  { id: 'drums', label: 'Drums & Percussion' },
  { id: 'studio', label: 'Studio Gear' },
  { id: 'mics', label: 'Mics & Live Sound' },
]

export const CONDITIONS: Condition[] = ['Brand New', 'Mint', 'Excellent', 'Very Good', 'Good']

// All brands, sellers and listings below are fictional demo content. Prices are in PHP (₱).
const RAW: Omit<Product, 'image'>[] = [
  {
    id: 1, name: 'Agila S-Type Electric Guitar', brand: 'Agila', category: 'guitars', condition: 'Excellent',
    price: 42500, was: 49900, shipping: 0, seller: 'Hablon Strings', location: 'Jaro, Iloilo City', rating: 4.9, reviews: 212, tag: 'Deal',
    description: 'A bright, snappy double-cut with a roasted maple neck and three single-coil pickups. Fresh setup, original gig bag included. Light play wear on the back only.',
    specs: [['Body', 'Alder'], ['Neck', 'Roasted maple, 25.5"'], ['Pickups', '3 × single-coil'], ['Year', '2022']],
  },
  {
    id: 2, name: 'Mayon 335 Semi-Hollow Cherry', brand: 'Mayon Audio', category: 'guitars', condition: 'Mint',
    price: 82000, shipping: 1200, seller: 'Dinagyang Vintage Guitars', location: 'Mandurriao, Iloilo City', rating: 5, reviews: 87, tag: 'Hot',
    description: 'Warm, woody and articulate. Laminated maple semi-hollow body, humbuckers with coil-split, and a glossy cherry finish with zero buckle rash. Hard case included.',
    specs: [['Body', 'Laminated maple'], ['Neck', 'Mahogany, 24.75"'], ['Pickups', '2 × humbucker'], ['Year', '2023']],
  },
  {
    id: 3, name: 'Banahaw Dreadnought Acoustic', brand: 'Banahaw', category: 'guitars', condition: 'Very Good',
    price: 34500, shipping: 1000, seller: 'Molo Music House', location: 'Molo, Iloilo City', rating: 4.7, reviews: 134,
    description: 'Solid spruce top over mahogany back and sides. Big, balanced low end with sparkly highs. A couple of pick-guard scuffs, otherwise a great player for the church, cafe gigs or the barkada jam.',
    specs: [['Top', 'Solid Sitka spruce'], ['Back/Sides', 'Mahogany'], ['Scale', '25.4"'], ['Year', '2019']],
  },
  {
    id: 4, name: 'Kalinga P-Bass 4-String', brand: 'Kalinga', category: 'basses', condition: 'Excellent',
    price: 42000, shipping: 0, seller: 'Lowend Iloilo', location: 'La Paz, Iloilo City', rating: 4.8, reviews: 96, tag: 'New Listing',
    description: 'Punchy split-coil pickup, thick maple neck and a tortoise pickguard. Classic tone that sits perfectly in a mix. Includes gig bag.',
    specs: [['Strings', '4'], ['Pickups', 'Split-coil'], ['Scale', '34"'], ['Year', '2021']],
  },
  {
    id: 5, name: 'Hiraya 50W Tube Combo Amp', brand: 'Hiraya', category: 'amps', condition: 'Excellent',
    price: 59900, was: 69900, shipping: 2500, seller: 'Tube Town Iloilo', location: 'Iloilo City Proper', rating: 4.9, reviews: 158, tag: 'Deal',
    description: 'Two-channel all-tube 1×12 combo with spring reverb and an effects loop. Recently re-tubed and biased. Sparkling cleans that break up into rich crunch.',
    specs: [['Power', '50W'], ['Tubes', '2 × EL34, 3 × 12AX7'], ['Speaker', '1 × 12"'], ['Weight', '17 kg']],
  },
  {
    id: 6, name: 'Sampaguita Overdrive Pedal', brand: 'Sampaguita', category: 'pedals', condition: 'Brand New',
    price: 7200, shipping: 0, seller: 'Stomp Shack Iloilo', location: 'Pavia, Iloilo', rating: 4.8, reviews: 530, tag: 'Hot',
    description: 'Transparent mid-hump overdrive with drive, tone and level controls. True bypass, 9V DC or battery powered. Hand-built in small batches.',
    specs: [['Type', 'Overdrive'], ['Bypass', 'True bypass'], ['Power', '9V DC'], ['Controls', 'Drive / Tone / Level']],
  },
  {
    id: 7, name: 'Dagat Analog Delay', brand: 'Dagat', category: 'pedals', condition: 'Mint',
    price: 10500, was: 12900, shipping: 250, seller: 'Stomp Shack Iloilo', location: 'Pavia, Iloilo', rating: 4.6, reviews: 244, tag: 'Deal',
    description: 'Dark, wobbly bucket-brigade echoes up to 600ms with a tap tempo input. Boxed with manual and original velcro.',
    specs: [['Type', 'Analog delay'], ['Max time', '600 ms'], ['Bypass', 'Buffered'], ['Power', '9V DC']],
  },
  {
    id: 8, name: 'Tala 61-Key Analog Synth', brand: 'Tala', category: 'keys', condition: 'Mint',
    price: 72000, shipping: 1500, seller: 'Patchwork Synths Iloilo', location: 'Mandurriao, Iloilo City', rating: 5, reviews: 61, tag: 'New Listing',
    description: 'Four-voice analog polysynth with a punchy filter, sequencer and onboard chorus. Fat pads, bubbling basses and everything in between. Includes the original box.',
    specs: [['Voices', '4'], ['Keys', '61 semi-weighted'], ['Filter', '24dB ladder'], ['MIDI', 'DIN + USB']],
  },
  {
    id: 9, name: 'Perlas Stage Piano 88', brand: 'Perlas', category: 'keys', condition: 'Excellent',
    price: 92000, was: 105000, shipping: 0, seller: 'Teklado Center', location: 'Jaro, Iloilo City', rating: 4.8, reviews: 119, tag: 'Deal',
    description: 'Graded hammer-action keys, deeply sampled grand and electric pianos, and a rugged steel chassis made for gigging. Includes sustain pedal.',
    specs: [['Keys', '88 hammer-action'], ['Polyphony', '256'], ['Sounds', '1,200+'], ['Weight', '19 kg']],
  },
  {
    id: 10, name: 'Bayani 5-Piece Maple Drum Kit', brand: 'Bayani', category: 'drums', condition: 'Very Good',
    price: 64000, shipping: 4500, seller: 'Kalampag Drums', location: 'Oton, Iloilo', rating: 4.7, reviews: 73,
    description: 'All-maple shells in a sunburst wrap. Kick, snare, two rack toms and a floor tom with hardware. Tuned and ready; heads replaced last month.',
    specs: [['Shells', '100% maple'], ['Sizes', '22/16/12/10/14x5.5'], ['Finish', 'Sunburst'], ['Year', '2020']],
  },
  {
    id: 11, name: 'Mayon 8-Channel Audio Interface', brand: 'Mayon Audio', category: 'studio', condition: 'Brand New',
    price: 25000, shipping: 0, seller: 'Signal Path Iloilo', location: 'Mandurriao, Iloilo City', rating: 4.9, reviews: 402, tag: 'Hot',
    description: 'Eight mic/line preamps with ultra-low latency monitoring, ADAT expansion and a rock-solid USB-C connection. Includes mixing software bundle.',
    specs: [['Inputs', '8 × combo XLR/TRS'], ['Sample rate', 'Up to 192 kHz'], ['Connection', 'USB-C'], ['Phantom', '48V']],
  },
  {
    id: 12, name: 'Dagat Studio Monitors (Pair)', brand: 'Dagat', category: 'studio', condition: 'Excellent',
    price: 21500, was: 25900, shipping: 800, seller: 'Signal Path Iloilo', location: 'Mandurriao, Iloilo City', rating: 4.6, reviews: 188, tag: 'Deal',
    description: '5-inch bi-amped nearfield monitors with a flat, honest response. Balanced XLR/TRS inputs. Includes isolation pads and cables.',
    specs: [['Woofer', '5"'], ['Power', '70W bi-amp'], ['Inputs', 'XLR/TRS/RCA'], ['Response', '50Hz–35kHz']],
  },
  {
    id: 13, name: 'Kalinga Large-Diaphragm Condenser', brand: 'Kalinga', category: 'mics', condition: 'Mint',
    price: 16500, shipping: 300, seller: 'Signal Path Iloilo', location: 'Mandurriao, Iloilo City', rating: 4.8, reviews: 310,
    description: 'Smooth, detailed cardioid condenser for vocals and acoustic instruments. Shockmount, pop filter and hard case included.',
    specs: [['Pattern', 'Cardioid'], ['Diaphragm', '1" gold-sputtered'], ['Phantom', '48V'], ['Pad', '-10 dB']],
  },
  {
    id: 14, name: 'Hiraya Dynamic Vocal Mic', brand: 'Hiraya', category: 'mics', condition: 'Brand New',
    price: 5500, shipping: 0, seller: 'Entablado Audio', location: 'Santa Barbara, Iloilo', rating: 4.9, reviews: 892, tag: 'Hot',
    description: 'Road-tested supercardioid dynamic with excellent feedback rejection. Built like a tank and loved by touring vocalists and bar-gig bands alike.',
    specs: [['Pattern', 'Supercardioid'], ['Type', 'Dynamic'], ['Connector', 'XLR'], ['Weight', '0.3 kg']],
  },
  {
    id: 15, name: 'Banahaw 100W Bass Head', brand: 'Banahaw', category: 'amps', condition: 'Good',
    price: 19000, shipping: 1200, seller: 'Lowend Iloilo', location: 'La Paz, Iloilo City', rating: 4.5, reviews: 41,
    description: 'Solid-state head with a tube-style preamp, three-band EQ and DI out. Has cosmetic wear and a couple of dings but sounds fantastic.',
    specs: [['Power', '100W @ 4Ω'], ['EQ', '3-band + shape'], ['DI', 'XLR out'], ['Weight', '5.4 kg']],
  },
  {
    id: 16, name: 'Tala Compact Drum Machine', brand: 'Tala', category: 'drums', condition: 'Excellent',
    price: 12000, shipping: 250, seller: 'Patchwork Synths Iloilo', location: 'Mandurriao, Iloilo City', rating: 4.7, reviews: 99, tag: 'New Listing',
    description: 'Pocket-sized groovebox with 16 pads, 12 drum voices and a swingy step sequencer. Battery or USB powered, with sync in/out.',
    specs: [['Pads', '16 velocity-sensitive'], ['Voices', '12'], ['Power', 'USB / 4×AA'], ['Sync', '3.5mm in/out']],
  },
]

// Drop a photo at public/images/product-<id>.jpg to replace the placeholder art.
export const PRODUCTS: Product[] = RAW.map((p) => ({ ...p, image: `/images/product-${p.id}.jpg` }))
