import { useEffect, useRef, useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaArrowRight, FaPhoneAlt, FaShieldAlt,
  FaStar, FaClock, FaAward, FaMapMarkerAlt,
} from 'react-icons/fa';
import { SITE } from '../data/siteData.js';
import './CinematicHero.css';

const fadeUp = {
  hidden:  { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.2, 0.8, 0.2, 1] } },
};

const stagger = {
  visible: { transition: { staggerChildren: 0.11 } },
};

const SPARKLES = Array.from({ length: 11 }, (_, i) => ({
  left:     `${(i * 9.1 + 4) % 94}%`,
  top:      `${(i * 11.7 + 7) % 86}%`,
  delay:    `${(i * 0.52).toFixed(2)}s`,
  duration: `${3.4 + (i % 4)}s`,
}));

const VIDEO_SRC = '/videos/ancient-movers-showcase.mp4';
const VIDEO_POSTER = '/images/reels/reel-1.jpg';

function useIsMobile() {
  const [mobile, setMobile] = useState(() =>
    typeof window !== 'undefined' && window.innerWidth <= 960
  );
  useEffect(() => {
    const mq = window.matchMedia('(max-width: 960px)');
    const handler = (e) => setMobile(e.matches);
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);
  return mobile;
}

export default function CinematicHero() {
  const isMobile = useIsMobile();
  const bgVideoRef = useRef(null);

  useEffect(() => {
    const v = bgVideoRef.current;
    if (!v || isMobile) return;
    // Only attempt play on desktop; iOS autoplay is handled by the attributes
    const p = v.play();
    if (p && p.catch) p.catch(() => {});
  }, [isMobile]);

  return (
    <section className="ch">

      {/* ── Decorative background ── */}
      <div className="ch__bg" aria-hidden="true">
        {/* Background video: desktop only, lazy metadata, no autoplay on mobile */}
        {!isMobile && (
          <video
            ref={bgVideoRef}
            className="ch__bg-video"
            src={VIDEO_SRC}
            poster={VIDEO_POSTER}
            autoPlay
            muted
            loop
            playsInline
            preload="none"
          />
        )}
        <div className="ch__bg-overlay" />
        <div className="ch__blob ch__blob--1" />
        <div className="ch__blob ch__blob--2" />
        <div className="ch__blob ch__blob--3" />
        <div className="ch__dot-grid" />
        {SPARKLES.map((s, i) => (
          <span key={i} className="ch__sparkle" style={{
            left: s.left, top: s.top,
            animationDelay: s.delay, animationDuration: s.duration,
          }} />
        ))}
      </div>

      <div className="container ch__inner">

        {/* ── Left: copy ── */}
        <motion.div className="ch__content" variants={stagger} initial="hidden" animate="visible">

          <motion.div variants={fadeUp} className="ch__eyebrow">
            <span className="ch__eyebrow-dot" />
            Detroit&rsquo;s #1 Trusted Movers Since 2015
          </motion.div>

          <motion.h1 variants={fadeUp} className="ch__h1">
            Moving Detroit<br />
            Families Forward<br />
            <em>With Care &amp; Precision</em>
          </motion.h1>

          <motion.p variants={fadeUp} className="ch__sub">
            From Downtown Detroit to the suburbs — professional, on-time
            residential and commercial moves with honest pricing and zero
            hidden fees.
          </motion.p>

          <motion.div variants={fadeUp} className="ch__ctas">
            <Link to="/contact" className="btn btn-primary btn-lg">
              Get Free Quote <FaArrowRight />
            </Link>
            <a href={SITE.phoneHref} className="btn btn-secondary btn-lg">
              <FaPhoneAlt /> {SITE.phone}
            </a>
          </motion.div>

          <motion.div variants={fadeUp} className="ch__trust-pills">
            <span className="ch__pill"><FaShieldAlt /> Licensed &amp; Insured</span>
            <span className="ch__pill"><FaStar /> 5★ Google</span>
            <span className="ch__pill"><FaClock /> 15-Min Free Quote</span>
          </motion.div>

        </motion.div>

        {/* ── Right: truck + floating badges ── */}
        <motion.div
          className="ch__visual"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <div className="ch__truck-wrap">

            <div className="ch__truck-glow" />

            {/* CSS float wrapper — keeps transforms off the Framer element */}
            <div className="ch__truck-float-wrap">
              {/* On mobile show a static poster image — no video decode memory hit */}
              {isMobile ? (
                <motion.img
                  src={VIDEO_POSTER}
                  alt="Ancient Movers crew in action"
                  className="ch__truck-img"
                  initial={{ opacity: 0, x: 0, scale: 0.88 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.32 }}
                />
              ) : (
                <motion.video
                  src={VIDEO_SRC}
                  poster={VIDEO_POSTER}
                  aria-label="Ancient Movers crew in action"
                  className="ch__truck-img"
                  initial={{ opacity: 0, x: 64, scale: 0.88 }}
                  animate={{ opacity: 1, x: 0, scale: 1 }}
                  transition={{ duration: 0.9, ease: [0.2, 0.8, 0.2, 1], delay: 0.32 }}
                  autoPlay
                  muted
                  loop
                  playsInline
                  preload="none"
                />
              )}
            </div>

            <div className="ch__truck-shadow" />

            {/* Badge — top right */}
            <div className="ch__badge-wrap ch__badge-wrap--top">
              <motion.div
                className="ch__badge"
                initial={{ opacity: 0, scale: 0.78 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1], delay: 0.9 }}
              >
                <div className="ch__badge-icon ch__badge-icon--orange"><FaAward /></div>
                <div>
                  <strong>5★ Rating</strong>
                  <span>2,100+ Reviews</span>
                </div>
              </motion.div>
            </div>

            {/* Badge — bottom left */}
            <div className="ch__badge-wrap ch__badge-wrap--btm">
              <motion.div
                className="ch__badge"
                initial={{ opacity: 0, scale: 0.78 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.55, ease: [0.34, 1.56, 0.64, 1], delay: 1.1 }}
              >
                <div className="ch__badge-icon ch__badge-icon--green"><FaMapMarkerAlt /></div>
                <div>
                  <strong>Serving Detroit</strong>
                  <span>Metro &amp; Surrounding Areas</span>
                </div>
              </motion.div>
            </div>

          </div>
        </motion.div>

      </div>

      {/* ── Wave into next section ── */}
      <svg className="ch__wave" viewBox="0 0 1440 72" preserveAspectRatio="none" aria-hidden="true">
        <path fill="#FFF5E8" d="M0,36 C360,72 1080,0 1440,48 L1440,72 L0,72 Z" />
      </svg>

    </section>
  );
}
