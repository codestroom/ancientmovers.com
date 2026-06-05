import { FaShieldAlt, FaStar, FaCheckCircle, FaTruck, FaAward, FaUserShield, FaThumbsUp, FaClock, FaTag, FaPhone } from 'react-icons/fa';
import './TrustMarquee.css';

const ITEMS = [
  { icon: FaShieldAlt,  text: 'Licensed & Bonded in Michigan' },
  { icon: FaUserShield, text: 'Fully Insured — Cargo & Liability' },
  { icon: FaStar,       text: '5★ · 2,100+ Google Reviews' },
  { icon: FaAward,      text: 'Best of Detroit 2024' },
  { icon: FaCheckCircle,text: 'Background-Checked Crews' },
  { icon: FaTruck,      text: 'USDOT Certified Fleet' },
  { icon: FaThumbsUp,   text: 'Serving Detroit Since 2015' },
  { icon: FaClock,      text: 'On-Time Guarantee' },
  { icon: FaTag,        text: '10% Off Packing Supplies When You Book' },
  { icon: FaPhone,      text: 'Free Quote Within 15 Minutes' },
];

export default function TrustMarquee() {
  return (
    <div className="marquee" aria-label="Trust badges">
      <div className="marquee__track">
        {[...ITEMS, ...ITEMS].map((item, i) => {
          const Icon = item.icon;
          return (
            <div key={i} className="marquee__item">
              <Icon aria-hidden="true" /> <span>{item.text}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
