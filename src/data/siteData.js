export const SITE = {
  name: 'Ancient Movers',
  tagline: '#1 Moving Experts in Detroit, Michigan',
  phone: '(313) 555-0190',
  phoneHref: 'tel:+13135550190',
  email: 'ancientmoversUsa@gmail.com',
  address: '21700 Greenfield Rd Ste 121, Oak Park, MI 48237',
  hours: 'Mon – Sun: 7:00 AM – 9:00 PM',
  promo: '10% Off Packing Supplies & Wardrobe Boxes When You Book a Move',
  socials: {
    facebook:  'https://facebook.com/ancientmovers',
    instagram: 'https://instagram.com/ancientmovers',
    tiktok:    'https://tiktok.com/@ancientmovers',
    youtube:   'https://youtube.com/@ancientmovers',
    yelp:      'https://yelp.com/biz/ancient-movers-detroit',
    google:    'https://g.page/ancient-movers-detroit',
  }
};

export const SERVICE_AREAS = [
  'Downtown Detroit',
  'Dearborn',
  'Warren',
  'Sterling Heights',
  'Livonia',
  'Southfield',
  'Troy',
  'Farmington Hills',
  //'Novi',
  //'Royal Oak',
  //'Grosse Pointe',
  //'St. Clair Shores',
  //'Ferndale',
  //'Pontiac',
  //'Ann Arbor',
  //'Ypsilanti',
  //'Dearborn Heights',
  //'Auburn Hills'
];

export const SERVICE_AREA_LOCATIONS = [
  { name: 'Downtown Detroit',  lat: 42.3314, lng: -83.0458, dir: 'right'  },
  { name: 'Dearborn',          lat: 42.3223, lng: -83.1763, dir: 'bottom' },
  { name: 'Warren',            lat: 42.4933, lng: -83.0277, dir: 'right'  },
  { name: 'Sterling Heights',  lat: 42.5803, lng: -83.0302, dir: 'right'  },
  { name: 'Livonia',           lat: 42.3684, lng: -83.3527, dir: 'bottom' },
  { name: 'Southfield',        lat: 42.4734, lng: -83.2219, dir: 'left'   },
  { name: 'Troy',              lat: 42.6064, lng: -83.1498, dir: 'top'    },
  { name: 'Farmington Hills',  lat: 42.4989, lng: -83.3677, dir: 'left'   },
  { name: 'Novi',              lat: 42.4806, lng: -83.4755, dir: 'left'   },
  { name: 'Royal Oak',         lat: 42.4895, lng: -83.1446, dir: 'top'    },
  { name: 'Grosse Pointe',     lat: 42.3864, lng: -82.9118, dir: 'right'  },
  { name: 'St. Clair Shores',  lat: 42.4970, lng: -82.8888, dir: 'right'  },
  { name: 'Ferndale',          lat: 42.4606, lng: -83.1349, dir: 'bottom' },
  { name: 'Pontiac',           lat: 42.6389, lng: -83.2910, dir: 'top'    },
  { name: 'Ann Arbor',         lat: 42.2808, lng: -83.7430, dir: 'left'   },
  { name: 'Ypsilanti',         lat: 42.2411, lng: -83.6130, dir: 'bottom' },
  { name: 'Dearborn Heights',  lat: 42.3370, lng: -83.2730, dir: 'left'   },
  { name: 'Auburn Hills',      lat: 42.6875, lng: -83.2341, dir: 'top'    }
];

