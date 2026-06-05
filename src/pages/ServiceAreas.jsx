import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import {
  FaMapMarkerAlt,
  FaRoute,
  FaBuilding,
  FaHourglassHalf,
  FaShieldAlt,
  FaInfoCircle,
  FaCheckCircle,
  FaArrowRight,
  FaCalendarCheck,
  FaPlus,
  FaUniversity,
  FaHome,
  FaClock,
  FaMap,
  FaUserCheck,
  FaTruckLoading,
  FaWarehouse,
  FaTools,
  FaChevronDown
} from 'react-icons/fa';
import SEO from '../components/SEO.jsx';
import Photo from '../components/Photo.jsx';
import AreasGrid from '../components/AreasGrid.jsx';
import Testimonials from '../components/Testimonials.jsx';
import useReveal from '../hooks/useReveal.js';
import useTilt from '../hooks/useTilt.js';
import './ServiceAreas.css';

// 18 Service Areas metadata mapping for exact local coordination and SEO
const NEIGHBORHOODS_META = [
  {
    name: 'Downtown Detroit',
    county: 'Wayne',
    distance: 15,
    time: '20-25 mins',
    crew: '3-4 Movers + 26\' Truck',
    tip: 'Street moving permit or loading dock reservation required by high-rises.',
    seed: 'detroit',
    id: '1569336415962-a4bd9f69cd83'
  },
  {
    name: 'Dearborn',
    county: 'Wayne',
    distance: 14,
    time: '18-22 mins',
    crew: '2-3 Movers + 26\' Truck',
    tip: 'Driveway parking is usually available; check local tree height restrictions.',
    seed: 'dearborn',
    id: '1618843479313-40f8afb4b4d8'
  },
  {
    name: 'Warren',
    county: 'Macomb',
    distance: 10,
    time: '15-18 mins',
    crew: '2-3 Movers + 26\' Truck',
    tip: 'Easy street loading. Coordinate with neighbors for sidewalk clearances.',
    seed: 'warren',
    id: '1581091226825-a6a2a5aee158'
  },
  {
    name: 'Sterling Heights',
    county: 'Macomb',
    distance: 16,
    time: '22-26 mins',
    crew: '3 Movers + 26\' Truck',
    tip: 'Spacious driveway access. No local moving permits required by the city.',
    seed: 'sterling_heights',
    id: '1513584684374-8bab748fbf90'
  },
  {
    name: 'Livonia',
    county: 'Wayne',
    distance: 18,
    time: '22-28 mins',
    crew: '3 Movers + 26\' Truck',
    tip: 'Wide residential driveways. Watch for overhead electrical lines during back-in.',
    seed: 'livonia',
    id: '1600596542815-ffad4c1539a9'
  },
  {
    name: 'Southfield',
    county: 'Oakland',
    distance: 4,
    time: '8-12 mins',
    crew: '2-3 Movers + 26\' Truck',
    tip: 'Office moving requires COI approval in advance. Double-check parking garage heights.',
    seed: 'southfield',
    id: '1486406146926-c627a92ad1ab'
  },
  {
    name: 'Troy',
    county: 'Oakland',
    distance: 11,
    time: '15-20 mins',
    crew: '3 Movers + 26\' Truck',
    tip: 'Wide residential cul-de-sacs. Ideal for large 26-foot moves.',
    seed: 'troy',
    id: '1600607687939-ce8a6c25118c'
  },
  {
    name: 'Farmington Hills',
    county: 'Oakland',
    distance: 13,
    time: '16-22 mins',
    crew: '3 Movers + 26\' Truck',
    tip: 'Many winding suburban lanes. Watch for low-hanging branches in summer.',
    seed: 'farmington',
    id: '1502082553048-f009c37129b9'
  },
  {
    name: 'Novi',
    county: 'Oakland',
    distance: 19,
    time: '24-28 mins',
    crew: '3-4 Movers + 26\' Truck',
    tip: 'Strict HOA guidelines may govern moving truck hours (usually 8am - 6pm).',
    seed: 'novi',
    id: '1600566753376-12c8ab7fb75b'
  },
  {
    name: 'Royal Oak',
    county: 'Oakland',
    distance: 3,
    time: '6-10 mins',
    crew: '2-3 Movers + 26\' Truck',
    tip: 'Narrow streets. Off-street driveway or driveway apron parking is recommended.',
    seed: 'royaloak',
    id: '1534447677768-be436bb09401'
  },
  {
    name: 'Grosse Pointe',
    county: 'Wayne',
    distance: 19,
    time: '25-30 mins',
    crew: '3-4 Movers + 26\' Truck',
    tip: 'City-hall moving permit required. Narrow streets necessitate custom parking layouts.',
    seed: 'grossepointe',
    id: '1600585154526-990dced4db0d'
  },
  {
    name: 'St. Clair Shores',
    county: 'Macomb',
    distance: 20,
    time: '26-32 mins',
    crew: '3 Movers + 26\' Truck',
    tip: 'Driveway parking is usually available. Ideal for lakefront properties.',
    seed: 'stclair',
    id: '1559136555-9303baea8ebd'
  },
  {
    name: 'Ferndale',
    county: 'Oakland',
    distance: 2,
    time: '5-8 mins',
    crew: '2 Movers + 26\' Truck',
    tip: 'Narrow residential driveways. Curb-side loading may require active hazard lights.',
    seed: 'ferndale',
    id: '1513694203232-719a280e022f'
  },
  {
    name: 'Pontiac',
    county: 'Oakland',
    distance: 20,
    time: '26-32 mins',
    crew: '3 Movers + 26\' Truck',
    tip: 'Residential driveway parking is preferred for optimal ramp access.',
    seed: 'pontiac',
    id: '1552519507-da3b142c6e3d'
  },
  {
    name: 'Ann Arbor',
    county: 'Washtenaw',
    distance: 41,
    time: '45-55 mins',
    crew: '3-4 Movers + 26\' Truck',
    tip: 'University of Michigan campus housing requires advanced notice for street parking.',
    seed: 'annarbor',
    id: '1541339907198-e08756dedf3f'
  },
  {
    name: 'Ypsilanti',
    county: 'Washtenaw',
    distance: 36,
    time: '40-48 mins',
    crew: '2-3 Movers + 26\' Truck',
    tip: 'Easy residential parking. Ideal for university students and historic district moves.',
    seed: 'ypsilanti',
    id: '1607082348824-0a96f2a4b9da'
  },
  {
    name: 'Dearborn Heights',
    county: 'Wayne',
    distance: 15,
    time: '20-25 mins',
    crew: '3 Movers + 26\' Truck',
    tip: 'Curb-side loading is common. Ensure street width permits through-traffic.',
    seed: 'dearbornheights',
    id: '1600210492486-724fe5c67fb0'
  },
  {
    name: 'Auburn Hills',
    county: 'Oakland',
    distance: 22,
    time: '28-34 mins',
    crew: '3 Movers + 26\' Truck',
    tip: 'Corporate parks require security check-in for moving trucks. Deliveries use loading dock.',
    seed: 'auburnhills',
    id: '1497366216548-37526070297c'
  }
];

