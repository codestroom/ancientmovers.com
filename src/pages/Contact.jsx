import { useState } from 'react';
import { 
  FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaArrowRight, FaArrowLeft, 
  FaClipboard, FaCheckCircle, FaUser, FaInfoCircle, FaCalendarAlt, FaSlidersH, 
  FaMapMarkedAlt, FaMapPin, FaCheck, FaTruck, FaShieldAlt, FaComments 
} from 'react-icons/fa';
import SEO from '../components/SEO.jsx';
import PageHero from './PageHero.jsx';
import Photo from '../components/Photo.jsx';
import { SITE } from '../data/siteData.js';
import useReveal from '../hooks/useReveal.js';
import './Contact.css';

// Dynamic calculations lookup
const HOME_SIZES = {
  'Studio / 1 Bedroom': { complexity: 25, duration: '2 - 4 Hours', crew: '2 Movers + 26\' Truck', price: '$270 - $450', level: 'Simple Move' },
  '2 Bedroom': { complexity: 55, duration: '4 - 6 Hours', crew: '3 Movers + 26\' Truck', price: '$450 - $650', level: 'Standard Move' },
  '3 Bedroom': { complexity: 78, duration: '6 - 8 Hours', crew: '3 - 4 Movers + 26\' Truck', price: '$720 - $1,100', level: 'Substantial Move' },
  '4+ Bedroom': { complexity: 95, duration: '8 - 12 Hours', crew: '4 Movers + Lead Mover + 26\' Truck', price: '$1,200 - $1,800', level: 'Complex Logistics' },
  'Office / Commercial': { complexity: 85, duration: 'Flexible Schedule', crew: '4+ Movers + Dedicated Dispatch Lead', price: 'Custom Flat-Rate', level: 'Commercial Logistics' }
};

const SERVICES_DETAILS = {
  'Residential Moving': { extraComplexity: 0, multiplier: 1.0 },
  'Commercial / Office': { extraComplexity: 10, multiplier: 1.15 },
  'Packing & Unpacking': { extraComplexity: -10, multiplier: 0.8 },
  'Long Distance': { extraComplexity: 15, multiplier: 1.3 },
  'Storage': { extraComplexity: -15, multiplier: 0.7 },
  'Specialty (Piano, Pool Table, Hot Tub)': { extraComplexity: 20, multiplier: 1.25 },
  'Senior Moving': { extraComplexity: 5, multiplier: 1.05 }
};

// Metro Detroit interactive map nodes
const MAP_LOCATIONS = [
  { name: 'Oak Park (HQ)', cx: 250, cy: 180, isHq: true, status: 'Main Logistics Dispatch Hub', availability: '24 Crews Active Today', note: 'Central staging warehouse, office, and coordination center.' },
  { name: 'Downtown Detroit', cx: 320, cy: 260, status: 'High Crew Density', availability: '6 Crews Active Today', note: 'Specialists in high-rise lofts, freight elevators, and Corktown historic homes.' },
  { name: 'Dearborn', cx: 200, cy: 290, status: 'High Availability', availability: '4 Crews Active Today', note: 'Daily residential relocations around Ford HQ, Fairlane, and West Dearborn.' },
  { name: 'Warren', cx: 340, cy: 150, status: 'Normal Availability', availability: '3 Crews Active Today', note: 'Swift local service across Macomb county neighborhoods.' },
  { name: 'Sterling Heights', cx: 360, cy: 80, status: 'High Availability', availability: '4 Crews Active Today', note: 'Regular runs near Lakeside, Utica, and northern suburbs.' },
  { name: 'Livonia', cx: 130, cy: 240, status: 'Normal Availability', availability: '3 Crews Active Today', note: 'Providing standard local rate moves across Livonia and Westland.' },
  { name: 'Southfield', cx: 180, cy: 160, status: 'Immediate Openings', availability: '5 Crews Active Today', note: 'Close access to major freeways. Next-day bookings frequently available.' },
  { name: 'Troy', cx: 270, cy: 80, status: 'High Demand', availability: '5 Crews Active Today', note: 'Specialized wrapping for executive estates and luxury residential moves.' },
  { name: 'Farmington Hills', cx: 110, cy: 140, status: 'Normal Availability', availability: '3 Crews Active Today', note: 'Experienced crews available for suburban homes and townhouses.' },
  { name: 'Royal Oak', cx: 270, cy: 140, status: 'Immediate Openings', availability: '4 Crews Active Today', note: 'Quick response moving for downtown lofts, bungalows, and Ferndale.' },
  { name: 'Grosse Pointe', cx: 420, cy: 220, status: 'High Demand', availability: '2 Crews Active Today', note: 'Specialty heavy-lift teams for historic lakefront mansions and antiques.' },
  { name: 'Ann Arbor', cx: 60, cy: 320, status: 'Scheduled Daily Trips', availability: '3 Crews Active Today', note: 'Special student-friendly rates and cross-county moves near U of M.' }
];

