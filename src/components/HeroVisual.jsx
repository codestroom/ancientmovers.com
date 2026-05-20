import { useRef, useState } from 'react';
import { FaStar, FaShieldAlt, FaBolt, FaCheckCircle, FaPlay, FaPause } from 'react-icons/fa';
import './HeroVisual.css';

const VIDEO_URL = 'https://ancientmovers.ca/wp-content/uploads/2025/05/820417383686310665ancient_movrs_.mp4';

export default function HeroVisual() {
  const videoRef = useRef(null);
  const [playing, setPlaying] = useState(true);

  function togglePlay() {
    const v = videoRef.current;
    if (!v) return;
    if (v.paused) { v.play(); setPlaying(true); }
    else          { v.pause(); setPlaying(false); }
  }

  return (
    <div className="hv" aria-hidden="true">
      <div className="hv__mesh" />

      {/* Main showcase card with VIDEO */}
      <div className="hv__card">
        <div className="hv__card-glow" />

        <div className="hv__card-head">
          <span className="hv__dot hv__dot--red" />
          <span className="hv__dot hv__dot--yellow" />
          <span className="hv__dot hv__dot--green" />
          <span className="hv__card-title">ancientmovers.com / live</span>
        </div>

        <div className="hv__photo">
          <video
            ref={videoRef}
            className="hv__photo-img"
            src={VIDEO_URL}
            autoPlay
            muted
            loop
            playsInline
            preload="metadata"
          />
          {/* Soft brand wash */}
          <div className="hv__photo-overlay" />
          {/* Play / pause toggle */}
          <button className={`hv__play ${!playing ? 'hv__play--paused' : ''}`} type="button" aria-label="Play / pause video" onClick={togglePlay}>
            {playing ? <FaPause /> : <FaPlay />}
          </button>
          {/* Lower-left mini caption */}
          <div className="hv__caption">
            <div className="hv__caption-dot" />
            <div>
              <strong>Live · Michigan</strong>
              <span>Crew on the way</span>
            </div>
          </div>
        </div>
      </div>

      {/* Floating trust badges */}
      <div className="hv__badge hv__badge--rating">
        <div className="hv__badge-icon hv__badge-icon--orange"><FaStar /></div>
        <div>
          <strong>4.9 / 5</strong>
          <span>2,100+ reviews</span>
        </div>
      </div>

      <div className="hv__badge hv__badge--insured">
        <div className="hv__badge-icon hv__badge-icon--green"><FaShieldAlt /></div>
        <div>
          <strong>Licensed</strong>
          <span>& Fully insured</span>
        </div>
      </div>

      <div className="hv__badge hv__badge--moves">
        <div className="hv__badge-icon hv__badge-icon--orange"><FaCheckCircle /></div>
        <div>
          <strong>10,000+</strong>
          <span>Happy moves</span>
        </div>
      </div>

      <div className="hv__badge hv__badge--fast">
        <div className="hv__badge-icon hv__badge-icon--green"><FaBolt /></div>
        <div>
          <strong>1-hour</strong>
          <span>Response time</span>
        </div>
      </div>
    </div>
  );
}