// County static narrative details
const COUNTY_DETAILS = {
  Oakland: {
    title: 'Oakland County Moving Specialists',
    desc: 'Serving Southfield, Troy, Novi, Royal Oak, Ferndale, and all of Oakland County with prompt, reliable, and premium local moving solutions. From compact apartments to sweeping suburban estates, we know Oakland County inside and out.'
  },
  Wayne: {
    title: 'Wayne County & Detroit Relocations',
    desc: 'Proudly serving Wayne County, including Downtown Detroit high-rises, historic Grosse Pointe estates, Dearborn residences, and Livonia homes. We are fully versed in urban parking permits, building logistics, and historic preservation techniques.'
  },
  Macomb: {
    title: 'Macomb County Residential & Commercial Moves',
    desc: 'Covering Warren, Sterling Heights, St. Clair Shores, and Macomb County neighborhoods. We provide flat-rate and hourly moves backed by heavy-lift equipment to navigate lakefront homes, suburbs, and industrial facilities.'
  },
  Washtenaw: {
    title: 'Washtenaw County & University Transport',
    desc: 'Extending our premier services to Ann Arbor and Ypsilanti. Specialized in college student move-ins, U-M faculty relocations, historic homes, and long-distance departures with dedicated packaging and secure storage support.'
  }
};

