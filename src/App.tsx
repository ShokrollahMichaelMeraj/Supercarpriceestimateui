import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './components/pages/HomePage';
import { AboutPage } from './components/pages/AboutPage';
import { HowItWorksPage } from './components/pages/HowItWorksPage';
import { PricingPage } from './components/pages/PricingPage';
import { FAQPage } from './components/pages/FAQPage';
import { BusinessEnquiriesPage } from './components/pages/BusinessEnquiriesPage';
import { PrivacyPolicyPage } from './components/pages/PrivacyPolicyPage';
import { TermsPage } from './components/pages/TermsPage';
import { CookiePolicyPage } from './components/pages/CookiePolicyPage';

type Page = 'home' | 'about' | 'how-it-works' | 'pricing' | 'faq' | 'business' | 'privacy' | 'terms' | 'cookies';

export default function App() {
  const [currentPage, setCurrentPage] = useState<Page>('home');

  const handleNavigate = (page: string) => {
    setCurrentPage(page as Page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [currentPage]);

  const renderPage = () => {
    switch (currentPage) {
      case 'about':
        return <AboutPage />;
      case 'how-it-works':
        return <HowItWorksPage />;
      case 'pricing':
        return <PricingPage />;
      case 'faq':
        return <FAQPage />;
      case 'business':
        return <BusinessEnquiriesPage />;
      case 'privacy':
        return <PrivacyPolicyPage />;
      case 'terms':
        return <TermsPage />;
      case 'cookies':
        return <CookiePolicyPage />;
      default:
        return <HomePage />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FAFAF8] via-[#F5F1E8] to-[#EDE7D9]">
      {/* Header */}
      <Header onNavigate={handleNavigate} />

      {/* Main Content */}
      <main>
        {renderPage()}
      </main>

      {/* Footer */}
      <Footer onNavigate={handleNavigate} />
    </div>
  );
}
