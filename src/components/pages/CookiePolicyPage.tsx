import { motion } from 'motion/react';
import { Card } from '../ui/card';

export function CookiePolicyPage() {
  const sections = [
    {
      title: 'What Are Cookies?',
      content: [
        'Cookies are small text files that are stored on your device when you visit our website. They help us provide you with a better experience by remembering your preferences and understanding how you use our service.',
        'We use both session cookies (which expire when you close your browser) and persistent cookies (which remain on your device for a set period).',
      ],
    },
    {
      title: 'Essential Cookies',
      content: [
        'These cookies are necessary for our website to function properly. They enable core functionality such as security, network management, and accessibility.',
        'You cannot opt out of essential cookies as they are required for the service to work.',
        'Examples include: authentication cookies, security cookies, and load balancing cookies.',
      ],
    },
    {
      title: 'Analytics Cookies',
      content: [
        'We use analytics cookies to understand how visitors interact with our website. This helps us improve our service and user experience.',
        'These cookies collect anonymous information such as pages visited, time spent on site, and how you arrived at our website.',
        'We use Google Analytics and similar services. You can opt out of these through your browser settings or privacy preferences.',
      ],
    },
    {
      title: 'Functional Cookies',
      content: [
        'These cookies enable enhanced functionality and personalization, such as remembering your preferences and settings.',
        'Examples include: language preferences, saved estimates, theme preferences, and personalized content.',
        'While not essential, disabling these cookies may limit certain features of our service.',
      ],
    },
    {
      title: 'Advertising Cookies',
      content: [
        'We do not currently use advertising cookies. If this changes in the future, we will update this policy and notify users.',
        'We do not sell your data to third-party advertisers.',
      ],
    },
    {
      title: 'Third-Party Cookies',
      content: [
        'Some cookies are placed by third-party services we use, such as analytics providers and payment processors.',
        'These third parties have their own privacy policies and we encourage you to review them.',
        'We carefully select partners who meet our privacy and security standards.',
      ],
    },
    {
      title: 'Managing Your Cookie Preferences',
      content: [
        'You can control and manage cookies through your browser settings. Most browsers allow you to refuse or accept cookies, delete existing cookies, and set preferences for certain websites.',
        'Please note that disabling cookies may affect the functionality of our website.',
        'Browser-specific instructions:',
        '• Chrome: Settings > Privacy and security > Cookies',
        '• Firefox: Preferences > Privacy & Security > Cookies',
        '• Safari: Preferences > Privacy > Cookies',
        '• Edge: Settings > Privacy > Cookies',
      ],
    },
    {
      title: 'Cookie Consent',
      content: [
        'When you first visit our website, we ask for your consent to use non-essential cookies.',
        'You can change your cookie preferences at any time through our cookie settings (typically found in the footer).',
        'Withdrawing consent will not affect the lawfulness of processing based on consent before withdrawal.',
      ],
    },
    {
      title: 'Updates to This Policy',
      content: [
        'We may update this cookie policy from time to time to reflect changes in our practices or for legal, operational, or regulatory reasons.',
        'We will notify you of any significant changes by posting a notice on our website or sending you an email.',
        'Please check this page periodically for updates.',
      ],
    },
  ];

  return (
    <div className="pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-gray-900 mb-4">Cookie Policy</h1>
          <p className="text-gray-600">
            Last updated: November 6, 2025
          </p>
          <Card className="mt-8 p-6 bg-amber-50/50 border-amber-200">
            <p className="text-gray-700">
              This Cookie Policy explains how SuperCar Price Estimator uses cookies and similar technologies 
              to recognize you when you visit our website.
            </p>
          </Card>
        </motion.div>

        {/* Sections */}
        <div className="space-y-8">
          {sections.map((section, index) => (
            <motion.div
              key={section.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.05 }}
            >
              <Card className="p-8 bg-white border-gray-200">
                <h2 className="text-gray-900 mb-4">{section.title}</h2>
                <div className="space-y-3">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-600 whitespace-pre-line">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Cookie Table */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="p-8 bg-white border-gray-200 overflow-x-auto">
            <h2 className="text-gray-900 mb-6">Cookies We Use</h2>
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-200">
                  <th className="text-left py-3 text-gray-900">Cookie Name</th>
                  <th className="text-left py-3 text-gray-900">Type</th>
                  <th className="text-left py-3 text-gray-900">Purpose</th>
                  <th className="text-left py-3 text-gray-900">Duration</th>
                </tr>
              </thead>
              <tbody>
                {[
                  { name: 'session_id', type: 'Essential', purpose: 'Maintains your login session', duration: 'Session' },
                  { name: 'csrf_token', type: 'Essential', purpose: 'Security and CSRF protection', duration: 'Session' },
                  { name: '_ga', type: 'Analytics', purpose: 'Google Analytics tracking', duration: '2 years' },
                  { name: 'preferences', type: 'Functional', purpose: 'Stores your settings and preferences', duration: '1 year' },
                  { name: 'cookie_consent', type: 'Essential', purpose: 'Remembers your cookie preferences', duration: '1 year' },
                ].map((cookie) => (
                  <tr key={cookie.name} className="border-b border-gray-100">
                    <td className="py-3 text-gray-700">{cookie.name}</td>
                    <td className="py-3 text-gray-600">{cookie.type}</td>
                    <td className="py-3 text-gray-600">{cookie.purpose}</td>
                    <td className="py-3 text-gray-600">{cookie.duration}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </Card>
        </motion.div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12"
        >
          <Card className="p-8 bg-gradient-to-br from-red-600 to-orange-600 border-0 text-center">
            <h2 className="text-white mb-4">Questions About Cookies?</h2>
            <p className="text-white/90 mb-6">
              If you have questions about how we use cookies, please contact our privacy team.
            </p>
            <a 
              href="mailto:privacy@supercarestimate.com"
              className="inline-flex items-center justify-center bg-white text-orange-600 px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Contact Privacy Team
            </a>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
