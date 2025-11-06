import { motion } from 'motion/react';
import { Card } from '../ui/card';

export function FAQPage() {
  const faqs = [
    {
      category: 'General',
      questions: [
        {
          q: 'How accurate are your price estimates?',
          a: 'Our AI model is trained on thousands of real supercar transactions and is typically accurate within 5-10% of actual market values. Accuracy depends on the completeness and accuracy of the data you provide.',
        },
        {
          q: 'Which car brands and models do you support?',
          a: 'We currently support all major supercar brands including Ferrari, Lamborghini, Porsche, McLaren, Aston Martin, and more. Our database is constantly expanding to include rare and exotic models.',
        },
        {
          q: 'Is this service available worldwide?',
          a: 'Yes! Our platform provides estimates globally, though pricing may vary by region based on local market conditions, taxes, and import regulations.',
        },
      ],
    },
    {
      category: 'Using the Estimator',
      questions: [
        {
          q: 'What information do I need to get an estimate?',
          a: 'You\'ll need basic information about the vehicle: year, mileage, engine size, horsepower, and condition. The more accurate your inputs, the more precise the estimate.',
        },
        {
          q: 'Can I save my estimates?',
          a: 'Yes! Pro and Business plan users can save unlimited estimates and access their history. Free users can save up to 5 estimates per month.',
        },
        {
          q: 'How often is your pricing data updated?',
          a: 'Our database is updated daily with new transaction data, market trends, and pricing information from trusted sources worldwide.',
        },
      ],
    },
    {
      category: 'Technical',
      questions: [
        {
          q: 'What technology powers your estimates?',
          a: 'We use advanced machine learning algorithms, specifically gradient boosting models and neural networks, trained on millions of data points including historical sales, market trends, and vehicle specifications.',
        },
        {
          q: 'Do you offer an API?',
          a: 'Yes! Business plan subscribers have access to our RESTful API for integrating our estimation engine into their own applications and workflows.',
        },
        {
          q: 'Is my data secure?',
          a: 'Absolutely. We use industry-standard encryption and security practices. We never share your personal data with third parties without your explicit consent.',
        },
      ],
    },
    {
      category: 'Pricing & Plans',
      questions: [
        {
          q: 'Can I try before I buy?',
          a: 'Yes! We offer a free plan with 5 estimates per month, and Pro plans come with a 14-day free trial. No credit card required.',
        },
        {
          q: 'What\'s the difference between Pro and Business plans?',
          a: 'Business plans include API access, bulk processing, team accounts, custom branding, and dedicated support. Pro plans are ideal for individual users who need unlimited estimates and detailed insights.',
        },
        {
          q: 'Do you offer refunds?',
          a: 'We offer a 30-day money-back guarantee on all paid plans. If you\'re not satisfied, contact our support team for a full refund.',
        },
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
          className="text-center mb-16"
        >
          <h1 className="text-gray-900 mb-4">Frequently Asked Questions</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about our supercar price estimation platform.
          </p>
        </motion.div>

        {/* FAQ Categories */}
        <div className="space-y-12">
          {faqs.map((category, categoryIndex) => (
            <motion.div
              key={category.category}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: categoryIndex * 0.1 }}
            >
              <h2 className="text-gray-900 mb-6">{category.category}</h2>
              <div className="space-y-4">
                {category.questions.map((faq, faqIndex) => (
                  <Card key={faqIndex} className="p-6 bg-white border-gray-200 hover:shadow-lg transition-shadow">
                    <h3 className="text-gray-900 mb-3">{faq.q}</h3>
                    <p className="text-gray-600">{faq.a}</p>
                  </Card>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Still Have Questions */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16"
        >
          <Card className="p-12 bg-gradient-to-br from-red-600 to-orange-600 border-0 text-center">
            <h2 className="text-white mb-4">Still Have Questions?</h2>
            <p className="text-white/90 mb-6">
              Our support team is here to help. Get in touch and we'll respond within 24 hours.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a 
                href="mailto:info@supercarestimate.com"
                className="flex items-center justify-center bg-white text-orange-600 px-8 py-3 rounded-xl hover:bg-gray-100 transition-colors"
              >
                Email Support
              </a>
              <a 
                href="tel:+1234567890"
                className="flex items-center justify-center bg-white/10 text-white border-2 border-white px-8 py-3 rounded-xl hover:bg-white/20 transition-colors"
              >
                Call Us
              </a>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
