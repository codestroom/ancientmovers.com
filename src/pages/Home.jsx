import SEO from '../components/SEO.jsx';
import Hero from '../components/Hero.jsx';
import TrustMarquee from '../components/TrustMarquee.jsx';
import QuickQuote from '../components/QuickQuote.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import WhyUs from '../components/WhyUs.jsx';
import Steps from '../components/Steps.jsx';
import Gallery from '../components/Gallery.jsx';
import AreasGrid from '../components/AreasGrid.jsx';
import Testimonials from '../components/Testimonials.jsx';
import Faq from '../components/Faq.jsx';
import CtaBanner from '../components/CtaBanner.jsx';

export default function Home() {
  return (
    <>
      <SEO
        title="Ancient Movers — Trusted Local Movers in Michigan | Grosse Pointe, Troy, Novi"
        description="Affordable, reliable moving services across Michigan. Residential, commercial, packing and long-distance moves. Licensed & insured. Get your free quote today."
        canonical="https://ancientmovers.com/"
      />
      <Hero />
      <TrustMarquee />
      <ServicesSection compact />
      <WhyUs />
      <QuickQuote />
      <Steps />
      <Gallery />
      <AreasGrid />
      <Testimonials />
      <Faq />
      <CtaBanner />
    </>
  );
}
