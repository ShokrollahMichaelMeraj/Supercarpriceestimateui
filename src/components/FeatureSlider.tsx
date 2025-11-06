import { useState } from 'react';
import { motion } from 'motion/react';
import { Slider } from './ui/slider';
import { Card } from './ui/card';

interface Feature {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  unit: string;
  defaultValue: number;
}

const features: Feature[] = [
  { id: 'year', label: 'Year', min: 1980, max: 2025, step: 1, unit: '', defaultValue: 2020 },
  { id: 'mileage', label: 'Mileage', min: 0, max: 150000, step: 1000, unit: ' km', defaultValue: 20000 },
  { id: 'engine', label: 'Engine Size', min: 2.0, max: 8.0, step: 0.1, unit: 'L', defaultValue: 4.0 },
  { id: 'horsepower', label: 'Horsepower', min: 200, max: 1000, step: 10, unit: ' HP', defaultValue: 500 },
  { id: 'condition', label: 'Condition', min: 1, max: 10, step: 1, unit: '/10', defaultValue: 8 },
];

export function FeatureSlider() {
  const [values, setValues] = useState<Record<string, number>>(
    features.reduce((acc, f) => ({ ...acc, [f.id]: f.defaultValue }), {})
  );

  const handleValueChange = (id: string, newValue: number[]) => {
    setValues(prev => ({ ...prev, [id]: newValue[0] }));
  };

  return (
    <div className="py-24 px-6 bg-white/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-gray-900 mb-4">
            Configure Your Supercar
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Adjust the sliders below to match your vehicle's specifications and get an instant AI-powered price estimate.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white border-gray-200 shadow-xl p-8 md:p-12">
            <div className="space-y-8">
              {features.map((feature, index) => (
                <motion.div
                  key={feature.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.4, delay: 0.1 * index }}
                  className="space-y-3"
                >
                  <div className="flex justify-between items-center">
                    <label className="text-gray-700">{feature.label}</label>
                    <span className="text-gray-900 bg-gray-100 px-4 py-1 rounded-full">
                      {values[feature.id]}{feature.unit}
                    </span>
                  </div>
                  <Slider
                    value={[values[feature.id]]}
                    onValueChange={(val) => handleValueChange(feature.id, val)}
                    min={feature.min}
                    max={feature.max}
                    step={feature.step}
                    className="w-full"
                  />
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: 0.5 }}
              className="mt-12 flex flex-col sm:flex-row gap-4"
            >
              <button className="flex-1 flex items-center justify-center bg-gradient-to-r from-red-600 to-orange-600 text-white py-4 rounded-xl hover:opacity-90 transition-opacity">
                Get Price Estimate
              </button>
              <button className="flex-1 flex items-center justify-center bg-white border-2 border-gray-200 text-gray-900 py-4 rounded-xl hover:bg-gray-50 transition-colors">
                Reset Values
              </button>
            </motion.div>
          </Card>
        </motion.div>

        {/* Estimated Price Display */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Card className="bg-gradient-to-br from-red-600 to-orange-600 border-0 shadow-2xl p-8">
            <p className="text-white/80 mb-2">Estimated Value</p>
            <p className="text-white">
              Click "Get Price Estimate" to see your results
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
