import { motion } from 'motion/react';
import { TrendingUp, Shield, Zap, BarChart3 } from 'lucide-react';
import { Card } from './ui/card';

const features = [
  {
    icon: TrendingUp,
    title: 'ML-Powered Accuracy',
    description: 'Our advanced machine learning model analyzes thousands of supercar specifications to provide accurate 0-60 time predictions.',
  },
  {
    icon: Shield,
    title: 'Trusted Predictions',
    description: 'Get reliable 0-60 time estimates based on real performance data and expert automotive knowledge.',
  },
  {
    icon: Zap,
    title: 'Instant Results',
    description: 'Receive your supercar 0-60 prediction instantly by simply adjusting the feature sliders.',
  },
  {
    icon: BarChart3,
    title: 'Performance Insights',
    description: 'Understand how different features affect your supercar\'s acceleration with detailed breakdowns.',
  },
];

export function AboutSection() {
  return (
    <div className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12 sm:mb-16 md:mb-20"
        >
          <h2 className="text-gray-900 mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl">
            Supercar 0-60 Prediction Made Simple
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Get accurate 0-60 time predictions for your luxury supercar using our advanced machine learning platform.
            Simply adjust the features and let our AI do the rest.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="grid sm:grid-cols-2 gap-6 sm:gap-8 mb-12 sm:mb-16 md:mb-24">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Card className="p-8 bg-white border-gray-200 hover:shadow-xl transition-shadow">
                <div className="w-12 h-12 bg-gradient-to-br from-red-600 to-orange-600 rounded-xl flex items-center justify-center mb-4">
                  <feature.icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-gray-900 mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* How It Works */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="bg-gradient-to-br from-gray-50 to-amber-50/30 rounded-3xl p-12"
        >
          <h3 className="text-gray-900 text-center mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { step: '01', title: 'Select Features', desc: 'Use the sliders to specify your supercar\'s year, horsepower, engine size, and condition.' },
              { step: '02', title: 'AI Analysis', desc: 'Our machine learning model processes your inputs against thousands of performance data points.' },
              { step: '03', title: 'Get Prediction', desc: 'Receive an accurate 0-60 time prediction with detailed insights and performance comparisons.' },
            ].map((item, index) => (
              <div key={item.step} className="text-center">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                  {item.step}
                </div>
                <h4 className="text-gray-900 mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
