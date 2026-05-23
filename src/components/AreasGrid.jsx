import { useEffect, useRef, useState } from 'react';
import { FaMapMarkerAlt, FaArrowRight } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MapContainer, TileLayer, Marker, Tooltip, ZoomControl } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

import { SERVICE_AREA_LOCATIONS } from '../data/siteData.js';
import useReveal from '../hooks/useReveal.js';
import './AreasGrid.css';

const MAP_CENTER = [42.45, -83.20];
const MAP_ZOOM = 9;
const MAP_BOUNDS = [
  [42.10, -84.00],
  [42.85, -82.70],
];

function makePinIcon() {
  const html = `
    <div class="am-pin">
      <span class="am-pin__ring"></span>
      <span class="am-pin__shadow"></span>
      <span class="am-pin__core"></span>
    </div>`;
  return L.divIcon({
    className: 'am-pin-wrap',
    html,
    iconSize: [22, 22],
    iconAnchor: [11, 11],
  });
}

const TOOLTIP_OFFSET = {
  top:    [0, -14],
  bottom: [0, 14],
  left:   [-14, 0],
  right:  [14, 0],
};

export default function AreasGrid({ withHeading = true }) {
  const headRef = useReveal();
  const gridRef = useRef(null);
  const [active, setActive] = useState(null);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.area-card') || [];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-revealed'); io.unobserve(e.target); }
      }),
      { threshold: 0.1 }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="areas">
      <div className="areas__pattern" aria-hidden="true" />
      <div className="container">
        {withHeading && (
          <div ref={headRef} className="section-head reveal">
            <span className="eyebrow">Where We Move</span>
            <h2>Proudly Serving All of Metro Detroit &amp; Beyond</h2>
            <p>Ancient Movers covers 16+ Michigan neighborhoods. Click any city to start your free quote.</p>
          </div>
        )}

        {/* ============ Premium 3D Map ============ */}
        <div className="areas__map-stage">
          <div className="areas__map-card">
            <div className="areas__map-chrome">
              <span className="areas__map-dot areas__map-dot--r" />
              <span className="areas__map-dot areas__map-dot--y" />
              <span className="areas__map-dot areas__map-dot--g" />
              <span className="areas__map-title">Metro Detroit Coverage</span>
              <span className="areas__map-live"><i /> Live Service Area</span>
            </div>

            <div className="areas__map-tilt">
              <MapContainer
                center={MAP_CENTER}
                zoom={MAP_ZOOM}
                minZoom={8}
                maxZoom={12}
                maxBounds={MAP_BOUNDS}
                maxBoundsViscosity={1}
                scrollWheelZoom={false}
                zoomControl={false}
                attributionControl={false}
                className="areas__leaflet"
              >
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_nolabels/{z}/{x}/{y}{r}.png"
                  subdomains={['a', 'b', 'c', 'd']}
                  maxZoom={20}
                />
                <TileLayer
                  url="https://{s}.basemaps.cartocdn.com/dark_only_labels/{z}/{x}/{y}{r}.png"
                  subdomains={['a', 'b', 'c', 'd']}
                  maxZoom={20}
                  opacity={0.45}
                />
                <ZoomControl position="bottomright" />

                {SERVICE_AREA_LOCATIONS.map((p) => (
                  <Marker
                    key={p.name}
                    position={[p.lat, p.lng]}
                    icon={makePinIcon()}
                    eventHandlers={{
                      mouseover: () => setActive(p.name),
                      mouseout: () => setActive(null),
                    }}
                  >
                    <Tooltip
                      permanent
                      direction={p.dir}
                      offset={TOOLTIP_OFFSET[p.dir]}
                      opacity={1}
                      className={`am-label am-label--${p.dir}${active === p.name ? ' is-active' : ''}`}
                    >
                      {p.name}
                    </Tooltip>
                  </Marker>
                ))}
              </MapContainer>

              {/* Glass overlay for premium sheen */}
              <span className="areas__map-sheen" aria-hidden="true" />
            </div>

            <div className="areas__map-legend">
              <span><i className="dot" /> {SERVICE_AREA_LOCATIONS.length} active service zones</span>
              <span className="sep">•</span>
              <span>Same-day quotes</span>
              <span className="sep">•</span>
              <span>Drag &amp; zoom to explore</span>
            </div>
          </div>
        </div>

        {/* ============ City cards ============ */}
        <div ref={gridRef} className="areas__grid">
          {SERVICE_AREA_LOCATIONS.map((a, i) => (
            <Link
              key={a.name}
              to="/contact"
              className={`area-card reveal reveal-d${(i % 6) + 1}${active === a.name ? ' is-linked' : ''}`}
              style={{ '--i': i }}
              onMouseEnter={() => setActive(a.name)}
              onMouseLeave={() => setActive(null)}
            >
              <span className="area-card__icon"><FaMapMarkerAlt /></span>
              <span className="area-card__name">{a.name}, MI</span>
              <FaArrowRight className="area-card__arrow" />
              <span className="area-card__glow" aria-hidden="true" />
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
