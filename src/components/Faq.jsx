import { useState, useEffect, useRef } from 'react';
import { FaPlus, FaMinus } from 'react-icons/fa';
import { FAQS } from '../data/siteData.js';
import useReveal from '../hooks/useReveal.js';
import './Faq.css';

export default function Faq() {
  const [open, setOpen] = useState(0);
  const [revealed, setRevealed] = useState(() => new Set());
  const headRef = useReveal();
  const listRef = useRef(null);

  useEffect(() => {
    const items = listRef.current?.querySelectorAll('.faq__item') || [];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          const idx = Number(e.target.dataset.idx);
          setRevealed((prev) => {
            if (prev.has(idx)) return prev;
            const next = new Set(prev);
            next.add(idx);
            return next;
          });
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.1 }
    );
    items.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="faq">
      <div className="container faq__inner">
        <div ref={headRef} className="reveal reveal-left faq__head">
          <span className="eyebrow">Got Questions?</span>
          <h2>Frequently Asked Questions</h2>
          <p>Everything you need to know before booking your move. Still curious? <a href="/contact">Reach out</a> -- we'll happily answer anything.</p>
        </div>

        <ul ref={listRef} className="faq__list">
          {FAQS.map((f, i) => {
            const isOpen = open === i;
            const isRevealed = revealed.has(i);
            return (
              <li key={f.q} data-idx={i} className={`faq__item reveal reveal-d${(i % 6) + 1} ${isRevealed ? 'is-revealed' : ''} ${isOpen ? 'is-open' : ''}`}>
                <button
                  className="faq__q"
                  aria-expanded={isOpen}
                  onClick={() => setOpen(isOpen ? -1 : i)}
                >
                  <span>{f.q}</span>
                  <span className="faq__icon">{isOpen ? <FaMinus /> : <FaPlus />}</span>
                </button>
                <div className="faq__a" hidden={!isOpen}>
                  <p>{f.a}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
