import { Footer } from './components/Footer';
import { WaveBackground } from './components/WaveBackground';
import { HeroSection } from './components/HeroSection';
import { CarViewer } from './components/CarViewer';
import { FeatureSlider } from './components/FeatureSlider';
import { AboutSection } from './components/AboutSection';

export default function App() {
  return (
    <div className="min-h-screen relative">
      {/* Animated Wave Background */}
      <WaveBackground />

      {/* Main Content */}
      <main>
        {/* Hero Section */}
        <section className="relative">
          <HeroSection />
        </section>

        {/* Car Viewer Section */}
        <section className="relative">
          <CarViewer />
        </section>

        {/* Car Features Section */}
        <section>
          <FeatureSlider />
        </section>

        {/* About Section */}
        <section>
          <AboutSection />
        </section>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}