import { useRef, useEffect } from 'react';

export default function useTilt({ max = 12, scale = 1.03, glare = true } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let rect;
    let raf;
    let glareEl;

    if (glare) {
      glareEl = document.createElement('span');
      glareEl.className = 'tilt-glare';
      el.appendChild(glareEl);
    }

    const onEnter = () => { rect = el.getBoundingClientRect(); el.style.transition = 'transform 80ms ease-out'; };
    const onMove = (e) => {
      if (!rect) rect = el.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width;
      const y = (e.clientY - rect.top) / rect.height;
      const rx = (0.5 - y) * (max * 2);
      const ry = (x - 0.5) * (max * 2);
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        el.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) scale(${scale})`;
        if (glareEl) {
          glareEl.style.background = `radial-gradient(circle at ${x * 100}% ${y * 100}%, rgba(255,255,255,.55), transparent 45%)`;
        }
      });
    };
    const onLeave = () => {
      el.style.transition = 'transform 400ms cubic-bezier(.2,.8,.2,1)';
      el.style.transform = 'perspective(900px) rotateX(0) rotateY(0) scale(1)';
      if (glareEl) glareEl.style.background = 'transparent';
    };

    el.addEventListener('mouseenter', onEnter);
    el.addEventListener('mousemove', onMove);
    el.addEventListener('mouseleave', onLeave);
    return () => {
      el.removeEventListener('mouseenter', onEnter);
      el.removeEventListener('mousemove', onMove);
      el.removeEventListener('mouseleave', onLeave);
      cancelAnimationFrame(raf);
      if (glareEl) glareEl.remove();
    };
  }, [max, scale, glare]);

  return ref;
}
