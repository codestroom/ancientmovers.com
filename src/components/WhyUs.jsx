import { useEffect, useRef } from 'react';
import { FaShieldAlt, FaDollarSign, FaClock, FaUserTie, FaHeadset, FaTruckMoving } from 'react-icons/fa';
import { FEATURES, WHY_US } from '../data/siteData.js';
import CountStat from './CountStat.jsx';
import useReveal from '../hooks/useReveal.js';
import './WhyUs.css';

const ICONS = [FaShieldAlt, FaDollarSign, FaClock, FaUserTie, FaHeadset, FaTruckMoving];

export default function WhyUs() {
  const statsRef = useReveal();
  const headRef = useReveal();
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.whyus__card') || [];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-revealed'); io.unobserve(e.target); }
      }),
      { threshold: 0.15 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="whyus">
      <div className="container">
        <div ref={statsRef} className="reveal whyus__stats">
          {WHY_US.map((s) => (
            <CountStat key={s.label} value={s.num} label={s.label} />
          ))}
        </div>

        <div ref={headRef} className="reveal section-head" style={{ marginTop: 80 }}>
          <span className="eyebrow">Why Choose Us</span>
          <h2>Six Reasons Michigan Picks Ancient Movers</h2>
        </div>

        <div ref={gridRef} className="whyus__grid">
          {FEATURES.map((f, i) => {
            const Icon = ICONS[i] || FaShieldAlt;
            return (
              <div key={f.title} className={`whyus__card reveal reveal-d${(i % 6) + 1}`}>
                <div className="whyus__icon"><Icon /></div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
                <div className="whyus__card-deco" aria-hidden="true" />
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
