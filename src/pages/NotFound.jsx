import { Link } from 'react-router-dom';
import SEO from '../components/SEO.jsx';
import './NotFound.css';

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found -- Ancient Movers" description="The page you're looking for doesn't exist." />
      <section className="notfound">
        <div className="container">
          <div className="notfound__code">404</div>
          <h1>Page Not Found</h1>
          <p>Looks like that page took a detour. Let's get you back home.</p>
          <Link to="/" className="btn btn-primary btn-lg">Back to Home</Link>
        </div>
      </section>
    </>
  );
}
