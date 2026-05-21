import Navbar from './components/Navbar';
import Hero from './components/Hero';
import SocialProof from './components/SocialProof';
import ServicesCarousel from './components/ServicesCarousel';
import PricingCarousel from './components/PricingCarousel';
import Footer from './components/Footer';

function LandingPage() {
  return (
    <div className="w-full min-h-screen bg-white">
      <Navbar />
      <main>
        <Hero />
        <SocialProof />
        <ServicesCarousel />
        <PricingCarousel />
      </main>
      <Footer />
    </div>
  );
}

export default LandingPage;