export const SERVICES = [
  {
    icon: 'home',
    title: 'Residential Moving',
    desc: 'Stress-free home moves across Metro Detroit — from cozy apartments to large family homes. We protect your belongings like they\'re our own.',
    features: ['Free in-home estimate', 'Furniture disassembly & reassembly', 'Floor & wall protection'],
    photo: { src: '/images/real-carrying-table.jpg', seed: 'residential' }
  },
  {
    icon: 'building',
    title: 'Commercial & Office',
    desc: 'Minimize downtime with our efficient Detroit office relocations — IT equipment, files, workstations and everything in between.',
    features: ['After-hours & weekend moves', 'IT-safe handling', 'Office layout setup'],
    photo: { src: '/images/real-team-lineup.jpg', seed: 'office' }
  },
  {
    icon: 'user-friends',
    title: 'Senior Moving',
    desc: 'Patient, compassionate moving services designed specifically for seniors. We take extra time, extra care, and handle every detail so the family can relax.',
    features: ['Extra care for fragile items', 'Furniture placement & setup', 'Coordination with family members'],
    photo: { src: '/images/senior.webp', seed: 'senior' }
  },
  {
    icon: 'music',
    title: 'Piano Moving',
    desc: 'Pianos require specialized equipment and trained hands. Our piano movers have moved hundreds of uprights, baby grands, and concert grands across Metro Detroit without a scratch.',
    features: ['Upright, baby grand & grand pianos', 'Staircase heavy-lift specialists', 'Climate-safe transport'],
    photo: { src: '/images/piano.jpg', seed: 'piano' }
  },
  {
    icon: 'box',
    title: 'Packing & Unpacking',
    desc: 'Professional packing using premium materials. We label, wrap and secure every item — fragile or not — so nothing arrives damaged.',
    features: ['Custom crating available', 'Fragile-item specialists', 'Eco-friendly supplies'],
    photo: { src: '/images/real-wrapping.jpg', seed: 'packing' }
  },
  {
    icon: 'truck',
    title: 'Long Distance Moving',
    desc: 'Moving out of Metro Detroit? We handle out-of-state and cross-country moves with transparent flat-rate pricing and guaranteed delivery windows.',
    features: ['Cross-border customs assistance', 'Real-time shipment tracking', 'Dedicated move coordinator'],
    photo: { src: '/images/real-winter-move.jpg', seed: 'long-distance' }
  },
  {
    icon: 'hot-tub',
    title: 'Hot Tub Moving',
    desc: 'Hot tubs and swim spas are among the heaviest items in any home. Our crew uses the right equipment to move them safely — in, out, or across Michigan.',
    features: ['Crane & skid equipment available', 'Deck & door-frame protection', 'Drain & reconnect assistance'],
    photo: { src: '/images/hottub.jpg', seed: 'hot-tub' }
  },
  {
    icon: 'table',
    title: 'Pool Table Moving',
    desc: 'Pool tables must be properly disassembled, leveled, and re-felted after every move. Our specialists do it right the first time.',
    features: ['Full disassembly & reassembly', 'Re-leveling on arrival', 'Felt inspection included'],
    photo: { src: '/images/pooltable.jpg', seed: 'pool-table' }
  },
  {
    icon: 'tools',
    title: 'Assembly & Disassembly',
    desc: 'From IKEA furniture to complex bed frames and wall units — we assemble and disassemble anything, saving you hours of frustration.',
    features: ['All furniture brands & styles', 'Tool kit on every truck', 'Included with most moves'],
    photo: { src: '/images/real-wrapped-wardrobe.jpg', seed: 'assembly' }
  },
  {
    icon: 'warehouse',
    title: 'Secure Storage',
    desc: 'Climate-controlled, 24/7 monitored short and long-term storage conveniently located in Metro Detroit.',
    features: ['Climate control', '24/7 surveillance & alarm', 'Flexible month-to-month terms'],
    photo: { src: '/images/storage.jpg', seed: 'storage' }
  },
  {
    icon: 'archive',
    title: 'Packing Supplies',
    desc: 'Pick up professional-grade boxes, tape, bubble wrap, wardrobe boxes, and mattress covers. Everything you need to pack like a pro.',
    features: ['Moving boxes (all sizes)', 'Wardrobe & dish boxes', '10% off when you book a move'],
    photo: { src: '/images/real-expo-booth.jpg', seed: 'supplies' }
  },
];