const COORDINATORS = [
  { name: 'Sarah Jenkins', role: 'Relocation Coordinator Lead', bio: 'Helped plan over 1,500 Detroit residential moves. Expert in navigating Grosse Pointe historic home rules.', avatarId: '1573496359142-b8d87734a5a2', seed: 'team-sarah' },
  { name: 'Marcus Brooks', role: 'Logistics & Dispatch Manager', bio: 'Keeps our 26\' fleet on schedule and ensures crews are fully equipped for any Detroit weather.', avatarId: '1560250097-0b93528c311a', seed: 'team-marcus' },
  { name: 'Elena Rostova', role: 'Specialty Moves Coordinator', bio: 'Handles heavy-lift logistics for pianos, pool tables, hot tubs, and valuable fine art pieces.', avatarId: '1580489944761-15a19d654956', seed: 'team-elena' }
];

const FAQS_LIST = [
  { q: 'How is the dynamic quote estimate calculated?', a: 'Our online calculator provides an upfront bracket based on standard local Detroit hourly rates ($90/hour for 2 movers and a fully equipped truck) and average loading times. A dedicated coordinator will verify details like stairs, heavy items, and mileage to send an exact flat-rate or hourly binding quote within 1 hour!' },
  { q: 'Are you licensed and insured in Michigan?', a: 'Absolutely. Ancient Movers is fully licensed, bonded, and insured with USDOT. We carry active cargo insurance, general liability, and worker\'s compensation to guarantee total safety for your belongings.' },
  { q: 'How far in advance should I book my move?', a: 'For peak seasons (May through September), we recommend locking in your date 4 to 6 weeks in advance. For off-peak months, 2 to 3 weeks is usually sufficient, though we do accommodate last-minute Detroit emergencies whenever a crew is open.' },
  { q: 'Do you move heavy specialty items?', a: 'Yes! We specialize in heavy and delicate cargo. We have dedicated lift kits, straps, and protective padding for baby grand/upright pianos, full-size slate pool tables, and residential hot tubs.' },
  { q: 'What is your cancellation or rescheduling policy?', a: 'We offer flexible rescheduling! As long as you notify us at least 48 hours prior to your scheduled move date, we will move your reservation to a new slot free of charge, subject to calendar availability.' }
];

