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

function ReelCard({ reel }) {
  return (
    <article className="reel-card">
      <div className="reel-card__media">
        <video
          className="reel-card__video"
          src={reel.video}
          poster={reel.poster}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
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

  return (
    <section className="reels">
      <div className="container">
        <div ref={headRef} className="reveal section-head reels__head">
          <span className="eyebrow">Watch Us in Action</span>
          <h2>See Our Movers in Action</h2>
          <p>Hover over any clip to watch our crews at work &mdash; real Detroit moves, real Ancient Movers care.</p>
        </div>

        <div className="reels__track">
          {REELS.map((r) => (
            <ReelCard key={r.video} reel={r} />
          ))}
        </div>
      </div>
    </section>
  );
}