// Specialized logistics descriptions
const SPECIALTY_GUIDES = [
  {
    icon: FaBuilding,
    title: 'High-Rise Condo Logistics',
    desc: 'Downtown and Midtown moves require meticulous scheduling. We coordinate with building associations, handle freight elevator bookings, protect narrow corridors with neoprene runners, and deliver Certificate of Insurance (COI) documents directly to building management within hours.',
    features: ['Freight elevator coordination', 'Certificate of Insurance (COI) provided', 'Corridor & wall protection systems']
  },
  {
    icon: FaHome,
    title: 'Historic Estate Care',
    desc: 'Moving in historic areas like Grosse Pointe or Palmer Park demands white-glove caution. We handle delicate custom-made banisters, narrow winding staircases, and historic plaster walls. Our crews pack antique furniture in triple-thick quilted blankets and secure items with custom wooden crating.',
    features: ['Triple-thick quilted blanketing', 'Antique & art crating specialists', 'Staircase & banister defense wrapping']
  },
  {
    icon: FaUniversity,
    title: 'Vibrant University Moves',
    desc: 'Moving to or from campuses in Ann Arbor (U-M) or Ypsilanti (EMU) can be hectic. We offer rapid-load moving packages matching student lease calendars, flexible scheduling during peak semesters, and secure short-term climate-controlled storage for transitional summer breaks.',
    features: ['Student & faculty moving discount', 'Lease calendar alignments', 'Transitional climate-controlled storage']
  },
  {
    icon: FaTools,
    title: 'Spacious Suburban Homes',
    desc: 'Large suburban properties in Troy, Novi, or Sterling Heights feature heavy furniture and multi-level planning. We deploy huge 26-foot moving trucks equipped with hydraulic lift gates. Our heavy-lift crews handle specialty pool table leveling, grand piano transport, and spa rigging.',
    features: ['Hydraulic lift gate trucks', 'Grand piano & pool table rigging', 'Full appliance disassembly & connection']
  }
];



// Travel & boundary FAQs
const SERVICE_FAQS = [
  {
    q: 'Do you charge travel fees for locations outside Oak Park?',
    a: 'We offer free travel zones for any moves starting within 10 miles of our Greenfield Rd office in Oak Park (including Royal Oak, Ferndale, and Southfield). For cities further out, we have a transparent, flat-rate travel fee (ranging from $45 to $145) to cover crew fuel and transit time, so you never see hidden surprise fees on your invoice.'
  },
  {
    q: 'Can you handle strict commercial and high-rise building regulations?',
    a: 'Absolutely. We regularly operate in Detroit high-rises and corporate centers. We coordinate directly with building managers, reserve loading docks, map out freight elevator schedules, and issue full Certificates of Insurance (COI) up to $2M in liability coverage at no extra charge.'
  },
  {
    q: 'Do you assist with obtaining city street parking permits?',
    a: 'While the homeowner is legally responsible for securing permits, our coordinators will advise you exactly which permits are needed based on your neighborhood (e.g., specific rules in Grosse Pointe or Downtown Detroit). We can supply truck dimensions, license plates, and transit arrival times to make your application seamless.'
  },
  {
    q: 'What is your bad weather policy for winter moves in Michigan?',
    a: 'Michigan winters are unpredictable, but we rarely cancel. Our trucks carry salt, shovels, snow-tarps, and heavy-duty carpet runners to protect your floors from slush, ice, and salt. If a severe blizzard makes driving unsafe, we coordinate with you to reschedule immediately at no penalty.'
  },
  {
    q: 'Do you perform out-of-state moves starting from Metro Detroit?',
    a: 'Yes. We are USDOT certified for interstate transport. Whether you are moving from Troy to Chicago, Dearborn to Florida, or Grosse Pointe to New York, we offer dedicated single-truck long-distance services with guaranteed delivery windows and flat-rate quotes.'
  }
];

