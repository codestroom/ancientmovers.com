import { useState, useEffect } from 'react';
import { NavLink, Link, useLocation } from 'react-router-dom';
import { FaPhoneAlt, FaBars, FaTimes, FaArrowRight, FaShieldAlt, FaStar, FaCheckCircle } from 'react-icons/fa';
import { SITE } from '../data/siteData.js';
import './Navbar.css';

const LINKS = [
  { to: '/', label: 'Home' },
  { to: '/services', label: 'Services' },
  { to: '/service-areas', label: 'Service Areas' },
  { to: '/about', label: 'About' },
  { to: '/contact', label: 'Contact' }
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close mobile menu when route changes
  useEffect(() => { setOpen(false); }, [location.pathname]);

  // Lock body scroll while mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [open]);

  return (
    <header className={`nb ${scrolled ? 'nb--scrolled' : ''}`}>
      {/* Top thin info bar */}
      <div className="nb__strip">
        <div className="container nb__strip-inner">
          <span className="nb__strip-item"><FaCheckCircle /> Free Estimates</span>
          <span className="nb__strip-item nb__strip-item--mid"><FaShieldAlt /> Licensed & Insured</span>
          <span className="nb__strip-item"><FaStar /> Rated 4.9/5 by 2,100+ Detroit families</span>
        </div>
      </div>

      {/* Main bar */}
      <div className="nb__main">
        <div className="container nb__inner">
          <Link to="/" className="nb__brand" aria-label="Ancient Movers home">
            <img src="/logo.png" alt="Ancient Movers" className="nb__logo-img" />
          </Link>

          <nav className="nb__nav" aria-label="Primary">
            <ul>
              {LINKS.map((l) => (
                <li key={l.to}>
                  <NavLink
                    to={l.to}
                    end={l.to === '/'}
                    className={({ isActive }) => `nb__link ${isActive ? 'is-active' : ''}`}
                  >
                    <span>{l.label}</span>
                  </NavLink>
                </li>
              ))}
            </ul>
          </nav>

          <div className="nb__right">
            <a href={SITE.phoneHref} className="nb__phone" aria-label={`Call ${SITE.phone}`}>
              <span className="nb__phone-ring"><FaPhoneAlt /></span>
              <span className="nb__phone-text">
                <small>Call Anytime</small>
                <strong>{SITE.phone}</strong>
              </span>
            </a>
            <Link to="/contact" className="nb__cta">
              Free Quote <FaArrowRight />
            </Link>
            <button
              className="nb__toggle"
              onClick={() => setOpen((o) => !o)}
              aria-label={open ? 'Close menu' : 'Open menu'}
              aria-expanded={open}
            >
              {open ? <FaTimes /> : <FaBars />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile overlay menu */}
      <div className={`nb__mobile ${open ? 'is-open' : ''}`}>
        <ul>
          {LINKS.map((l, i) => (
            <li key={l.to} style={{ '--i': i }}>
              <NavLink
                to={l.to}
                end={l.to === '/'}
                className={({ isActive }) => `nb__mlink ${isActive ? 'is-active' : ''}`}
                onClick={() => setOpen(false)}
              >
                <span>{l.label}</span>
                <FaArrowRight />
              </NavLink>
            </li>
          ))}
        </ul>
        <div className="nb__mobile-foot">
          <a href={SITE.phoneHref} className="btn btn-secondary btn-lg">
            <FaPhoneAlt /> {SITE.phone}
          </a>
          <Link to="/contact" className="btn btn-primary btn-lg" onClick={() => setOpen(false)}>
            Get Free Quote <FaArrowRight />
          </Link>
        </div>
      </div>
    </header>
  );
}
