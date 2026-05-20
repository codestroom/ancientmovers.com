import { FaStar, FaShieldAlt, FaBolt, FaCheckCircle, FaPlay } from 'react-icons/fa';
import Photo, { PHOTOS } from './Photo.jsx';
import './HeroVisual.css';

export default function HeroVisual() {
  return (
    <div className="hv" aria-hidden="true">
      <div className="hv__mesh" />

      {/* Main showcase card with REAL photo */}
      <div className="hv__card">
        <div className="hv__card-glow" />

        <div className="hv__card-head">
          <span className="hv__dot hv__dot--red" />
          <span className="hv__dot hv__dot--yellow" />
          <span className="hv__dot hv__dot--green" />
          <span className="hv__card-title">ancientmovers.com / live</span>
        </div>

        <div className="hv__photo">
          <Photo
            src={PHOTOS.heroTruck.src}
            id={PHOTOS.heroTruck.id}
            seed={PHOTOS.heroTruck.seed}
            alt="Ancient Movers branded truck ready for a Detroit move"
            w={1200}
            h={780}
            className="hv__photo-img"
          />
          {/* Soft brand wash */}
          <div className="hv__photo-overlay" />
          {/* Play button (visual accent) */}
          <button className="hv__play" type="button" aria-label="Watch moving day">
            <FaPlay />
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