export default function ServiceAreas() {
  // Reveal hook references for scroll-reveal animations
  const heroReveal = useReveal();
  const regionsReveal = useReveal();
  const specReveal = useReveal();
  const estimatorReveal = useReveal();
  const faqReveal = useReveal();

  // Tilt Hook for Interactive Estimator Result Card
  const resultCardRef = useTilt({ max: 4, scale: 1.01, glare: true });

  // Interactive County Tabs state
  const [activeCounty, setActiveCounty] = useState('Wayne');

  // Estimator widget state
  const [selectedLoc, setSelectedLoc] = useState('Downtown Detroit');

  // FAQ Accordion state
  const [openFaq, setOpenFaq] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Find the selected location for dynamic calculations
  const activeLocData = NEIGHBORHOODS_META.find(n => n.name === selectedLoc) || NEIGHBORHOODS_META[0];

  // Travel surcharge math
  const getTravelChargeLabel = (dist) => {
    if (dist < 10) return 'Free Travel (HQ Proximity)';
    if (dist <= 20) return '$45.00 Flat Travel Fee';
    if (dist <= 35) return '$95.00 Flat Travel Fee';
    return '$145.00 Out-of-Zone Surcharge';
  };

  // Dynamic cost range based on distance from Oak Park
  const getDynamicCostRange = (dist) => {
    let basePriceMin = 3 * 90; // Standard 2-mover minimum
    let basePriceMax = 6 * 125; // 3-mover standard limit
    let travelCharge = 0;
    
    if (dist >= 10 && dist <= 20) travelCharge = 45;
    else if (dist > 20 && dist <= 35) travelCharge = 95;
    else if (dist > 35) travelCharge = 145;

    return `$${basePriceMin + travelCharge} - $${basePriceMax + travelCharge}`;
  };

  // Filter locations by active county tab
  const filteredLocations = NEIGHBORHOODS_META.filter(n => n.county === activeCounty);

  return (
    <>
      <SEO
        title="Detroit Moving Service Areas -- Dearborn, Troy, Grosse Pointe, Ann Arbor & More | Ancient Movers"
        description="Ancient Movers covers 18+ Metro Detroit neighborhoods across Wayne, Oakland, Macomb, and Washtenaw counties. Calculate transit distance, crew size and travel fees instantly."
        canonical="https://ancientmovers.com/service-areas"
      />

      <div className="sa-page">
        {/* Starting background grid & floating particle effects */}
        <div className="sa-bg-grid" aria-hidden="true" />
        <div className="sa-particle sa-particle--1" aria-hidden="true" />
        <div className="sa-particle sa-particle--2" aria-hidden="true" />
        <div className="sa-particle sa-particle--3" aria-hidden="true" />

        {/* Dynamic Glow Blobs for premium ambiance */}
        <div className="sa-glow sa-glow--1" aria-hidden="true" />
        <div className="sa-glow sa-glow--2" aria-hidden="true" />
        <div className="sa-glow sa-glow--3" aria-hidden="true" />

        {/* ==========================================
            1. HERO SECTION
            ========================================== */}
        <section ref={heroReveal} className="reveal sa-hero">
          <video
            className="sa-hero__bg-video"
            src="/videos/reel-1.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <div className="sa-hero__bg-overlay" aria-hidden="true" />
          <div className="container">
            <nav className="sa-hero__crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <span>Service Areas</span>
            </nav>

            <h1>Metro Detroit <span>Service Areas</span> We Serve</h1>
            <p className="sa-hero__lead">
              Operating out of Oak Park, Michigan, Ancient Movers provides premium, licensed moving services across 18+ primary neighborhoods. Explore our regional guides, local parking restrictions, and estimate transit details dynamically.
            </p>

            <div className="sa-hero__stats">
              <div className="sa-hero__stat-card">
                <strong>18+</strong>
                <span>Active Cities Covered</span>
              </div>
              <div className="sa-hero__stat-card">
                <strong>0%</strong>
                <span>Travel Fee in Central Zone</span>
              </div>
              <div className="sa-hero__stat-card">
                <strong>100%</strong>
                <span>Licensed & Insured (USDOT)</span>
              </div>
              <div className="sa-hero__stat-card">
                <strong>5 ★</strong>
                <span>Google Community Rating</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            2. INTERACTIVE COVERAGE MAP (Leaflet component)
            ========================================== */}
        <AreasGrid withHeading={true} />

        {/* ==========================================
            3. REGIONAL BREAKDOWN TABS & CARDS
            ========================================== */}
        <section ref={regionsReveal} className="reveal sa-regions">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Interactive Directory</span>
              <h2>Detailed Suburb Boundaries &amp; Travel Specs</h2>
              <p>Select your county below to review exact transit specifications, local moving tips, and suggested crew configurations for your neighborhood.</p>
            </div>

            {/* Premium Pill Tabs */}
            <div className="sa-tabs-container">
              <div className="sa-tabs">
                {Object.keys(COUNTY_DETAILS).map((county) => (
                  <button
                    key={county}
                    className={`sa-tab-btn ${activeCounty === county ? 'active' : ''}`}
                    onClick={() => setActiveCounty(county)}
                  >
                    <FaMap /> {county} County
                  </button>
                ))}
              </div>
            </div>

            {/* Active County Description */}
            <div className="sa-region-intro">
              <h3>{COUNTY_DETAILS[activeCounty].title}</h3>
              <p>{COUNTY_DETAILS[activeCounty].desc}</p>
            </div>

            {/* Geographical Cards Grid */}
            <div className="sa-cards-grid">
              {filteredLocations.map((loc) => (
                <div key={loc.name} className="sa-location-card">
                  <div className="sa-card__visual">
                    <Photo
                      src={`/images/${loc.seed}.jpg`}
                      id={loc.id}
                      seed={loc.seed}
                      alt={loc.name}
                      className="sa-card__img"
                      w={400}
                      h={250}
                    />
                    <div className="sa-card__overlay" />
                    <span className="sa-card__dist-badge">
                      <FaRoute /> {loc.distance} miles from HQ
                    </span>
                    <div className="sa-card__header">
                      <h4>{loc.name}</h4>
                    </div>
                  </div>

                  <div className="sa-card__body">
                    <div className="sa-card__meta">
                      <span className="sa-card__meta-item">
                        <FaClock /> Avg. Transit: <strong>{loc.time}</strong>
                      </span>
                    </div>

                    <ul className="sa-card__specs">
                      <li>
                        <FaUserCheck />
                        <span>Suggested Rig: <strong>{loc.crew}</strong></span>
                      </li>
                      <li>
                        <FaShieldAlt />
                        <span>100% Cargo &amp; Property Protection Included</span>
                      </li>
                    </ul>

                    {/* Local Tip Box */}
                    <div className="sa-card__tip">
                      <FaInfoCircle />
                      <span><strong>Local Tip:</strong> {loc.tip}</span>
                    </div>

                    <Link to={`/contact?area=${loc.name}`} className="sa-card__cta">
                      Book Move in {loc.name} <FaArrowRight />
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ==========================================
            4. NEIGHBORHOOD LOGISTICS & SPECIALTIES
            ========================================== */}
        <section ref={specReveal} className="reveal sa-specialties">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">White-Glove Adaptability</span>
              <h2>Logistical Experts for Every Neighborhood</h2>
              <p>From towering Downtown high-rises to sprawling Grosse Pointe estates, we custom-tailor our moving tools, blankets, and certifications to match your building style.</p>
            </div>

            <div className="sa-spec-grid">
              {SPECIALTY_GUIDES.map((spec) => {
                const Icon = spec.icon;
                return (
                  <div key={spec.title} className="sa-spec-card">
                    <div className="sa-spec-icon">
                      <Icon />
                    </div>
                    <div className="sa-spec-content">
                      <h3>{spec.title}</h3>
                      <p>{spec.desc}</p>
                      <ul className="sa-spec-features">
                        {spec.features.map((feat) => (
                          <li key={feat}>
                            <FaCheckCircle /> {feat}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==========================================
            5. INTERACTIVE TRANSIT & CREW ESTIMATOR WIDGET
            ========================================== */}
        <section ref={estimatorReveal} className="reveal sa-estimator">
          <div className="container">
            <div className="section-head">
              <span className="eyebrow">Distance &amp; Rate Utility</span>
              <h2>Real-Time Suburb Transit Estimator</h2>
              <p>Choose your city below to instantly calculate typical driving distance, estimated travel charges, average arrival windows, and suggested moving setups.</p>
            </div>

            <div className="sa-estimator__layout">
              {/* Form Select Box */}
              <div className="sa-estimator__controls">
                <h3>
                  <FaMapMarkerAlt /> Choose Your Suburb
                </h3>
                <div className="sa-estimator__group">
                  <label htmlFor="est-loc">1. Select Detroit Neighborhood:</label>
                  <select
                    id="est-loc"
                    className="sa-estimator__select"
                    value={selectedLoc}
                    onChange={(e) => setSelectedLoc(e.target.value)}
                  >
                    {NEIGHBORHOODS_META.map((n) => (
                      <option key={n.name} value={n.name}>
                        {n.name} ({n.county} County)
                      </option>
                    ))}
                  </select>
                </div>

                <div className="sa-estimator__group" style={{ display: 'flex', gap: '16px', alignItems: 'center', background: 'rgba(0,0,0,0.02)', padding: '16px 20px', borderRadius: '12px', border: '1px solid rgba(0,0,0,0.06)' }}>
                  <FaInfoCircle style={{ color: 'var(--orange-400)', fontSize: '1.25rem', flexShrink: 0 }} />
                  <span style={{ fontSize: '0.85rem', color: 'rgba(17,24,39,0.75)', lineHeight: '1.4' }}>
                    <strong>HQ Proximity:</strong> All calculations are processed relative to our Greenfield Rd facility in Oak Park, MI.
                  </span>
                </div>
              </div>

              {/* Tilted Glassmorphic Receipt Card */}
              <div ref={resultCardRef} className="sa-estimator__result">
                <div className="sa-estimator__res-header">
                  <span>Estimated Pricing Bracket</span>
                  <strong className="sa-estimator__price">
                    {getDynamicCostRange(activeLocData.distance)}
                    <span> / base local estimate</span>
                  </strong>
                </div>

                <div className="sa-estimator__res-grid">
                  <div className="sa-estimator__res-item">
                    <span>Driving Distance</span>
                    <strong>{activeLocData.distance} miles</strong>
                  </div>
                  <div className="sa-estimator__res-item">
                    <span>Est. Travel Time</span>
                    <strong>{activeLocData.time}</strong>
                  </div>
                </div>

                <div className="sa-estimator__rec-box">
                  <span className="sa-estimator__rec-title">Travel Charge Class:</span>
                  <p className="sa-estimator__rec-desc">{getTravelChargeLabel(activeLocData.distance)}</p>
                </div>

                <div className="sa-estimator__rec-box" style={{ background: 'rgba(0,0,0,0.02)', border: '1px solid rgba(0,0,0,0.05)' }}>
                  <span className="sa-estimator__rec-title" style={{ color: 'rgba(17,24,39,0.5)' }}>Suggested Local Setup:</span>
                  <p className="sa-estimator__rec-desc" style={{ color: '#111827' }}>{activeLocData.crew}</p>
                </div>

                <Link
                  to={`/contact?area=${activeLocData.name}&dist=${activeLocData.distance}`}
                  className="sa-estimator__btn"
                >
                  Book Move in {activeLocData.name} <FaArrowRight />
                </Link>

                <span className="sa-estimator__subtext">
                  Pricing range represents a standard 3-6 hour moving template including travel surcharge. Final customized estimates are 100% free.
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            6. LOCAL NEIGHBORS TESTIMONIALS Carousel
            ========================================== */}
        <Testimonials 
          eyebrow="Proven Experience" 
          title={<>What <span>Our Neighbors</span> Say</>} 
          subtitle="Hear directly from satisfied partners and families across Southeast Michigan who rated Ancient Movers 5/5 stars." 
        />

        {/* ==========================================
            7. TRAVEL FAQs SECTION
            ========================================== */}
        <section ref={faqReveal} className="reveal sa-faqs">
          <div className="container sa-faqs__inner">
            <div className="section-head">
              <span className="eyebrow">Transit &amp; Boundary Details</span>
              <h2>Frequently Asked Travel Questions</h2>
              <p>Everything you need to know about parking permits, weather exceptions, Certificates of Insurance, and travel distance charges in Michigan.</p>
            </div>

            <div className="sa-faqs__accordion">
              {SERVICE_FAQS.map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.q}
                    className={`sa-faq-item ${isOpen ? 'active' : ''}`}
                  >
                    <button
                      className="sa-faq-btn"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <FaChevronDown style={{ transform: isOpen ? 'rotate(180deg)' : 'none' }} />
                    </button>
                    <div className="sa-faq-panel">
                      <div className="sa-faq-content">
                        <p>{faq.a}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </section>
      </div>
    </>
  );
}
