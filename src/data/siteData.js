export const SITE = {
  name: 'Ancient Movers',
  tagline: '#1 Moving Experts in Detroit, Michigan',
  phone: '(313) 555-0190',
  phoneHref: 'tel:+13135550190',
  email: 'detroit@ancientmovers.com',
  address: 'Metro Detroit, Michigan',
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
  'Novi',
  'Royal Oak',
  'Grosse Pointe',
  'St. Clair Shores',
  'Ferndale',
  'Pontiac',
  'Ann Arbor',
  'Ypsilanti',
  'Dearborn Heights',
  'Auburn Hills'
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
    photo: { src: '/images/staff.jpg', seed: 'residential' }
  },
  {
    icon: 'building',
    title: 'Commercial & Office',
    desc: 'Minimize downtime with our efficient Detroit office relocations — IT equipment, files, workstations and everything in between.',
    features: ['After-hours & weekend moves', 'IT-safe handling', 'Office layout setup'],
    photo: { src: '/images/furniture.jpg', seed: 'office' }
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
    features: ['Upright, baby grand & grand pianos', 'Skid boards & padded straps', 'Climate-safe transport'],
    photo: { src: '/images/piano.webp', seed: 'piano' }
  },
  {
    icon: 'box',
    title: 'Packing & Unpacking',
    desc: 'Professional packing using premium materials. We label, wrap and secure every item — fragile or not — so nothing arrives damaged.',
    features: ['Custom crating available', 'Fragile-item specialists', 'Eco-friendly supplies'],
    photo: { src: '/images/packing.webp', seed: 'packing' }
  },
  {
    icon: 'truck',
    title: 'Long Distance Moving',
    desc: 'Moving out of Metro Detroit? We handle out-of-state and cross-country moves with transparent flat-rate pricing and guaranteed delivery windows.',
    features: ['Real-time shipment tracking', 'Dedicated move coordinator', 'No hidden fees'],
    photo: { src: '/images/longdistance.jpg', seed: 'long-distance' }
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
    photo: { src: '/images/furniture.jpg', seed: 'pool-table' }
  },
  {
    icon: 'tools',
    title: 'Assembly & Disassembly',
    desc: 'From IKEA furniture to complex bed frames and wall units — we assemble and disassemble anything, saving you hours of frustration.',
    features: ['All furniture brands & styles', 'Tool kit on every truck', 'Included with most moves'],
    photo: { src: '/images/staff.jpg', seed: 'assembly' }
  },
  {
    icon: 'warehouse',
    title: 'Secure Storage',
    desc: 'Climate-controlled, 24/7 monitored short and long-term storage conveniently located in Metro Detroit.',
    features: ['Climate control', '24/7 surveillance & alarm', 'Flexible month-to-month terms'],
    photo: { src: '/images/truck.jpg', seed: 'storage' }
  },
  {
    icon: 'archive',
    title: 'Packing Supplies',
    desc: 'Pick up professional-grade boxes, tape, bubble wrap, wardrobe boxes, and mattress covers. Everything you need to pack like a pro.',
    features: ['Moving boxes (all sizes)', 'Wardrobe & dish boxes', '10% off when you book a move'],
    photo: { src: '/images/packing.webp', seed: 'supplies' }
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
    city: 'Grosse Pointe, MI',
    rating: 5,
    text: 'Ancient Movers made our move from Grosse Pointe to Farmington Hills completely stress-free. The crew was on time, professional, and handled every piece of furniture with incredible care. Best moving experience we\'ve ever had — and we\'ve moved a lot!'
  },
  {
    name: 'Scott T.',
    city: 'Troy, MI',
    rating: 5,
    text: 'They moved my hot tub from my old house in Troy to the new place in Auburn Hills. Handled it perfectly — no damage to the deck, no scratches, got it reconnected the same day. These guys know what they\'re doing!'
  },
  {
    name: 'Charlotte D.',
    city: 'Dearborn, MI',
    rating: 5,
    text: 'They moved my baby grand piano from Michigan to our new home without a single scratch. I was nervous about trusting anyone with it, but the team was calm, skilled, and clearly had done this hundreds of times. Highly recommend!'
  },
  {
    name: 'Nicole R.',
    city: 'Southfield, MI',
    rating: 5,
    text: 'Best moving company in Metro Detroit, hands down. I called late Tuesday evening and they were there by 3pm the next day. No hidden fees — the quote they gave me was exactly what I paid. The crew even helped reassemble my furniture. Amazing!'
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
