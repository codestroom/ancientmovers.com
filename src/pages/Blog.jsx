import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaSearch, FaTimes } from 'react-icons/fa';
import PageHero from './PageHero.jsx';
import SEO from '../components/SEO.jsx';
import useReveal from '../hooks/useReveal.js';
import useBlogs from '../hooks/useBlogs.js';
import './Blog.css';

const ALL = 'All';

export default function Blog() {
  const { blogs: BLOGS, loading } = useBlogs();
  const [activeCategory, setActiveCategory] = useState(ALL);
  const [searchQuery, setSearchQuery] = useState('');
  const [page, setPage] = useState(1);
  const PER_PAGE = 6;

  // Back to page 1 whenever the filter/search changes.
  useEffect(() => { setPage(1); }, [activeCategory, searchQuery]);

  const headerReveal = useReveal();
  const contentReveal = useReveal();

  // Extract all unique categories
  const categories = [ALL, ...Array.from(new Set(BLOGS.map(b => b.category)))];

  // Filter posts based on category and search query
  const filtered = BLOGS.filter(post => {
    const matchesCategory = activeCategory === ALL || post.category === activeCategory;
    const matchesSearch = searchQuery.trim() === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.category.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Layout assignment based on filtered results
  const showFeaturedSection = filtered.length >= 3;
  let featuredPost = null;
  let sidebarPosts = [];
  let gridPosts = [];

  if (showFeaturedSection) {
    featuredPost = filtered[0];
    sidebarPosts = filtered.slice(1, 3);
    gridPosts = filtered.slice(3);
  } else {
    gridPosts = filtered;
  }

  // Paginate the grid section.
  const totalPages = Math.max(1, Math.ceil(gridPosts.length / PER_PAGE));
  const safePage = Math.min(page, totalPages);
  const pagedGridPosts = gridPosts.slice((safePage - 1) * PER_PAGE, safePage * PER_PAGE);

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

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
        videoSrc="/videos/reel-3.mp4"
      />

      <section className="blog-page">
        <div className="container">
          
          {/* Header Row: Title & Search Bar */}
          <div ref={headerReveal} className="blog-page__header reveal">
            <h2 className="blog-page__title">Latest stories</h2>
            
            <div className="blog-page__search-wrapper">
              <FaSearch className="blog-page__search-icon" aria-hidden="true" />
              <input
                type="text"
                placeholder="What are you looking for?"
                value={searchQuery}
                onChange={handleSearchChange}
                className="blog-page__search-input"
                aria-label="Search articles"
              />
              {searchQuery && (
                <button 
                  onClick={clearSearch} 
                  className="blog-page__search-clear" 
                  aria-label="Clear search"
                >
                  <FaTimes aria-hidden="true" />
                </button>
              )}
            </div>
          </div>

          {/* Minimalist Category Pills */}
          <div className="blog-page__categories reveal reveal-d1">
            {categories.map(cat => (
              <button
                key={cat}
                className={`blog-page__category-pill ${activeCategory === cat ? 'is-active' : ''}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Main Content Layout */}
          <div ref={contentReveal} className="blog-page__content-wrap reveal reveal-d2">
            {loading ? (
              <div className="blog-page__empty-state">
                <h3>Loading stories…</h3>
              </div>
            ) : filtered.length === 0 ? (
              <div className="blog-page__empty-state">
                <h3>No stories found</h3>
                <p>We couldn't find any articles matching your search. Try adjusting your keywords or category.</p>
                {(searchQuery || activeCategory !== ALL) && (
                  <button 
                    onClick={() => { setSearchQuery(''); setActiveCategory(ALL); }} 
                    className="btn btn-secondary btn-sm"
                  >
                    Reset filters
                  </button>
                )}
              </div>
            ) : (
              <>
                {/* Featured Asymmetric Row (Only shown if we have >= 3 posts) */}
                {showFeaturedSection && (
                  <div className="blog-page__featured-row">
                    {/* Left: Large Featured Article */}
                    {featuredPost && (
                      <article className="blog-card-large">
                        <Link to={`/blog/${featuredPost.slug}`} className="blog-card-large__img-link">
                          <div className="blog-card-large__img-wrap">
                            <img 
                              src={featuredPost.image} 
                              alt={featuredPost.title} 
                              className="blog-card-large__img" 
                              loading="lazy" 
                            />
                            <span className="blog-card__badge">{featuredPost.category}</span>
                          </div>
                        </Link>
                        <div className="blog-card-large__content">
                          <h3 className="blog-card-large__title">
                            <Link to={`/blog/${featuredPost.slug}`}>{featuredPost.title}</Link>
                          </h3>
                          <span className="blog-card-large__date">{featuredPost.date}</span>
                        </div>
                      </article>
                    )}

                    {/* Right: Sidebar Stacking Articles */}
                    <div className="blog-page__sidebar-stack">
                      {sidebarPosts.map(post => (
                        <article key={post.slug} className="blog-card-sidebar">
                          <Link to={`/blog/${post.slug}`} className="blog-card-sidebar__img-link">
                            <div className="blog-card-sidebar__img-wrap">
                              <img 
                                src={post.image} 
                                alt={post.title} 
                                className="blog-card-sidebar__img" 
                                loading="lazy" 
                              />
                              <span className="blog-card__badge">{post.category}</span>
                            </div>
                          </Link>
                          <div className="blog-card-sidebar__content">
                            <h3 className="blog-card-sidebar__title">
                              <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                            </h3>
                            <span className="blog-card-sidebar__date">{post.date}</span>
                          </div>
                        </article>
                      ))}
                    </div>
                  </div>
                )}

                {/* Bottom Grid: 2-Column Equal Width (or all posts if < 3 matching) */}
                {gridPosts.length > 0 && (
                  <div className={`blog-page__grid ${!showFeaturedSection ? 'blog-page__grid--full' : ''}`}>
                    {pagedGridPosts.map(post => (
                      <article key={post.slug} className="blog-card-grid">
                        <Link to={`/blog/${post.slug}`} className="blog-card-grid__img-link">
                          <div className="blog-card-grid__img-wrap">
                            <img 
                              src={post.image} 
                              alt={post.title} 
                              className="blog-card-grid__img" 
                              loading="lazy" 
                            />
                            <span className="blog-card__badge">{post.category}</span>
                          </div>
                        </Link>
                        <div className="blog-card-grid__content">
                          <h3 className="blog-card-grid__title">
                            <Link to={`/blog/${post.slug}`}>{post.title}</Link>
                          </h3>
                          <span className="blog-card-grid__date">{post.date}</span>
                        </div>
                      </article>
                    ))}
                  </div>
                )}

                {/* Pagination */}
                {totalPages > 1 && (
                  <nav className="blog-page__pager" aria-label="Blog pagination">
                    <button
                      className="blog-page__page-btn"
                      onClick={() => setPage(p => Math.max(1, p - 1))}
                      disabled={safePage === 1}
                    >‹ Prev</button>
                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(n => (
                      <button
                        key={n}
                        className={`blog-page__page-btn ${n === safePage ? 'is-active' : ''}`}
                        onClick={() => setPage(n)}
                      >{n}</button>
                    ))}
                    <button
                      className="blog-page__page-btn"
                      onClick={() => setPage(p => Math.min(totalPages, p + 1))}
                      disabled={safePage === totalPages}
                    >Next ›</button>
                  </nav>
                )}
              </>
            )}
          </div>

        </div>
      </section>
    </>
  );
}

