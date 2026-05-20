import { useState } from 'react';

/**
 * Image wrapper — tries local asset first, falls back to Unsplash, then Picsum.
 */
export default function Photo({ src: localSrc, id, seed, alt, w = 1000, h = 700, className = '', style }) {
  const [src, setSrc] = useState(
    localSrc
      ? localSrc
      : `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`
  );
  const [stage, setStage] = useState(0); // 0=local/unsplash 1=picsum

  const handleError = () => {
    if (stage === 0) {
      setStage(1);
      setSrc(
        id
          ? `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=80`
          : `https://picsum.photos/seed/${seed}/${w}/${h}`
      );
    } else if (stage === 1) {
      setStage(2);
      setSrc(`https://picsum.photos/seed/${seed}/${w}/${h}`);
    }
  };

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      decoding="async"
      className={className}
      style={style}
      onError={handleError}
    />
  );
}

/* Curated image set — real Ancient Movers company photos (local) with Unsplash fallback */
export const PHOTOS = {
  heroTruck:    { src: '/images/truck.jpg',        id: '1600518464441-9306b00c9ec1', seed: 'movers-hero'     },
  loadingTruck: { src: '/images/cta-bg.jpg',       id: '1611078489935-0cb964de46d6', seed: 'loading-truck'   },
  packingBox:   { src: '/images/packing.webp',     id: '1558997519-83ea9252edf8',    seed: 'packing-box'     },
  movingFamily: { src: '/images/staff.jpg',        id: '1600585154340-be6161a56a0c', seed: 'moving-family'   },
  cardboard:    { src: '/images/staff.jpg',        id: '1582482601195-72c3127ea5d6', seed: 'cardboard'       },
  emptyRoom:    { src: '/images/furniture.jpg',    id: '1568605114967-8130f3a36994', seed: 'empty-room'      },
  warehouse:    { src: '/images/fleet-truck.png',  id: '1601979031925-424e53b6caaa', seed: 'warehouse'       },
  cityStreet:   { src: '/images/truck.jpg',        id: '1574362848149-11496d93a7c7', seed: 'city-street'     },
  truckRoad:    { src: '/images/truck.jpg',        id: '1601584115197-04ecc0da31d7', seed: 'truck-road'      },
  officeMove:   { src: '/images/furniture.jpg',    id: '1497366216548-37526070297c', seed: 'office-move'     },
  pianoSpec:    { src: '/images/piano.webp',       id: '1520523839897-bd0b52f945a0', seed: 'specialty'       },
  teamSmile:    { src: '/images/cta-bg.jpg',       id: '1521737604893-d14cc237f11d', seed: 'team-smile'      },
  senior:       { src: '/images/senior.webp',      id: '1581579438828-4b1b7d638b3e', seed: 'senior'          },
  hottub:       { src: '/images/hottub.jpg',       id: '1520523839897-bd0b52f945a0', seed: 'hottub'          },
  longdistance: { src: '/images/longdistance.jpg', id: '1601584115197-04ecc0da31d7', seed: 'long-distance'   },
  ctaBg:        { src: '/images/cta-bg.jpg',       id: '1611078489935-0cb964de46d6', seed: 'cta-bg'          },
};
