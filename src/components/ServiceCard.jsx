import { Link } from 'react-router-dom';
import { FaHome, FaBuilding, FaBoxOpen, FaTruck, FaWarehouse, FaCouch, FaArrowRight, FaCheck } from 'react-icons/fa';
import useTilt from '../hooks/useTilt.js';
import Photo from './Photo.jsx';

const ICONS = {
  home: FaHome,
  building: FaBuilding,
  box: FaBoxOpen,
  truck: FaTruck,
  warehouse: FaWarehouse,
  sofa: FaCouch
};

export default function ServiceCard({ service, index = 0 }) {
  const ref = useTilt({ max: 8, scale: 1.03, glare: true });
  const Icon = ICONS[service.icon] || FaTruck;

  return (
    <article ref={ref} className={`service-card tilt reveal reveal-d${(index % 6) + 1}`}>
      <div className="service-card__photo">
        <Photo
          id={service.photo.id}
          seed={service.photo.seed}
          alt={service.title}
          w={600}
          h={360}
          className="service-card__photo-img"
        />
        <div className="service-card__photo-overlay" />
        <div className="service-card__icon"><Icon /></div>
      </div>
      <div className="service-card__body">
        <h3>{service.title}</h3>
        <p>{service.desc}</p>
        <ul>
          {service.features.map(f => <li key={f}><FaCheck /> {f}</li>)}
        </ul>
        <Link to="/contact" className="service-card__link">
          Get a quote <FaArrowRight />
        </Link>
      </div>
    </article>
  );
}
