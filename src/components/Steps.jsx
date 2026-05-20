import { useEffect, useRef } from 'react';
import { STEPS } from '../data/siteData.js';
import useReveal from '../hooks/useReveal.js';
import './Steps.css';

export default function Steps() {
  const headRef = useReveal();
  const wrapRef = useRef(null);
  const pathRef = useRef(null);

  useEffect(() => {
    const path = pathRef.current;
    if (!path) return;
    const length = path.getTotalLength();
    path.style.strokeDasharray = length;
    path.style.strokeDashoffset = length;

    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) {
          path.style.transition = 'stroke-dashoffset 1.8s cubic-bezier(.2,.8,.2,1)';
          path.style.strokeDashoffset = 0;
          io.unobserve(e.target);
        }
      }),
      { threshold: 0.25 }
    );
    if (wrapRef.current) io.observe(wrapRef.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    const cards = wrapRef.current?.querySelectorAll('.step') || [];
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
    <section className="steps">
      <div className="container">
        <div ref={headRef} className="reveal section-head">
          <span className="eyebrow">How It Works</span>
          <h2>Your Move in Four Easy Steps</h2>
          <p>We've simplified the moving process so you can focus on what matters -- settling into your new home.</p>
        </div>

        <div ref={wrapRef} className="steps__wrap">
          {/* Decorative curving path connecting the steps */}
          <svg className="steps__path" viewBox="0 0 1200 80" preserveAspectRatio="none" aria-hidden="true">
            <defs>
              <linearGradient id="stepGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#ff8a2b" />
                <stop offset="100%" stopColor="#c14b00" />
              </linearGradient>
            </defs>
            <path
              ref={pathRef}
              d="M 60 60 C 220 0, 380 100, 540 40 S 860 -10, 1020 50 S 1140 70, 1180 30"
              stroke="url(#stepGrad)"
              strokeWidth="3"
              fill="none"
              strokeLinecap="round"
              strokeDasharray="6 8"
            />
          </svg>

          <ol className="steps__grid">
            {STEPS.map((s, i) => (
              <li key={s.n} className={`step reveal reveal-d${i + 1}`}>
                <div className="step__num">{s.n}</div>
                <h3>{s.title}</h3>
                <p>{s.desc}</p>
                <div className="step__shine" aria-hidden="true" />
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