export default function Contact() {
  const [formStep, setFormStep] = useState(1);
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    date: '',
    from: '',
    to: '',
    size: '',
    service: '',
    msg: ''
  });
  
  const [activeMapNode, setActiveMapNode] = useState(MAP_LOCATIONS[0]);
  const [copyStatus, setCopyStatus] = useState({ phone: false, email: false });
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [activeFaq, setActiveFaq] = useState(null);

  const sectionReveal = useReveal();
  const mapReveal = useReveal();
  const heroesReveal = useReveal();
  const faqReveal = useReveal();

  const handleInputChange = (e) => {
    const { id, value } = e.target;
    const key = id.replace('c-', '');
    setFormData(prev => ({ ...prev, [key]: value }));
  };

  const selectHomeSize = (size) => {
    setFormData(prev => ({ ...prev, size }));
  };

  const selectService = (service) => {
    setFormData(prev => ({ ...prev, service }));
  };

  const triggerCopy = (text, type) => {
    navigator.clipboard.writeText(text);
    setCopyStatus(prev => ({ ...prev, [type]: true }));
    setTimeout(() => {
      setCopyStatus(prev => ({ ...prev, [type]: false }));
    }, 2000);
  };

  const validateStep = (stepNumber) => {
    if (stepNumber === 1) {
      return formData.from.trim() !== '' && formData.to.trim() !== '' && formData.date !== '';
    }
    if (stepNumber === 2) {
      return formData.size !== '' && formData.service !== '';
    }
    return true;
  };

  const handleNextStep = () => {
    if (validateStep(formStep)) {
      setFormStep(prev => prev + 1);
    }
  };

  const handlePrevStep = () => {
    setFormStep(prev => prev - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.email) {
      setFormSubmitted(true);
    }
  };

  // Live calculator estimations
  const sizeData = HOME_SIZES[formData.size] || { complexity: 0, duration: 'N/A', crew: 'Select size', price: 'TBD', level: 'Pending Inputs' };
  const serviceData = SERVICES_DETAILS[formData.service] || { extraComplexity: 0, multiplier: 1.0 };
  
  const rawComplexity = formData.size ? sizeData.complexity + serviceData.extraComplexity : 0;
  const finalComplexity = Math.min(100, Math.max(10, rawComplexity));

  const getComplexityColor = (score) => {
    if (score < 40) return 'var(--success)';
    if (score < 70) return 'var(--orange-400)';
    if (score < 88) return 'var(--orange-600)';
    return '#dc2626'; // Red
  };

  return (
    <>
      <SEO
        title="Contact Ancient Movers Detroit | Interactive Quote & Booking Hub"
        description="Get a real-time moving quote for your Detroit move with our smart interactive quote estimator. Serving all Metro Detroit neighborhoods with a 1-hour response guarantee."
        canonical="https://ancientmovers.com/contact"
      />
      <PageHero
        title="Interactive Booking Hub"
        subtitle="Calculate your move size, explore our Detroit service map, and lock in a fully transparent quote in minutes."
        crumbs={[{ label: 'Contact & Booking' }]}
      />

      <section ref={sectionReveal} className="reveal contact-section">
        <div className="container contact-container">
          
          {/* LEFT COLUMN: Map & Support Cards */}
          <div className="contact-column-left">
            <div className="contact-headline">
              <span className="eyebrow"><FaMapMarkedAlt /> Live Dispatch</span>
              <h2>Local Detroit Presence</h2>
              <p>We operate from our central Oak Park headquarters, maintaining a fully synchronized fleet active across all major neighborhoods.</p>
            </div>

            {/* Smart Contact Action Cards */}
            <div className="contact-cards-grid">
              <div 
                className={`contact-card glass-card ${copyStatus.phone ? 'copied' : ''}`}
                onClick={() => triggerCopy(SITE.phone, 'phone')}
              >
                <div className="contact-card-icon"><FaPhoneAlt /></div>
                <div className="contact-card-details">
                  <strong>Phone</strong>
                  <span>{SITE.phone}</span>
                </div>
                <span className="copy-badge">
                  {copyStatus.phone ? <><FaCheck /> Copied</> : <><FaClipboard /> Click to Copy</>}
                </span>
              </div>

              <div 
                className={`contact-card glass-card ${copyStatus.email ? 'copied' : ''}`}
                onClick={() => triggerCopy(SITE.email, 'email')}
              >
                <div className="contact-card-icon"><FaEnvelope /></div>
                <div className="contact-card-details">
                  <strong>Email Address</strong>
                  <span>{SITE.email}</span>
                </div>
                <span className="copy-badge">
                  {copyStatus.email ? <><FaCheck /> Copied</> : <><FaClipboard /> Click to Copy</>}
                </span>
              </div>

              <div className="contact-card glass-card non-interactive">
                <div className="contact-card-icon"><FaMapMarkerAlt /></div>
                <div className="contact-card-details">
                  <strong>Oak Park Headquarters</strong>
                  <span>{SITE.address}</span>
                </div>
              </div>

              <div className="contact-card glass-card non-interactive">
                <div className="contact-card-icon"><FaClock /></div>
                <div className="contact-card-details">
                  <strong>Office Hours</strong>
                  <span>{SITE.hours}</span>
                  <div className="availability-indicator">
                    <span className="pulsing-dot"></span>
                    <span className="availability-text">Active Now &bull; 10m Response Guarantee</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Metro Detroit Interactive Vector Map */}
            <div ref={mapReveal} className="reveal reveal-left map-container glass-card">
              <div className="map-header">
                <h3>Metro Detroit Service Hubs</h3>
                <p>Click on any marker to inspect current crew load and logistics details.</p>
              </div>

              <div className="map-wrapper">
                <svg viewBox="0 0 500 380" className="detroit-vector-map">
                  {/* Decorative Background Grid */}
                  <defs>
                    <pattern id="mapGrid" width="20" height="20" patternUnits="userSpaceOnUse">
                      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="rgba(247, 146, 30, 0.04)" strokeWidth="1" />
                    </pattern>
                  </defs>
                  <rect width="100%" height="100%" fill="url(#mapGrid)" rx="16" />

                  {/* Connecting Transit Vectors (Dashed lines to Oak Park HQ) */}
                  <g className="map-roads-network">
                    {MAP_LOCATIONS.map((loc) => {
                      if (loc.isHq) return null;
                      return (
                        <line
                          key={`road-${loc.name}`}
                          x1="250"
                          y1="180"
                          x2={loc.cx}
                          y2={loc.cy}
                          className="road-vector"
                        />
                      );
                    })}
                  </g>

                  {/* Map Pin Elements */}
                  <g className="map-nodes">
                    {MAP_LOCATIONS.map((loc) => {
                      const isSelected = activeMapNode.name === loc.name;
                      if (loc.isHq) {
                        return (
                          <g 
                            key={loc.name} 
                            onClick={() => setActiveMapNode(loc)}
                            className={`map-node-hq ${isSelected ? 'active' : ''}`}
                            style={{ cursor: 'pointer' }}
                          >
                            <circle cx="250" cy="180" r="16" className="hq-glow-pulse" />
                            <circle cx="250" cy="180" r="8" fill="var(--orange-500)" stroke="#fff" strokeWidth="2.5" />
                            <circle cx="250" cy="180" r="3" fill="#fff" />
                          </g>
                        );
                      }

                      return (
                        <g
                          key={loc.name}
                          className={`map-node-city ${isSelected ? 'active' : ''}`}
                          onClick={() => setActiveMapNode(loc)}
                          style={{ cursor: 'pointer' }}
                        >
                          <circle cx={loc.cx} cy={loc.cy} r="12" className="node-glow-hover" />
                          <circle cx={loc.cx} cy={loc.cy} r="6" fill={isSelected ? 'var(--orange-500)' : '#1a0800'} stroke="var(--orange-400)" strokeWidth="2" />
                        </g>
                      );
                    })}
                  </g>
                </svg>

                {/* SVG Map HQ Legend Icon */}
                <div className="map-legend">
                  <span className="legend-hq"><span className="legend-dot-hq"></span> Headquarters</span>
                  <span className="legend-area"><span className="legend-dot-area"></span> Service Node</span>
                </div>
              </div>

              {/* Dynamic location card */}
              <div className="map-location-card glass-card">
                <div className="location-card-head">
                  <div className="location-name-group">
                    <FaMapPin className={activeMapNode.isHq ? 'text-orange anim-bounce' : 'text-orange'} />
                    <h4>{activeMapNode.name}</h4>
                  </div>
                  <span className={`location-status-badge ${activeMapNode.isHq ? 'hq-badge' : ''}`}>
                    {activeMapNode.status}
                  </span>
                </div>
                <div className="location-stats">
                  <div className="stat-row">
                    <strong>Capacity Status:</strong>
                    <span>{activeMapNode.availability}</span>
                  </div>
                  <p className="location-desc">{activeMapNode.note}</p>
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT COLUMN: Interactive Form Wizard */}
          <div className="contact-column-right">
            <div className="calculator-container glass-card">
              
              {/* Calculator Header */}
              <div className="calculator-header">
                <div className="header-flex">
                  <div>
                    <span className="eyebrow-accent"><FaSlidersH /> Smart Wizard</span>
                    <h3>Custom Moving Calculator</h3>
                  </div>
                  <div className="step-badge">Step {formStep} of 3</div>
                </div>
                <p>Fill out the fields below. Our estimator will compute a live projection of your move requirements.</p>

                {/* Step Progress Tracker Bar */}
                <div className="progress-track">
                  <div 
                    className="progress-bar-fill" 
                    style={{ width: `${(formStep / 3) * 100}%` }}
                  />
                  <div className="progress-nodes">
                    <span className={`progress-node ${formStep >= 1 ? 'active' : ''} ${formStep > 1 ? 'completed' : ''}`}>
                      {formStep > 1 ? <FaCheck /> : '1'}
                    </span>
                    <span className={`progress-node ${formStep >= 2 ? 'active' : ''} ${formStep > 2 ? 'completed' : ''}`}>
                      {formStep > 2 ? <FaCheck /> : '2'}
                    </span>
                    <span className={`progress-node ${formStep >= 3 ? 'active' : ''} ${formStep > 3 ? 'completed' : ''}`}>
                      {formStep > 3 ? <FaCheck /> : '3'}
                    </span>
                  </div>
                </div>
              </div>

              {/* ESTIMATOR STATS PANEL */}
              <div className="estimator-analytics-panel">
                <div className="panel-grid">
                  <div className="stat-card">
                    <span className="stat-label">Estimated Price Bracket</span>
                    <div className="stat-value highlight-price">{sizeData.price}</div>
                    <span className="stat-subtext">Ballpark Local Rate</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Recommended Allocation</span>
                    <div className="stat-value small-value"><FaTruck style={{ marginRight: '6px' }} />{sizeData.crew}</div>
                    <span className="stat-subtext">Ensures optimal timing</span>
                  </div>
                  <div className="stat-card">
                    <span className="stat-label">Projected Duration</span>
                    <div className="stat-value small-value"><FaClock style={{ marginRight: '6px' }} />{sizeData.duration}</div>
                    <span className="stat-subtext">Average loading & transport</span>
                  </div>
                </div>

                {/* Complexity Multiplier Indicator */}
                <div className="complexity-meter-group">
                  <div className="meter-label-row">
                    <span>Move Complexity Profile: <strong>{formData.size ? sizeData.level : 'Awaiting Details'}</strong></span>
                    <span>{formData.size ? `${finalComplexity}%` : '0%'}</span>
                  </div>
                  <div className="meter-bar-track">
                    <div 
                      className="meter-bar-fill" 
                      style={{ 
                        width: `${finalComplexity}%`,
                        backgroundColor: getComplexityColor(finalComplexity)
                      }}
                    />
                  </div>
                </div>
              </div>

              {/* WIZARD FORM LAYOUT */}
              {!formSubmitted ? (
                <form className="wizard-form" onSubmit={handleSubmit}>
                  
                  {/* STEP 1: ROUTING & DATE */}
                  {formStep === 1 && (
                    <div className="wizard-step-pane fade-in">
                      <h4 className="step-title"><FaCalendarAlt /> Route & Timing Details</h4>
                      <div className="form-fields-stack">
                        <div className="form-field">
                          <label htmlFor="c-from">Moving From</label>
                          <div className="input-with-icon">
                            <FaMapMarkerAlt className="field-icon" />
                            <input 
                              id="c-from" 
                              type="text" 
                              required 
                              placeholder="City or Address (e.g. Detroit, MI)" 
                              value={formData.from}
                              onChange={handleInputChange}
                            />
                            {formData.from.trim().length > 3 && <FaCheckCircle className="valid-icon" />}
                          </div>
                        </div>

                        <div className="form-field">
                          <label htmlFor="c-to">Moving To</label>
                          <div className="input-with-icon">
                            <FaMapMarkerAlt className="field-icon" />
                            <input 
                              id="c-to" 
                              type="text" 
                              required 
                              placeholder="City or Address (e.g. Royal Oak, MI)" 
                              value={formData.to}
                              onChange={handleInputChange}
                            />
                            {formData.to.trim().length > 3 && <FaCheckCircle className="valid-icon" />}
                          </div>
                        </div>

                        <div className="form-field">
                          <label htmlFor="c-date">Planned Move Date</label>
                          <div className="input-with-icon">
                            <FaCalendarAlt className="field-icon" />
                            <input 
                              id="c-date" 
                              type="date" 
                              required 
                              value={formData.date}
                              onChange={handleInputChange}
                            />
                            {formData.date !== '' && <FaCheckCircle className="valid-icon" />}
                          </div>
                          <span className="field-helper">Flexible dates? Note it down in Step 2.</span>
                        </div>
                      </div>

                      <div className="wizard-actions">
                        <button 
                          type="button" 
                          className="btn btn-primary"
                          disabled={!validateStep(1)}
                          onClick={handleNextStep}
                          style={{ width: '100%', justifyContent: 'center' }}
                        >
                          Continue to Details <FaArrowRight />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 2: INVENTORY & SERVICES */}
                  {formStep === 2 && (
                    <div className="wizard-step-pane fade-in">
                      <h4 className="step-title"><FaSlidersH /> Inventory & Size Metrics</h4>
                      
                      <div className="form-fields-stack">
                        {/* Custom Select grid for Home Size */}
                        <div className="form-field">
                          <label>Home / Inventory Size</label>
                          <div className="custom-select-grid">
                            {Object.keys(HOME_SIZES).map((size) => (
                              <button
                                key={size}
                                type="button"
                                className={`select-option-btn ${formData.size === size ? 'active' : ''}`}
                                onClick={() => selectHomeSize(size)}
                              >
                                {size}
                              </button>
                            ))}
                          </div>
                        </div>

                        {/* Custom Select grid for Services */}
                        <div className="form-field">
                          <label>Service Specialization Needed</label>
                          <div className="custom-select-grid">
                            {Object.keys(SERVICES_DETAILS).map((service) => (
                              <button
                                key={service}
                                type="button"
                                className={`select-option-btn ${formData.service === service ? 'active' : ''}`}
                                onClick={() => selectService(service)}
                              >
                                {service}
                              </button>
                            ))}
                          </div>
                        </div>

                        <div className="form-field">
                          <label htmlFor="c-msg">Additional Moving Logistics</label>
                          <textarea 
                            id="c-msg" 
                            rows="3" 
                            placeholder="Stairs, tight hallways, heavy pianos, fragile glassware, or flexible scheduling..."
                            value={formData.msg}
                            onChange={handleInputChange}
                          />
                        </div>
                      </div>

                      <div className="wizard-actions double-buttons">
                        <button 
                          type="button" 
                          className="btn btn-secondary"
                          onClick={handlePrevStep}
                        >
                          <FaArrowLeft /> Back
                        </button>
                        <button 
                          type="button" 
                          className="btn btn-primary"
                          disabled={!validateStep(2)}
                          onClick={handleNextStep}
                        >
                          Almost Done <FaArrowRight />
                        </button>
                      </div>
                    </div>
                  )}

                  {/* STEP 3: CONTACT & SUBMISSION */}
                  {formStep === 3 && (
                    <div className="wizard-step-pane fade-in">
                      <h4 className="step-title"><FaUser /> Coordinator Allocation</h4>
                      
                      <div className="form-fields-stack">
                        <div className="form-field">
                          <label htmlFor="c-name">Full Name</label>
                          <div className="input-with-icon">
                            <FaUser className="field-icon" />
                            <input 
                              id="c-name" 
                              type="text" 
                              required 
                              placeholder="John Smith" 
                              value={formData.name}
                              onChange={handleInputChange}
                            />
                            {formData.name.trim().length > 2 && <FaCheckCircle className="valid-icon" />}
                          </div>
                        </div>

                        <div className="form-field">
                          <label htmlFor="c-phone">Direct Phone Number</label>
                          <div className="input-with-icon">
                            <FaPhoneAlt className="field-icon" />
                            <input 
                              id="c-phone" 
                              type="tel" 
                              required 
                              placeholder="(313) 555-0100" 
                              value={formData.phone}
                              onChange={handleInputChange}
                            />
                            {formData.phone.trim().length > 6 && <FaCheckCircle className="valid-icon" />}
                          </div>
                        </div>

                        <div className="form-field">
                          <label htmlFor="c-email">Email Address</label>
                          <div className="input-with-icon">
                            <FaEnvelope className="field-icon" />
                            <input 
                              id="c-email" 
                              type="email" 
                              required 
                              placeholder="john@example.com" 
                              value={formData.email}
                              onChange={handleInputChange}
                            />
                            {formData.email.trim().length > 5 && formData.email.includes('@') && <FaCheckCircle className="valid-icon" />}
                          </div>
                        </div>
                      </div>

                      <div className="summary-legal-note">
                        <FaInfoCircle />
                        <p>Ballpark pricing displayed is a projection. Upon submission, an Oak Park logistics coordinator will reach out within 1 hour to finalize details and secure a firm binding quote.</p>
                      </div>

                      <div className="wizard-actions double-buttons">
                        <button 
                          type="button" 
                          className="btn btn-secondary"
                          onClick={handlePrevStep}
                        >
                          <FaArrowLeft /> Back
                        </button>
                        <button 
                          type="submit" 
                          className="btn btn-primary"
                          disabled={!formData.name || !formData.phone || !formData.email}
                        >
                          Lock in Quote <FaCheckCircle />
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              ) : (
                /* SUCCESS STATE OVERLAY */
                <div className="wizard-success-panel fade-in">
                  <div className="success-icon-glow">
                    <FaCheckCircle className="success-check-icon" />
                  </div>
                  <h3>Quote Requested Successfully!</h3>
                  <p className="success-lead">Thank you, <strong>{formData.name}</strong>. Your moving route from <strong>{formData.from}</strong> to <strong>{formData.to}</strong> has been logged in our dispatch database.</p>
                  
                  <div className="success-assigned-card glass-card">
                    <Photo 
                      src={`/images/${COORDINATORS[0].seed}.jpg`}
                      id={COORDINATORS[0].avatarId}
                      seed={COORDINATORS[0].seed}
                      alt={COORDINATORS[0].name}
                      className="assigned-avatar"
                      w={80}
                      h={80}
                    />
                    <div className="assigned-info">
                      <span className="assigned-tag">Assigned Coordinator</span>
                      <h4>{COORDINATORS[0].name}</h4>
                      <p>{COORDINATORS[0].role}</p>
                    </div>
                  </div>

                  <div className="success-next-steps">
                    <h5>What Happens Next?</h5>
                    <ol>
                      <li><strong>Database Route Verification:</strong> {COORDINATORS[0].name} will check tollways and access rules for your route.</li>
                      <li><strong>Call Confirmation:</strong> We will call you at <strong>{formData.phone}</strong> in under 1 hour to finalize.</li>
                      <li><strong>Firm Price Guarantee:</strong> You will receive a written, binding email quote with absolutely zero hidden fees.</li>
                    </ol>
                  </div>

                  <button 
                    type="button" 
                    className="btn btn-secondary"
                    style={{ width: '100%', justifyContent: 'center', marginTop: '10px' }}
                    onClick={() => {
                      setFormSubmitted(false);
                      setFormStep(1);
                      setFormData({
                        name: '', phone: '', email: '', date: '', from: '', to: '', size: '', service: '', msg: ''
                      });
                    }}
                  >
                    Calculate Another Move
                  </button>
                </div>
              )}
            </div>
          </div>

        </div>
      </section>

      {/* SUPPORT HEROES: Meet The Team */}
      <section ref={heroesReveal} className="reveal reveal-zoom team-section">
        <div className="container">
          <div className="section-head text-center">
            <span className="eyebrow"><FaShieldAlt /> Trusted Planning</span>
            <h2>Your Relocation Specialists</h2>
            <p>Our experienced coordination leads oversee your move from initial click to final box placement, guaranteeing a highly organized transition.</p>
          </div>

          <div className="coordinators-grid">
            {COORDINATORS.map((member) => (
              <div key={member.name} className="coordinator-card glass-card">
                <div className="coordinator-avatar-wrapper">
                  <Photo 
                    src={`/images/${member.seed}.jpg`}
                    id={member.avatarId}
                    seed={member.seed}
                    alt={member.name}
                    className="coordinator-avatar"
                    w={150}
                    h={150}
                  />
                  <div className="coordinator-avatar-glow"></div>
                </div>
                <div className="coordinator-meta">
                  <h4>{member.name}</h4>
                  <span className="coordinator-role">{member.role}</span>
                  <p className="coordinator-bio">"{member.bio}"</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* INTEGRATED FAQ SECTION */}
      <section ref={faqReveal} className="reveal faq-section">
        <div className="container">
          <div className="section-head text-center">
            <span className="eyebrow"><FaComments /> Quick Answers</span>
            <h2>Frequently Asked Questions</h2>
            <p>Review standard inquiries from Detroit residents before securing your professional booking date.</p>
          </div>

          <div className="faq-accordion-list">
            {FAQS_LIST.map((faq, index) => {
              const isOpen = activeFaq === index;
              return (
                <div 
                  key={index} 
                  className={`faq-accordion-item glass-card ${isOpen ? 'active' : ''}`}
                >
                  <button 
                    className="faq-accordion-trigger" 
                    onClick={() => setActiveFaq(isOpen ? null : index)}
                    aria-expanded={isOpen}
                  >
                    <span>{faq.q}</span>
                    <span className="accordion-chevron"></span>
                  </button>
                  <div className="faq-accordion-panel" style={{ maxHeight: isOpen ? '250px' : '0' }}>
                    <p className="faq-accordion-content">{faq.a}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
