// Vilen's Clothes - Product Catalog & Store Data
export const PRODUCTS = [
  // --- FIT SETUP PACKS (Like Posterized Wall Setup Packs) ---
  {
    id: 'pack-tokyo-cyber',
    name: 'The Tokyo Cyberpunk Fit | 3-Piece Pack',
    subtitle: 'Heavyweight Boxy Tee + Parachute Cargos + Street Beanie',
    category: 'packs',
    badge: 'BESTSELLER',
    rating: 4.9,
    reviewsCount: 1424,
    price: 1499,
    originalPrice: 2999,
    piecesCount: 3,
    pieceBreakdownText: 'Rs. 500 per piece · 3 pieces included',
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?w=900&auto=format&fit=crop&q=80'
    ],
    tags: ['260 GSM', 'FRENCH TERRY', 'BIO-WASHED', 'OVERSIZED FIT'],
    colors: [
      { name: 'Phantom Black', hex: '#111111' },
      { name: 'Vintage Washed Grey', hex: '#4a4a4a' },
      { name: 'Bone White', hex: '#f0ece1' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockLeft: 9,
    inThePack: [
      { item: '1x Heavyweight Drop-Shoulder Oversized Tee', spec: '260 GSM Combed Cotton, Screen Print' },
      { item: '1x Multi-Pocket Parachute Cargo Pants', spec: 'Water-repellent matte nylon blend, drawstrings' },
      { item: '1x Vilen Signature Ribbed Cuff Beanie', spec: '100% Breathable Acrylic, Embroidered patch' }
    ],
    description: 'Engineered for those who live the dark street aesthetic. High density 260 GSM French Terry cotton tee combined with utilitarian parachute cargo pants with 8 deep pockets and adjustable ankle toggles.',
    fabricCare: '100% Combed Cotton Tee + Ripstop Cargo. Machine wash cold with similar dark colors. Do not iron directly on graphics. Flat dry in shade.'
  },
  {
    id: 'pack-acid-grunge',
    name: 'The Acid-Wash Grunge Vault | 3-Piece Pack',
    subtitle: 'Washed Boxy Tee + Distressed Baggy Cargos + Steel Link Chain',
    category: 'packs',
    badge: 'TRENDING',
    rating: 4.8,
    reviewsCount: 982,
    price: 1599,
    originalPrice: 3199,
    piecesCount: 3,
    pieceBreakdownText: 'Rs. 533 per piece · 3 pieces included',
    images: [
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900&auto=format&fit=crop&q=80'
    ],
    tags: ['MINERAL WASH', 'HEAVYWEIGHT', 'STREET GRUNGE'],
    colors: [
      { name: 'Charcoal Mineral Wash', hex: '#383838' },
      { name: 'Acid Green Dark', hex: '#242b26' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockLeft: 14,
    inThePack: [
      { item: '1x Custom Acid Mineral Wash Boxy Tee', spec: '240 GSM Pre-shrunk cotton' },
      { item: '1x Vintage Relaxed Utility Cargo', spec: 'Heavy twill cotton with reinforced seams' },
      { item: '1x 316L Stainless Steel Figaro Chain', spec: 'Rust-proof, water-resistant 60cm chain' }
    ],
    description: 'Each piece receives our signature artisanal mineral enzyme wash, giving it a unique distressed pattern that develops more character with every wash.',
    fabricCare: 'Machine wash gentle inside-out. Do not bleach. Tumble dry low.'
  },
  {
    id: 'pack-shadow-tech',
    name: 'The Shadow Runner Tech Pack | 4-Piece Pack',
    subtitle: 'Windbreaker + Boxy Tee + Tactical Joggers + Sling Carabiner',
    category: 'packs',
    badge: 'HOT DROP',
    rating: 5.0,
    reviewsCount: 654,
    price: 2199,
    originalPrice: 4499,
    piecesCount: 4,
    pieceBreakdownText: 'Rs. 550 per piece · 4 pieces included',
    images: [
      'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&auto=format&fit=crop&q=80'
    ],
    tags: ['4-PIECE SET', 'TECHWEAR', 'WATER REPELLENT'],
    colors: [
      { name: 'Matte Obsidian', hex: '#0a0a0a' },
      { name: 'Slate Steel', hex: '#404552' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockLeft: 6,
    inThePack: [
      { item: '1x Weatherproof Tech Windbreaker Jacket', spec: 'High-neck windproof shell with taped zips' },
      { item: '1x Matte Black Core Oversized Tee', spec: '240 GSM Combed Cotton' },
      { item: '1x Ankle-Cuff Techwear Joggers', spec: 'Stretch twill with modular strap details' },
      { item: '1x Heavy Metal D-Ring Carabiner Clip', spec: 'Tactical matte alloy clip' }
    ],
    description: 'Designed for urban movement in unpredictable weather. The lightweight wind shell shields against wind and light rain while the cotton base tee keeps you cool and breathable.',
    fabricCare: 'Wipe shell with damp cloth. Tees & Pants cold wash. Hang dry.'
  },
  {
    id: 'pack-monochrome-minimal',
    name: 'The Monochrome Minimalist Street Set | 2-Piece Pack',
    subtitle: 'Bone White Oversized Tee + Relaxed Black Wide Trousers',
    category: 'packs',
    badge: 'ESSENTIAL',
    rating: 4.9,
    reviewsCount: 1120,
    price: 1299,
    originalPrice: 2599,
    piecesCount: 2,
    pieceBreakdownText: 'Rs. 650 per piece · 2 pieces included',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&auto=format&fit=crop&q=80'
    ],
    tags: ['MINIMALIST', '260 GSM', 'CLEAN FIT'],
    colors: [
      { name: 'Bone White & Jet Black', hex: '#f4f3ef' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockLeft: 18,
    inThePack: [
      { item: '1x Pristine Bone White Drop Tee', spec: 'Heavyweight 260 GSM dense structure' },
      { item: '1x Tailored Pleated Wide-Leg Pants', spec: 'Comfort stretch drape fabric with elastic waist' }
    ],
    description: 'High aesthetic clean luxury look. Minimal branding, sharp drape, and flawless boxy cut that accentuates broad shoulders without feeling restrictive.',
    fabricCare: 'Gentle cycle wash. Steam iron recommended.'
  },
  {
    id: 'pack-fleece-winter',
    name: 'The Heavyweight Fleece Winter Set | 3-Piece Set',
    subtitle: '380 GSM Boxy Hoodie + Fleece Joggers + Vilen Dad Cap',
    category: 'packs',
    badge: 'WINTER DROP',
    rating: 4.9,
    reviewsCount: 840,
    price: 1999,
    originalPrice: 3999,
    piecesCount: 3,
    pieceBreakdownText: 'Rs. 666 per piece · 3 pieces included',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&auto=format&fit=crop&q=80'
    ],
    tags: ['380 GSM FLEECE', 'WARM & COZY', 'DOUBLE LINED HOOD'],
    colors: [
      { name: 'Mochaccino Brown', hex: '#4a3728' },
      { name: 'Midnight Charcoal', hex: '#1e1e1e' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockLeft: 8,
    inThePack: [
      { item: '1x 380 GSM Heavy French Terry Hoodie', spec: 'Double layered hood, no flimsy drawstrings' },
      { item: '1x Matching Heavy Fleece Joggers', spec: 'Deep pockets, reinforced elastic waist' },
      { item: '1x Washed Cotton Unstructured Cap', spec: 'Antique brass buckle, embroidered Vilen crest' }
    ],
    description: 'Crafted with premium high-gauge loopback fleece. Feels like a warm heavy blanket while maintaining a sharp drop-shoulder silhouette.',
    fabricCare: 'Wash cold inside out. Reshape while wet and dry flat.'
  },

  // --- OVERSIZED TEES & GRAPHICS ---
  {
    id: 'tee-acid-mecha',
    name: 'Neo-Tokyo Cyber Mecha Graphic Tee',
    subtitle: '260 GSM High-Density Screen Print · Drop Shoulder',
    category: 'tees',
    badge: 'POPULAR',
    rating: 4.8,
    reviewsCount: 420,
    price: 749,
    originalPrice: 1399,
    piecesCount: 1,
    pieceBreakdownText: 'Rs. 749 per piece',
    images: [
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=900&auto=format&fit=crop&q=80'
    ],
    tags: ['260 GSM', 'PUFF PRINT', '100% COTTON'],
    colors: [
      { name: 'Faded Black', hex: '#1c1c1c' },
      { name: 'Washed Lilac', hex: '#776b7e' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockLeft: 12,
    inThePack: [
      { item: '1x Mecha Graphic Oversized Tee', spec: 'High-density plastisol + puff ink detailing' }
    ],
    description: 'An ode to futuristic Tokyo nightlife. Heavyweight 260 GSM combed cotton that does not lose its boxy structure even after 50+ washes.',
    fabricCare: 'Reverse wash cold. Avoid hot tumble drying.'
  },
  {
    id: 'tee-vintage-speed',
    name: 'Retro Le Mans GT Racing Oversized Tee',
    subtitle: 'Vintage Crackle Wash Print · 100% Bio-Washed Combed Cotton',
    category: 'tees',
    badge: 'TOP RATED',
    rating: 4.9,
    reviewsCount: 780,
    price: 799,
    originalPrice: 1499,
    piecesCount: 1,
    pieceBreakdownText: 'Rs. 799 per piece',
    images: [
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&auto=format&fit=crop&q=80'
    ],
    tags: ['RACING HERITAGE', '240 GSM', 'VINTAGE COLLAR'],
    colors: [
      { name: 'Vintage Off-White', hex: '#ede8dc' },
      { name: 'Racing Green', hex: '#1b3b2b' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockLeft: 5,
    inThePack: [
      { item: '1x Retro Racing Graphic Tee', spec: 'Thick 1.25 inch ribbed collar that will never bacon' }
    ],
    description: 'Inspired by iconic 90s endurance motorsport. Features heavy crackle screen-printing and thick ribbed collar that stays crisp all day.',
    fabricCare: 'Machine wash delicate. Wash with like colors.'
  },
  {
    id: 'tee-gothic-raw',
    name: 'Gothic Raw Hem Oversized Tee',
    subtitle: 'Distressed Raw Edges · Heavy French Terry 280 GSM',
    category: 'tees',
    badge: 'LIMITED DROP',
    rating: 4.7,
    reviewsCount: 310,
    price: 699,
    originalPrice: 1299,
    piecesCount: 1,
    pieceBreakdownText: 'Rs. 699 per piece',
    images: [
      'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=80'
    ],
    tags: ['RAW EDGES', 'HEAVY 280 GSM', 'DISTRESSED'],
    colors: [
      { name: 'Pitch Black', hex: '#0f0f0f' },
      { name: 'Rust Orange', hex: '#8c3d26' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockLeft: 7,
    inThePack: [
      { item: '1x Raw Hem Heavyweight Drop Tee', spec: 'Special non-raveling edge treatment' }
    ],
    description: 'Underground grunge with raw cut cuffs and hemline. Heavy drape creates an effortlessly casual, rebellious streetwear silhouette.',
    fabricCare: 'Cold wash gentle. Dry naturally.'
  },
  {
    id: 'tee-bundle-3pack',
    name: '3-Piece Essential Oversized Tee Bundle (Pick Any 3)',
    subtitle: 'Customizable Boxy Tee Trio · Massive Savings',
    category: 'combos',
    badge: 'SAVE 55%',
    rating: 4.9,
    reviewsCount: 1890,
    price: 1399,
    originalPrice: 2999,
    piecesCount: 3,
    pieceBreakdownText: 'Rs. 466 per tee · 3 Tees included',
    images: [
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1503342217505-b0a15ec3261c?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&auto=format&fit=crop&q=80'
    ],
    tags: ['BEST VALUE', 'COMBO DEAL', '240 GSM'],
    colors: [
      { name: 'Black + Off-White + Grey Trio', hex: '#333333' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockLeft: 22,
    inThePack: [
      { item: '1x Jet Black Boxy Core Tee', spec: '240 GSM Combed Cotton' },
      { item: '1x Bone Off-White Boxy Core Tee', spec: '240 GSM Combed Cotton' },
      { item: '1x Heather Charcoal Boxy Core Tee', spec: '240 GSM Combed Cotton' }
    ],
    description: 'The ultimate wardrobe upgrade. 3 timeless heavyweight boxy t-shirts designed to mix and match with any cargo, denim, or shorts.',
    fabricCare: 'Machine wash cold. Do not dry clean.'
  },

  // --- HOODIES & WINTER DROPS ---
  {
    id: 'hoodie-french-terry',
    name: 'Heavyweight 380 GSM Boxy French Terry Hoodie',
    subtitle: 'Double Lined Hood · Concealed Kangaroo Pocket · Jet Black',
    category: 'hoodies',
    badge: 'COLD ESSENTIAL',
    rating: 4.9,
    reviewsCount: 650,
    price: 1299,
    originalPrice: 2499,
    piecesCount: 1,
    pieceBreakdownText: 'Rs. 1,299 per piece',
    images: [
      'https://images.unsplash.com/photo-1556905055-8f358a7a47b2?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=900&auto=format&fit=crop&q=80'
    ],
    tags: ['380 GSM', 'NO DRAWSTRINGS', 'FRENCH TERRY'],
    colors: [
      { name: 'Jet Black', hex: '#111111' },
      { name: 'Cement Grey', hex: '#6b6e70' },
      { name: 'Espresso Brown', hex: '#3b2f2f' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockLeft: 11,
    inThePack: [
      { item: '1x Premium French Terry Heavy Hoodie', spec: 'Double thickness hood structure' }
    ],
    description: 'No flimsy cords, no cheap fleece fuzz. Pure 380 GSM dense French Terry knit with clean ribbed cuffs and drop-shoulder relaxed silhouette.',
    fabricCare: 'Inside out wash cold. Hang to dry.'
  },

  // --- CARGOS & PANTS ---
  {
    id: 'cargo-tactical-8pocket',
    name: 'Tactical 8-Pocket Parachute Cargo Pants',
    subtitle: 'Adjustable Ankle Toggles · Water-Resistant Matte Finish',
    category: 'cargos',
    badge: 'VIRAL ON IG',
    rating: 4.8,
    reviewsCount: 1102,
    price: 1199,
    originalPrice: 2299,
    piecesCount: 1,
    pieceBreakdownText: 'Rs. 1,199 per piece',
    images: [
      'https://images.unsplash.com/photo-1512436991641-6745cdb1723f?w=900&auto=format&fit=crop&q=80',
      'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=900&auto=format&fit=crop&q=80'
    ],
    tags: ['8 POCKETS', 'PARACHUTE NYLON', 'BUNGEE TOGGLES'],
    colors: [
      { name: 'Midnight Black', hex: '#111111' },
      { name: 'Olive Drab', hex: '#3e4739' },
      { name: 'Desert Sand', hex: '#a89f91' }
    ],
    sizes: ['S', 'M', 'L', 'XL', 'XXL'],
    stockLeft: 15,
    inThePack: [
      { item: '1x Tactical Parachute Cargo Pants', spec: 'Deep bellows cargo pockets with snap flap closures' }
    ],
    description: 'Lightweight yet rugged ripstop fabric with 8 utilitarian pockets and adjustable elastic toggle hems to switch between baggy and tapered fit.',
    fabricCare: 'Cold wash. Quick dry fabric.'
  }
];

// --- CROSS SELL ADD-ONS (Like Posterized Glue dots & mystery items in screenshot 3) ---
export const CROSS_SELL_ADDONS = [
  {
    id: 'addon-socks',
    name: 'Vilen Ribbed Street Crew Socks (Pack of 2)',
    price: 99,
    originalPrice: 249,
    desc: 'Cushioned terry sole · Anti-odor cotton',
    image: 'https://images.unsplash.com/photo-1586350977771-b3b0abd50c82?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'addon-spray',
    name: 'Anti-Crease & Fabric Freshener Spray (100ml)',
    price: 49,
    originalPrice: 199,
    desc: 'Keep 240+ GSM cotton crisp without ironing',
    image: 'https://images.unsplash.com/photo-1608248597359-0f2a969a5951?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'addon-chain',
    name: 'Stainless Steel Figaro Neck Chain (60cm)',
    price: 149,
    originalPrice: 499,
    desc: 'Rust-proof 316L alloy · Instant outfit accent',
    image: 'https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?w=300&auto=format&fit=crop&q=80'
  },
  {
    id: 'addon-beanie',
    name: 'Minimal Ribbed Fisherman Beanie - Black',
    price: 199,
    originalPrice: 449,
    desc: 'Breathable knit · One size fits all',
    image: 'https://images.unsplash.com/photo-1576871337622-98d48d1cf531?w=300&auto=format&fit=crop&q=80'
  }
];

// --- REAL LOOKING VERIFIED CUSTOMER REVIEWS (Like Posterized Reel grid) ---
export const VERIFIED_REVIEWS = [
  {
    id: 'rev-1',
    name: 'Aryan K.',
    city: 'Mumbai',
    rating: 5,
    tag: 'Verified Buyer',
    text: 'Fabric thickness is insane! 260 GSM feels genuinely heavy like imported luxury streetwear brands. The drop shoulder fits godly.',
    fit: 'Tokyo Cyberpunk Pack (Size L)',
    image: 'https://images.unsplash.com/photo-1509967419530-da38b4704bc6?w=600&auto=format&fit=crop&q=80',
    likes: 142
  },
  {
    id: 'rev-2',
    name: 'Devansh S.',
    city: 'Delhi',
    rating: 5,
    tag: 'Verified Buyer',
    text: 'The 8-pocket cargo with the vintage oversized tee is easily my favorite outfit right now. Fast 2 day delivery to Delhi!',
    fit: 'Acid-Wash Grunge Vault (Size XL)',
    image: 'https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=600&auto=format&fit=crop&q=80',
    likes: 98
  },
  {
    id: 'rev-3',
    name: 'Simran V.',
    city: 'Bangalore',
    rating: 5,
    tag: 'Verified Buyer',
    text: 'Bought the 3-tee combo for my boyfriend and he literally refuses to wear anything else now. No collar stretching after 4 washes.',
    fit: '3-Tee Essential Pack (Size M)',
    image: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=600&auto=format&fit=crop&q=80',
    likes: 215
  },
  {
    id: 'rev-4',
    name: 'Kabir M.',
    city: 'Pune',
    rating: 5,
    tag: 'Verified Buyer',
    text: 'Cleanest packaging ever, came with stickers and fabric care guide. The hoodie weight at 380 GSM is so premium.',
    fit: 'French Terry Boxy Hoodie (Size L)',
    image: 'https://images.unsplash.com/photo-1508427953056-b00b8d78ebf5?w=600&auto=format&fit=crop&q=80',
    likes: 184
  }
];

// --- FAQS (Accordion section) ---
export const FAQS = [
  {
    q: 'How does the sizing work for VILEN\'S Oversized Fits?',
    a: 'All our oversized tees and hoodies are intentionally tailored with a relaxed boxy cut and dropped shoulders. If you prefer the aesthetic oversized streetwear look shown on our models, order your standard true-to-size. If you prefer a regular/snug fit, you can size down by one.'
  },
  {
    q: 'Is Cash on Delivery (COD) available?',
    a: 'Yes! Cash on Delivery is available across 19,000+ pin codes in India. We also offer Free Express Delivery + extra 10% instant discount when you pay online via UPI or Cards using code VILEN10.'
  },
  {
    q: 'How long does delivery take?',
    a: 'All orders are dispatched from our warehouse within 24 to 48 hours. Metro cities typically receive deliveries within 2-3 business days, and other regions within 4-5 business days. You will receive an SMS and WhatsApp tracking link as soon as your order ships.'
  },
  {
    q: 'What is your Exchange and Return policy?',
    a: 'We offer a 7-day hassle-free size exchange policy! If the size isn\'t 100% perfect, our courier partner will pick up the item from your doorstep and deliver the replacement size free of charge.'
  },
  {
    q: 'What makes your fabric quality different from other brands?',
    a: 'We custom-knit our fabrics using 100% long-staple combed cotton ranging from 240 GSM to 380 GSM. Every garment undergoes double bio-washing and pre-shrinking, ensuring zero shrinkage, zero color bleed, and a collar that never sags.'
  }
];
