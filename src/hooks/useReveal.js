import { useEffect, useRef } from 'react';

export default function useReveal(options = {}) {
  const ref = useRef(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) {
            el.classList.add('is-revealed');
            io.unobserve(el);
          }
        });
      },
      // threshold:0 → reveal as soon as any part enters view. A fixed ratio like
      // 0.12 can never be reached by sections taller than ~8x the viewport (e.g.
      // the single-column services grid on mobile), leaving them stuck at opacity:0.
      { threshold: 0, rootMargin: '0px 0px -60px 0px', ...options }
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);
  return ref;
}
