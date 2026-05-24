import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaArrowRight } from 'react-icons/fa';
import { SITE } from '../data/siteData.js';
import useReveal from '../hooks/useReveal.js';
import Photo, { PHOTOS } from './Photo.jsx';
import './CtaBanner.css';

export default function CtaBanner() {
  const ref = useReveal();
  return (
    <section className="cta">
      <div className="cta__bg" aria-hidden="true">
        <Photo
          src={PHOTOS.ctaBg.src}
          id={PHOTOS.ctaBg.id}
          seed={PHOTOS.ctaBg.seed}
          alt=""
          w={1600}
          h={700}
          className="cta__bg-photo"
        />
        <div className="cta__bg-overlay" />
        <div className="cta__orb cta__orb--1" />
        <div className="cta__orb cta__orb--2" />
        {/* Faint truck silhouette — right side */}
        <img src="/images/fleet-truck.png" alt="" className="cta__truck" aria-hidden="true" />
        <svg className="cta__wave" viewBox="0 0 1440 80" preserveAspectRatio="none">
          <path d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,30 1440,40 L1440,80 L0,80 Z" fill="rgba(0,0,0,.1)" />
        </svg>
      </div>
      <div ref={ref} className="container cta__inner reveal reveal-zoom">
        <div>
          <h2>Ready to Make Your Next Move <span className="cta__highlight">the Easiest One Yet?</span></h2>
          <p>Get a free, no-obligation quote in under 60 seconds. Our team responds within 1 hour.</p>
        </div>
        <div className="cta__actions">
          <Link to="/contact" className="btn btn-lg cta__btn-light">
            Get Free Quote <FaArrowRight />
          </Link>
          <a href={SITE.phoneHref} className="btn btn-lg cta__btn-outline">
            <FaPhoneAlt /> {SITE.phone}
          </a>
        </div>
      </div>
    </section>
  );
}