export const MOVING_PACKAGES = [
  {
    label: '26\' Truck + 2 Movers',
    best: 'Studio & small 1-bedroom',
    includes: [
      'Professional licensed movers',
      'Furniture runners & door protectors',
      'Moving pads & blankets',
      'Shrink wrap & tape',
      'Appliance dolly & moving dollies',
      'Lifting straps & tool bag',
    ],
  },
  {
    label: '26\' Truck + 3 Movers',
    best: 'Small apartments & 2-bedroom homes',
    includes: [
      'Everything in 2-mover package',
      'Faster loading & unloading',
      'Ideal for stairs & tight spaces',
    ],
    popular: true,
  },
  {
    label: '26\' Truck + 4 Movers',
    best: 'Full-size homes & long hauls',
    includes: [
      'Everything in 3-mover package',
      'Dedicated move coordinator',
      'Suitable for out-of-state moves',
    ],
  },
];

export const WHY_US = [
  { num: '10+',    label: 'Years of Experience' },
  { num: '2,100+', label: 'Five-Star Reviews'   },
  { num: '4.9 / 5', label: 'Google Rating'      },
  { num: '100%',   label: 'Licensed & Insured'  }
];

export const FEATURES = [
  {
    title: 'Licensed & Fully Insured',
    desc: 'USDOT certified with full cargo and liability insurance on every move — your belongings are completely protected.'
  },
  {
    title: 'Upfront, Honest Pricing',
    desc: 'No hidden fees, ever. You get a transparent quote — hourly or flat-rate — and you pay exactly what we promised.'
  },
  {
    title: 'On-Time, Every Time',
    desc: 'We respect your schedule. Punctual arrival and efficient execution are core promises we deliver on every job.'
  },
  {
    title: 'Trained Professionals',
    desc: 'Background-checked, uniformed movers trained in proper lifting, furniture protection and respectful home entry.'
  },
  {
    title: '24/7 Customer Support',
    desc: 'A real human always picks up the phone — before, during and after your Detroit move. No voicemail runarounds.'
  },
  {
    title: 'Modern Fleet & Equipment',
    desc: 'Clean 26\' trucks equipped with lift gates, dollies, moving straps, appliance dollies and quality moving blankets on every job.'
  }
];

export const STEPS = [
  { n: '01', title: 'Request a Free Quote',  desc: 'Tell us about your Detroit move — fill the form or call us. We respond within 1 hour, guaranteed.' },
  { n: '02', title: 'Get a Custom Plan',      desc: 'Your dedicated coordinator builds a moving plan with the right crew size, truck, and timing for your situation.' },
  { n: '03', title: 'Pack, Load & Move',      desc: 'Our professional team arrives on time, handles everything with care, and keeps you updated throughout.' },
  { n: '04', title: 'Unload & Settle In',     desc: 'We unload, reassemble furniture, and place items exactly where you want them — so you\'re home from day one.' }
];

