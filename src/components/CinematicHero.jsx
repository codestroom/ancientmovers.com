import { useRef, useEffect, useState, Suspense, useMemo } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Stars } from '@react-three/drei';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { motion, AnimatePresence, useMotionValue, useSpring } from 'framer-motion';
import * as THREE from 'three';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaPhoneAlt, FaShieldAlt, FaStar, FaClock, FaTruck, FaAward, FaMapMarkerAlt } from 'react-icons/fa';
import { SITE } from '../data/siteData.js';
import './CinematicHero.css';

gsap.registerPlugin(ScrollTrigger);

/* ─── helpers ─────────────────────────────────────────────────────── */
const lerp = (a, b, t) => a + (b - a) * t;
const clamp = (x, lo, hi) => Math.max(lo, Math.min(hi, x));
const mapRange = (v, a, b, c, d) => c + ((v - a) / (b - a)) * (d - c);

/* ─── Scatter cloud — ambient orange particles ─────────────────────── */
function buildAmbientCloud(n = 1800) {
  const pts = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const r = 3 + Math.random() * 10;
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pts[i * 3]     = r * Math.sin(phi) * Math.cos(theta);
    pts[i * 3 + 1] = (Math.random() - 0.5) * 8;
    pts[i * 3 + 2] = r * Math.cos(phi);
  }
  return pts;
}

function buildGlobeCloud(n = 1800, radius = 3.5) {
  const pts = new Float32Array(n * 3);
  for (let i = 0; i < n; i++) {
    const theta = Math.random() * Math.PI * 2;
    const phi = Math.acos(2 * Math.random() - 1);
    pts[i * 3]     = radius * Math.sin(phi) * Math.cos(theta);
    pts[i * 3 + 1] = radius * Math.sin(phi) * Math.sin(theta);
    pts[i * 3 + 2] = radius * Math.cos(phi);
  }
  return pts;
}

function buildGridCloud(n = 1800) {
  const pts = new Float32Array(n * 3);
  const side = Math.ceil(Math.sqrt(n));
  for (let i = 0; i < n; i++) {
    const row = Math.floor(i / side);
    const col = i % side;
    pts[i * 3]     = (col / side - 0.5) * 22;
    pts[i * 3 + 1] = -1.5 + (Math.random() - .5) * 0.4;
    pts[i * 3 + 2] = (row / side - 0.5) * 22;
  }
  return pts;
}

