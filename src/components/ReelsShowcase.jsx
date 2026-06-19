import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa';
import useReveal from '../hooks/useReveal.js';
import './ReelsShowcase.css';

const REELS = [
  { video: '/videos/reel-1.mp4', poster: '/images/reels/reel-1.jpg', tag: 'Our Fleet',     title: 'Our branded fleet, ready to roll' },
  { video: '/videos/reel-2.mp4', poster: '/images/reels/reel-2.jpg', tag: 'Move Day',      title: 'Loaded with care, every time' },
  { video: '/videos/reel-3.mp4', poster: '/images/reels/reel-3.jpg', tag: 'Packing',       title: 'Packing perfection in fine homes' },
  { video: '/videos/reel-4.mp4', poster: '/images/reels/reel-4.jpg', tag: 'Heavy Lifting', title: 'Heavy items, handled with ease' },
  { video: '/videos/reel-5.mp4', poster: '/images/reels/reel-5.jpg', tag: 'Protection',    title: 'Every piece wrapped & protected' },
  { video: '/videos/reel-6.mp4', poster: '/images/reels/reel-6.jpg', tag: 'In Action',     title: 'Move day, start to finish' },
];

function ReelCard({ reel, registerVideo }) {
  return (
    <article className="reel-card">
      <div className="reel-card__media">
        {/*
          No src here — src is injected by the IntersectionObserver below only
          when the card scrolls into view. This prevents iOS from allocating
          decode memory for all 6 videos simultaneously on page load.
        */}
        <video
          ref={registerVideo}
          className="reel-card__video"
          data-src={reel.video}
          poster={reel.poster}
          muted
          loop
          playsInline
          preload="none"
        />
        <div className="reel-card__overlay" />
        <span className="reel-card__tag">{reel.tag}</span>
        <div className="reel-card__content">
          <h3>{reel.title}</h3>
          <Link to="/contact" className="reel-card__btn">
            Get Free Quote <FaArrowRight />
          </Link>
        </div>
      </div>
    </article>
  );
}

export default function ReelsShowcase() {
  const headRef = useReveal();
  const trackRef = useRef(null);
  const videosRef = useRef([]);

  useEffect(() => {
    const track = trackRef.current;
    const videos = videosRef.current.filter(Boolean);
    if (!track || !videos.length) return;

    // Two-level observer strategy:
    // 1. Outer observer (viewport root): lazily inject src when card nears viewport.
    // 2. Inner observer (track root): play/pause based on which card is centred.
    const srcObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const video = entry.target;
            if (!video.src && video.dataset.src) {
              video.src = video.dataset.src;
            }
            srcObserver.unobserve(video);
          }
        });
      },
      { rootMargin: '200px' }
    );

    const playObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;
          const card = video.closest('.reel-card');
          if (entry.isIntersecting && entry.intersectionRatio >= 0.6) {
            card?.classList.add('is-active');
            // Ensure the src is loaded even if the lazy srcObserver hasn't run
            // yet — otherwise an already-visible card never starts playing.
            if (!video.src && video.dataset.src) {
              video.src = video.dataset.src;
            }
            const p = video.play();
            if (p && p.catch) p.catch(() => {});
          } else {
            card?.classList.remove('is-active');
            video.pause();
          }
        });
      },
      { root: track, threshold: [0, 0.6, 0.9] }
    );

    videos.forEach((v) => {
      srcObserver.observe(v);
      playObserver.observe(v);
    });

    return () => {
      srcObserver.disconnect();
      playObserver.disconnect();
    };
  }, []);

  const registerVideo = (index) => (el) => {
    videosRef.current[index] = el;
  };

  return (
    <section className="reels">
      <div className="container">
        <div ref={headRef} className="reveal section-head reels__head">
          <span className="eyebrow">Watch Us in Action</span>
          <h2>See Our Movers in Action</h2>
          <p>Swipe through real Detroit moves &mdash; the clip in view plays automatically, showing our crews at work with real Ancient Movers care.</p>
        </div>

        <div ref={trackRef} className="reels__track">
          {REELS.map((r, i) => (
            <ReelCard key={r.video} reel={r} registerVideo={registerVideo(i)} />
          ))}
        </div>
      </div>
    </section>
  );
}
