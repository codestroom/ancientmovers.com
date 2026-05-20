import SEO from '../components/SEO.jsx';
import PageHero from './PageHero.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import Steps from '../components/Steps.jsx';
import CtaBanner from '../components/CtaBanner.jsx';

export default function Services() {
  return (
    <>
      <SEO
        title="Moving Services in Michigan — Residential, Commercial, Packing | Ancient Movers"
        description="Explore Ancient Movers' full range of services: residential moving, commercial relocation, packing, long-distance, storage and specialty moves across Michigan."
        canonical="https://ancientmovers.com/services"
      />
      <PageHero
        title="Our Moving Services"
        subtitle="From the first box to the final piece of furniture — we handle it all with care."
        crumbs={[{ label: 'Services' }]}
      />
      <ServicesSection />
      <Steps />
      <CtaBanner />
    </>
  );
}
