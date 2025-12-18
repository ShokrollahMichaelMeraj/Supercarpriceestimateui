import { Facebook, Twitter, Instagram, Linkedin, Mail, Phone, MapPin } from 'lucide-react';

export function Footer() {
  const currentYear = new Date().getFullYear();

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
          </div>

          {/* Quick Links - Removed */}
          <div>
            <h4 className="text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">About</h4>
            <p className="text-sm text-gray-600">
              Machine learning powered performance predictions for supercars.
            </p>
          </div>

          {/* Business - Removed */}
          <div>
            <h4 className="text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Technology</h4>
            <p className="text-sm text-gray-600">
              TensorFlow/Keras Neural Network
            </p>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-gray-900 mb-3 sm:mb-4 text-sm sm:text-base">Contact Us</h4>
            <ul className="space-y-3">
              <li className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-gray-600 mt-0.5" />
                <a href="mailto:mmeraj@sfu.ca" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  mmeraj@sfu.ca
                </a>
              </li>
              <li className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-gray-600 mt-0.5" />
                <a href="tel:+16043453598" className="text-sm text-gray-600 hover:text-gray-900 transition-colors">
                  +1 (604) 345-3598
                </a>
              </li>
              <li className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-gray-600 mt-0.5" />
                <span className="text-sm text-gray-600">
                  Vancouver, British Columbia<br />
                  Canada
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
          </div>
        </div>
      </div>
    </footer>
  );
}