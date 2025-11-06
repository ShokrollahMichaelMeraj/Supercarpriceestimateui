import { motion } from 'motion/react';
import { Card } from '../ui/card';

export function TermsPage() {
  const sections = [
    {
      title: 'Acceptance of Terms',
      content: [
        'By accessing and using SuperCar Price Estimator, you accept and agree to be bound by these Terms of Service.',
        'If you do not agree to these terms, please do not use our service.',
        'We reserve the right to modify these terms at any time. Continued use after changes constitutes acceptance.',
      ],
    },
    {
      title: 'Use of Service',
      content: [
        'Our service provides price estimates for supercars based on AI analysis of market data. These estimates are for informational purposes only.',
        'You may use our service for lawful purposes only and in accordance with these terms.',
        'You agree not to misuse our service, including attempting to access unauthorized areas or interfere with the platform\'s operation.',
        'Free tier users are limited to 5 estimates per month. Paid subscribers have access according to their plan.',
      ],
    },
    {
      title: 'Accuracy and Disclaimers',
      content: [
        'While we strive for accuracy, price estimates are approximations based on available data and algorithms.',
        'We do not guarantee that estimates reflect actual market prices or that vehicles can be bought or sold at estimated prices.',
        'Estimates should not be the sole basis for financial decisions. Always conduct thorough research and consult professionals.',
        'We are not responsible for decisions made based on our estimates.',
      ],
    },
    {
      title: 'User Accounts',
      content: [
        'You are responsible for maintaining the confidentiality of your account credentials.',
        'You agree to provide accurate, current information when creating an account.',
        'You are responsible for all activities that occur under your account.',
        'We reserve the right to suspend or terminate accounts that violate these terms.',
      ],
    },
    {
      title: 'Intellectual Property',
      content: [
        'All content, features, and functionality of our service are owned by SuperCar Price Estimator and protected by copyright, trademark, and other laws.',
        'You may not copy, modify, distribute, or create derivative works from our service without permission.',
        'Our machine learning models, algorithms, and data compilations are proprietary and confidential.',
      ],
    },
    {
      title: 'Payment and Subscriptions',
      content: [
        'Paid subscriptions are billed according to the plan you select.',
        'Subscriptions automatically renew unless cancelled before the renewal date.',
        'We offer a 30-day money-back guarantee on all paid plans.',
        'Prices are subject to change with 30 days notice to existing subscribers.',
      ],
    },
    {
      title: 'API Usage',
      content: [
        'Business plan subscribers receive API access subject to rate limits and fair use policies.',
        'You may not resell, redistribute, or share API access without written permission.',
        'API abuse or excessive usage may result in throttling or termination of access.',
      ],
    },
    {
      title: 'Limitation of Liability',
      content: [
        'Our service is provided "as is" without warranties of any kind, express or implied.',
        'We are not liable for any indirect, incidental, special, or consequential damages.',
        'Our total liability shall not exceed the amount you paid for the service in the past 12 months.',
        'Some jurisdictions do not allow limitation of liability, so these limitations may not apply to you.',
      ],
    },
    {
      title: 'Termination',
      content: [
        'You may cancel your account at any time through your account settings.',
        'We reserve the right to suspend or terminate accounts for violations of these terms.',
        'Upon termination, your right to use the service ceases immediately.',
        'Certain provisions of these terms survive termination, including intellectual property rights and limitations of liability.',
      ],
    },
    {
      title: 'Governing Law',
      content: [
        'These terms are governed by the laws of Monaco, without regard to conflict of law provisions.',
        'Any disputes shall be resolved in the courts of Monaco.',
        'If any provision is found unenforceable, the remaining provisions remain in effect.',
      ],
    },
  ];

  return (
    <div className="pt-24 pb-16 px-6">
      <div className="max-w-4xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <h1 className="text-gray-900 mb-4">Terms of Service</h1>
          <p className="text-gray-600">
            Last updated: November 6, 2025
          </p>
          <Card className="mt-8 p-6 bg-amber-50/50 border-amber-200">
            <p className="text-gray-700">
              Please read these terms carefully before using SuperCar Price Estimator. 
              By using our service, you agree to be bound by these terms.
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
            <h2 className="text-white mb-4">Questions About These Terms?</h2>
            <p className="text-white/90 mb-6">
              If you have questions about our terms of service, please contact our legal team.
            </p>
            <a 
              href="mailto:legal@supercarestimate.com"
              className="inline-flex items-center justify-center bg-white text-orange-600 px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
            >
              Contact Legal Team
            </a>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
