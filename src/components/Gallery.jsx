import { useEffect, useRef } from 'react';
import { FaArrowRight, FaMapMarkerAlt, FaStar } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Photo from './Photo.jsx';
import useReveal from '../hooks/useReveal.js';
import './Gallery.css';

const ITEMS = [
  {
    id: '1600585154340-be6161a56a0c',
    seed: 'movers-loading',
    tag: 'Move Day',
    title: 'A seamless 4-bedroom move, start to finish',
    location: 'Royal Oak, MI',
    rating: '5.0',
    size: 'lg'
  },
  {
    id: '1558997519-83ea9252edf8',
    seed: 'packing-fragile',
    tag: 'Packing',
    title: 'Premium packing for every fragile piece',
    location: 'Birmingham, MI',
    rating: '5.0',
    size: 'md'
  },
  {
    id: '1521737604893-d14cc237f11d',
    seed: 'family-home',
    tag: 'New Home',
    title: 'Settling Detroit families into new chapters',
    location: 'Grosse Pointe, MI',
    rating: '5.0',
    size: 'md'
  },
  {
    id: '1497366216548-37526070297c',
    seed: 'office-move',
    tag: 'Commercial',
    title: 'Zero-downtime office relocations',
    location: 'Downtown Detroit',
    rating: '5.0',
    size: 'md'
  },
  {
    id: '1601584115197-04ecc0da31d7',
    seed: 'in-transit',
    tag: 'In Transit',
    title: 'Tracked deliveries across Metro Detroit',
    location: 'Metro Detroit',
    rating: '5.0',
    size: 'md'
  },
];

export default function Gallery() {
  const headRef = useReveal();
  const gridRef = useRef(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.g-card') || [];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-revealed'); io.unobserve(e.target); }
      }),
      { threshold: 0.12 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="gallery">
      <div className="gallery__glow gallery__glow--1" />
      <div className="gallery__glow gallery__glow--2" />

      <div className="container">
        <div ref={headRef} className="reveal section-head gallery__head">
          <span className="eyebrow">Moving Moments</span>
          <h2>Real Moves. Real Detroit Families.</h2>
          <p>A glimpse at the moves we deliver every week &mdash; from packed-to-perfection fragiles to families happily handed the keys to their new home.</p>
        </div>

        <div ref={gridRef} className="g-grid">
          {ITEMS.map((it, i) => (
            <article key={it.id} className={`g-card g--${it.size} reveal-d${(i % 6) + 1}`}>
              <Photo
                src={it.src}
                id={it.id}
                seed={it.seed}
                alt={it.title}
                w={it.size === 'lg' ? 1100 : 760}
                h={it.size === 'lg' ? 1100 : 580}
                className="g-card__img"
              />
              <div className="g-card__overlay" />
              <div className="g-card__corner">
                <span className="g-card__tag">{it.tag}</span>
                <span className="g-card__rating"><FaStar /> {it.rating}</span>
              </div>
              <div className="g-card__content">
                <h3>{it.title}</h3>
                <div className="g-card__meta">
                  <FaMapMarkerAlt /> {it.location}
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="g-cta">
          <p className="g-cta__text">Ready to be our next happy Detroit family?</p>
          <Link to="/contact" className="btn btn-primary btn-lg">
            Book Your Move <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
