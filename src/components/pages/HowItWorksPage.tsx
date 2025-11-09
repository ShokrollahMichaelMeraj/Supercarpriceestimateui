import { motion } from 'motion/react';
import { Sliders, Brain, LineChart, CheckCircle } from 'lucide-react';
import { Card } from '../ui/card';

export function HowItWorksPage() {
  const steps = [
    {
      icon: Sliders,
      title: 'Input Vehicle Details',
      description: 'Use our intuitive sliders to specify your supercar\'s year, horsepower, engine size, and overall condition.',
      details: [
        'Year of manufacture',
        'Engine specifications',
        'Horsepower output',
        'Condition rating',
      ],
    },
    {
      icon: Brain,
      title: 'AI Processing',
      description: 'Our advanced machine learning model analyzes your inputs against our extensive database of supercar performance data.',
      details: [
        'Historical performance data',
        'Power-to-weight ratios',
        'Drivetrain analysis',
        'Feature comparisons',
      ],
    },
    {
      icon: LineChart,
      title: 'Performance Analysis',
      description: 'The system evaluates aerodynamics, traction systems, and engineering specifications to refine the prediction.',
      details: [
        'Real-time performance metrics',
        'Acceleration curves',
        'Traction control factors',
        'Launch control analysis',
      ],
    },
    {
      icon: CheckCircle,
      title: 'Get Your Prediction',
      description: 'Receive an accurate 0-60 time prediction with detailed breakdowns showing how each factor affects performance.',
      details: [
        'Instant results',
        'Detailed breakdown',
        'Confidence intervals',
        'Performance insights',
      ],
    },
  ];

  return (
    <div className="pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-gray-900 mb-4">How It Works</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            Our AI-powered platform makes supercar 0-60 prediction simple, accurate, and instant. Here's how we deliver precise predictions in seconds.
          </p>
        </motion.div>

        {/* Steps */}
        <div className="space-y-12">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-8 md:p-12 bg-white border-gray-200 hover:shadow-xl transition-shadow">
                <div className="flex flex-col md:flex-row gap-8 items-start">
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20 bg-gradient-to-br from-red-600 to-orange-600 rounded-2xl flex items-center justify-center">
                      <step.icon className="w-10 h-10 text-white" />
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center gap-4 mb-4">
                      <span className="text-4xl text-gray-200">0{index + 1}</span>
                      <h2 className="text-gray-900">{step.title}</h2>
                    </div>
                    <p className="text-gray-600 mb-6">{step.description}</p>
                    <div className="grid sm:grid-cols-2 gap-3">
                      {step.details.map((detail) => (
                        <div key={detail} className="flex items-center gap-2">
                          <div className="w-1.5 h-1.5 bg-orange-600 rounded-full"></div>
                          <span className="text-sm text-gray-700">{detail}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </Card>
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
          className="mt-16 text-center"
        >
          <Card className="p-12 bg-gradient-to-br from-gray-50 to-amber-50/30 border-gray-200">
            <h2 className="text-gray-900 mb-4">Ready to Get Started?</h2>
            <p className="text-gray-600 mb-6">
              Try our predictor now and see how easy it is to get an accurate 0-60 time for your supercar.
            </p>
            <a 
              href="/"
              className="inline-flex items-center justify-center bg-gradient-to-r from-red-600 to-orange-600 text-white px-8 py-4 rounded-xl hover:opacity-90 transition-opacity"
            >
              Try the Predictor
            </a>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
