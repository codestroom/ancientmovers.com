import { Link } from 'react-router-dom';
import './PageHero.css';

export default function PageHero({ title, subtitle, crumbs = [] }) {
  return (
    <section className="page-hero">
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
