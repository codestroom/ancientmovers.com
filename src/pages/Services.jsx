import SEO from '../components/SEO.jsx';
import PageHero from './PageHero.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import Steps from '../components/Steps.jsx';
import CtaBanner from '../components/CtaBanner.jsx';

export default function Services() {
  return (
    <>
      <SEO
        title="Moving Services in Detroit, MI -- Residential, Commercial, Packing & More | Ancient Movers"
        description="Explore Ancient Movers' full range of Detroit moving services: residential moves, office relocations, packing, long-distance, senior moving, specialty items and secure storage."
        canonical="https://ancientmovers.com/services"
      />
      <PageHero
        title="Our Moving Services in Detroit"
        subtitle="From the first box to the final piece of furniture -- we handle every Detroit move with precision and care."
        crumbs={[{ label: 'Services' }]}
      />
      <ServicesSection />
      <Steps />
      <CtaBanner />
    </>
  );
}
