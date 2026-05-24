import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const el    = useRef(null);
  const mouse = useRef({ x: -200, y: -200 });
  const raf   = useRef(null);
  const [state, setState] = useState('idle');

  useEffect(() => {
    if (window.matchMedia('(hover:none),(pointer:coarse)').matches) return;

    const HOVER = 'a,button,[role="button"],input,select,textarea,label,.btn';

    const onMove = (e) => { mouse.current = { x: e.clientX, y: e.clientY }; };
    const onOver = (e) => { if (e.target.closest(HOVER)) setState('hover'); };
    const onOut  = (e) => { if (e.target.closest(HOVER)) setState('idle');  };
    const onDown = ()  => setState('click');
    const onUp   = (e) => setState(e.target.closest(HOVER) ? 'hover' : 'idle');

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover',  onOver);
    document.addEventListener('mouseout',   onOut);
    document.addEventListener('mousedown',  onDown);
    document.addEventListener('mouseup',    onUp);

    const tick = () => {
      const { x, y } = mouse.current;
      if (el.current) el.current.style.transform = `translate(${x}px,${y}px)`;
      raf.current = requestAnimationFrame(tick);
    };
    raf.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover',  onOver);
      document.removeEventListener('mouseout',   onOut);
      document.removeEventListener('mousedown',  onDown);
      document.removeEventListener('mouseup',    onUp);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return <div ref={el} className={`cc cc--${state}`} />;
}
