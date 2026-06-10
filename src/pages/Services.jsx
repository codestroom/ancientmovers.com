import { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  FaHome,
  FaBuilding,
  FaUserFriends,
  FaMusic,
  FaBoxOpen,
  FaTruck,
  FaHotTub,
  FaTable,
  FaTools,
  FaWarehouse,
  FaArchive,
  FaCheck,
  FaArrowRight,
  FaPlus,
  FaCalculator,
  FaRegCalendarCheck,
  FaShieldAlt,
  FaClock,
  FaHourglassHalf,
  FaDollarSign,
  FaDolly
} from 'react-icons/fa';
import SEO from '../components/SEO.jsx';
import Photo from '../components/Photo.jsx';
import { SERVICES, MOVING_PACKAGES, FAQS } from '../data/siteData.js';
import useReveal from '../hooks/useReveal.js';
import useTilt from '../hooks/useTilt.js';
import './Services.css';

// Map icon names to react-icons components
const ICONS = {
  home:           FaHome,
  building:       FaBuilding,
  'user-friends': FaUserFriends,
  music:          FaMusic,
  box:            FaBoxOpen,
  truck:          FaTruck,
  'hot-tub':      FaHotTub,
  table:          FaTable,
  tools:          FaTools,
  warehouse:      FaWarehouse,
  archive:        FaArchive
};

// Map each service to its category for filtering
const getServiceCategory = (title) => {
  const t = title.toLowerCase();
  if (t.includes('residential') || t.includes('commercial') || t.includes('senior') || t.includes('long distance')) {
    return 'full';
  }
  if (t.includes('piano') || t.includes('hot tub') || t.includes('pool table')) {
    return 'specialty';
  }
  return 'convenience';
};

