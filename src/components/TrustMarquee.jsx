import { FaShieldAlt, FaStar, FaCheckCircle, FaTruck, FaAward, FaUserShield, FaThumbsUp, FaClock } from 'react-icons/fa';
import './TrustMarquee.css';

const ITEMS = [
  { icon: FaShieldAlt, text: 'Licensed & Bonded' },
  { icon: FaUserShield, text: 'Fully Insured' },
  { icon: FaStar, text: '4.9★ on Google' },
  { icon: FaAward, text: 'Best of Detroit 2024' },
  { icon: FaCheckCircle, text: 'Background-Checked Crews' },
  { icon: FaTruck, text: 'USDOT Certified' },
  { icon: FaThumbsUp, text: '10,000+ Happy Movers' },
  { icon: FaClock, text: 'On-Time Guarantee' }
];

export default function TrustMarquee() {
  return (
    <div className="marquee" aria-label="Trust badges">
      <div className="marquee__track">
        {[...ITEMS, ...ITEMS].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="marquee__item">
              <Icon /> <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
