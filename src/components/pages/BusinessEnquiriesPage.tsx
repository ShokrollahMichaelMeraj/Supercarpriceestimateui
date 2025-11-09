import { motion } from 'motion/react';
import { Building2, Users, Zap, HeadphonesIcon } from 'lucide-react';
import { Card } from '../ui/card';

export function BusinessEnquiriesPage() {
  return (
    <div className="pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-gray-900 mb-4">Business Enquiries</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Partner with us to bring AI-powered supercar valuations to your business. Perfect for dealerships, 
            auction houses, insurance companies, and automotive platforms.
          </p>
        </motion.div>

        {/* Benefits */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {[
            {
              icon: Building2,
              title: 'Enterprise Solutions',
              desc: 'Custom integrations tailored to your business needs',
            },
            {
              icon: Users,
              title: 'Team Licensing',
              desc: 'Scalable pricing for teams of any size',
            },
            {
              icon: Zap,
              title: 'API Access',
              desc: 'Full API access for seamless integration',
            },
            {
              icon: HeadphonesIcon,
              title: 'Dedicated Support',
              desc: '24/7 priority support and account management',
            },
          ].map((benefit, index) => (
            <motion.div
              key={benefit.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 text-center bg-white border-gray-200 h-full">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <benefit.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-gray-900 mb-2">{benefit.title}</h3>
                <p className="text-sm text-gray-600">{benefit.desc}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* Use Cases */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="mb-16"
        >
          <h2 className="text-gray-900 text-center mb-12">Perfect For</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: 'Dealerships',
                desc: 'Streamline your inventory pricing and give customers instant valuations on trade-ins.',
                features: ['Bulk pricing', 'Inventory management', 'Customer-facing tools'],
              },
              {
                title: 'Auction Houses',
                desc: 'Set accurate reserve prices and provide buyers with transparent market valuations.',
                features: ['Pre-auction estimates', 'Market insights', 'Historical data'],
              },
              {
                title: 'Insurance Companies',
                desc: 'Assess vehicle values quickly and accurately for policies and claims.',
                features: ['Claims processing', 'Policy underwriting', 'Risk assessment'],
              },
            ].map((useCase, index) => (
              <Card key={useCase.title} className="p-8 bg-white border-gray-200">
                <h3 className="text-gray-900 mb-3">{useCase.title}</h3>
                <p className="text-gray-600 mb-4">{useCase.desc}</p>
                <ul className="space-y-2">
                  {useCase.features.map((feature) => (
                    <li key={feature} className="flex items-center gap-2 text-sm text-gray-700">
                      <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Contact Form */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <Card className="p-12 bg-gradient-to-br from-gray-50 to-amber-50/30 border-gray-200">
            <h2 className="text-gray-900 text-center mb-8">Get in Touch</h2>
            <form className="max-w-2xl mx-auto space-y-6">
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-700 mb-2">First Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="John"
                  />
                </div>
                <div>
                  <label className="block text-gray-700 mb-2">Last Name</label>
                  <input
                    type="text"
                    className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                    placeholder="Doe"
                  />
                </div>
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Company</label>
                <input
                  type="text"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Your Company Name"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="john@company.com"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Phone</label>
                <input
                  type="tel"
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="+1 (234) 567-890"
                />
              </div>

              <div>
                <label className="block text-gray-700 mb-2">Message</label>
                <textarea
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Tell us about your business needs..."
                ></textarea>
              </div>

              <button
                type="submit"
                className="w-full flex items-center justify-center bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-xl hover:opacity-90 transition-opacity"
              >
                Send Enquiry
              </button>
            </form>

            <div className="mt-12 text-center">
              <p className="text-gray-600 mb-4">Or contact us directly:</p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <a href="mailto:business@supercarestimate.com" className="text-orange-600 hover:text-orange-700">
                  business@supercarestimate.com
                </a>
                <span className="hidden sm:inline text-gray-400">|</span>
                <a href="tel:+1234567890" className="text-orange-600 hover:text-orange-700">
                  +1 (234) 567-890
                </a>
              </div>
            </div>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
