import { useEffect, useRef } from 'react';
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { SERVICE_AREAS } from '../data/siteData.js';
import useReveal from '../hooks/useReveal.js';
import './AreasGrid.css';

export default function AreasGrid({ withHeading = true }) {
  const headRef = useReveal();
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.area-card') || [];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-revealed'); io.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="areas">
      <div className="areas__pattern" aria-hidden="true" />
      <div className="container">
        {withHeading && (
          <div ref={headRef} className="section-head reveal">
            <span className="eyebrow">Where We Move</span>
            <h2>Proudly Serving All of Metro Detroit & Beyond</h2>
            <p>Ancient Movers covers 16+ Michigan neighborhoods. Click any city to start your free quote.</p>
          </div>
        )}

        <div ref={gridRef} className="areas__grid">
          {SERVICE_AREAS.map((a, i) => (
            <Link
              key={a}
              to="/contact"
              className={`area-card reveal reveal-d${(i % 6) + 1}`}
              style={{ '--i': i }}
            >
              <span className="area-card__icon"><FaMapMarkerAlt /></span>
              <span className="area-card__name">{a}, MI</span>
              <FaArrowRight className="area-card__arrow" />
              <span className="area-card__glow" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
