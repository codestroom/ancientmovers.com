export const SITE = {
  name: 'Ancient Movers',
  tagline: '#1 Moving Experts in Detroit, Michigan',
  phone: '(226) 935-7146',
  phoneHref: 'tel:+12269357146',
  email: 'detroit@ancientmovers.com',
  address: 'Metro Detroit, Michigan',
  hours: 'Mon – Sat: 7:00 AM – 8:00 PM',
  socials: {
    facebook: 'https://facebook.com/ancientmovers',
    instagram: 'https://instagram.com/ancientmovers',
    twitter:  'https://twitter.com/ancientmovers'
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
    desc: 'Stress-free home moves across Metro Detroit -- from cozy apartments to large family homes. We protect your belongings like they\'re our own.',
    features: ['Free in-home estimate', 'Furniture disassembly & reassembly', 'Floor & wall protection'],
    photo: { src: '/images/staff.jpg',        id: '1600585154340-be6161a56a0c', seed: 'residential' }
  },
  {
    icon: 'building',
    title: 'Commercial & Office',
    desc: 'Minimize downtime with our efficient Detroit office relocations -- IT equipment, files, workstations and everything in between.',
    features: ['After-hours & weekend moves', 'IT-safe handling', 'Office layout setup'],
    photo: { src: '/images/furniture.jpg',    id: '1497366216548-37526070297c', seed: 'office' }
  },
  {
    icon: 'box',
    title: 'Packing & Unpacking',
    desc: 'Professional packing using premium materials. We label, wrap and secure every item -- fragile or not -- so nothing arrives damaged.',
    features: ['Custom crating', 'Fragile-item specialists', 'Eco-friendly supplies'],
    photo: { src: '/images/packing.webp',     id: '1558997519-83ea9252edf8',    seed: 'packing' }
  },
  {
    icon: 'truck',
    title: 'Long Distance Moving',
    desc: 'Moving out of Metro Detroit? We handle out-of-state and cross-country moves with transparent flat-rate pricing and guaranteed delivery windows.',
    features: ['Real-time shipment tracking', 'Dedicated move coordinator', 'No hidden fees'],
    photo: { src: '/images/longdistance.jpg', id: '1601584115197-04ecc0da31d7', seed: 'long-distance' }
  },
  {
    icon: 'warehouse',
    title: 'Secure Storage',
    desc: 'Climate-controlled, 24/7 monitored short and long-term storage solutions conveniently located in Metro Detroit.',
    features: ['Climate control', '24/7 surveillance & alarm', 'Flexible month-to-month terms'],
    photo: { src: '/images/fleet-truck.png',  id: '1601979031925-424e53b6caaa', seed: 'storage' }
  },
];

export const WHY_US = [
  { num: '10+', label: 'Years of Experience' },
  { num: '2,100+', label: 'Five-Star Reviews' },
  { num: '4.9 / 5', label: 'Google Rating' },
  { num: '100%', label: 'Licensed & Insured' }
];

export const FEATURES = [
  {
    title: 'Licensed & Fully Insured',
    desc: 'USDOT certified with full cargo and liability insurance on every move -- your belongings are completely protected.'
  },
  {
    title: 'Upfront, Honest Pricing',
    desc: 'No hidden fees, ever. You get a transparent quote -- hourly or flat-rate -- and you pay exactly what we promised.'
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
    desc: 'A real human always picks up the phone -- before, during and after your Detroit move. No voicemail runarounds.'
  },
  {
    title: 'Modern Fleet & Equipment',
    desc: 'Clean 26\' trucks equipped with lift gates, dollies, moving straps, appliance dollies and quality moving blankets on every job.'
  }
];

export const STEPS = [
  { n: '01', title: 'Request a Free Quote', desc: 'Tell us about your Detroit move -- fill the form or call us. We respond within 1 hour, guaranteed.' },
  { n: '02', title: 'Get a Custom Plan', desc: 'Your dedicated coordinator builds a moving plan with the right crew size, truck, and timing for your situation.' },
  { n: '03', title: 'Pack, Load & Move', desc: 'Our professional team arrives on time, handles everything with care, and keeps you updated throughout.' },
  { n: '04', title: 'Unload & Settle In', desc: 'We unload, reassemble furniture, and place items exactly where you want them -- so you\'re home from day one.' }
];

export const TESTIMONIALS = [
  {
    name: 'Jennifer M.',
    city: 'Grosse Pointe, MI',
    rating: 5,
    text: 'Ancient Movers made our move from Grosse Pointe to Farmington Hills completely stress-free. The crew was professional, fast, and handled every piece of furniture with incredible care.'
  },
  {
    name: 'Marcus T.',
    city: 'Dearborn, MI',
    rating: 5,
    text: 'Best moving company in Metro Detroit, hands down. They quoted a fair price and stuck to it. No surprises on moving day -- just a hard-working team that got the job done right.'
  },
  {
    name: 'Aisha K.',
    city: 'Troy, MI',
    rating: 5,
    text: 'Hired Ancient Movers for our office relocation in Troy. Zero downtime -- everything was set up and running the next morning. These guys are the real deal.'
  },
  {
    name: 'Daniel R.',
    city: 'Southfield, MI',
    rating: 5,
    text: 'They moved my baby grand piano and antique dining set without a single scratch. The crew was courteous, efficient, and clearly knew exactly what they were doing.'
  }
];

export const FAQS = [
  {
    q: 'How much does it cost to hire Ancient Movers in Detroit?',
    a: 'Pricing depends on your home size, distance, and services needed. Most local Detroit Metro moves start at $90/hour for two movers and a truck. We also offer flat-rate pricing for longer moves. Request a free, no-obligation quote for an exact number.'
  },
  {
    q: 'Are you licensed and insured in Michigan?',
    a: 'Yes -- Ancient Movers is fully licensed, bonded, and insured. We carry cargo insurance, general liability, and workers\' compensation on every job so you\'re completely protected.'
  },
  {
    q: 'How far in advance should I book my Detroit move?',
    a: 'We recommend booking 2–4 weeks in advance, especially during peak season (May–September). That said, we accept last-minute bookings when crews are available -- call us and we\'ll do our best.'
  },
  {
    q: 'Do you provide packing supplies and packing services?',
    a: 'Yes. We offer professional-grade boxes, tape, bubble wrap, and wardrobe boxes. Our full packing service includes all materials and is available for full packs or just fragile items.'
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