/* ─── Particle system ─────────────────────────────────────────────── */
function ParticleCloud({ scrollRef }) {
  const geoRef = useRef();
  const matRef = useRef();
  const N = 1800;

  const [ambientPts, gridPts, globePts] = useMemo(() => [
    buildAmbientCloud(N),
    buildGridCloud(N),
    buildGlobeCloud(N, 3.5),
  ], []);

  useFrame(({ clock }) => {
    if (!geoRef.current || !matRef.current) return;
    const t = clock.elapsedTime;
    const sp = scrollRef.current;

    let posA, posB, blend;
    if (sp < 0.5) {
      posA = ambientPts; posB = ambientPts; blend = 0;
    } else if (sp < 0.75) {
      posA = ambientPts; posB = gridPts;
      blend = clamp(mapRange(sp, 0.5, 0.75, 0, 1), 0, 1);
    } else {
      posA = gridPts; posB = globePts;
      blend = clamp(mapRange(sp, 0.75, 1.0, 0, 1), 0, 1);
    }

    const pos = geoRef.current.attributes.position.array;
    for (let i = 0; i < N * 3; i++) {
      const raw = lerp(posA[i], posB[i], blend);
      pos[i] = i % 3 === 1
        ? raw + Math.sin(t * 0.5 + posA[i] * 0.4) * 0.04
        : raw;
    }
    geoRef.current.attributes.position.needsUpdate = true;

    const phase = sp < 0.25 ? 1 : sp < 0.5 ? 2 : sp < 0.75 ? 3 : 4;
    if (phase <= 2) {
      matRef.current.color.setHex(0xF7921E);
      matRef.current.opacity = 0.55;
      matRef.current.size = 0.04;
    } else if (phase === 3) {
      matRef.current.color.setHex(0x66CCFF);
      matRef.current.opacity = 0.5;
      matRef.current.size = 0.035;
    } else {
      matRef.current.color.setHex(0xF7921E);
      matRef.current.opacity = 0.65;
      matRef.current.size = 0.045;
    }
  });

  return (
    <points>
      <bufferGeometry ref={geoRef}>
        <bufferAttribute
          attach="attributes-position"
          args={[new Float32Array(ambientPts), 3]}
        />
      </bufferGeometry>
      <pointsMaterial
        ref={matRef}
        size={0.04}
        sizeAttenuation
        transparent
        opacity={0.55}
        color="#F7921E"
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

/* ─── Floating orange orbs (hero atmosphere) ─────────────────────── */
function OrangeOrbs({ scrollRef }) {
  const groupRef = useRef();

  useFrame(({ clock }) => {
    if (!groupRef.current) return;
    const sp = scrollRef.current;
    groupRef.current.visible = sp < 0.55;
    groupRef.current.rotation.y = clock.elapsedTime * 0.06;
  });

  const orbs = useMemo(() => Array.from({ length: 7 }, (_, i) => ({
    pos: [
      Math.sin(i * 0.9) * 5.5,
      Math.cos(i * 1.3) * 2.5,
      Math.sin(i * 0.7) * 4,
    ],
    scale: 0.08 + Math.random() * 0.12,
    color: i % 2 === 0 ? '#F7921E' : '#FFB347',
    delay: i * 0.6,
  })), []);

  return (
    <group ref={groupRef}>
      {orbs.map((o, i) => (
        <mesh key={i} position={o.pos}>
          <sphereGeometry args={[o.scale, 12, 12]} />
          <meshBasicMaterial color={o.color} transparent opacity={0.7} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Blueprint logistics grid ────────────────────────────────────── */
function BlueprintGrid({ scrollRef }) {
  const groupRef = useRef();
  const nodeRefs = useRef([]);

  const routePoints = useMemo(() => {
    const lines = [];
    const nodes = [[-5,-4], [-2,-2], [1,-3.5], [4,-1], [3,2.5], [-1,3.5], [-4.5,1.5]];
    for (let i = 0; i < nodes.length - 1; i++) {
      const [x1, z1] = nodes[i]; const [x2, z2] = nodes[i + 1];
      lines.push(x1, -1.5, z1, x2, -1.5, z2);
    }
    return new Float32Array(lines);
  }, []);

  const nodePositions = useMemo(() => [
    [-5,-1.5,-4], [-2,-1.5,-2], [1,-1.5,-3.5],
    [4,-1.5,-1],  [3,-1.5,2.5],[-1,-1.5,3.5], [-4.5,-1.5,1.5],
  ], []);

  useFrame(({ clock }) => {
    const sp = scrollRef.current;
    const visible = sp >= 0.48 && sp <= 0.82;
    if (!groupRef.current) return;
    groupRef.current.visible = visible;
    if (visible) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.04;
      nodeRefs.current.forEach((n, i) => {
        if (n) {
          const pulse = 0.82 + Math.sin(clock.elapsedTime * 1.4 + i * 1.1) * 0.18;
          const fade = sp < 0.56 ? clamp(mapRange(sp, 0.48, 0.56, 0, 1), 0, 1)
            : sp > 0.76 ? clamp(mapRange(sp, 0.76, 0.82, 1, 0), 0, 1) : 1;
          n.scale.setScalar(pulse * fade);
        }
      });
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      <gridHelper args={[26, 26, 0x1A3A5C, 0x0D1F36]} position={[0, -1.5, 0]} />
      <lineSegments>
        <bufferGeometry>
          <bufferAttribute attach="attributes-position" args={[routePoints, 3]} />
        </bufferGeometry>
        <lineBasicMaterial color="#F7921E" transparent opacity={0.65} />
      </lineSegments>
      {nodePositions.map((pos, i) => (
        <mesh key={i} ref={el => nodeRefs.current[i] = el} position={pos}>
          <sphereGeometry args={[0.13, 10, 10]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#F7921E' : '#66CCFF'} />
        </mesh>
      ))}
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.5, 0.7, 32]} />
        <meshBasicMaterial color="#F7921E" transparent opacity={0.4} side={THREE.DoubleSide} />
      </mesh>
      <mesh position={[0, -1.5, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.9, 1.0, 32]} />
        <meshBasicMaterial color="#66CCFF" transparent opacity={0.22} side={THREE.DoubleSide} />
      </mesh>
    </group>
  );
}

/* ─── Globe with shipping routes ──────────────────────────────────── */
function Globe3D({ scrollRef }) {
  const groupRef = useRef();
  const dotRefs  = useRef([]);

  const routeArcs = useMemo(() => {
    const RADIUS = 3.5;
    const cities = [
      [42.33, -83.05], [40.71, -74.01], [34.05, -118.24],
      [51.51, -0.13],  [48.85, 2.35],   [35.68, 139.69],
      [19.43, -99.13], [25.20, 55.27],
    ];
    const toXYZ = ([lat, lon]) => {
      const phi = (90 - lat) * (Math.PI / 180);
      const theta = (lon + 180) * (Math.PI / 180);
      return new THREE.Vector3(
        -RADIUS * Math.sin(phi) * Math.cos(theta),
         RADIUS * Math.cos(phi),
         RADIUS * Math.sin(phi) * Math.sin(theta),
      );
    };
    return cities.map((c, i) => {
      const j = (i + 2) % cities.length;
      const a = toXYZ(c), b = toXYZ(cities[j]);
      const mid = new THREE.Vector3().addVectors(a, b).multiplyScalar(0.5);
      mid.normalize().multiplyScalar(RADIUS * 1.42);
      const curve = new THREE.QuadraticBezierCurve3(a, mid, b);
      return { pts: curve.getPoints(44), a };
    });
  }, []);

  useFrame(({ clock }) => {
    const sp = scrollRef.current;
    if (!groupRef.current) return;
    groupRef.current.visible = sp >= 0.76;
    if (sp >= 0.76) {
      groupRef.current.rotation.y = clock.elapsedTime * 0.1;
      dotRefs.current.forEach((d, i) => {
        if (!d) return;
        const arc = routeArcs[i % routeArcs.length];
        const t = ((clock.elapsedTime * 0.22 + i * 0.2) % 1);
        const pt = arc.pts[Math.floor(t * (arc.pts.length - 1))];
        if (pt) d.position.copy(pt);
      });
    }
  });

  return (
    <group ref={groupRef} visible={false}>
      <mesh>
        <sphereGeometry args={[3.5, 40, 40]} />
        <meshBasicMaterial color="#1A3A5C" wireframe transparent opacity={0.22} />
      </mesh>
      <mesh>
        <sphereGeometry args={[3.48, 24, 24]} />
        <meshBasicMaterial color="#F7921E" transparent opacity={0.05} side={THREE.BackSide} />
      </mesh>
      {routeArcs.map((arc, i) => {
        const positions = new Float32Array(arc.pts.flatMap(p => [p.x, p.y, p.z]));
        return (
          <lineSegments key={i}>
            <bufferGeometry>
              <bufferAttribute attach="attributes-position" args={[positions, 3]} />
            </bufferGeometry>
            <lineBasicMaterial color={i % 2 === 0 ? '#F7921E' : '#66CCFF'} transparent opacity={0.55} />
          </lineSegments>
        );
      })}
      {routeArcs.map((_, i) => (
        <mesh key={`dot-${i}`} ref={el => dotRefs.current[i] = el}>
          <sphereGeometry args={[0.09, 8, 8]} />
          <meshBasicMaterial color={i % 2 === 0 ? '#F7921E' : '#66CCFF'} />
        </mesh>
      ))}
      {routeArcs.map((arc, i) => (
        <mesh key={`city-${i}`} position={arc.a}>
          <sphereGeometry args={[0.1, 10, 10]} />
          <meshBasicMaterial color="#FFB347" transparent opacity={0.9} />
        </mesh>
      ))}
    </group>
  );
}

/* ─── Camera controller ───────────────────────────────────────────── */
const CAM_WAYPOINTS = [
  { pos: [0, 1.8, 12], look: [0, 0, 0] },
  { pos: [0, 2.5, 9],  look: [0, 0, 0] },
  { pos: [0, 8, 5],    look: [0, -1.5, 0] },
  { pos: [0, 0, 11],   look: [0, 0, 0] },
];

function SceneCamera({ scrollRef }) {
  const { camera } = useThree();
  const tPos  = useRef(new THREE.Vector3(...CAM_WAYPOINTS[0].pos));
  const tLook = useRef(new THREE.Vector3(...CAM_WAYPOINTS[0].look));

  useFrame(() => {
    const sp = scrollRef.current;
    let from, to, t;
    if (sp < 0.25)      { from = CAM_WAYPOINTS[0]; to = CAM_WAYPOINTS[1]; t = sp / 0.25; }
    else if (sp < 0.5)  { from = CAM_WAYPOINTS[1]; to = CAM_WAYPOINTS[2]; t = (sp - 0.25) / 0.25; }
    else if (sp < 0.75) { from = CAM_WAYPOINTS[2]; to = CAM_WAYPOINTS[3]; t = (sp - 0.5) / 0.25; }
    else                { from = CAM_WAYPOINTS[3]; to = CAM_WAYPOINTS[3]; t = 0; }

    const ease = t * t * (3 - 2 * t);
    tPos.current.lerpVectors(new THREE.Vector3(...from.pos), new THREE.Vector3(...to.pos), ease);
    tLook.current.lerpVectors(new THREE.Vector3(...from.look), new THREE.Vector3(...to.look), ease);
    camera.position.lerp(tPos.current, 0.07);
    camera.lookAt(tLook.current);
  });
  return null;
}

/* ─── Scene lights ────────────────────────────────────────────────── */
function SceneLights({ scrollRef }) {
  const movRef = useRef();
  const blueRef = useRef();

  useFrame(({ clock }) => {
    const t = clock.elapsedTime;
    const sp = scrollRef.current;
    if (movRef.current) {
      movRef.current.position.x = Math.sin(t * 0.38) * 6;
      movRef.current.position.z = Math.cos(t * 0.38) * 6;
    }
    if (blueRef.current) {
      blueRef.current.intensity = clamp(mapRange(sp, 0.48, 0.60, 0, 2), 0, 2);
    }
  });

  return (
    <>
      <ambientLight intensity={0.1} color="#1A0C00" />
      <directionalLight position={[5, 8, 3]} intensity={1.6} color="#FFB347" />
      <pointLight ref={movRef} position={[6, 4, 5]} intensity={3} color="#F7921E" distance={20} decay={2} />
      <pointLight position={[-4, 3, -4]} intensity={1.4} color="#FF8C1A" distance={16} decay={2} />
      <pointLight position={[0, -1, 7]} intensity={0.8} color="#3D1500" distance={12} decay={2} />
      <pointLight ref={blueRef} position={[0, 6, 0]} intensity={0} color="#66CCFF" distance={22} decay={1.5} />
    </>
  );
}

/* ─── Full Three.js scene ─────────────────────────────────────────── */
function MainScene({ scrollRef }) {
  return (
    <>
      <SceneCamera scrollRef={scrollRef} />
      <SceneLights scrollRef={scrollRef} />
      <Stars radius={90} depth={50} count={2800} factor={4} saturation={0.15} fade speed={0.6} />
      <ParticleCloud scrollRef={scrollRef} />
      <OrangeOrbs scrollRef={scrollRef} />
      <BlueprintGrid scrollRef={scrollRef} />
      <Globe3D scrollRef={scrollRef} />
    </>
  );
}

/* ─── Framer Motion variants ──────────────────────────────────────── */
const fadeUp = {
  hidden:  { opacity: 0, y: 36 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.75, ease: [0.2, 0.8, 0.2, 1] } },
  exit:    { opacity: 0, y: -24, transition: { duration: 0.4 } },
};
const stagger = { visible: { transition: { staggerChildren: 0.11 } } };

const truckVariants = {
  hidden:  { opacity: 0, x: 80, scale: 0.88 },
  visible: { opacity: 1, x: 0,  scale: 1, transition: { duration: 1, ease: [0.2, 0.8, 0.2, 1] } },
  exit:    { opacity: 0, x: 60, scale: 0.92, transition: { duration: 0.5 } },
};

/* ─── Main component ──────────────────────────────────────────────── */
export default function CinematicHero() {
  const containerRef   = useRef(null);
  const scrollProgress = useRef(0);
  const [phase, setPhase] = useState(1);

  useEffect(() => {
    const st = ScrollTrigger.create({
      trigger: containerRef.current,
      start: 'top top',
      end: 'bottom bottom',
      scrub: true,
      onUpdate(self) {
        scrollProgress.current = self.progress;
        const p = self.progress;
        setPhase(p < 0.25 ? 1 : p < 0.5 ? 2 : p < 0.75 ? 3 : 4);
      },
    });
    return () => st.kill();
  }, []);

  return (
    <div ref={containerRef} className="ch">
      <div className="ch__sticky">

        {/* ── 3D Canvas background ── */}
        <Canvas
          className="ch__canvas"
          camera={{ fov: 50, near: 0.1, far: 200 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true }}
        >
          <Suspense fallback={null}>
            <MainScene scrollRef={scrollProgress} />
          </Suspense>
        </Canvas>

        {/* ── Background warm vignette ── */}
        <div className="ch__vignette" />

        {/* ── Full overlay with all phases ── */}
        <div className="ch__overlay">

          <AnimatePresence mode="wait">

            {/* ───── PHASE 1 — Hero + Real Truck ───── */}
            {phase === 1 && (
              <motion.div key="p1" className="ch__split" variants={stagger} initial="hidden" animate="visible" exit="exit">

                {/* Left: headline */}
                <div className="ch__split-left">
                  <motion.div variants={fadeUp} className="ch__eyebrow">
                    <span className="ch__eyebrow-dot" />
                    Detroit&apos;s #1 Movers Since 2015
                  </motion.div>
                  <motion.h1 variants={fadeUp} className="ch__h1">
                    We Move More<br />Than Goods —<br />
                    <em>We Move Trust.</em>
                  </motion.h1>
                  <motion.p variants={fadeUp} className="ch__sub">
                    Precision residential & commercial moving across Metro Detroit.
                    Licensed, insured, and 4.9★ rated by thousands of families.
                  </motion.p>
                  <motion.div variants={fadeUp} className="ch__ctas">
                    <Link to="/contact" className="btn btn-primary btn-lg">
                      Get Free Quote <FaArrowRight />
                    </Link>
                    <a href={SITE.phoneHref} className="btn btn-ghost btn-lg">
                      <FaPhoneAlt /> {SITE.phone}
                    </a>
                  </motion.div>

                  {/* Trust pills */}
                  <motion.div variants={fadeUp} className="ch__trust-pills">
                    <span className="ch__pill"><FaShieldAlt /> Licensed &amp; Insured</span>
                    <span className="ch__pill"><FaStar /> 4.9★ Google</span>
                    <span className="ch__pill"><FaClock /> Free Quote in 1 Hr</span>
                  </motion.div>
                </div>

                {/* Right: Real truck */}
                <motion.div variants={truckVariants} className="ch__truck-side">
                  {/* Glow ring behind truck */}
                  <div className="ch__truck-glow" />

                  {/* Floating truck */}
                  <motion.img
                    src="/images/fleet-truck.png"
                    alt="Ancient Movers Fleet Truck"
                    className="ch__truck-img"
                    animate={{ y: [0, -18, 0] }}
                    transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
                    draggable={false}
                  />

                  {/* Ground shadow */}
                  <div className="ch__truck-shadow" />

                  {/* Badge top-right */}
                  <motion.div
                    className="ch__truck-badge ch__truck-badge--top"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.2, repeat: Infinity, ease: 'easeInOut', delay: 0.8 }}
                  >
                    <div className="ch__badge-icon ch__badge-icon--orange"><FaAward /></div>
                    <div>
                      <strong>4.9★ Rating</strong>
                      <span>2,100+ reviews</span>
                    </div>
                  </motion.div>

                  {/* Badge bottom-left */}
                  <motion.div
                    className="ch__truck-badge ch__truck-badge--btm"
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 3.8, repeat: Infinity, ease: 'easeInOut', delay: 1.6 }}
                  >
                    <div className="ch__badge-icon ch__badge-icon--green"><FaMapMarkerAlt /></div>
                    <div>
                      <strong>Serving Detroit</strong>
                      <span>Metro &amp; Surrounding Areas</span>
                    </div>
                  </motion.div>
                </motion.div>
              </motion.div>
            )}

            {/* ───── PHASE 2 — Operational Stats ───── */}
            {phase === 2 && (
              <motion.div key="p2" className="ch__center" variants={stagger} initial="hidden" animate="visible" exit="exit">
                <motion.p variants={fadeUp} className="ch__phase-label">/ / &nbsp; OPERATIONAL INTELLIGENCE &nbsp; / /</motion.p>
                <motion.h2 variants={fadeUp} className="ch__phase-title">
                  Every Move, <br />Precisely Executed.
                </motion.h2>
                <motion.p variants={fadeUp} className="ch__phase-sub">
                  Decade-long Detroit expertise, real-time logistics, and a crew that treats your home like their own.
                </motion.p>
                <motion.div variants={fadeUp} className="ch__stats">
                  {[
                    ['10+', 'Years Operating'],
                    ['2,100+', 'Five-Star Reviews'],
                    ['4.9 / 5', 'Google Rating'],
                    ['100%', 'Licensed & Insured'],
                  ].map(([n, l]) => (
                    <div key={l} className="ch__stat">
                      <div className="ch__stat-num">{n}</div>
                      <div className="ch__stat-label">{l}</div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            )}

            {/* ───── PHASE 3 — OS Headline ───── */}
            {phase === 3 && (
              <motion.div key="p3" className="ch__center" variants={stagger} initial="hidden" animate="visible" exit="exit">
                <motion.div variants={fadeUp}>
                  <h2
                    className="ch__os-title ch__glitch"
                    data-text="ANCIENT MOVERS OPERATING SYSTEM"
                  >
                    <span className="line1">Ancient Movers</span>
                    <span className="line2">OPERATING</span>
                    <span className="line3">SYSTEM</span>
                  </h2>
                </motion.div>
                <motion.p variants={fadeUp} className="ch__os-sub">
                  Route Intelligence &nbsp;·&nbsp; Real-Time Tracking &nbsp;·&nbsp; Precision Scheduling
                </motion.p>
              </motion.div>
            )}

            {/* ───── PHASE 4 — Globe + CTA ───── */}
            {phase === 4 && (
              <motion.div key="p4" className="ch__center" variants={stagger} initial="hidden" animate="visible" exit="exit">
                <motion.p variants={fadeUp} className="ch__phase-label">/ / &nbsp; CONNECTED LOGISTICS NETWORK &nbsp; / /</motion.p>
                <motion.h2 variants={fadeUp} className="ch__final-title">
                  Move Smarter With<br /><em>Ancient Movers.</em>
                </motion.h2>
                <motion.p variants={fadeUp} className="ch__final-sub">
                  From a single apartment to cross-country operations — we move with
                  intelligence, care, and a commitment Detroit trusts.
                </motion.p>
                <motion.div variants={fadeUp} className="ch__ctas">
                  <Link to="/contact" className="btn btn-primary btn-lg" style={{ pointerEvents: 'all' }}>
                    Book Your Move <FaArrowRight />
                  </Link>
                  <a href={SITE.phoneHref} className="btn btn-ghost btn-lg" style={{ pointerEvents: 'all' }}>
                    <FaPhoneAlt /> {SITE.phone}
                  </a>
                </motion.div>
              </motion.div>
            )}

          </AnimatePresence>

          {/* Phase dots */}
          <div className="ch__dots">
            {[1,2,3,4].map(p => (
              <div key={p} className={`ch__dot ${phase === p ? 'active' : ''}`} />
            ))}
          </div>

          {/* Scroll hint */}
          {phase === 1 && (
            <div className="ch__scroll-hint">
              <span>Scroll</span>
              <div className="ch__scroll-line" />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
