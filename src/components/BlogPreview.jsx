import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaClock } from 'react-icons/fa';
import { BLOGS } from '../data/siteData.js';
import useReveal from '../hooks/useReveal.js';
import './BlogPreview.css';

export default function BlogPreview() {
  const headRef  = useReveal();
  const gridRef  = useRef(null);
  const footRef  = useReveal();
  const posts    = BLOGS.slice(0, 3);

  useEffect(() => {
    const cards = gridRef.current?.querySelectorAll('.blog-preview__card') || [];
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => {
        if (e.isIntersecting) { e.target.classList.add('is-revealed'); io.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    cards.forEach((c) => io.observe(c));
    return () => io.disconnect();
  }, []);

  return (
    <section className="blog-preview">
      <div className="container">
        <div ref={headRef} className="reveal section-head">
          <span className="eyebrow">Moving Tips &amp; Resources</span>
          <h2>Expert Advice for Detroit Families</h2>
          <p>Practical guides, neighborhood insights, and moving tips from our team of Detroit moving professionals.</p>
        </div>

        <div ref={gridRef} className="blog-preview__grid">
          {posts.map((post, i) => (
            <article key={post.slug} className={`blog-preview__card reveal reveal-d${i + 1}`}>
              <Link to={`/blog/${post.slug}`} className="blog-preview__img-wrap" tabIndex={-1} aria-hidden="true">
                <img src={post.image} alt={post.title} className="blog-preview__img" loading="lazy" />
                <span className="blog-preview__cat">{post.category}</span>
              </Link>
              <div className="blog-preview__body">
                <div className="blog-preview__meta">
                  <span><FaClock aria-hidden="true" /> {post.readTime}</span>
                  <span>{post.date}</span>
                </div>
                <h3>
                  <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                </h3>
                <p>{post.excerpt}</p>
                <Link to={`/blog/${post.slug}`} className="blog-preview__link">
                  Read Article <FaArrowRight aria-hidden="true" />
                </Link>
              </div>
            </article>
          ))}
        </div>

        <div ref={footRef} className="blog-preview__footer reveal">
          <p>We publish new moving guides and Detroit neighborhood content every month.</p>
          <Link to="/blog" className="btn btn-secondary">
            View All Articles <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      </div>
    </section>
  );
}
