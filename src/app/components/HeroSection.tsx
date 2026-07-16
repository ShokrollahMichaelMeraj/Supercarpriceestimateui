import { motion } from 'motion/react';

export function HeroSection() {
  const word1 = "PREDICT";
  const word2 = "PERFORMANCE";
  const subtitle = "Powered by Machine Learning";

  return (
    <div className="relative h-screen flex items-center justify-center overflow-hidden">
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        {/* Main Title - Letter by Letter Animation */}
        <div className="mb-4 sm:mb-6">
          {/* First Word */}
          <div className="flex justify-center items-center mb-2 sm:mb-3">
            {word1.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: index * 0.08,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
                className="inline-block text-gray-900"
                style={{
                  fontSize: 'clamp(1.75rem, 6.5vw, 6rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
          {/* Second Word */}
          <div className="flex justify-center items-center">
            {word2.split('').map((char, index) => (
              <motion.span
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{
                  duration: 0.5,
                  delay: (word1.length + 1 + index) * 0.08,
                  ease: [0.43, 0.13, 0.23, 0.96]
                }}
                className="inline-block text-gray-900"
                style={{
                  fontSize: 'clamp(1.75rem, 6.5vw, 6rem)',
                  fontWeight: 900,
                  letterSpacing: '-0.02em',
                  textShadow: '2px 2px 4px rgba(0,0,0,0.1)'
                }}
              >
                {char}
              </motion.span>
            ))}
          </div>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            delay: (word1.length + word2.length + 1) * 0.08 + 0.2,
            ease: 'easeOut'
          }}
          className="text-gray-600 max-w-2xl mx-auto px-2"
          style={{ fontSize: 'clamp(0.875rem, 2vw, 1.5rem)' }}
        >
          {subtitle}
        </motion.p>

        {/* Racing Line Accent */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{
            duration: 1,
            delay: (word1.length + word2.length + 1) * 0.08 + 0.5,
            ease: 'easeInOut'
          }}
          className="mx-auto mt-6 sm:mt-8 h-1 bg-gradient-to-r from-red-600 to-orange-600 rounded-full"
          style={{ width: 'min(200px, 60vw)', transformOrigin: 'center' }}
        />

        {/* CTA Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.6,
            delay: (word1.length + word2.length + 1) * 0.08 + 0.8,
            ease: 'easeOut'
          }}
          className="mt-8 sm:mt-12 px-6 sm:px-8 py-3 sm:py-4 text-sm sm:text-base bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-xl hover:opacity-90 transition-opacity shadow-lg"
        >
          Predict Your 0-60 Time
        </motion.button>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.6,
          delay: (word1.length + word2.length + 1) * 0.08 + 1.2,
          ease: 'easeOut'
        }}
        className="absolute bottom-8 sm:bottom-12 left-1/2 transform -translate-x-1/2 hidden sm:block"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{
            duration: 1.5,
            repeat: Infinity,
            ease: 'easeInOut'
          }}
          className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center pt-2"
        >
          <div className="w-1 h-2 bg-gray-400 rounded-full" />
        </motion.div>
      </motion.div>
    </div>
  );
}