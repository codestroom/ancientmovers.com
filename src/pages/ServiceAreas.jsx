import SEO from '../components/SEO.jsx';
import PageHero from './PageHero.jsx';
import AreasGrid from '../components/AreasGrid.jsx';
import CtaBanner from '../components/CtaBanner.jsx';
import { SERVICE_AREAS } from '../data/siteData.js';

export default function ServiceAreas() {
  return (
    <>
      <SEO
        title="Michigan Moving Service Areas — Troy, Novi, Grosse Pointe & More | Ancient Movers"
        description={`We provide local moving services across ${SERVICE_AREAS.slice(0,6).join(', ')} and 10+ more Michigan neighborhoods.`}
        canonical="https://ancientmovers.com/service-areas"
      />
      <PageHero
        title="Michigan Areas We Serve"
        subtitle="16+ neighborhoods covered across Metro Detroit, Ann Arbor and surrounding cities."
        crumbs={[{ label: 'Service Areas' }]}
      />
      <AreasGrid withHeading={false} />
      <CtaBanner />
    </>
  );
}
