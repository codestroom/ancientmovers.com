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
    'Honest, transparent quotes -- no hidden fees, ever',
    'Background-checked, uniformed and courteous crews',
    'Modern fleet with well-maintained 26\' trucks and equipment',
    'Every item handled with care -- boxes, furniture, and specialty pieces',
    'Locally trusted and community-focused since 2015',
    'A real human answers your call, day or night'
  ];

  return (
    <>
      <SEO
        title="About Ancient Movers -- Trusted Detroit Moving Company Since 2015"
        description="Ancient Movers is a fully licensed, 4.9★-rated moving company serving Metro Detroit since 2015. Learn about our team, values, and commitment to honest, stress-free moves."
        canonical="https://ancientmovers.com/about"
      />
      <PageHero
        title="About Ancient Movers"
        subtitle="Detroit's trusted moving team -- built on honesty, hard work, and genuine care for every customer."
        crumbs={[{ label: 'About' }]}
      />

      <section className="about-story">
        <div className="container about-story__grid">
          <div>
            <span className="eyebrow">Our Story</span>
            <h2>Built on Trust. Grown by Referrals.</h2>
            <p>
              Ancient Movers was founded in 2015 with one truck and one promise: treat every customer's
              belongings like our own. What started as a local operation has grown into one of Metro Detroit's
              most trusted and reviewed moving companies -- with over 2,100 five-star Google reviews to prove it.
            </p>
            <p>
              Today we proudly serve homeowners, families, seniors, and businesses across Detroit, Dearborn,
              Troy, Grosse Pointe, Ann Arbor, and beyond. We're still community-focused, still personally
              invested in every move, and still answering every call ourselves.
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
                src={PHOTOS.teamSmile.src}
                id={PHOTOS.teamSmile.id}
                seed={PHOTOS.teamSmile.seed}
                alt="The Ancient Movers team in front of their branded truck"
                w={900}
                h={1100}
              />
            </div>
            <div className="about-media__badge">
              <FaStar />
              <div>
                <strong>10+ Years</strong>
                <span>Moving Detroit</span>
              </div>
            </div>
            <div className="about-media__sticker">
              <strong>2,100+</strong>
              <span>5-Star reviews</span>
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
