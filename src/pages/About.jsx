import { FaCheckCircle, FaStar } from 'react-icons/fa';
import SEO from '../components/SEO.jsx';
import PageHero from './PageHero.jsx';
import WhyUs from '../components/WhyUs.jsx';
import Testimonials from '../components/Testimonials.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import Photo, { PHOTOS } from '../components/Photo.jsx';
import './About.css';

export default function About() {
  const values = [
    'Honest, transparent quotes — never any surprise fees',
    'Background-checked, uniformed and friendly crews',
    'Modern equipment and well-maintained trucks',
    'Care taken with every box, every move, every time',
    'Locally owned and operated since 2009',
    'A real human answering your call, day or night'
  ];

  return (
    <>
      <SEO
        title="About Ancient Movers — Family-Owned Michigan Moving Company"
        description="Ancient Movers is a family-owned, fully licensed moving company serving Michigan since 2009. Learn about our team, values and commitment to honest service."
        canonical="https://ancientmovers.com/about"
      />
      <PageHero
        title="About Ancient Movers"
        subtitle="A family-owned Michigan moving company built on honesty, hard work and care."
        crumbs={[{ label: 'About' }]}
      />

      <section className="about-story">
        <div className="container about-story__grid">
          <div>
            <span className="eyebrow">Our Story</span>
            <h2>Built on Trust. Grown by Referrals.</h2>
            <p>
              Ancient Movers started in 2009 in a single garage in Troy, MI with one truck and a simple promise:
              treat every customer’s belongings like our own. Fifteen years later, that promise is still the
              foundation of everything we do.
            </p>
            <p>
              Today we’re proud to be one of Michigan’s most-recommended moving companies — with thousands of
              completed moves across Metro Detroit, Ann Arbor and beyond. We’re still family-owned, still local,
              and still answering every call ourselves.
            </p>

            <ul className="about-values">
              {values.map(v => (
                <li key={v}><FaCheckCircle /> {v}</li>
              ))}
            </ul>
          </div>

          <div className="about-media">
            <div className="about-media__photo">
              <Photo
                id={PHOTOS.teamSmile.id}
                seed={PHOTOS.teamSmile.seed}
                alt="The Ancient Movers team"
                w={900}
                h={1100}
              />
            </div>
            <div className="about-media__badge">
              <FaStar />
              <div>
                <strong>15+ Years</strong>
                <span>Moving Michigan</span>
              </div>
            </div>
            <div className="about-media__sticker">
              <strong>10,000+</strong>
              <span>Happy moves</span>
            </div>
          </div>
        </div>
      </section>

      <WhyUs />
      <Testimonials />
      <CtaBanner />
    </>
  );
}
