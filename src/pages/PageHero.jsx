import { Link } from 'react-router-dom';
import './PageHero.css';

export default function PageHero({ title, subtitle, crumbs = [], videoSrc = "/videos/ancient-movers-showcase.mp4" }) {
  return (
    <section className="page-hero">
      {videoSrc && (
        <video
          className="page-hero__bg-video"
          src={videoSrc}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-hidden="true"
        />
      )}
      <div className="page-hero__bg-overlay" aria-hidden="true" />
      <div className="container page-hero__inner">
        <nav className="page-hero__crumbs" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          {crumbs.map((c, i) => (
            <span key={i}>
              <span className="sep">/</span>
              {c.to ? <Link to={c.to}>{c.label}</Link> : <span>{c.label}</span>}
            </span>
          ))}
        </nav>
        <h1>{title}</h1>
        {subtitle && <p>{subtitle}</p>}
      </div>
    </section>
  );
}
