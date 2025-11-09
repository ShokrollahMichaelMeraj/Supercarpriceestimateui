import { motion } from 'motion/react';
import { Check } from 'lucide-react';
import { Card } from '../ui/card';

export function PricingPage() {
  const plans = [
    {
      name: 'Free',
      price: '$0',
      period: 'forever',
      description: 'Perfect for individual car enthusiasts',
      features: [
        '5 estimates per month',
        'Basic price range',
        'Standard market data',
        'Email support',
      ],
      cta: 'Get Started',
      highlighted: false,
    },
    {
      name: 'Pro',
      price: '$29',
      period: 'per month',
      description: 'For serious collectors and sellers',
      features: [
        'Unlimited estimates',
        'Detailed breakdowns',
        'Advanced market insights',
        'Historical trend analysis',
        'Priority support',
        'Export reports (PDF)',
      ],
      cta: 'Start Free Trial',
      highlighted: true,
    },
    {
      name: 'Business',
      price: '$199',
      period: 'per month',
      description: 'For dealerships and professionals',
      features: [
        'Everything in Pro',
        'API access',
        'Bulk estimates',
        'Custom branding',
        'Team accounts (up to 10)',
        'Dedicated account manager',
        'White-label options',
        'Advanced analytics',
      ],
      cta: 'Contact Sales',
      highlighted: false,
    },
  ];

  return (
    <div className="pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-gray-900 mb-4">Simple, Transparent Pricing</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Choose the plan that fits your needs. All plans include our advanced AI-powered estimation technology.
          </p>
        </motion.div>

        {/* Pricing Cards */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan, index) => (
            <motion.div
              key={plan.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className={`p-8 h-full flex flex-col ${
                plan.highlighted 
                  ? 'bg-gradient-to-br from-red-600 to-orange-600 border-0 shadow-2xl scale-105' 
                  : 'bg-white border-gray-200'
              }`}>
                {plan.highlighted && (
                  <div className="text-center mb-4">
                    <span className="bg-white text-orange-600 px-4 py-1 rounded-full text-sm">
                      Most Popular
                    </span>
                  </div>
                )}
                <div className="mb-6">
                  <h3 className={plan.highlighted ? 'text-white' : 'text-gray-900'}>{plan.name}</h3>
                  <div className="mt-4 flex items-baseline gap-2">
                    <span className={`text-4xl ${plan.highlighted ? 'text-white' : 'text-gray-900'}`}>
                      {plan.price}
                    </span>
                    <span className={plan.highlighted ? 'text-white/80' : 'text-gray-600'}>
                      {plan.period}
                    </span>
                  </div>
                  <p className={`mt-4 text-sm ${plan.highlighted ? 'text-white/90' : 'text-gray-600'}`}>
                    {plan.description}
                  </p>
                </div>

                <ul className="space-y-3 mb-8 flex-1">
                  {plan.features.map((feature) => (
                    <li key={feature} className="flex items-start gap-3">
                      <Check className={`w-5 h-5 flex-shrink-0 ${plan.highlighted ? 'text-white' : 'text-green-600'}`} />
                      <span className={`text-sm ${plan.highlighted ? 'text-white/90' : 'text-gray-700'}`}>
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>

                <button className={`w-full flex items-center justify-center py-3 rounded-xl transition-all ${
                  plan.highlighted
                    ? 'bg-white text-orange-600 hover:bg-gray-100'
                    : 'bg-gradient-to-r from-red-600 to-orange-600 text-white hover:opacity-90'
                }`}>
                  {plan.cta}
                </button>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* FAQ Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h2 className="text-gray-900 text-center mb-8">Frequently Asked Questions</h2>
          <div className="grid md:grid-cols-2 gap-6">
            {[
              {
                q: 'Can I change plans later?',
                a: 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect immediately.',
              },
              {
                q: 'What payment methods do you accept?',
                a: 'We accept all major credit cards, PayPal, and bank transfers for Business plans.',
              },
              {
                q: 'Is there a free trial?',
                a: 'Yes! Pro plans come with a 14-day free trial. No credit card required to start.',
              },
              {
                q: 'What happens after my trial ends?',
                a: 'You\'ll be automatically moved to the Free plan unless you choose to subscribe.',
              },
            ].map((faq) => (
              <Card key={faq.q} className="p-6 bg-white border-gray-200">
                <h4 className="text-gray-900 mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-600">{faq.a}</p>
              </Card>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
