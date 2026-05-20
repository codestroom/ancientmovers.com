import { FaPhoneAlt } from 'react-icons/fa';
import { SITE } from '../data/siteData.js';
import './FloatingCall.css';

export default function FloatingCall() {
  return (
    <a href={SITE.phoneHref} className="floating-call" aria-label={`Call ${SITE.phone}`}>
      <span className="floating-call__ring" aria-hidden="true" />
      <span className="floating-call__ring floating-call__ring--2" aria-hidden="true" />
      <FaPhoneAlt />
      <span className="floating-call__label">{SITE.phone}</span>
    </a>
  );
}
