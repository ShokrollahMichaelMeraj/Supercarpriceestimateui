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
  { id: 'engine', label: 'Engine Size', min: 2.0, max: 8.0, step: 0.01, unit: 'L', defaultValue: 4.0 },
  { id: 'horsepower', label: 'Horsepower', min: 200, max: 1000, step: 1, unit: ' HP', defaultValue: 500 },
];

export function FeatureSlider() {
  const [values, setValues] = useState<Record<string, number>>(
    features.reduce((acc, f) => ({ ...acc, [f.id]: f.defaultValue }), {})
  );

  const handleValueChange = (id: string, newValue: number[]) => {
    setValues(prev => ({ ...prev, [id]: newValue[0] }));
  };

  const handleInputChange = (id: string, inputValue: string) => {
    const feature = features.find(f => f.id === id);
    if (!feature) return;

    // Allow empty string for editing
    if (inputValue === '') {
      setValues(prev => ({ ...prev, [id]: feature.min }));
      return;
    }

    // Parse the input value
    const numValue = parseFloat(inputValue);
    
    // If valid number, clamp it between min and max
    if (!isNaN(numValue)) {
      const clampedValue = Math.max(feature.min, Math.min(feature.max, numValue));
      setValues(prev => ({ ...prev, [id]: clampedValue }));
    }
  };

  const handleInputBlur = (id: string) => {
    const feature = features.find(f => f.id === id);
    if (!feature) return;
    
    // Round to appropriate decimal places on blur
    const currentValue = values[id];
    if (id === 'engine') {
      setValues(prev => ({ ...prev, [id]: Math.round(currentValue * 10) / 10 }));
    } else {
      setValues(prev => ({ ...prev, [id]: Math.round(currentValue) }));
    }
  };

  const handleReset = () => {
    setValues(features.reduce((acc, f) => ({ ...acc, [f.id]: f.defaultValue }), {}));
  };

  return (
    <div className="py-12 sm:py-16 md:py-24 px-4 sm:px-6 lg:px-8 bg-white/50">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-12"
        >
          <h2 className="text-gray-900 mb-3 sm:mb-4 text-2xl sm:text-3xl md:text-4xl">
            Configure Your Supercar
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm sm:text-base">
            Adjust the sliders below to match your vehicle's specifications and get an instant AI-powered 0-60 time prediction.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <Card className="bg-white border-gray-200 shadow-xl p-4 sm:p-6 md:p-8 lg:p-12">
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
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 sm:gap-4">
                    <label className="text-gray-700 flex-shrink-0 text-sm sm:text-base">{feature.label}</label>
                    <input
                      type="number"
                      value={values[feature.id]}
                      onChange={(e) => handleInputChange(feature.id, e.target.value)}
                      onBlur={() => handleInputBlur(feature.id)}
                      min={feature.min}
                      max={feature.max}
                      step="any"
                      className="text-gray-900 bg-gray-100 px-3 sm:px-4 py-1 rounded-full text-center w-full sm:w-auto sm:min-w-[120px] border-2 border-transparent focus:border-red-500 focus:outline-none transition-colors text-sm sm:text-base [appearance:textfield] [&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none"
                    />
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
              <button className="flex-1 flex items-center justify-center bg-gradient-to-r from-red-600 to-orange-600 text-white py-3 sm:py-4 rounded-xl hover:opacity-90 transition-opacity text-sm sm:text-base">
                Predict 0-60 Time
              </button>
              <button 
                onClick={handleReset}
                className="flex-1 flex items-center justify-center bg-white border-2 border-gray-200 text-gray-900 py-3 sm:py-4 rounded-xl hover:bg-gray-50 transition-colors text-sm sm:text-base"
              >
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
          <Card className="bg-gradient-to-br from-red-600 to-orange-600 border-0 shadow-2xl p-6 sm:p-8">
            <p className="text-white/80 mb-2 text-sm sm:text-base">Predicted 0-60 Time</p>
            <p className="text-white text-sm sm:text-base">
              Click "Predict 0-60 Time" to see your results
            </p>
          </Card>
        </motion.div>
      </div>
    </div>
  );
}
