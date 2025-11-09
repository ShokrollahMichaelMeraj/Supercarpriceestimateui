import { HeroSection } from '../HeroSection';
import { CarViewer } from '../CarViewer';
import { FeatureSlider } from '../FeatureSlider';
import { AboutSection } from '../AboutSection';

export function HomePage() {
  return (
    <>
      {/* Hero Section */}
      <section className="relative">
        <HeroSection />
      </section>

      {/* Car Viewer Section */}
      <section className="relative">
        <CarViewer />
      </section>

      {/* Car Features Section */}
      <section id="features">
        <FeatureSlider />
      </section>

      {/* About Section */}
      <section id="about">
        <AboutSection />
      </section>
    </>
  );
}