export const TESTIMONIALS = [
  {
    name: 'Jennifer M.',
    author: 'Jennifer M.',
    city: 'Grosse Pointe, MI',
    location: 'Grosse Pointe, MI',
    rating: 5,
    stars: 5,
    role: 'Historic Estate Owner',
    text: 'Ancient Movers made our move from Grosse Pointe to Farmington Hills completely stress-free. The crew was on time, professional, and handled every piece of furniture with incredible care. They even helped navigate our narrow, historic winding staircase without a single scuff.',
    tag: 'Historic Estate',
    avatarId: '1494790108377-be9c29b29330'
  },
  {
    name: 'Scott T.',
    author: 'Scott T.',
    city: 'Troy, MI',
    location: 'Troy, MI',
    rating: 5,
    stars: 5,
    role: 'Specialty Spa Transport',
    text: 'They moved my hot tub from my old house in Troy to the new place in Auburn Hills. Handled it perfectly — no damage to the deck, no scratches, got it reconnected the same day. These guys know what they\'re doing!',
    tag: 'Specialty Move',
    avatarId: '1507003211169-0a1dd7228f2d'
  },
  {
    name: 'Charlotte D.',
    author: 'Charlotte D.',
    city: 'Dearborn, MI',
    location: 'Dearborn, MI',
    rating: 5,
    stars: 5,
    role: 'Baby Grand Piano Move',
    text: 'They moved my baby grand piano from Michigan to our new home without a single scratch. I was nervous about trusting anyone with it, but the team was calm, skilled, and clearly had done this hundreds of times. Highly recommend!',
    tag: 'Specialty Move',
    avatarId: '1438761681033-6461ffad8d80'
  },
  {
    name: 'Nicole R.',
    author: 'Nicole R.',
    city: 'Southfield, MI',
    location: 'Southfield, MI',
    rating: 5,
    stars: 5,
    role: 'Apartment Relocation',
    text: 'Best moving company in Metro Detroit, hands down. I called late Tuesday evening and they were there by 3pm the next day. No hidden fees — the quote they gave me was exactly what I paid. The crew even helped reassemble my furniture. Amazing!',
    tag: 'Local Apartment',
    avatarId: '1534528741775-53994a69daeb'
  }
];

export const FAQS = [
  {
    q: 'How much does it cost to hire Ancient Movers in Detroit?',
    a: 'Pricing depends on your home size, distance, and services needed. Most local Detroit Metro moves start at $90/hour for two movers and a truck. We also offer flat-rate pricing for longer moves. Request a free, no-obligation quote for an exact number.'
  },
  {
    q: 'Are you licensed and insured in Michigan?',
    a: 'Yes — Ancient Movers is fully licensed, bonded, and insured. We carry cargo insurance, general liability, and workers\' compensation on every job so you\'re completely protected.'
  },
  {
    q: 'How far in advance should I book my Detroit move?',
    a: 'We recommend booking 2–4 weeks in advance, especially during peak season (May–September). That said, we accept last-minute bookings when crews are available — call us and we\'ll do our best.'
  },
  {
    q: 'Do you move specialty items like pianos, pool tables, and hot tubs?',
    a: 'Yes! We specialize in heavy and delicate specialty moves. Our crew is trained and equipped for upright pianos, baby grands, full-size pool tables (including re-leveling and re-felting), and hot tubs or swim spas of any size.'
  },
  {
    q: 'Do you offer senior moving services?',
    a: 'Absolutely. Our senior moving service is designed to be patient, compassionate, and stress-free. We take extra time, handle every detail, and coordinate closely with family members to make the transition as smooth as possible.'
  },
  {
    q: 'Do you provide packing supplies and packing services?',
    a: 'Yes. We sell professional-grade boxes, tape, bubble wrap, wardrobe boxes, and mattress covers. You also get 10% off all packing supplies when you book a move with us. Full and partial packing services are also available.'
  },
  {
    q: 'Which Detroit-area neighborhoods do you serve?',
    a: 'We serve all of Metro Detroit including Downtown Detroit, Dearborn, Warren, Sterling Heights, Livonia, Southfield, Troy, Farmington Hills, Novi, Royal Oak, Grosse Pointe, Ann Arbor, and all surrounding communities.'
  },
  {
    q: 'Do you offer storage solutions in Detroit?',
    a: 'Yes. We provide climate-controlled, 24/7 monitored short and long-term storage. Whether you need a week or several months between moves, we have flexible storage plans to fit your needs.'
  },
  {
    q: 'What happens if something gets damaged during my move?',
    a: 'In the rare event of damage, our insurance covers it. We document every move carefully and resolve any claims quickly and fairly. Your peace of mind is our priority.'
  }
];

