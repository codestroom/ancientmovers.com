import { useParams, Link, Navigate } from 'react-router-dom';
import { FaArrowRight, FaArrowLeft, FaClock, FaTag, FaPhoneAlt } from 'react-icons/fa';
import { SITE } from '../data/siteData.js';
import PageHero from './PageHero.jsx';
import SEO from '../components/SEO.jsx';
import useBlogs from '../hooks/useBlogs.js';
import './BlogPost.css';

function ContentBlock({ block }) {
  switch (block.type) {
    case 'h2':
      return <h2 className="bp__h2">{block.text}</h2>;
    case 'p':
      return <p className="bp__p">{block.text}</p>;
    case 'ul':
      return (
        <ul className="bp__list">
          {block.items.map((item, i) => <li key={i}>{item}</li>)}
        </ul>
      );
    case 'cta':
      return (
        <div className="bp__inline-cta">
          <p>{block.text}</p>
          <Link to="/contact" className="btn btn-primary">
            Get Free Quote <FaArrowRight aria-hidden="true" />
          </Link>
        </div>
      );
    default:
      return null;
  }
}

export default function BlogPost() {
  const { slug } = useParams();
  const { blogs: BLOGS, loading } = useBlogs();
  const post = BLOGS.find(b => b.slug === slug);

  // Wait for the posts to load before deciding the slug is invalid.
  if (loading) {
    return (
      <PageHero
        title="Loading…"
        crumbs={[{ label: 'Blog', to: '/blog' }]}
      />
    );
  }

  if (!post) return <Navigate to="/blog" replace />;

  const related = BLOGS.filter(b => b.slug !== slug && b.category === post.category).slice(0, 2);
  const others  = BLOGS.filter(b => b.slug !== slug && !related.includes(b)).slice(0, 2 - related.length);
  const suggestions = [...related, ...others].slice(0, 2);

  return (
    <>
      <SEO
        title={`${post.title} — Ancient Movers Detroit`}
        description={post.excerpt}
        canonical={`https://ancientmovers.com/blog/${post.slug}`}
      />
      <PageHero
        title={post.title}
        subtitle={post.excerpt}
        crumbs={[{ label: 'Blog', to: '/blog' }, { label: post.category }]}
      />

      <div className="bp">
        <div className="container bp__layout">

          {/* ── Article ── */}
          <article className="bp__article">
            {/* Meta bar */}
            <div className="bp__meta">
              <span className="bp__cat"><FaTag aria-hidden="true" /> {post.category}</span>
              <span><FaClock aria-hidden="true" /> {post.readTime}</span>
              <span>{post.date}</span>
              <span>By {post.author.name}</span>
            </div>

            {/* Hero image */}
            <img src={post.image} alt={post.title} className="bp__hero-img" />

            {/* Content */}
            <div className="bp__content">
              {post.content.map((block, i) => (
                <ContentBlock key={i} block={block} />
              ))}
            </div>

            {/* Back link */}
            <Link to="/blog" className="bp__back">
              <FaArrowLeft aria-hidden="true" /> Back to All Articles
            </Link>
          </article>

          {/* ── Sidebar ── */}
          <aside className="bp__sidebar">

            {/* CTA card */}
            <div className="bp__cta-card">
              <div className="bp__cta-card-top" aria-hidden="true" />
              <h3>Ready to Move?</h3>
              <p>Get a free, no-obligation quote from Metro Detroit's most trusted movers.</p>
              <Link to="/contact" className="btn btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                Free Quote <FaArrowRight aria-hidden="true" />
              </Link>
              <a href={SITE.phoneHref} className="bp__call-link">
                <FaPhoneAlt aria-hidden="true" /> {SITE.phone}
              </a>
            </div>

            {/* Related posts */}
            {suggestions.length > 0 && (
              <div className="bp__related">
                <h4>More Articles</h4>
                {suggestions.map(s => (
                  <Link to={`/blog/${s.slug}`} key={s.slug} className="bp__related-item">
                    <img src={s.image} alt={s.title} className="bp__related-img" />
                    <div>
                      <span className="bp__related-cat">{s.category}</span>
                      <p className="bp__related-title">{s.title}</p>
                    </div>
                  </Link>
                ))}
              </div>
            )}

            {/* Services teaser */}
            <div className="bp__services-card">
              <h4>Our Services</h4>
              <ul>
                {['Residential Moving','Senior Moving','Piano Moving','Hot Tub Moving','Long Distance','Secure Storage'].map(s => (
                  <li key={s}>
                    <Link to="/services"><FaArrowRight aria-hidden="true" /> {s}</Link>
                  </li>
                ))}
              </ul>
            </div>

          </aside>
        </div>
      </div>
    </>
  );
}
