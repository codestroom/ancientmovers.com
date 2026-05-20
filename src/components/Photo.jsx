import { useState } from 'react';

/**
 * Image wrapper with graceful fallback.
 *  - Tries Unsplash photo by `id`
 *  - Falls back to Picsum seeded photo if Unsplash fails
 *  - Lazy loads + supports object-fit via className
 */
export default function Photo({ id, seed, alt, w = 1000, h = 700, className = '', style }) {
  const [src, setSrc] = useState(
    `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`
  );
  const [errored, setErrored] = useState(false);

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      style={style}
      onError={() => {
        if (!errored) {
          setErrored(true);
          setSrc(`https://picsum.photos/seed/${seed}/${w}/${h}`);
        }
      }}
    />
  );
}

/* Curated image set (Unsplash photo IDs + Picsum seed fallback) */
export const PHOTOS = {
  heroTruck:   { id: '1600518464441-9306b00c9ec1', seed: 'movers-hero' },
  loadingTruck:{ id: '1611078489935-0cb964de46d6', seed: 'loading-truck' },
  packingBox:  { id: '1558997519-83ea9252edf8',    seed: 'packing-box' },
  movingFamily:{ id: '1600585154340-be6161a56a0c', seed: 'moving-family' },
  cardboard:   { id: '1582482601195-72c3127ea5d6', seed: 'cardboard' },
  emptyRoom:   { id: '1568605114967-8130f3a36994', seed: 'empty-room' },
  warehouse:   { id: '1601979031925-424e53b6caaa', seed: 'warehouse' },
  cityStreet:  { id: '1574362848149-11496d93a7c7', seed: 'city-street' },
  truckRoad:   { id: '1601584115197-04ecc0da31d7', seed: 'truck-road' },
  officeMove:  { id: '1497366216548-37526070297c', seed: 'office-move' },
  pianoSpec:   { id: '1520523839897-bd0b52f945a0', seed: 'specialty' },
  teamSmile:   { id: '1521737604893-d14cc237f11d', seed: 'team-smile' },
};
