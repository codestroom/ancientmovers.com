import SEO from '../components/SEO.jsx';
import CinematicHero from '../components/CinematicHero.jsx';
import TrustMarquee from '../components/TrustMarquee.jsx';
import QuickQuote from '../components/QuickQuote.jsx';
import ServicesSection from '../components/ServicesSection.jsx';
import WhyUs from '../components/WhyUs.jsx';
import Steps from '../components/Steps.jsx';
import Gallery from '../components/Gallery.jsx';
import AreasGrid from '../components/AreasGrid.jsx';
import Testimonials from '../components/Testimonials.jsx';
import BlogPreview from '../components/BlogPreview.jsx';
import Faq from '../components/Faq.jsx';
import CtaBanner from '../components/CtaBanner.jsx';

export default function Home() {
  return (
    <>
      <SEO
        title="Ancient Movers Detroit -- #1 Local Moving Company in Metro Detroit, Michigan"
        description="Detroit's most trusted moving company since 2015. Residential, commercial, packing, and long-distance moves across Metro Detroit. 4.9★ rated, licensed & insured. Free quote in 1 hour."
        canonical="https://ancientmovers.com/"
      />
      <CinematicHero />
      <QuickQuote />
      <TrustMarquee />
      <ServicesSection compact />
      <WhyUs />
      <Steps />
      <Gallery />
      <AreasGrid />
      <Testimonials />
      <BlogPreview />
      <Faq />
      <CtaBanner />
    </>
  );
}
