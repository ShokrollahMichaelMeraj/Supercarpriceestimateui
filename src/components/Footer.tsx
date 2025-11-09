import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

interface FooterProps {
  onNavigate?: (page: string) => void;
}

export function Footer({ onNavigate }: FooterProps) {
  const currentYear = new Date().getFullYear();

  const handleNavigate = (e: React.MouseEvent, page: string) => {
    e.preventDefault();
    onNavigate?.(page);
  };

  return (
    <footer className="bg-gradient-to-b from-white to-gray-50 border-t border-gray-200">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 sm:gap-10 lg:gap-12 mb-8 sm:mb-12">
          {/* Brand */}
          <div className="lg:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center flex-shrink-0">
                <span className="text-white text-sm sm:text-base">SC</span>
              </div>
              <div>
                <div className="text-gray-900 text-sm sm:text-base">SuperCar</div>
                <div className="text-xs text-gray-600">0-60 Predictor</div>
              </div>
            </div>
            <p className="text-xs sm:text-sm text-gray-600 mb-4">
              Accurate AI-powered 0-60 predictions for luxury supercars.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                <Facebook className="w-4 h-4 text-gray-700" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                <Twitter className="w-4 h-4 text-gray-700" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                <Instagram className="w-4 h-4 text-gray-700" />
              </a>
              <a href="#" className="w-8 h-8 bg-gray-100 hover:bg-gray-200 rounded-full flex items-center justify-center transition-colors">
                <Linkedin className="w-4 h-4 text-gray-700" />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Quick Links</h4>
            <ul className="space-y-2">
              <li><a href="#" onClick={(e) => handleNavigate(e, 'home')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Home</a></li>
              <li><a href="#" onClick={(e) => handleNavigate(e, 'about')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">About Us</a></li>
              <li><a href="#" onClick={(e) => handleNavigate(e, 'how-it-works')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">How It Works</a></li>
              <li><a href="#" onClick={(e) => handleNavigate(e, 'pricing')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Pricing</a></li>
              <li><a href="#" onClick={(e) => handleNavigate(e, 'faq')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">FAQ</a></li>
            </ul>
          </div>

          {/* Business */}
          <div>
            <h4 className="text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Business</h4>
            <ul className="space-y-2">
              <li><a href="#" onClick={(e) => handleNavigate(e, 'business')} className="text-sm text-gray-600 hover:text-gray-900 transition-colors">Business Enquiries</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-gray-600 mt-0.5" />
                <a href="mailto:info@supercarestimate.com" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  info@supercarestimate.com
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gray-600 mt-0.5" />
                <a href="tel:+1234567890" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  +1 (234) 567-890
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                <span className="text-sm text-gray-600">
                  123 Luxury Lane<br />
                  Monaco, MC 98000
                </span>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-6 sm:pt-8 border-t border-gray-200">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-xs sm:text-sm text-gray-600 text-center md:text-left">
              © {currentYear} SuperCar 0-60 Predictor. All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-4 sm:gap-6">
              <a href="#" onClick={(e) => handleNavigate(e, 'privacy')} className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">Privacy Policy</a>
              <a href="#" onClick={(e) => handleNavigate(e, 'terms')} className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">Terms of Service</a>
              <a href="#" onClick={(e) => handleNavigate(e, 'cookies')} className="text-xs sm:text-sm text-gray-600 hover:text-gray-900 transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
