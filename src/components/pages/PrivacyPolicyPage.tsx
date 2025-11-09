import { motion } from 'motion/react';
import { Card } from '../ui/card';

export function PrivacyPolicyPage() {
  const sections = [
    {
      title: 'Information We Collect',
      content: [
        'We collect information you provide directly to us when you create an account, use our estimation tool, or contact us for support. This may include your name, email address, and vehicle information you input for estimates.',
        'We automatically collect certain information about your device and how you interact with our service, including IP address, browser type, pages visited, and time spent on our platform.',
      ],
    },
    {
      title: 'How We Use Your Information',
      content: [
        'To provide, maintain, and improve our services, including generating accurate price estimates',
        'To communicate with you about updates, offers, and support',
        'To detect, prevent, and address technical issues and fraudulent activity',
        'To analyze usage patterns and improve our machine learning models',
        'To comply with legal obligations and protect our rights',
      ],
    },
    {
      title: 'Information Sharing',
      content: [
        'We do not sell your personal information to third parties.',
        'We may share your information with service providers who help us operate our platform, subject to strict confidentiality agreements.',
        'We may disclose information when required by law or to protect our rights and safety.',
        'Aggregated, non-identifying data may be shared for research and analytics purposes.',
      ],
    },
    {
      title: 'Data Security',
      content: [
        'We implement industry-standard security measures to protect your information, including encryption, secure servers, and regular security audits.',
        'However, no method of transmission over the internet is 100% secure. We cannot guarantee absolute security.',
        'You are responsible for maintaining the confidentiality of your account credentials.',
      ],
    },
    {
      title: 'Your Rights',
      content: [
        'You have the right to access, update, or delete your personal information at any time.',
        'You can opt out of marketing communications while continuing to use our service.',
        'You can request a copy of your data or ask us to transfer it to another service.',
        'EU residents have additional rights under GDPR, including the right to data portability and the right to be forgotten.',
      ],
    },
    {
      title: 'Cookies and Tracking',
      content: [
        'We use cookies and similar technologies to improve your experience, analyze usage, and deliver personalized content.',
        'You can control cookie preferences through your browser settings, though this may limit some functionality.',
        'We use analytics services like Google Analytics to understand how users interact with our platform.',
      ],
    },
    {
      title: 'Children\'s Privacy',
      content: [
        'Our service is not intended for children under 13 years of age.',
        'We do not knowingly collect personal information from children. If we discover we have collected such information, we will delete it immediately.',
      ],
    },
    {
      title: 'Changes to This Policy',
      content: [
        'We may update this privacy policy from time to time. We will notify you of significant changes via email or through a notice on our platform.',
        'Continued use of our service after changes constitutes acceptance of the updated policy.',
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
          <h1 className="text-gray-900 mb-4">Privacy Policy</h1>
          <p className="text-gray-600">
            Last updated: November 6, 2025
          </p>
          <Card className="mt-8 p-6 bg-amber-50/50 border-amber-200">
            <p className="text-gray-700">
              At SuperCar Price Estimator, we take your privacy seriously. This policy explains how we collect, 
              use, and protect your personal information.
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
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 bg-white border-gray-200">
                <h2 className="text-gray-900 mb-4">{section.title}</h2>
                <div className="space-y-3">
                  {section.content.map((paragraph, pIndex) => (
                    <p key={pIndex} className="text-gray-600">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Contact */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-12"
        >
          <Card className="p-8 bg-gradient-to-br from-red-600 to-orange-600 border-0 text-center">
            <h2 className="text-white mb-4">Questions About Privacy?</h2>
            <p className="text-white/90 mb-6">
              If you have any questions about this privacy policy or our data practices, please contact us.
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
