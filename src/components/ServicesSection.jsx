import { useEffect, useRef } from 'react';
import { SERVICES } from '../data/siteData.js';
import ServiceCard from './ServiceCard.jsx';
import useReveal from '../hooks/useReveal.js';
import './ServicesSection.css';

export default function ServicesSection({ compact = false }) {
  const headRef = useReveal();
  const gridRef = useRef(null);

  // Reveal each card as it enters viewport
  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.service-card') || [];
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add('is-revealed');
            io.unobserve(e.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="services">
      <div className="container">
        <div ref={headRef} className="section-head reveal">
          <span className="eyebrow">What We Do</span>
          <h2>Full-Service Moving Solutions</h2>
          <p>From a single room to an entire office, our trained crews handle every move with the same care, professionalism and attention to detail.</p>
        </div>

        <div ref={gridRef} className="services__grid">
          {(compact ? SERVICES.slice(0, 6) : SERVICES).map((s, i) => (
            <ServiceCard key={s.title} service={s} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