export const BLOGS = [
  {
    slug: 'how-far-in-advance-to-book-movers-detroit',
    title: 'How Far in Advance Should You Book Movers in Detroit?',
    excerpt: 'Timing your move in Metro Detroit can make or break the experience. Here\'s exactly how early you need to book — and why it matters more than you think.',
    category: 'Moving Tips',
    date: 'May 15, 2025',
    readTime: '4 min read',
    image: '/images/real-branded-truck.jpg',
    author: { name: 'Ancient Movers Team', initials: 'AM' },
    content: [
      { type: 'p', text: 'Whether you\'re moving across Dearborn or out of state from Detroit, timing your booking is one of the most critical steps in the entire process. Book too late and you may find yourself with no crew available on moving day. Book early and you get your choice of date, crew size, and time slot.' },
      { type: 'h2', text: 'The Golden Rule: 2–4 Weeks for Local Moves' },
      { type: 'p', text: 'For most Metro Detroit moves — apartment to apartment, house to house within the same city — booking 2 to 4 weeks in advance is the sweet spot. This gives you time to plan, for us to assign the right crew size, and for you to handle all the pre-move logistics without stress.' },
      { type: 'h2', text: 'Peak Season (May–September): Book 6 Weeks Out' },
      { type: 'p', text: 'Detroit summers are busy. School years end, leases turn over, and families time their moves around good weather. During peak season, our calendars fill up 4–6 weeks in advance. If you\'re planning a summer move, don\'t wait.' },
      { type: 'ul', items: ['Memorial Day weekend — books out 6–8 weeks', 'End of June / start of July — extremely high demand', 'Labor Day weekend — second busiest weekend of the year', 'End of August — university move-in season in Ann Arbor & Ypsilanti'] },
      { type: 'h2', text: 'Long-Distance or Specialty Moves: 4–6 Weeks Minimum' },
      { type: 'p', text: 'If you\'re moving out of Michigan, or you need specialty equipment for a piano, pool table, or hot tub, plan for at least 4–6 weeks of lead time. Specialty moves require specific crew training and equipment that isn\'t available on every truck.' },
      { type: 'h2', text: 'Last-Minute Moves — We Can Still Help' },
      { type: 'p', text: 'Life happens. If you find yourself needing movers in 48–72 hours, call us directly. We keep a small reserve of crew availability for last-minute bookings and do our best to accommodate you — though availability isn\'t guaranteed during peak periods.' },
      { type: 'cta', text: 'Ready to lock in your date? Get a free quote in under an hour.' },
    ],
  },
  {
    slug: '5-moving-mistakes-detroit-families-make',
    title: '5 Common Moving Mistakes Detroit Families Make (And How to Avoid Them)',
    excerpt: 'After thousands of moves across Metro Detroit, we\'ve seen the same mistakes over and over. Here\'s how to sidestep them and have a smooth moving day.',
    category: 'Moving Tips',
    date: 'April 28, 2025',
    readTime: '5 min read',
    image: '/images/real-customer-spring.jpg',
    author: { name: 'Ancient Movers Team', initials: 'AM' },
    content: [
      { type: 'p', text: 'We\'ve completed thousands of moves across Metro Detroit — Grosse Pointe to Farmington Hills, Troy to Ann Arbor, Southfield to Novi — and after a while, patterns emerge. The same avoidable mistakes show up again and again. Here are the top five, and how to dodge every one of them.' },
      { type: 'h2', text: '1. Waiting Too Long to Book' },
      { type: 'p', text: 'This is the #1 mistake. Especially from May through September, moving crews in Detroit book up fast. Families who wait until two weeks before their move date often find limited availability, higher rates, or — worse — no crew at all. Book 3–6 weeks out during peak season.' },
      { type: 'h2', text: '2. Underestimating the Volume' },
      { type: 'p', text: 'You\'ve lived there for five years. That\'s five years of stuff in closets, the basement, the garage, and the attic. Most families underestimate their volume by 20–30%. The result: not enough truck space, extra trips, and extra cost. Walk every room with your coordinator during the quote process.' },
      { type: 'h2', text: '3. Packing at the Last Minute' },
      { type: 'p', text: 'Moving day arrives and boxes aren\'t packed. The crew is standing there — on the clock — while you\'re scrambling to wrap dishes. This is one of the most common causes of blown budgets. Start packing non-essentials (books, seasonal items, off-season clothing) at least two weeks before moving day.' },
      { type: 'h2', text: '4. Not Labeling Boxes Properly' },
      { type: 'p', text: 'Unlabeled boxes cause hours of frustration on the other end. Label every box with the room it belongs in AND a brief contents list. Our crew will place boxes exactly where you need them — but only if they know where that is.' },
      { type: 'ul', items: ['Write room name on all four sides AND the top', 'Add a contents note ("Kitchen — pots & pans")', 'Mark FRAGILE in red for anything breakable', 'Number your boxes and keep a master list'] },
      { type: 'h2', text: '5. Forgetting to Reserve Parking' },
      { type: 'p', text: 'In Detroit neighborhoods like Midtown, Corktown, or downtown high-rises, parking a 26\' moving truck is a real challenge. Failing to reserve loading dock access or street parking ahead of time can delay your move by hours. Check with your building management at least a week before.' },
      { type: 'cta', text: 'Avoid all of these with a free consultation from our team.' },
    ],
  },
  {
    slug: 'piano-moving-metro-detroit-guide',
    title: 'Piano Moving in Metro Detroit: Everything You Need to Know',
    excerpt: 'Pianos are heavy, fragile, and irreplaceable. Learn how professional piano movers in Detroit protect your instrument from the first note to the last mile.',
    category: 'Specialty Moves',
    date: 'April 10, 2025',
    readTime: '5 min read',
    image: '/images/piano.webp',
    author: { name: 'Ancient Movers Team', initials: 'AM' },
    content: [
      { type: 'p', text: 'A piano is not just furniture — it\'s often one of the most valuable, emotionally significant items in a home. Moving one incorrectly can mean cracked soundboards, damaged legs, broken hammers, or a permanently out-of-tune instrument. In Metro Detroit, our team has moved hundreds of pianos safely, from studio uprights to 9\' concert grands.' },
      { type: 'h2', text: 'Types of Pianos We Move' },
      { type: 'ul', items: ['Upright pianos (most common household piano)', 'Console & studio pianos', 'Spinet pianos', 'Baby grand pianos', 'Grand & concert grand pianos'] },
      { type: 'h2', text: 'Why You Should Never DIY a Piano Move' },
      { type: 'p', text: 'An average upright piano weighs 400–900 lbs. A baby grand can reach 1,200 lbs. Beyond the weight, the shape — low to the ground, awkward to grip, with protruding legs and a delicate lid — makes it genuinely dangerous without proper equipment and training.' },
      { type: 'p', text: 'We\'ve received calls from families who tried to move a piano themselves using furniture dollies and rented trucks. The results are almost always the same: a damaged instrument, injured backs, and a much larger bill to fix everything than a professional move would have cost.' },
      { type: 'h2', text: 'What Our Piano Moving Process Looks Like' },
      { type: 'ul', items: ['Piano is padded and wrapped in heavy moving blankets', 'Skid boards and piano dollies support the full weight', 'Legs are removed on grand pianos before transport', 'Keyboard lid is secured; pedal lyre removed if needed', 'Straps and anchor points secure it inside the truck', 'Piano is placed on rubber mats to prevent shifting'] },
      { type: 'h2', text: 'What About Tuning After the Move?' },
      { type: 'p', text: 'Even a perfectly moved piano will likely need tuning after relocation — the change in humidity and environment affects string tension. We always recommend waiting 2–4 weeks after your move for the piano to acclimate to its new space, then booking a professional tuner.' },
      { type: 'cta', text: 'Moving a piano in Detroit? Call us for a free specialty move quote.' },
    ],
  },
  {
    slug: 'senior-moving-guide-detroit',
    title: 'Senior Moving Guide: How to Make the Transition Stress-Free',
    excerpt: 'Moving later in life comes with unique emotional and logistical challenges. Here\'s how families in Metro Detroit are making senior moves smoother, safer, and more compassionate.',
    category: 'Senior Moving',
    date: 'March 22, 2025',
    readTime: '6 min read',
    image: '/images/senior.webp',
    author: { name: 'Ancient Movers Team', initials: 'AM' },
    content: [
      { type: 'p', text: 'Helping a parent or grandparent move is one of the most emotionally complex experiences a family can go through. It\'s not just about furniture — it\'s about a lifetime of memories, cherished possessions, and a transition that requires patience, sensitivity, and experience.' },
      { type: 'h2', text: 'What Makes Senior Moving Different' },
      { type: 'p', text: 'Senior moves typically involve decades of accumulated belongings, often in a home that\'s been lived in for 20, 30, or even 50 years. The decisions about what to keep, donate, or pass along can be emotionally draining. Our crew is trained to slow down, never rush, and follow the family\'s lead throughout the day.' },
      { type: 'h2', text: 'Planning Tips for Families' },
      { type: 'ul', items: ['Start sorting 6–8 weeks before the move', 'Involve your loved one in all decisions — don\'t sort without them', 'Contact local charities in Detroit for furniture and clothing donations', 'Label boxes with both room AND the specific loved one\'s name if moving into assisted living', 'Take photos of treasured items before the move for insurance records'] },
      { type: 'h2', text: 'Our Approach to Senior Moves' },
      { type: 'p', text: 'We assign our most patient, experienced crew members to senior moves. There\'s no rushed energy, no shortcuts. We handle fragile keepsakes like they\'re our own grandmother\'s china. And we stay in close communication with adult children throughout the entire process.' },
      { type: 'h2', text: 'Moving Into Assisted Living or a Smaller Home' },
      { type: 'p', text: 'Downsizing is often part of a senior move. We can help coordinate donation pickups, storage for items being held for family members, and careful placement of furniture in the new space so your loved one feels at home from day one.' },
      { type: 'cta', text: 'Planning a senior move in Metro Detroit? Let\'s talk — we\'re here to help.' },
    ],
  },
  {
    slug: 'best-detroit-neighborhoods-2025',
    title: 'Best Detroit Neighborhoods to Move To in 2025',
    excerpt: 'Relocating to Metro Detroit? From historic Grosse Pointe to up-and-coming Corktown, here\'s our local guide to the neighborhoods worth landing in this year.',
    category: 'Detroit Living',
    date: 'March 5, 2025',
    readTime: '7 min read',
    image: '/images/real-team-lineup.jpg',
    author: { name: 'Ancient Movers Team', initials: 'AM' },
    content: [
      { type: 'p', text: 'After thousands of moves across Metro Detroit, we know these neighborhoods better than almost anyone. Here\'s our team\'s honest guide to where families, young professionals, and seniors are choosing to land in 2025.' },
      { type: 'h2', text: 'Grosse Pointe — Classic, Quiet, and Family-Friendly' },
      { type: 'p', text: 'Grosse Pointe remains one of Metro Detroit\'s most desirable addresses. Tree-lined streets, top-rated schools, walkable neighborhoods, and beautiful older homes make it a perennial favorite for families moving into the area. Expect higher price points, but you\'re buying into one of Michigan\'s most established communities.' },
      { type: 'h2', text: 'Corktown — Detroit\'s Most Exciting Neighborhood' },
      { type: 'p', text: 'Detroit\'s oldest neighborhood is having a full-blown renaissance. With new restaurants, cafes, boutiques, and the Ford Michigan Central renovation anchoring it all, Corktown is where young professionals and creatives are planting roots. It\'s walkable, vibrant, and still affordable compared to other major US cities.' },
      { type: 'h2', text: 'Royal Oak — The Goldilocks Neighborhood' },
      { type: 'p', text: 'Royal Oak hits a perfect balance: close to Detroit, suburban feel, lively downtown strip, excellent dining, and mid-range home prices. It\'s one of the most popular destinations for families and young couples relocating to the Metro area.' },
      { type: 'h2', text: 'Troy — Suburbs Done Right' },
      { type: 'p', text: 'If school districts and suburban safety are priorities, Troy consistently ranks among Michigan\'s best. It\'s also a major employment hub with corporate headquarters, tech firms, and the Beaumont Hospital system. Excellent roads, well-maintained housing, and a strong Indian-American community make it one of the most diverse suburbs in the state.' },
      { type: 'h2', text: 'Ann Arbor — College Town with Big-City Energy' },
      { type: 'p', text: 'About 45 minutes from Detroit, Ann Arbor offers a completely different lifestyle — walkable downtown, incredible restaurant scene, U of M energy, and a highly educated community. It\'s consistently ranked among the best places to live in America. Remote workers, academics, and medical professionals are all flocking here.' },
      { type: 'h2', text: 'Ferndale — Quirky, Affordable, and Cool' },
      { type: 'p', text: 'Ferndale punches well above its size. It\'s one of Metro Detroit\'s most inclusive, LGBTQ+-friendly, and creatively vibrant communities. Home prices are still reasonable, and it borders Royal Oak and Hazel Park — two areas experiencing major investment.' },
      { type: 'cta', text: 'Moving into Metro Detroit? We know every street. Get a free quote today.' },
    ],
  },
  {
    slug: 'hot-tub-moving-detroit-guide',
    title: 'Hot Tub Moving 101: Why You Absolutely Need Professionals',
    excerpt: 'Hot tubs and swim spas are among the most challenging items to move. Here\'s why Detroit homeowners trust professionals — and what the process actually looks like.',
    category: 'Specialty Moves',
    date: 'February 18, 2025',
    readTime: '4 min read',
    image: '/images/hottub.jpg',
    author: { name: 'Ancient Movers Team', initials: 'AM' },
    content: [
      { type: 'p', text: 'Hot tubs look manageable — until you try to move one. A standard hot tub weighs between 500 and 1,000 lbs empty. A swim spa can top 2,000 lbs. Add water (if not fully drained), an awkward shape, electrical connections, and tight deck access, and you have one of the most challenging moves in residential moving.' },
      { type: 'h2', text: 'What Can Go Wrong Without Professionals' },
      { type: 'ul', items: ['Deck boards cracked or splintered from improper leverage', 'Fence panels removed incorrectly, damaging posts', 'Hot tub cabinet cracked from improper lifting points', 'Herniated discs and serious back injuries to helpers', 'Electrical connections damaged if not properly disconnected first', 'Spa jets and internal plumbing broken in transit'] },
      { type: 'h2', text: 'Our Hot Tub Moving Process' },
      { type: 'p', text: 'We start with a site assessment — measuring gate widths, deck access, surface conditions, and the route from the spa to the truck. This isn\'t a step we skip. Every hot tub move is planned before anyone touches the spa.' },
      { type: 'ul', items: ['Full drain and disconnect before moving', 'Spa dolly (rated for 2,000+ lbs) used for transport across flat surfaces', 'Appliance straps at manufacturer-approved lift points', 'Furniture sliders for navigating around obstacles', 'Truck loading with wheel chocks to prevent shifting'] },
      { type: 'h2', text: 'What You Should Do Before We Arrive' },
      { type: 'p', text: 'Drain the hot tub completely at least 24 hours before your move date. A drained hot tub still holds residual water in the plumbing — we\'ll take care of the rest. Also disconnect the power and remove the cover and any accessories (steps, cover lifters, side tables).' },
      { type: 'h2', text: 'Can We Move It to a New Backyard in Detroit?' },
      { type: 'p', text: 'Absolutely. We move hot tubs within Metro Detroit regularly — from one home to another, from a backyard to storage, or from a showroom to your home. Our 26\' trucks with lift gates handle the weight, and our crew handles the logistics.' },
      { type: 'cta', text: 'Need your hot tub moved in Metro Detroit? Call us for a specialty move quote.' },
    ],
  },
];
