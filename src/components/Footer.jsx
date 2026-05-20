import { Link } from 'react-router-dom';
import { FaFacebookF, FaInstagram, FaTwitter, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaTruck } from 'react-icons/fa';
import { SITE, SERVICE_AREAS, SERVICES } from '../data/siteData.js';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container footer__grid">
        <div className="footer__col footer__brand">
          <Link to="/" className="footer__logo">
            <span className="footer__logo-mark"><FaTruck /></span>
            <span><strong>Ancient</strong>Movers</span>
          </Link>
          <p>Detroit's most trusted local moving company. Honest pricing, careful crews and on-time service across Metro Detroit since 2015.</p>
          <div className="footer__social">
            <a href={SITE.socials.facebook} aria-label="Facebook" target="_blank" rel="noopener noreferrer"><FaFacebookF /></a>
            <a href={SITE.socials.instagram} aria-label="Instagram" target="_blank" rel="noopener noreferrer"><FaInstagram /></a>
            <a href={SITE.socials.twitter} aria-label="Twitter" target="_blank" rel="noopener noreferrer"><FaTwitter /></a>
          </div>
        </div>

        <div className="footer__col">
          <h4>Quick Links</h4>
          <ul>
            <li><Link to="/">Home</Link></li>
            <li><Link to="/services">Services</Link></li>
            <li><Link to="/service-areas">Service Areas</Link></li>
            <li><Link to="/about">About Us</Link></li>
            <li><Link to="/contact">Get a Quote</Link></li>
          </ul>
        </div>

        <div className="footer__col">
          <h4>Our Services</h4>
          <ul>
            {SERVICES.slice(0, 6).map(s => (
              <li key={s.title}><Link to="/services">{s.title}</Link></li>
            ))}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Areas We Serve</h4>
          <ul className="footer__areas">
            {SERVICE_AREAS.map(a => <li key={a}>{a}</li>)}
          </ul>
        </div>

        <div className="footer__col">
          <h4>Contact</h4>
          <ul className="footer__contact">
            <li><FaPhoneAlt /> <a href={SITE.phoneHref}>{SITE.phone}</a></li>
            <li><FaEnvelope /> <a href={`mailto:${SITE.email}`}>{SITE.email}</a></li>
            <li><FaMapMarkerAlt /> {SITE.address}</li>
            <li><FaClock /> {SITE.hours}</li>
          </ul>
        </div>
      </div>

      <div className="footer__bottom">
        <div className="container footer__bottom-inner">
          <p>© {new Date().getFullYear()} {SITE.name}. All rights reserved.</p>
          <ul>
            <li><Link to="/">Privacy Policy</Link></li>
            <li><Link to="/">Terms of Service</Link></li>
            <li><Link to="/">Sitemap</Link></li>
          </ul>
        </div>
      </div>
    </footer>
  );
}
