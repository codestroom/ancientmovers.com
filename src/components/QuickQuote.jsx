import { useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPhoneAlt, FaBolt } from 'react-icons/fa';
import { SITE } from '../data/siteData.js';
import useReveal from '../hooks/useReveal.js';
import useTilt from '../hooks/useTilt.js';
import './QuickQuote.css';

export default function QuickQuote() {
  const headRef = useReveal();
  const moreRef = useReveal();
  const cardRef = useTilt({ max: 6, scale: 1.01, glare: true });
  const formRef = useRef(null);

  const submit = (e) => {
    e.preventDefault();
    alert('Thanks! Your quote request is on its way to our team.');
    formRef.current?.reset();
  };

  return (
    <section className="qq">
      <div className="qq__bg" aria-hidden="true">
        <div className="qq__shape qq__shape--a" />
        <div className="qq__shape qq__shape--b" />
      </div>

      <div className="container qq__grid">
        <div ref={headRef} className="reveal reveal-left qq__text">
          <span className="eyebrow"><FaBolt /> 60-Second Quote</span>
          <h2>Tell us about your move — get a free quote in minutes.</h2>
          <p>No phone tag, no spam. A real human reads every request and replies within 1 hour.</p>
          <div className="qq__perks">
            <div className="qq__perk"><strong>10k+</strong><span>Moves done</span></div>
            <div className="qq__perk"><strong>1 hr</strong><span>Reply time</span></div>
            <div className="qq__perk"><strong>4.9★</strong><span>Avg rating</span></div>
          </div>
          <a href={SITE.phoneHref} className="qq__phone">
            <FaPhoneAlt /> Or call now: <strong>{SITE.phone}</strong>
          </a>
        </div>

        <div ref={cardRef} className="tilt qq__card">
          <form ref={formRef} onSubmit={submit}>
            <h3>Free Quote in 60 seconds</h3>
            <div className="form-field">
              <label htmlFor="qq-name">Full Name</label>
              <input id="qq-name" type="text" required placeholder="John Smith" />
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="qq-phone">Phone</label>
                <input id="qq-phone" type="tel" required placeholder="(248) 555-0100" />
              </div>
              <div className="form-field">
                <label htmlFor="qq-date">Move Date</label>
                <input id="qq-date" type="date" required />
              </div>
            </div>
            <div className="form-row">
              <div className="form-field">
                <label htmlFor="qq-from">From</label>
                <input id="qq-from" type="text" required placeholder="Troy, MI" />
              </div>
              <div className="form-field">
                <label htmlFor="qq-to">To</label>
                <input id="qq-to" type="text" required placeholder="Novi, MI" />
              </div>
            </div>
            <div className="form-field">
              <label htmlFor="qq-size">Home size</label>
              <select id="qq-size" required defaultValue="">
                <option value="" disabled>Choose home size</option>
                <option>Studio / 1 Bedroom</option>
                <option>2 Bedroom</option>
                <option>3 Bedroom</option>
                <option>4+ Bedroom</option>
                <option>Office / Commercial</option>
              </select>
            </div>
            <button type="submit" className="btn btn-primary btn-lg qq__submit">
              Get My Free Quote <FaArrowRight />
            </button>
            <p className="qq__foot">By submitting you agree to receive a quote. No spam — we promise.</p>
          </form>
        </div>

        {/* Link to full contact page */}
        <Link to="/contact" className="qq__more-link reveal" ref={moreRef}>Need a longer form? Use our full contact page →</Link>
      </div>
    </section>
  );
}
