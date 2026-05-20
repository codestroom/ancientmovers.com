import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaArrowRight } from 'react-icons/fa';
import SEO from '../components/SEO.jsx';
import PageHero from './PageHero.jsx';
import { SITE } from '../data/siteData.js';
import './Contact.css';

export default function Contact() {
  return (
    <>
      <SEO
        title="Contact Ancient Movers — Free Moving Quote in Michigan"
        description="Request a free, no-obligation moving quote in Michigan. Call us at (800) 555-0199 or fill out our contact form. We respond within 1 hour."
        canonical="https://ancientmovers.com/contact"
      />
      <PageHero
        title="Get In Touch"
        subtitle="Request a free quote or ask us anything — we’ll get back to you within 1 hour."
        crumbs={[{ label: 'Contact' }]}
      />

      <section className="contact">
        <div className="container contact__grid">
          <div className="contact__info">
            <h2>Contact Information</h2>
            <p>Whether you need a quote, have a question or want to book a move — we’re ready to help.</p>

            <ul className="contact__list">
              <li>
                <span className="contact__icon"><FaPhoneAlt /></span>
                <div>
                  <strong>Phone</strong>
                  <a href={SITE.phoneHref}>{SITE.phone}</a>
                </div>
              </li>
              <li>
                <span className="contact__icon"><FaEnvelope /></span>
                <div>
                  <strong>Email</strong>
                  <a href={`mailto:${SITE.email}`}>{SITE.email}</a>
                </div>
              </li>
              <li>
                <span className="contact__icon"><FaMapMarkerAlt /></span>
                <div>
                  <strong>Office</strong>
                  <span>{SITE.address}</span>
                </div>
              </li>
              <li>
                <span className="contact__icon"><FaClock /></span>
                <div>
                  <strong>Hours</strong>
                  <span>{SITE.hours}</span>
                </div>
              </li>
            </ul>
          </div>

          <form
            className="contact__form"
            onSubmit={(e) => { e.preventDefault(); alert('Thanks! We received your request and will reach out shortly.'); }}
          >
            <h3>Request a Free Quote</h3>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="c-name">Full Name</label>
                <input id="c-name" type="text" required placeholder="John Smith" />
              </div>
              <div className="form-field">
                <label htmlFor="c-phone">Phone</label>
                <input id="c-phone" type="tel" required placeholder="(248) 555-0100" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="c-email">Email</label>
                <input id="c-email" type="email" required placeholder="john@example.com" />
              </div>
              <div className="form-field">
                <label htmlFor="c-date">Move Date</label>
                <input id="c-date" type="date" required />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="c-from">Moving From</label>
                <input id="c-from" type="text" required placeholder="Troy, MI" />
              </div>
              <div className="form-field">
                <label htmlFor="c-to">Moving To</label>
                <input id="c-to" type="text" required placeholder="Ann Arbor, MI" />
              </div>
            </div>

            <div className="form-row">
              <div className="form-field">
                <label htmlFor="c-size">Home Size</label>
                <select id="c-size" required defaultValue="">
                  <option value="" disabled>Select size</option>
                  <option>Studio / 1 Bedroom</option>
                  <option>2 Bedroom</option>
                  <option>3 Bedroom</option>
                  <option>4+ Bedroom</option>
                  <option>Office / Commercial</option>
                </select>
              </div>
              <div className="form-field">
                <label htmlFor="c-service">Service Needed</label>
                <select id="c-service" required defaultValue="">
                  <option value="" disabled>Choose service</option>
                  <option>Residential Moving</option>
                  <option>Commercial / Office</option>
                  <option>Packing & Unpacking</option>
                  <option>Long Distance</option>
                  <option>Storage</option>
                  <option>Specialty (Piano, Antiques)</option>
                </select>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="c-msg">Tell us about your move</label>
              <textarea id="c-msg" rows="4" placeholder="Anything else we should know? Stairs, elevator, special items..." />
            </div>

            <button type="submit" className="btn btn-primary btn-lg" style={{ width: '100%', justifyContent: 'center' }}>
              Send Request <FaArrowRight />
            </button>
            <p className="contact__form-foot">We reply within 1 hour during business hours.</p>
          </form>
        </div>
      </section>
    </>
  );
}
