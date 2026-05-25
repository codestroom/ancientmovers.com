import { useState, useEffect } from 'react';
import { FaStar, FaQuoteLeft, FaArrowLeft, FaArrowRight, FaCheckCircle } from 'react-icons/fa';
import { TESTIMONIALS } from '../data/siteData.js';
import useReveal from '../hooks/useReveal.js';
import Photo from './Photo.jsx';
import './Testimonials.css';

export default function Testimonials({ 
  eyebrow = "Customer Stories",
  title = <>Loved by Families <span>Across Michigan</span></>,
  subtitle = "We've completed over 10,000 moves. Here's what our neighbors say."
}) {
  const sectionReveal = useReveal();
  const [slideIndex, setSlideIndex] = useState(0);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const maxSlides = isMobile ? TESTIMONIALS.length - 1 : TESTIMONIALS.length - 3;
  const slideWidth = isMobile ? 100 : 33.3333;

  const nextSlide = () => {
    setSlideIndex((prev) => (prev >= maxSlides ? 0 : prev + 1));
  };
  const prevSlide = () => {
    setSlideIndex((prev) => (prev <= 0 ? maxSlides : prev - 1));
  };

  return (
    <section ref={sectionReveal} className="reveal sa-testimonials">
      <div className="container">
        <div className="sa-test-header-row">
          <div className="section-head text-left">
            <span className="eyebrow">{eyebrow}</span>
            <h2>{title}</h2>
            <p>{subtitle}</p>
          </div>

          {/* Slider Navigation Buttons */}
          <div className="sa-test-nav">
            <button 
              className="sa-test-nav-btn sa-test-nav-btn--prev"
              onClick={prevSlide}
              aria-label="Previous testimonial"
            >
              <FaArrowLeft />
            </button>
            <button 
              className="sa-test-nav-btn sa-test-nav-btn--next"
              onClick={nextSlide}
              aria-label="Next testimonial"
            >
              <FaArrowRight />
            </button>
          </div>
        </div>

        {/* Testimonials Viewport & sliding track */}
        <div className="sa-test-viewport">
          <div 
            className="sa-test-track"
            style={{ transform: `translateX(-${slideIndex * slideWidth}%)` }}
          >
            {TESTIMONIALS.map((rev) => (
              <div key={rev.author} className="sa-test-card">
                {/* Top Row: quote mark on left, star ratings on right */}
                <div className="sa-test-meta-row">
                  <FaQuoteLeft className="sa-test-card-quote-icon" />
                  <div className="sa-test-rating">
                    {[...Array(rev.stars)].map((_, i) => (
                      <FaStar key={i} />
                    ))}
                  </div>
                </div>

                {/* Testimonial Quote Text */}
                <p className="sa-test-quote">"{rev.text}"</p>

                {/* Card Footer: User Avatar, Name, Designation & Badges */}
                <div className="sa-test-footer">
                  <div className="sa-test-profile">
                    <Photo
                      src={`/images/${rev.author.split(' ')[0].toLowerCase()}.jpg`}
                      id={rev.avatarId}
                      seed={rev.author.split(' ')[0].toLowerCase()}
                      alt={rev.author}
                      className="sa-test-avatar"
                      w={100}
                      h={100}
                    />
                    <div className="sa-test-author-info">
                      <h4>{rev.author}</h4>
                      <span>{rev.role}</span>
                    </div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '6px' }}>
                    <span className="sa-test-verified">
                      <FaCheckCircle /> Verified Move
                    </span>
                    <span className="sa-test-badge">{rev.tag}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Pagination dots at the bottom */}
        <div className="sa-test-dots">
          {[...Array(maxSlides + 1)].map((_, i) => (
            <button
              key={i}
              className={`sa-test-dot ${slideIndex === i ? 'active' : ''}`}
              onClick={() => setSlideIndex(i)}
              aria-label={`Go to slide page ${i + 1}`}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
