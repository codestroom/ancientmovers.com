import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowRight, FaClock, FaTag } from 'react-icons/fa';
import { BLOGS } from '../data/siteData.js';
import PageHero from './PageHero.jsx';
import SEO from '../components/SEO.jsx';
import useReveal from '../hooks/useReveal.js';
import './Blog.css';

const ALL = 'All';

function BlogCard({ post, featured = false }) {
  const ref = useReveal();
  return (
    <article ref={ref} className={`blog-card reveal ${featured ? 'blog-card--featured' : ''}`}>
      <Link to={`/blog/${post.slug}`} className="blog-card__img-wrap" tabIndex={-1} aria-hidden="true">
        <img src={post.image} alt={post.title} className="blog-card__img" loading="lazy" />
        <span className="blog-card__cat">{post.category}</span>
      </Link>
      <div className="blog-card__body">
        <div className="blog-card__meta">
          <span><FaClock aria-hidden="true" /> {post.readTime}</span>
          <span>{post.date}</span>
        </div>
        <h3 className="blog-card__title">
          <Link to={`/blog/${post.slug}`}>{post.title}</Link>
        </h3>
        <p className="blog-card__excerpt">{post.excerpt}</p>
        <Link to={`/blog/${post.slug}`} className="blog-card__cta">
          Read Article <FaArrowRight aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}

export default function Blog() {
  const headRef = useReveal();
  const [active, setActive] = useState(ALL);

  const categories = [ALL, ...Array.from(new Set(BLOGS.map(b => b.category)))];
  const filtered = active === ALL ? BLOGS : BLOGS.filter(b => b.category === active);
  const [featured, ...rest] = filtered;

  return (
    <>
      <SEO
        title="Moving Tips & Resources — Ancient Movers Detroit Blog"
        description="Expert moving advice, neighborhood guides, and relocation tips from Metro Detroit's most trusted moving company. Read the Ancient Movers blog."
        canonical="https://ancientmovers.com/blog"
      />
      <PageHero
        title="Moving Tips & Resources"
        subtitle="Expert advice, Detroit neighborhood guides, and moving insights from our team."
        crumbs={[{ label: 'Blog' }]}
      />

      <section className="blog-page">
        <div className="container">

          {/* Category filter */}
          <div ref={headRef} className="reveal blog-page__filters">
            {categories.map(cat => (
              <button
                key={cat}
                className={`blog-page__filter ${active === cat ? 'is-active' : ''}`}
                onClick={() => setActive(cat)}
              >
                {cat !== ALL && <FaTag aria-hidden="true" />}
                {cat}
              </button>
            ))}
          </div>

          {filtered.length === 0 && (
            <p className="blog-page__empty">No posts in this category yet.</p>
          )}

          {/* Featured post */}
          {featured && <BlogCard post={featured} featured />}

          {/* Rest of grid */}
          {rest.length > 0 && (
            <div className="blog-page__grid">
              {rest.map(post => (
                <BlogCard key={post.slug} post={post} />
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
}
