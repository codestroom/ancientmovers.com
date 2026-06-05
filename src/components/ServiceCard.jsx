import { Link } from 'react-router-dom';
import { FaHome, FaBuilding, FaBoxOpen, FaTruck, FaWarehouse, FaCouch, FaHeart, FaArrowRight, FaCheck } from 'react-icons/fa';
import Photo from './Photo.jsx';

const ICONS = {
  home:      FaHome,
  building:  FaBuilding,
  box:       FaBoxOpen,
  truck:     FaTruck,
  warehouse: FaWarehouse,
  sofa:      FaCouch,
  heart:     FaHeart
};

export default function ServiceCard({ service, index = 0 }) {
  const Icon = ICONS[service.icon] || FaTruck;

  return (
    <Link to="/contact" className={`service-card reveal-d${(index % 6) + 1}`} aria-label={`Get a quote for ${service.title}`}>
      <Photo
        src={service.photo.src}
        id={service.photo.id}
        seed={service.photo.seed}
        alt={service.title}
        w={900}
        h={600}
        className="service-card__img"
      />
      <div className="service-card__overlay" />

      <div className="service-card__content">
        <span className="service-card__icon"><Icon /></span>

        <div className="service-card__bottom">
          <h3>{service.title}</h3>
          <p className="service-card__desc">{service.desc}</p>
          <ul className="service-card__features">
            {service.features.map(f => (
              <li key={f}><FaCheck /> {f}</li>
            ))}
          </ul>
          <span className="service-card__link">
            Get a quote <FaArrowRight />
          </span>
        </div>
      </div>
    </Link>
  );
}