export default function Services() {
  // Reveal hook references for scroll-animations
  const heroReveal = useReveal();
  const showcaseReveal = useReveal();
  const calcReveal = useReveal();
  const packageReveal = useReveal();
  const spotlightReveal = useReveal();
  const faqReveal = useReveal();

  // Tilt Hook for Interactive Estimator
  const calcCardRef = useTilt({ max: 5, scale: 1.01, glare: true });

  // 1. Service Filter State
  const [activeCategory, setActiveCategory] = useState('all');

  // 2. Estimator State
  const [homeSize, setHomeSize] = useState(1); // 0 = Studio, 1 = 1-2 Bed, 2 = 3 Bed, 3 = 4+ Bed, 4 = Commercial
  const [distance, setDistance] = useState(10); // miles
  const [needPacking, setNeedPacking] = useState(false);
  const [hasPiano, setHasPiano] = useState(false);
  const [hasHotTub, setHasHotTub] = useState(false);
  const [hasPoolTable, setHasPoolTable] = useState(false);

  // 3. FAQ Accordion State (stores index of open item, or null)
  const [openFaq, setOpenFaq] = useState(null);

  // Toggle FAQ item
  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // 4. Calculator Estimation Logic
  const getHomeSizeLabel = (val) => {
    switch (val) {
      case 0: return 'Studio Apartment';
      case 1: return '1 - 2 Bedroom Home';
      case 2: return '3 Bedroom House';
      case 3: return '4+ Bedroom Estate';
      case 4: return 'Commercial / Office';
      default: return '';
    }
  };

  const getDistanceLabel = (val) => {
    if (val < 15) return `Local Move (${val} mi)`;
    if (val <= 50) return `Metro Detroit (${val} mi)`;
    return `Long Distance (${val} mi)`;
  };

  const calculateEstimate = () => {
    if (homeSize === 4) {
      return {
        isCommercial: true,
        package: 'Commercial Relocation Package',
        crew: 'Custom Tailored Crew & Rigging',
        hours: 'Custom Survey Required',
        priceRange: 'Custom Quote Only'
      };
    }

    // Base variables based on house size
    let hourlyRate = 95;
    let baseHoursMin = 3;
    let baseHoursMax = 5;
    let recommendedPkg = MOVING_PACKAGES[0]; // default 2 movers

    if (homeSize === 0) {
      hourlyRate = 95; // 2 movers
      baseHoursMin = 3;
      baseHoursMax = 5;
      recommendedPkg = MOVING_PACKAGES[0];
    } else if (homeSize === 1) {
      hourlyRate = 125; // 3 movers
      baseHoursMin = 4;
      baseHoursMax = 6;
      recommendedPkg = MOVING_PACKAGES[1];
    } else if (homeSize === 2) {
      hourlyRate = 125; // 3 movers
      baseHoursMin = 6;
      baseHoursMax = 8;
      recommendedPkg = MOVING_PACKAGES[1];
    } else if (homeSize === 3) {
      hourlyRate = 160; // 4 movers
      baseHoursMin = 8;
      baseHoursMax = 12;
      recommendedPkg = MOVING_PACKAGES[2];
    }

    // Extra hours for packing services
    let packingHours = 0;
    if (needPacking) {
      packingHours = homeSize === 0 ? 2 : homeSize === 1 ? 3 : homeSize === 2 ? 4 : 5;
    }

    const totalHoursMin = baseHoursMin + packingHours;
    const totalHoursMax = baseHoursMax + packingHours;

    // Travel / fuel fee
    let travelFee = 0;
    if (distance >= 15 && distance <= 50) {
      travelFee = 95;
    } else if (distance > 50) {
      travelFee = 320; // Long distance surcharge
    }

    // Specialty item flat surcharges
    let specialtySurcharge = 0;
    if (hasPiano) specialtySurcharge += 250;
    if (hasHotTub) specialtySurcharge += 450;
    if (hasPoolTable) specialtySurcharge += 300;

    // Calculate prices
    let minPrice = (totalHoursMin * hourlyRate) + travelFee + specialtySurcharge;
    let maxPrice = (totalHoursMax * hourlyRate) + travelFee + specialtySurcharge;

    // Rounding to clean increments of 5
    minPrice = Math.round(minPrice / 5) * 5;
    maxPrice = Math.round(maxPrice / 5) * 5;

    return {
      isCommercial: false,
      package: recommendedPkg.label,
      crew: recommendedPkg.label.split('+')[1]?.trim() || `${homeSize + 2} Professional Movers`,
      hours: `${totalHoursMin} - ${totalHoursMax} Hrs`,
      priceRange: `$${minPrice} - $${maxPrice}`,
      longDistanceNote: distance > 50
    };
  };

  const estimate = calculateEstimate();

  return (
    <>
      <SEO
        title="Moving Services in Detroit, MI -- Redesigned Services | Ancient Movers"
        description="Ancient Movers full-range Detroit moving services. Redesigned with interactive calculators, filterable services, and transparent packages. Licensed & Insured."
        canonical="https://ancientmovers.com/services"
      />

      <div className="services-page">
        {/* Glow Blobs for premium atmosphere */}
        <div className="srv-glow srv-glow--1" aria-hidden="true" />
        <div className="srv-glow srv-glow--2" aria-hidden="true" />
        <div className="srv-glow srv-glow--3" aria-hidden="true" />

        {/* ==========================================
            1. HERO SECTION
            ========================================== */}
        <section ref={heroReveal} className="reveal srv-hero">
          <video
            className="srv-hero__bg-video"
            src="/videos/reel-4.mp4"
            autoPlay
            muted
            loop
            playsInline
            preload="auto"
            aria-hidden="true"
          />
          <div className="srv-hero__bg-overlay" aria-hidden="true" />
          <div className="container srv-hero__inner">
            <nav className="srv-hero__crumbs" aria-label="Breadcrumb">
              <Link to="/">Home</Link>
              <span className="sep">/</span>
              <span>Services</span>
            </nav>

            <h1>Our Premium <span>Moving Solutions</span></h1>
            <p className="srv-hero__lead">
              From packing fragile glassware to relocating massive hot tubs or complete corporate offices — we execute every move across Detroit with precision, safety, and unmatched customer care.
            </p>

            <div className="srv-hero__stats">
              <div className="srv-hero__stat-card">
                <strong>USDOT</strong>
                <span>Certified & Insured</span>
              </div>
              <div className="srv-hero__stat-card">
                <strong>5 ★</strong>
                <span>Google Rating</span>
              </div>
              <div className="srv-hero__stat-card">
                <strong>2,100+</strong>
                <span>Five-Star Reviews</span>
              </div>
              <div className="srv-hero__stat-card">
                <strong>5M+</strong>
                <span>KMs Travelled</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            2. INTERACTIVE FILTERABLE SERVICES
            ========================================== */}
        <section ref={showcaseReveal} className="reveal srv-showcase">
          <div className="container">
            <div className="section-head text-center">
              <span className="eyebrow">Interactive Portfolio</span>
              <h2>Services Specially Crafted For You</h2>
              <p>Filter through our service menu to find the exact moving solutions that meet your needs, backed by professional equipment.</p>
            </div>

            {/* Filter buttons */}
            <div className="srv-filters">
              <button
                className={`srv-filter-btn ${activeCategory === 'all' ? 'active' : ''}`}
                onClick={() => setActiveCategory('all')}
              >
                Show All Services
              </button>
              <button
                className={`srv-filter-btn ${activeCategory === 'full' ? 'active' : ''}`}
                onClick={() => setActiveCategory('full')}
              >
                <FaTruck /> Full moves
              </button>
              <button
                className={`srv-filter-btn ${activeCategory === 'specialty' ? 'active' : ''}`}
                onClick={() => setActiveCategory('specialty')}
              >
                <FaMusic /> Specialty moves
              </button>
              <button
                className={`srv-filter-btn ${activeCategory === 'convenience' ? 'active' : ''}`}
                onClick={() => setActiveCategory('convenience')}
              >
                <FaBoxOpen /> Convenience Add-ons
              </button>
            </div>

            {/* Services Grid */}
            <div className="srv-grid">
              {SERVICES.map((s, index) => {
                const category = getServiceCategory(s.title);
                const isHidden = activeCategory !== 'all' && activeCategory !== category;
                const IconComponent = ICONS[s.icon] || FaTruck;
                const cardPhoto = s.photoAlt || s.photo;

                return (
                  <div
                    key={s.title}
                    className={`srv-card-wrap ${isHidden ? 'hidden' : ''}`}
                  >
                    <article className="srv-card">
                      <div className="srv-card__visual">
                        <Photo
                          src={cardPhoto.src}
                          seed={cardPhoto.seed}
                          alt={s.title}
                          className="srv-card__img"
                          w={900}
                          h={600}
                          style={cardPhoto.focus ? { objectPosition: cardPhoto.focus } : undefined}
                        />
                        <div className="srv-card__overlay" />
                        <span className="srv-card__badge">{category === 'full' ? 'Full Move' : category === 'specialty' ? 'Specialty' : 'Convenience'}</span>
                        <div className="srv-card__icon">
                          <IconComponent />
                        </div>
                      </div>

                      <div className="srv-card__body">
                        <h3>{s.title}</h3>
                        <p className="srv-card__desc">{s.desc}</p>

                        <ul className="srv-card__features">
                          {s.features.slice(0, 3).map((f) => (
                            <li key={f}>
                              <FaCheck /> {f}
                            </li>
                          ))}
                        </ul>

                        <Link to="/contact" className="srv-card__cta">
                          Book This Service <FaArrowRight />
                        </Link>
                      </div>
                    </article>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==========================================
            3. INTERACTIVE ESTIMATOR (CALCULATOR)
            ========================================== */}
        <section ref={calcReveal} className="reveal srv-calc">
          <div className="container">
            <div className="section-head text-center">
              <span className="eyebrow">Real-Time Estimator</span>
              <h2>Calculate Your Detroit Move Cost</h2>
              <p>Adjust the sliders below to estimate your labor hours, recommended moving package, and pricing instantly. Transparent local rates with zero hidden fees.</p>
            </div>

            <div className="srv-calc__layout">
              {/* Estimator Controls */}
              <div className="srv-calc__controls">
                <h3>
                  <FaCalculator /> Move Specifications
                </h3>

                {/* 1. Home Size Slider */}
                <div className="srv-calc__group">
                  <label htmlFor="calc-homesize">
                    <span>1. Select Home Size:</span>
                    <span className="srv-calc__val">{getHomeSizeLabel(homeSize)}</span>
                  </label>
                  <input
                    id="calc-homesize"
                    type="range"
                    min="0"
                    max="4"
                    step="1"
                    value={homeSize}
                    onChange={(e) => setHomeSize(parseInt(e.target.value))}
                    className="srv-calc__slider"
                  />
                </div>

                {/* 2. Distance Slider */}
                <div className="srv-calc__group">
                  <label htmlFor="calc-distance">
                    <span>2. Estimate Distance:</span>
                    <span className="srv-calc__val">{getDistanceLabel(distance)}</span>
                  </label>
                  <input
                    id="calc-distance"
                    type="range"
                    min="5"
                    max="100"
                    step="5"
                    value={distance}
                    onChange={(e) => setDistance(parseInt(e.target.value))}
                    className="srv-calc__slider"
                  />
                </div>

                {/* 3. Add-on Options */}
                <div className="srv-calc__group">
                  <label>3. Premium Moving Add-ons:</label>
                  <div className="srv-calc__checkboxes">
                    {/* Packing Service */}
                    <div className="srv-calc__checkbox" onClick={() => setNeedPacking(!needPacking)}>
                      <input
                        type="checkbox"
                        checked={needPacking}
                        onChange={() => {}} // handled by parent div click
                        aria-label="Include Full Packing Service"
                      />
                      <div className="srv-calc__check-text">
                        <strong>Full Packing Services</strong>
                        <span>We provide professional boxes, shrink wrap, and pack everything.</span>
                      </div>
                    </div>

                    {/* Piano */}
                    <div className="srv-calc__checkbox" onClick={() => setHasPiano(!hasPiano)}>
                      <input
                        type="checkbox"
                        checked={hasPiano}
                        onChange={() => {}} // handled by parent div click
                        aria-label="Include Piano Moving"
                      />
                      <div className="srv-calc__check-text">
                        <strong>Moving an Upright / Grand Piano</strong>
                        <span>Requires custom skid boards, ramps, and specialty straps.</span>
                      </div>
                    </div>

                    {/* Hot Tub */}
                    <div className="srv-calc__checkbox" onClick={() => setHasHotTub(!hasHotTub)}>
                      <input
                        type="checkbox"
                        checked={hasHotTub}
                        onChange={() => {}} // handled by parent div click
                        aria-label="Include Hot Tub Moving"
                      />
                      <div className="srv-calc__check-text">
                        <strong>Moving a Hot Tub / Spa</strong>
                        <span>Requires dedicated spa dollies and extra heavy lifts.</span>
                      </div>
                    </div>

                    {/* Pool Table */}
                    <div className="srv-calc__checkbox" onClick={() => setHasPoolTable(!hasPoolTable)}>
                      <input
                        type="checkbox"
                        checked={hasPoolTable}
                        onChange={() => {}} // handled by parent div click
                        aria-label="Include Pool Table Moving"
                      />
                      <div className="srv-calc__check-text">
                        <strong>Moving a Pool Table</strong>
                        <span>Includes full disassembly, slate leveling, and re-felting.</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Dynamic Results Box */}
              <div ref={calcCardRef} className="tilt srv-calc__result-card">
                <div className="srv-calc__res-head">
                  <span>Moving Cost Estimate</span>
                  {estimate.isCommercial ? (
                    <strong className="srv-calc__price">Free Survey<span>Needed</span></strong>
                  ) : (
                    <strong className="srv-calc__price">
                      {estimate.priceRange}
                      <span>/ total range</span>
                    </strong>
                  )}
                </div>

                <div className="srv-calc__res-grid">
                  <div className="srv-calc__res-item">
                    <span>Crew Size</span>
                    <strong>{estimate.isCommercial ? 'TBD' : estimate.crew}</strong>
                  </div>
                  <div className="srv-calc__res-item">
                    <span>Estimated Hours</span>
                    <strong>{estimate.hours}</strong>
                  </div>
                </div>

                <div className="srv-calc__rec">
                  <span className="srv-calc__rec-title">Recommended Crew Rig:</span>
                  <p className="srv-calc__rec-desc">
                    {estimate.isCommercial 
                      ? 'Professional On-Site Survey and Logistics Blueprint' 
                      : `${estimate.package} - Ideal for ${getHomeSizeLabel(homeSize)}`}
                  </p>
                </div>

                {estimate.longDistanceNote && (
                  <div style={{ background: 'rgba(247,146,30,0.15)', border: '1px solid rgba(247,146,30,0.3)', padding: '12px 16px', borderRadius: '10px', fontSize: '0.8rem', color: '#ffb966', marginBottom: '24px', lineHeight: '1.4' }}>
                    <strong>Note:</strong> Moves over 50 miles qualify as long distance. Flat rates with a dedicated move coordinator are highly recommended for out-of-state hauls.
                  </div>
                )}

                <Link
                  to={`/contact?size=${homeSize}&packing=${needPacking}&piano=${hasPiano}&hottub=${hasHotTub}&pooltable=${hasPoolTable}`}
                  className="btn btn-primary btn-lg srv-calc__submit"
                >
                  Book This Estimate Package <FaArrowRight />
                </Link>
                <span className="srv-calc__subtext">Prices are non-binding estimates based on average loading volumes. Custom estimates are always free.</span>
              </div>
            </div>
          </div>
        </section>

        {/* ==========================================
            4. MOVING CREW PACKAGES
            ========================================== */}
        <section ref={packageReveal} className="reveal srv-packages">
          <div className="container">
            <div className="section-head text-center">
              <span className="eyebrow">Choose Your Crew</span>
              <h2>Transparent Crew Packages</h2>
              <p>Select the standard truck and professional mover packages. Standard packing supplies and safety gear are included with every single booking.</p>
            </div>

            <div className="packages-grid">
              {MOVING_PACKAGES.map((pkg) => {
                const isPopular = pkg.popular;
                return (
                  <div
                    key={pkg.label}
                    className={`package-card ${isPopular ? 'package-card--popular' : ''}`}
                  >
                    {isPopular && <div className="package-card__badge-pop">Most Popular Package</div>}
                    
                    <h3 className="package-card__label">{pkg.label}</h3>
                    <p className="package-card__best">Best suited for: <strong>{pkg.best}</strong></p>

                    <ul className="package-card__features">
                      {pkg.includes.map((inc) => (
                        <li key={inc}>
                          <FaCheck /> {inc}
                        </li>
                      ))}
                    </ul>

                    <Link to="/contact" className={`btn ${isPopular ? 'btn-primary' : 'btn-secondary'} package-card__cta`}>
                      Select Package <FaArrowRight />
                    </Link>
                  </div>
                );
              })}
            </div>
          </div>
        </section>

        {/* ==========================================
            5. SPECIALTY MOVING SPOTLIGHT
            ========================================== */}
        <section ref={spotlightReveal} className="reveal srv-spotlight">
          <div className="container srv-spotlight__grid">
            {/* Visual Block */}
            <div className="srv-spotlight__visual">
              <Photo
                src="/images/piano.jpg"
                seed="piano"
                alt="Piano and heavy specialty moving"
                className="srv-spotlight__img"
              />
              <div className="srv-spotlight__overlay" />
              <div className="srv-spotlight__vis-card">
                <h4>Specialized Rigging & Trucks</h4>
                <p>Equipped with lift gates, heavy-duty skid boards, air-ride suspension, and heavy transport straps to move items safely.</p>
              </div>
            </div>

            {/* Content Column */}
            <div className="srv-spotlight__content">
              <span className="eyebrow">The Heavy Lifters</span>
              <h2>Specialty Moving Experts</h2>
              <p>
                Not all moving companies are equipped to handle ultra-heavy, fragile, or highly complex items. At Ancient Movers, we employ dedicated heavy-lift technicians trained specifically in moving items that exceed 500 lbs. We prevent damage to your item, your floors, and your back.
              </p>

              <div className="srv-spotlight__points">
                <div className="srv-spotlight__pt">
                  <FaShieldAlt />
                  <div className="srv-spotlight__pt-text">
                    <strong>Floor & Door Protection</strong>
                    <span>We lay neoprene runners and wrap frames before lifting.</span>
                  </div>
                </div>
                <div className="srv-spotlight__pt">
                  <FaDolly />
                  <div className="srv-spotlight__pt-text">
                    <strong>Specialized Dollies</strong>
                    <span>Spa-sleds and piano boards rated for 2,000+ lbs.</span>
                  </div>
                </div>
                <div className="srv-spotlight__pt">
                  <FaClock />
                  <div className="srv-spotlight__pt-text">
                    <strong>Leveling & Assembly</strong>
                    <span>Pool table felt inspection and precise slate leveling.</span>
                  </div>
                </div>
                <div className="srv-spotlight__pt">
                  <FaRegCalendarCheck />
                  <div className="srv-spotlight__pt-text">
                    <strong>Guaranteed Safe Arrival</strong>
                    <span>Fully licensed and bonded cargo transit insurance.</span>
                  </div>
                </div>
              </div>

              <Link to="/contact" className="btn btn-primary btn-lg">
                Book a Specialty Move <FaArrowRight />
              </Link>
            </div>
          </div>
        </section>

        {/* ==========================================
            6. SERVICE FAQS SECTION
            ========================================== */}
        <section ref={faqReveal} className="reveal srv-faqs">
          <div className="container srv-faqs__inner">
            <div className="section-head text-center">
              <span className="eyebrow">Frequently Asked</span>
              <h2>Service Questions</h2>
              <p>Everything you need to know about booking, rates, packing supplies, and specialty moves across the Metro Detroit region.</p>
            </div>

            <div className="srv-faqs__accordion">
              {FAQS.slice(0, 6).map((faq, index) => {
                const isOpen = openFaq === index;
                return (
                  <div
                    key={faq.q}
                    className={`srv-faq-item ${isOpen ? 'active' : ''}`}
                  >
                    <button
                      className="srv-faq-btn"
                      onClick={() => toggleFaq(index)}
                      aria-expanded={isOpen}
                    >
                      <span>{faq.q}</span>
                      <FaPlus />
                    </button>
                    <div className="srv-faq-panel">
                      <div className="srv-faq-content">
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
