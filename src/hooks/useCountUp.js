import { useEffect, useRef, useState } from 'react';

/**
 * Animates a number from 0 to `end` when the element enters viewport.
 * Returns [ref, displayValue].
 */
export default function useCountUp(end, { duration = 1800, decimals = 0 } = {}) {
  const ref = useRef(null);
  const [value, setValue] = useState(0);
  const started = useRef(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting && !started.current) {
          started.current = true;
          const start = performance.now();
          const step = (now) => {
            const p = Math.min(1, (now - start) / duration);
            const eased = 1 - Math.pow(1 - p, 3);
            setValue(end * eased);
            if (p < 1) requestAnimationFrame(step);
            else setValue(end);
          };
          requestAnimationFrame(step);
          io.unobserve(el);
        }
      });
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, [end, duration]);

  return [ref, decimals ? value.toFixed(decimals) : Math.round(value)];
}
