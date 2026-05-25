import { useEffect, useRef, useState } from 'react';
import './CustomCursor.css';

export default function CustomCursor() {
  const el = useRef(null);
  const mouse = useRef({ x: -200, y: -200 });
  const prevMouse = useRef({ x: -200, y: -200 });
  const ringPos = useRef({ x: -200, y: -200 });
  const angle = useRef(0);
  const speed = useRef(0);
  const raf = useRef(null);
  const [state, setState] = useState('idle');

  useEffect(() => {
    // Disable custom cursor on coarse touch/mobile devices
    if (window.matchMedia('(hover:none),(pointer:coarse)').matches) return;

    const HOVER = 'a, button, [role="button"], input, select, textarea, label, .btn, .contact-card, .select-option-btn, .map-node-city, .map-node-hq, .faq-accordion-trigger, .sa-test-nav-btn, .sa-test-dot';

    const onMove = (e) => {
      mouse.current = { x: e.clientX, y: e.clientY };
    };
    
    const onOver = (e) => {
      if (e.target && e.target.closest && e.target.closest(HOVER)) setState('hover');
    };
    const onOut = (e) => {
      if (e.target && e.target.closest && e.target.closest(HOVER)) setState('idle');
    };
    const onDown = () => setState('click');
    const onUp = (e) => {
      setState(e.target && e.target.closest && e.target.closest(HOVER) ? 'hover' : 'idle');
    };

    document.addEventListener('mousemove', onMove, { passive: true });
    document.addEventListener('mouseover', onOver);
    document.addEventListener('mouseout', onOut);
    document.addEventListener('mousedown', onDown);
    document.addEventListener('mouseup', onUp);

    const tick = () => {
      const targetX = mouse.current.x;
      const targetY = mouse.current.y;
      
      // Interpolate coordinates for fluid elastic lag
      ringPos.current.x += (targetX - ringPos.current.x) * 0.18;
      ringPos.current.y += (targetY - ringPos.current.y) * 0.18;

      // Calculate directional vector & velocity
      const dx = targetX - prevMouse.current.x;
      const dy = targetY - prevMouse.current.y;
      const dist = Math.sqrt(dx * dx + dy * dy);
      
      // Smooth speed changes
      speed.current += (dist - speed.current) * 0.18;

      // Calculate angle only if mouse actually traveled (prevents spin flip-flops)
      if (dist > 1.2) {
        let targetAngle = Math.atan2(dy, dx) * (180 / Math.PI);
        
        // Handle angle wrap transitions nicely (avoid snap circles)
        let diff = targetAngle - angle.current;
        while (diff < -180) diff += 360;
        while (diff > 180) diff -= 360;
        angle.current += diff * 0.22;
      }

      prevMouse.current = { x: targetX, y: targetY };

      if (el.current) {
        el.current.style.transform = `translate3d(${ringPos.current.x}px, ${ringPos.current.y}px, 0)`;
        
        // Stretch arrow depending on motion speed
        const stretch = Math.min(1.45, 1 + speed.current * 0.022);
        const squeeze = Math.max(0.68, 1 - speed.current * 0.012);
        
        const arrow = el.current.querySelector('.cc-arrow');
        if (arrow) {
          arrow.style.transform = `rotate(${angle.current}deg) scale(${stretch}, ${squeeze})`;
        }
      }

      raf.current = requestAnimationFrame(tick);
    };

    raf.current = requestAnimationFrame(tick);

    return () => {
      document.removeEventListener('mousemove', onMove);
      document.removeEventListener('mouseover', onOver);
      document.removeEventListener('mouseout', onOut);
      document.removeEventListener('mousedown', onDown);
      document.removeEventListener('mouseup', onUp);
      cancelAnimationFrame(raf.current);
    };
  }, []);

  return (
    <div ref={el} className={`cc-compass cc-compass--${state}`}>
      {/* Outer Dial Gauge Wrapper */}
      <div className="cc-ring-wrapper">
        <svg viewBox="0 0 40 40" className="cc-svg">
          {/* Outer compass boundary dial */}
          <circle cx="20" cy="20" r="18" className="cc-svg-dial" />
          
          {/* Dial tick marks (North, South, East, West) */}
          <line x1="20" y1="2" x2="20" y2="5" className="cc-svg-tick" />
          <line x1="20" y1="35" x2="20" y2="38" className="cc-svg-tick" />
          <line x1="2" y1="20" x2="5" y2="20" className="cc-svg-tick" />
          <line x1="35" y1="20" x2="38" y2="20" className="cc-svg-tick" />
        </svg>

        {/* Dynamic Forward Pointer Arrow */}
        <div className="cc-arrow">
          <svg viewBox="0 0 24 24" className="cc-arrow-svg">
            <path d="M21,12L3,5L7,12L3,19L21,12Z" fill="var(--orange-500)" />
          </svg>
        </div>

        {/* Floating Center Core Point */}
        <div className="cc-center-dot"></div>
      </div>
      
      {/* Expandable pulse ripple on mouse clicks */}
      <div className="cc-pulse"></div>
    </div>
  );
}
