import { useEffect, useState } from 'react';
import { FaTruck } from 'react-icons/fa';
import './Preloader.css';

export default function Preloader({ onDone }) {
  const [exiting, setExiting] = useState(false);

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 2700);
    const doneTimer = setTimeout(onDone, 3420);
    return () => { clearTimeout(exitTimer); clearTimeout(doneTimer); };
  }, [onDone]);

  return (
    <div className={`pl${exiting ? ' pl--exit' : ''}`} aria-hidden="true" role="status">
      <div className="pl__blob pl__blob--a" />
      <div className="pl__blob pl__blob--b" />
      <div className="pl__dot-grid" />

      <div className="pl__inner">

        {/* Logo */}
        <div className="pl__logo-wrap">
          <img src="/logo.png" alt="Ancient Movers" className="pl__logo" />
        </div>

        {/* Tagline */}
        <p className="pl__tagline">Detroit&rsquo;s Most Trusted Movers</p>

        {/* Truck road */}
        <div className="pl__loader">
          <div className="pl__road">
            <div className="pl__road-fill">
              <div className="pl__road-dashes" />
            </div>
            <div className="pl__truck">
              <FaTruck aria-hidden="true" />
            </div>
          </div>

          {/* Three real spans — CSS content animation doesn't work */}
          <span className="pl__loading-text">
            Loading
            <span className="pl__dot pl__dot--1">.</span>
            <span className="pl__dot pl__dot--2">.</span>
            <span className="pl__dot pl__dot--3">.</span>
          </span>
        </div>

      </div>
    </div>
  );
}
