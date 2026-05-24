import { useRef, useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  FaPlay, FaPause, FaVolumeMute,
  FaTruckMoving, FaUsers, FaCheckCircle,
  FaArrowRight, FaPhoneAlt, FaMapMarkerAlt,
} from 'react-icons/fa';
import { SITE } from '../data/siteData.js';
import './VideoShowcase.css';

const VIDEO_SRC = '/videos/ancient-movers-showcase.mp4';

const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.2, 0.8, 0.2, 1] } },
};

const stagger = { visible: { transition: { staggerChildren: 0.1 } } };

export default function VideoShowcase() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);
  const [inView,  setInView]  = useState(false);
  const sectionRef = useRef(null);

  /* Pause video when scrolled out of view for performance */
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => {
      setInView(entry.isIntersecting);
      const v = videoRef.current;
      if (!v) return;
      if (entry.isIntersecting) {
        if (v.paused) v.play().catch(() => {});
      } else {
        if (!v.paused) v.pause();
      }
    }, { threshold: 0.15 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play().catch(() => {}); setPlaying(true); }
    else          { v.pause();                setPlaying(false); }
  }

  return (
    <section className="vs" ref={sectionRef}>

      {/* ── Decorative background ── */}
      <div className="vs__bg" aria-hidden="true">
        <div className="vs__blob vs__blob--1" />
        <div className="vs__blob vs__blob--2" />
        <div className="vs__dot-grid" />
      </div>

      <div className="container vs__inner">

        {/* ── Section head ── */}
        <motion.div
          className="vs__head"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.3 }}
        >
          <motion.span variants={fadeUp} className="vs__eyebrow">
            <span className="vs__eyebrow-line" />
            Real Moves · Real Detroit
            <span className="vs__eyebrow-line" />
          </motion.span>
          <motion.h2 variants={fadeUp} className="vs__title">
            Watch Detroit Move<br />
            <em>With Ancient Movers</em>
          </motion.h2>
          <motion.p variants={fadeUp} className="vs__sub">
            Get a real look at our crew in action — careful handling, professional gear,
            and the kind of seamless moves Detroit families have trusted for over a decade.
          </motion.p>
        </motion.div>

        {/* ── Video card ── */}
        <motion.div
          className="vs__stage"
          initial={{ opacity: 0, y: 48, scale: 0.97 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.85, ease: [0.2, 0.8, 0.2, 1] }}
        >
          <div className="vs__glow" aria-hidden="true" />

          <div className="vs__frame">

            <div className="vs__chrome">
              <span className="vs__chrome-dot vs__chrome-dot--red" />
              <span className="vs__chrome-dot vs__chrome-dot--yellow" />
              <span className="vs__chrome-dot vs__chrome-dot--green" />
              <span className="vs__chrome-title">
                ancientmovers.com / live-from-the-field
              </span>
              <span className="vs__chrome-live">
                <span className="vs__chrome-live-dot" /> LIVE
              </span>
            </div>

            <div className="vs__media">
              <video
                ref={videoRef}
                className="vs__video"
                src={VIDEO_SRC}
                muted
                autoPlay
                loop
                playsInline
                preload="metadata"
                aria-label="Ancient Movers crew in action"
              />

              {/* Soft warm wash */}
              <div className="vs__wash" aria-hidden="true" />

              {/* Play/pause overlay button */}
              <button
                type="button"
                className={`vs__play ${!playing ? 'vs__play--paused' : ''}`}
                onClick={togglePlay}
                aria-label={playing ? 'Pause video' : 'Play video'}
              >
                {playing ? <FaPause /> : <FaPlay />}
              </button>

              {/* Muted indicator */}
              <div className="vs__muted" aria-hidden="true">
                <FaVolumeMute /> Muted
              </div>

              {/* Caption strip */}
              <div className="vs__caption">
                <span className="vs__caption-dot" />
                <div>
                  <strong>On the Move · Metro Detroit</strong>
                  <span>Behind-the-scenes with our crew</span>
                </div>
              </div>
            </div>

            {/* Floating badge — top right */}
            <motion.div
              className="vs__badge vs__badge--top"
              initial={{ opacity: 0, scale: 0.8, x: 30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.4 }}
            >
              <div className="vs__badge-icon vs__badge-icon--orange"><FaTruckMoving /></div>
              <div>
                <strong>10,000+</strong>
                <span>Successful Moves</span>
              </div>
            </motion.div>

            {/* Floating badge — bottom left */}
            <motion.div
              className="vs__badge vs__badge--btm"
              initial={{ opacity: 0, scale: 0.8, x: -30 }}
              whileInView={{ opacity: 1, scale: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: [0.34, 1.56, 0.64, 1], delay: 0.55 }}
            >
              <div className="vs__badge-icon vs__badge-icon--green"><FaUsers /></div>
              <div>
                <strong>Trained Crew</strong>
                <span>Background-checked pros</span>
              </div>
            </motion.div>
          </div>
        </motion.div>

        {/* ── Stats row ── */}
        <motion.div
          className="vs__stats"
          variants={stagger}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.4 }}
        >
          {[
            { icon: <FaCheckCircle />, num: '10+',     label: 'Years Serving Detroit' },
            { icon: <FaTruckMoving />, num: '24/7',    label: 'Crew Availability' },
            { icon: <FaUsers />,       num: '2,100+',  label: 'Five-Star Reviews' },
            { icon: <FaMapMarkerAlt/>, num: '50+',     label: 'Metro Detroit Areas' },
          ].map((s, i) => (
            <motion.div key={i} variants={fadeUp} className="vs__stat">
              <span className="vs__stat-icon">{s.icon}</span>
              <span className="vs__stat-num">{s.num}</span>
              <span className="vs__stat-label">{s.label}</span>
            </motion.div>
          ))}
        </motion.div>

        {/* ── CTA row ── */}
        <motion.div
          className="vs__cta"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <p className="vs__cta-text">
            Ready to see what Detroit&rsquo;s most trusted movers can do for you?
          </p>
          <div className="vs__cta-btns">
            <Link to="/contact" className="btn btn-primary btn-lg">
              Book Your Move <FaArrowRight />
            </Link>
            <a href={SITE.phoneHref} className="btn btn-secondary btn-lg">
              <FaPhoneAlt /> {SITE.phone}
            </a>
          </div>
        </motion.div>

      </div>
    </section>
  );
}
