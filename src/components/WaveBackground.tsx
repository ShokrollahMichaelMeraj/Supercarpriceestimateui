import { motion } from 'motion/react';

export function WaveBackground() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAF8] via-[#F5F1E8] to-[#EDE7D9]" />
      
      {/* Animated waves */}
      <svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
      >
        <defs>
          <linearGradient id="wave-gradient-1" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(204, 0, 0, 0.03)" />
            <stop offset="100%" stopColor="rgba(255, 107, 53, 0.03)" />
          </linearGradient>
          <linearGradient id="wave-gradient-2" x1="100%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 107, 53, 0.04)" />
            <stop offset="100%" stopColor="rgba(204, 0, 0, 0.04)" />
          </linearGradient>
          <linearGradient id="wave-gradient-3" x1="50%" y1="0%" x2="50%" y2="100%">
            <stop offset="0%" stopColor="rgba(255, 68, 68, 0.02)" />
            <stop offset="100%" stopColor="rgba(255, 150, 50, 0.02)" />
          </linearGradient>
        </defs>
        
        {/* Wave 1 - Bottom */}
        <motion.path
          d="M0,400 C320,300 420,500 720,400 C1020,300 1120,500 1440,400 L1440,800 L0,800 Z"
          fill="url(#wave-gradient-1)"
          initial={{ d: "M0,400 C320,300 420,500 720,400 C1020,300 1120,500 1440,400 L1440,800 L0,800 Z" }}
          animate={{
            d: [
              "M0,400 C320,300 420,500 720,400 C1020,300 1120,500 1440,400 L1440,800 L0,800 Z",
              "M0,450 C320,350 420,550 720,450 C1020,350 1120,550 1440,450 L1440,800 L0,800 Z",
              "M0,400 C320,300 420,500 720,400 C1020,300 1120,500 1440,400 L1440,800 L0,800 Z"
            ]
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        {/* Wave 2 - Middle */}
        <motion.path
          d="M0,300 C360,200 480,400 840,300 C1200,200 1320,400 1440,300 L1440,800 L0,800 Z"
          fill="url(#wave-gradient-2)"
          initial={{ d: "M0,300 C360,200 480,400 840,300 C1200,200 1320,400 1440,300 L1440,800 L0,800 Z" }}
          animate={{
            d: [
              "M0,300 C360,200 480,400 840,300 C1200,200 1320,400 1440,300 L1440,800 L0,800 Z",
              "M0,250 C360,350 480,250 840,350 C1200,250 1320,350 1440,250 L1440,800 L0,800 Z",
              "M0,300 C360,200 480,400 840,300 C1200,200 1320,400 1440,300 L1440,800 L0,800 Z"
            ]
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        {/* Wave 3 - Top */}
        <motion.path
          d="M0,200 C240,280 480,120 720,200 C960,280 1200,120 1440,200 L1440,800 L0,800 Z"
          fill="url(#wave-gradient-3)"
          initial={{ d: "M0,200 C240,280 480,120 720,200 C960,280 1200,120 1440,200 L1440,800 L0,800 Z" }}
          animate={{
            d: [
              "M0,200 C240,280 480,120 720,200 C960,280 1200,120 1440,200 L1440,800 L0,800 Z",
              "M0,180 C240,100 480,260 720,180 C960,100 1200,260 1440,180 L1440,800 L0,800 Z",
              "M0,200 C240,280 480,120 720,200 C960,280 1200,120 1440,200 L1440,800 L0,800 Z"
            ]
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 2
          }}
        />

        {/* Floating orbs for extra depth */}
        <motion.circle
          cx="200"
          cy="150"
          r="80"
          fill="rgba(255, 68, 68, 0.015)"
          initial={{ cx: 200, cy: 150 }}
          animate={{
            cx: [200, 250, 200],
            cy: [150, 120, 150]
          }}
          transition={{
            duration: 18,
            repeat: Infinity,
            ease: "easeInOut"
          }}
        />
        
        <motion.circle
          cx="1200"
          cy="250"
          r="120"
          fill="rgba(255, 107, 53, 0.02)"
          initial={{ cx: 1200, cy: 250 }}
          animate={{
            cx: [1200, 1150, 1200],
            cy: [250, 300, 250]
          }}
          transition={{
            duration: 22,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
        />
        
        <motion.circle
          cx="700"
          cy="100"
          r="60"
          fill="rgba(204, 0, 0, 0.01)"
          initial={{ cx: 700, cy: 100 }}
          animate={{
            cx: [700, 750, 700],
            cy: [100, 150, 100]
          }}
          transition={{
            duration: 16,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 3
          }}
        />
      </svg>
      
      {/* Subtle noise texture overlay */}
      <div 
        className="absolute inset-0 opacity-[0.015]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
