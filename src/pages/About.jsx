import { useEffect, useRef } from 'react';
import { FaCheckCircle, FaStar, FaHeart, FaCalendarAlt, FaAward, FaTruck, FaShieldAlt, FaDollarSign, FaClock } from 'react-icons/fa';
import SEO from '../components/SEO.jsx';
import PageHero from './PageHero.jsx';
import Testimonials from '../components/Testimonials.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import useReveal from '../hooks/useReveal.js';
import './About.css';

export default function About() {
  const storyReveal = useReveal();
  const timelineReveal = useReveal();
  const valuesReveal = useReveal();
  const leadersReveal = useReveal();
  const communityReveal = useReveal();
  

  
  const timelineContainerRef = useRef(null);

  useEffect(() => {
    const container = timelineContainerRef.current;
    if (!container) return;

    const line = container.querySelector('.timeline-line');
    const items = container.querySelectorAll('.timeline-item');

    if (line) {
      const lineObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            line.classList.add('is-active');
            lineObserver.unobserve(container);
          }
        },
        { threshold: 0.05 }
      );
      lineObserver.observe(container);
    }

    const itemObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-revealed');
            itemObserver.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -50px 0px' }
    );

    items.forEach((item) => itemObserver.observe(item));

    return () => {
      itemObserver.disconnect();
    };
  }, []);

  const values = [
    {
      icon: <FaHeart />,
      title: 'Compassionate Care',
      desc: 'We specialize in sensitive transitions. Whether helping seniors downsize or assisting families during stressful relocations, we move with patience and respect.'
    },
    {
      icon: <FaShieldAlt />,
      title: 'Extreme Protection',
      desc: 'We double-wrap all furniture in heavy-duty blankets, place neoprene runners on hardwood floors, and use custom crating for high-value artwork and electronics.'
    },
    {
      icon: <FaDollarSign />,
      title: '100% Flat-Rate Guarantees',
      desc: 'We hate surprise charges. That is why we offer comprehensive, binding quotes. The price agreed upon before moving day is exactly what you will see on the final invoice.'
    },
    {
      icon: <FaClock />,
      title: 'Punctual & Real-Time Tracked',
      desc: 'Time is money. Our trucks arrive within a strict 15-minute window, and you will receive a text link with real-time GPS tracking as soon as our crew departs.'
    }
  ];

  const milestones = [
    {
      year: '2015',
      title: 'Founded in Canada — Now Expanding to the USA',
      desc: 'Tarun started Ancient Movers in Canada in 2015 with a single 16-foot box truck and a clear vision: transparent pricing and extreme care on every move. After a decade of building trust across Canadian communities, we\'re now expanding with a second branch in the USA to bring the same standard of service to Metro Detroit families.'
    },
    {
      year: '2018',
      title: 'Heavy Lift & Piano Specialization',
      desc: 'As our reputation grew, we noticed a shortage of safe piano and heavy specialty movers. We invested in specialized hydraulic loading gear, crane harnesses, and master-level crew training.'
    },
    {
      year: '2021',
      title: 'Secure Metro Storage Facility',
      desc: 'To support clients caught in complex real estate timelines, we launched our state-of-the-art, climate-controlled, 24/7 monitored warehouse in Oak Park, providing a secure bridge between homes.'
    },
    {
      year: '2024',
      title: 'Celebrating 2,100 Five-Star Reviews',
      desc: 'Driven strictly by neighbor-to-neighbor referrals, we celebrated a massive milestone: over 2,100 verified five-star ratings on Google and Yelp, cementing our place as Detroit\'s highest-rated local movers.'
    },
    {
      year: '2026',
      title: 'Pioneering Green Relocations',
      desc: 'We fully converted our local fleet to modern, ultra-low emission engines and launched our eco-friendly wardrobe program, replacing thousands of single-use cardboard boxes with zero-waste plastic crates.'
    }
  ];

  const stats = [
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
        description="Ancient Movers is a fully licensed, 5★-rated moving company serving Metro Detroit since 2015. Learn about our team, values, and commitment to honest, stress-free moves."
        canonical="https://ancientmovers.com/about"
      />
      <PageHero
        title="About Ancient Movers"
        subtitle="Detroit's trusted moving team -- built on honesty, hard work, and genuine care for every customer."
        crumbs={[{ label: 'About' }]}
        videoSrc="/videos/reel-6.mp4"
      />

      {/* ── Section 1: Our Origins ── */}
      <section ref={storyReveal} className="about-story reveal">
        <div className="container about-story__grid">
          <div className="about-story__content">
            <span className="eyebrow">Our Story</span>
            <h2>Built on Trust. Grown by Referrals.</h2>
            <p>
              Ancient Movers was founded in 2015 with one truck and one promise: treat every customer's
              belongings like our own. What started as a local operation has grown into one of Metro Detroit's
              most trusted and reviewed moving companies -- with over 2,100 five-star reviews to prove it.
            </p>
            <p>
              Today we proudly serve homeowners, families, seniors, and businesses across Detroit, Dearborn,
              Troy, Grosse Pointe, Ann Arbor, and beyond. We're still community-focused, still personally
              invested in every move, and still answering every call ourselves.
            </p>

            <ul className="about-values">
              {stats.map(v => (
                <li key={v}><FaCheckCircle /> {v}</li>
              ))}
            </ul>
          </div>

          <div className="about-media">
            <div className="about-media__photo">
              <img
                src="/images/our-story-team.png"
                alt="The Ancient Movers team together, proud to serve Detroit"
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

      {/* ── Section 2: Milestones Timeline ── */}
      <section ref={timelineReveal} className="about-timeline reveal reveal-d1">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Milestones</span>
            <h2>The Journey of Ancient Movers</h2>
            <p>A look back at the key moments that shaped us into Detroit's premier moving company.</p>
          </div>

          <div ref={timelineContainerRef} className="timeline-container">
            <div className="timeline-line"></div>
            {milestones.map((m, idx) => (
              <div key={m.year} className={`timeline-item ${idx % 2 === 0 ? 'timeline-item--left' : 'timeline-item--right'}`}>
                <div className="timeline-marker">
                  <FaCalendarAlt />
                </div>
                <div className="timeline-card">
                  <span className="timeline-card__year">{m.year}</span>
                  <h3>{m.title}</h3>
                  <p>{m.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 3: Core Values Grid ── */}
      <section ref={valuesReveal} className="about-pillars reveal reveal-d2">
        <div className="container">
          <div className="section-head">
            <span className="eyebrow">Our Pillars</span>
            <h2>How We Redefine Local Moving</h2>
            <p>We believe moving should be an exciting milestone, not a stressful ordeal. These four core values guide our trucks every day.</p>
          </div>

          <div className="values-grid">
            {values.map((v, i) => (
              <div key={v.title} className="value-card">
                <div className="value-card__icon">{v.icon}</div>
                <h3>{v.title}</h3>
                <p>{v.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Section 4: Leadership / Founder ── */}
      <section ref={leadersReveal} className="about-leaders reveal reveal-d3">
        <div className="container about-leaders__grid">
          <div className="about-leaders__media">
            <div className="about-leaders__photo-wrap">
              <img
                src="/images/real-customer-dog.jpg"
                alt="A happy Ancient Movers customer at home after their move"
              />
            </div>
            <div className="about-leaders__badge">
              <FaAward />
              <span>USDOT Licensed & Fully Insured</span>
            </div>
          </div>
          
          <div className="about-leaders__content">
            <span className="eyebrow">Our Leadership</span>
            <h2>Meet the Founder</h2>
            <p>
              Tarun founded Ancient Movers out of a desire to create a logistics company that puts people first. Growing up in Detroit, he saw the stress relocations caused families and senior neighbors, and knew he could build a better model.
            </p>
            <p>
              Today, Tarun oversees on-road crew training and quality assurance, regularly jumping on trucks to supervise complex piano or hot-tub maneuvers, while also directing client relations and digital routing to ensure our quotes are fair and our schedules run like clockwork.
            </p>

            <div className="leaders-quote">
              <p>"We don't just load boxes. We carry families into the next chapter of their lives. That deserves our absolute respect, honesty, and hard work."</p>
              <strong>- Tarun</strong>
            </div>
          </div>
        </div>
      </section>

      {/* ── Section 5: Community Involvement ── */}
      <section ref={communityReveal} className="about-community reveal reveal-d4">
        <div className="container about-community__grid">
          <div className="about-community__content">
            <span className="eyebrow">Local Commitment</span>
            <h2>Sustaining Our Detroit Communities</h2>
            <p>
              We believe a business is only as strong as the community it supports. Through our **Detroit Helps** initiative, we pledge 5% of all corporate booking revenues to local food pantries and community revitalization groups in Metro Detroit.
            </p>
            <p>
              Additionally, we coordinate directly with shelter networks across Wayne, Oakland, and Macomb counties, providing free, compassionate moving assistance to families transitioning into permanent housing. When you book a move with Ancient Movers, you are helping move Detroit forward.
            </p>
            <ul className="community-initiatives">
              <li><FaHeart /> Free moves for transitional housing networks</li>
              <li><FaTruck /> Sponsoring local neighborhood cleanups</li>
              <li><FaCheckCircle /> 100% recyclable, zero-waste packing boxes</li>
            </ul>
          </div>
          
          <div className="about-community__media">
            <div className="about-community__photo-wrap">
              <img
                src="/images/real-team-lineup.jpg"
                alt="The Ancient Movers crew lined up in front of their branded moving truck"
              />
            </div>
          </div>
        </div>
      </section>

      <Testimonials />
      <CtaBanner />
    </>
  );
}

