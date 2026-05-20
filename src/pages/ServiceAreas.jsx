import SEO from '../components/SEO.jsx';
import PageHero from './PageHero.jsx';
import AreasGrid from '../components/AreasGrid.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { SERVICE_AREAS } from '../data/siteData.js';

export default function ServiceAreas() {
  return (
    <>
      <SEO
        title="Detroit Moving Service Areas -- Dearborn, Troy, Grosse Pointe, Sterling Heights & More | Ancient Movers"
        description={`Professional moving services across ${SERVICE_AREAS.slice(0,6).join(', ')} and 12+ more Metro Detroit neighborhoods. Get your free quote today.`}
        canonical="https://ancientmovers.com/service-areas"
      />
      <PageHero
        title="Metro Detroit Areas We Serve"
        subtitle="18+ neighborhoods covered across Detroit, the suburbs, and surrounding cities -- all backed by our on-time guarantee."
        crumbs={[{ label: 'Service Areas' }]}
      />
      <AreasGrid withHeading={false} />
      <CtaBanner />
    </>
  );
}
