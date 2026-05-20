import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaPhoneAlt, FaArrowRight, FaStar, FaShieldAlt, FaClock } from 'react-icons/fa';
import { SITE } from '../data/siteData.js';
import HeroVisual from './HeroVisual.jsx';
import './Hero.css';

const ROTATING = ['Reliable', 'Affordable', 'On-Time', 'Stress-Free', 'Professional'];

export default function Hero() {
  const [idx, setIdx] = useState(0);
  useEffect(() => {
    const t = setInterval(() => setIdx(i => (i + 1) % ROTATING.length), 2200);
    return () => clearInterval(t);
  }, []);

  return (
    <section className="hero">
      {/* Animated mesh background */}
      <div className="hero__bg" aria-hidden="true">
        <div className="hero__mesh" />
        <div className="hero__grid" />
        <div className="hero__blob hero__blob--1" />
        <div className="hero__blob hero__blob--2" />
        <div className="hero__blob hero__blob--3" />

        {/* Particle field */}
        <div className="particles">
          {Array.from({ length: 14 }).map((_, i) => (
            <span key={i} className="particle" style={{
              left: `${(i * 7.3) % 100}%`,
              animationDelay: `${(i * 0.4).toFixed(2)}s`,
              animationDuration: `${5 + (i % 5)}s`
            }} />
          ))}
        </div>
      </div>

      <div className="container hero__inner">
        <div className="hero__content">
          <span className="hero__badge fade-up">
            <FaStar /> Rated 4.9/5 by 2,100+ Detroit Families
          </span>
          <h1 className="hero__title fade-up-2">
            Detroit's Most{' '}
            <span className="hero__rotator">
              {ROTATING.map((w, i) => (
                <span key={w} className={`hero__rotword ${i === idx ? 'is-active' : ''}`}>{w}</span>
              ))}
            </span>{' '}
            <br />Local <span className="text-orange">Movers</span>
          </h1>
          <p className="hero__lead fade-up-3">
            From Downtown Detroit to the suburbs -- stress-free, on-time moves
            with honest pricing and a crew that treats your home like our own.
          </p>

          <div className="hero__cta fade-up-3">
            <Link to="/contact" className="btn btn-primary btn-lg hero__cta-main">
              <span>Get Your Free Quote</span> <FaArrowRight />
            </Link>
            <a href={SITE.phoneHref} className="btn btn-secondary btn-lg">
              <FaPhoneAlt /> {SITE.phone}
            </a>
          </div>

          <ul className="hero__trust fade-up-3">
            <li><FaShieldAlt /> Licensed & Insured</li>
            <li><FaClock /> On-Time Guarantee</li>
            <li><FaStar /> 4.9★ · 2,100+ Google Reviews</li>
          </ul>
        </div>

        <div className="hero__art fade-up-3">
          <HeroVisual />
        </div>
      </div>

      {/* Wave divider */}
      <svg className="hero__wave" viewBox="0 0 1440 120" preserveAspectRatio="none" aria-hidden="true">
        <path fill="#1a1a1a" d="M0,64 C240,128 480,0 720,32 C960,64 1200,128 1440,80 L1440,120 L0,120 Z" />
      </svg>
    </section>
  );
}
