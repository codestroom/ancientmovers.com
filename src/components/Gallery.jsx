import { useEffect, useRef } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import Photo, { PHOTOS } from './Photo.jsx';
import useReveal from '../hooks/useReveal.js';
import './Gallery.css';

const ITEMS = [
  { key: 'loadingTruck', tag: 'Loading',   title: 'Big or small, we\'ve got the truck',  cls: 'g--lg' },
  { key: 'packingBox',   tag: 'Packing',   title: 'Pro packing, every fragile item safe', cls: 'g--md' },
  { key: 'movingFamily', tag: 'Moving Day',title: 'Settling families into new homes',    cls: 'g--md' },
  { key: 'truckRoad',    tag: 'In Transit',title: 'Tracked deliveries across Metro Detroit', cls: 'g--md' },
  { key: 'officeMove',   tag: 'Commercial',title: 'Smooth office relocations in Detroit', cls: 'g--md' },
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
      <div className="container">
        <div ref={headRef} className="reveal section-head">
          <span className="eyebrow">Moving Moments</span>
          <h2>Real Moves. Real Detroit Families.</h2>
          <p>A glimpse at what your move looks like with Ancient Movers -- from the first box to the final piece of furniture.</p>
        </div>

        <div ref={gridRef} className="g-grid">
          {ITEMS.map((it, i) => {
            const photo = PHOTOS[it.key];
            return (
              <article key={it.key} className={`g-card reveal reveal-d${(i % 6) + 1} ${it.cls}`}>
                <Photo
                  src={photo.src}
                  id={photo.id}
                  seed={photo.seed}
                  alt={it.title}
                  w={i === 0 ? 1200 : 800}
                  h={i === 0 ? 900 : 600}
                  className="g-card__img"
                />
                <div className="g-card__overlay" />
                <div className="g-card__content">
                  <span className="g-card__tag">{it.tag}</span>
                  <h3>{it.title}</h3>
                </div>
              </article>
            );
          })}
        </div>

        <div className="g-cta">
          <Link to="/contact" className="btn btn-primary btn-lg">
            Book Your Move <FaArrowRight />
          </Link>
        </div>
      </div>
    </section>
  );
}
