import { motion } from 'motion/react';
import { Users, Target, Award, Globe } from 'lucide-react';
import { Card } from '../ui/card';

export function AboutPage() {
  return (
    <div className="pt-24 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8">
      <div className="max-w-6xl mx-auto">
        {/* Hero */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-gray-900 mb-4">About SuperCar 0-60 Predictor</h1>
          <p className="text-gray-600 max-w-3xl mx-auto">
            We're revolutionizing supercar performance analysis with AI-powered 0-60 predictions that help enthusiasts understand their vehicle's capabilities.
          </p>
        </motion.div>

        {/* Mission */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mb-24"
        >
          <Card className="p-12 bg-gradient-to-br from-red-600 to-orange-600 border-0 text-white">
            <h2 className="text-white mb-4">Our Mission</h2>
            <p className="text-white/90">
              To provide the most accurate, transparent, and accessible supercar performance prediction platform in the world. 
              We leverage cutting-edge machine learning technology to analyze vehicle specifications, performance data, 
              and historical records to deliver instant, reliable 0-60 time predictions.
            </p>
          </Card>
        </motion.div>

        {/* Values */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
        >
          <h2 className="text-gray-900 text-center mb-12">Our Values</h2>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: Target, title: 'Accuracy', desc: 'Precision in every estimate' },
              { icon: Users, title: 'Trust', desc: 'Building lasting relationships' },
              { icon: Award, title: 'Excellence', desc: 'Setting industry standards' },
              { icon: Globe, title: 'Innovation', desc: 'Pioneering AI solutions' },
            ].map((value, index) => (
              <Card key={value.title} className="p-6 text-center bg-white border-gray-200">
                <div className="w-16 h-16 bg-gradient-to-br from-red-600 to-orange-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <value.icon className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-gray-900 mb-2">{value.title}</h3>
                <p className="text-sm text-gray-600">{value.desc}</p>
              </Card>
            ))}
          </div>
        </motion.div>

        {/* Team */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-24"
        >
          <h2 className="text-gray-900 text-center mb-8">Our Story</h2>
          <Card className="p-12 bg-white border-gray-200">
            <p className="text-gray-700 mb-4">
              Founded in 2024 by automotive enthusiasts and data scientists, SuperCar 0-60 Predictor was born 
              from a simple observation: supercar enthusiasts lacked transparent, data-driven performance prediction tools.
            </p>
            <p className="text-gray-700 mb-4">
              We assembled a team of machine learning experts, automotive specialists, and performance analysts to 
              create a platform that democratizes access to accurate 0-60 time predictions.
            </p>
            <p className="text-gray-700">
              Today, we serve thousands of users worldwide, from individual enthusiasts to racing teams, helping 
              them understand and predict their supercar's acceleration performance.
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
