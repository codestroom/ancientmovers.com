import { useEffect, useRef } from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';
import { TESTIMONIALS } from '../data/siteData.js';
import useReveal from '../hooks/useReveal.js';
import useTilt from '../hooks/useTilt.js';
import './Testimonials.css';

function TestimonialCard({ t }) {
  const ref = useTilt({ max: 8, scale: 1.02, glare: true });
  return (
    <article ref={ref} className="testimonial tilt reveal">
      <FaQuoteLeft className="testimonial__quote" aria-hidden="true" />
      <div className="testimonial__stars" aria-label={`${t.rating} out of 5 stars`}>
        {Array.from({ length: t.rating }).map((_, k) => <FaStar key={k} />)}
      </div>
      <p>“{t.text}”</p>
      <footer>
        <div className="testimonial__avatar">{t.name.charAt(0)}</div>
        <div>
          <strong>{t.name}</strong>
          <span>{t.city}</span>
        </div>
      </footer>
    </article>
  );
}

export default function Testimonials() {
  const headRef = useReveal();
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.testimonial') || [];
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
    <section className="testimonials">
      <div className="testimonials__bg" aria-hidden="true">
        <div className="testimonials__shape" />
      </div>
      <div className="container">
        <div ref={headRef} className="reveal section-head">
          <span className="eyebrow">Customer Stories</span>
          <h2>Loved by Families Across Michigan</h2>
          <p>We’ve completed over 10,000 moves. Here’s what our customers say.</p>
        </div>

        <div ref={gridRef} className="testimonials__grid">
          {TESTIMONIALS.map((t, i) => (
            <TestimonialCard key={i} t={t} />
          ))}
        </div>
      </div>
    </section>
  );
}
