import { useState, useEffect } from 'react';
import { motion, useTransform, useMotionValue } from 'motion/react';

export function WaveBackground() {
  const [scrollY, setScrollY] = useState(0);
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY);
    };

    const handleMouseMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Calculate wave offsets based on scroll and mouse
  const wave1Offset = scrollY * 0.3;
  const wave2Offset = scrollY * 0.2;
  const wave3Offset = scrollY * 0.15;

  return (
    <div className="fixed inset-0 -z-10 overflow-hidden">
      {/* Base gradient */}
      <div className="absolute inset-0 bg-gradient-to-br from-[#FAFAF8] via-[#F5F1E8] to-[#EDE7D9]" />
      
      {/* Wave outline patterns */}
      <motion.svg
        className="absolute inset-0 w-full h-full"
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        viewBox="0 0 1440 800"
        style={{
          x: useTransform(mouseX, [0, window.innerWidth], [-10, 10]),
          y: useTransform(mouseY, [0, window.innerHeight], [-10, 10]),
        }}
      >
        <defs>
          <linearGradient id="stroke-gradient-1" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(204, 0, 0, 0.3)" />
            <stop offset="50%" stopColor="rgba(255, 107, 53, 0.4)" />
            <stop offset="100%" stopColor="rgba(204, 0, 0, 0.3)" />
          </linearGradient>
          <linearGradient id="stroke-gradient-2" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 107, 53, 0.25)" />
            <stop offset="50%" stopColor="rgba(255, 68, 68, 0.35)" />
            <stop offset="100%" stopColor="rgba(255, 107, 53, 0.25)" />
          </linearGradient>
          <linearGradient id="stroke-gradient-3" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="rgba(255, 150, 50, 0.2)" />
            <stop offset="50%" stopColor="rgba(204, 0, 0, 0.3)" />
            <stop offset="100%" stopColor="rgba(255, 150, 50, 0.2)" />
          </linearGradient>
        </defs>
        
        {/* Wave 1 - Smooth curves */}
        <motion.path
          d={`M0,${400 + Math.sin(wave1Offset * 0.01) * 30} 
              Q180,${350 + Math.sin(wave1Offset * 0.01 + 1) * 25} 360,${400 + Math.sin(wave1Offset * 0.01 + 2) * 30}
              T720,${400 + Math.sin(wave1Offset * 0.01 + 4) * 30}
              T1080,${400 + Math.sin(wave1Offset * 0.01 + 6) * 30}
              T1440,${400 + Math.sin(wave1Offset * 0.01 + 8) * 30}`}
          stroke="url(#stroke-gradient-1)"
          strokeWidth="2"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Wave 2 - Middle layer */}
        <motion.path
          d={`M0,${300 + Math.sin(wave2Offset * 0.012 + 1) * 40}
              Q200,${250 + Math.sin(wave2Offset * 0.012 + 2) * 35} 400,${300 + Math.sin(wave2Offset * 0.012 + 3) * 40}
              T800,${300 + Math.sin(wave2Offset * 0.012 + 5) * 40}
              T1200,${300 + Math.sin(wave2Offset * 0.012 + 7) * 40}
              T1440,${300 + Math.sin(wave2Offset * 0.012 + 8) * 40}`}
          stroke="url(#stroke-gradient-2)"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Wave 3 - Top layer */}
        <motion.path
          d={`M0,${200 + Math.sin(wave3Offset * 0.008) * 35}
              Q240,${150 + Math.sin(wave3Offset * 0.008 + 1.5) * 30} 480,${200 + Math.sin(wave3Offset * 0.008 + 3) * 35}
              T960,${200 + Math.sin(wave3Offset * 0.008 + 6) * 35}
              T1440,${200 + Math.sin(wave3Offset * 0.008 + 9) * 35}`}
          stroke="url(#stroke-gradient-3)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
        />
        
        {/* Additional flowing wave layers */}
        <motion.path
          d={`M0,${500 + Math.sin(wave1Offset * 0.015) * 20}
              Q300,${480 + Math.sin(wave1Offset * 0.015 + 2) * 25} 600,${500 + Math.sin(wave1Offset * 0.015 + 4) * 20}
              T1200,${500 + Math.sin(wave1Offset * 0.015 + 6) * 20}
              T1440,${500 + Math.sin(wave1Offset * 0.015 + 7) * 20}`}
          stroke="rgba(255, 68, 68, 0.15)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="10 15"
        />
        
        <motion.path
          d={`M0,${150 + Math.sin(wave2Offset * 0.01 + 3) * 25}
              Q360,${120 + Math.sin(wave2Offset * 0.01 + 4) * 20} 720,${150 + Math.sin(wave2Offset * 0.01 + 6) * 25}
              T1440,${150 + Math.sin(wave2Offset * 0.01 + 9) * 25}`}
          stroke="rgba(255, 107, 53, 0.2)"
          strokeWidth="1"
          fill="none"
          strokeLinecap="round"
          strokeDasharray="5 10"
        />

        {/* Floating circles that react to mouse */}
        <motion.circle
          cx={200}
          cy={150}
          r="40"
          stroke="rgba(255, 68, 68, 0.2)"
          strokeWidth="1.5"
          fill="none"
          style={{
            x: useTransform(mouseX, [0, window.innerWidth], [-15, 15]),
            y: useTransform(mouseY, [0, window.innerHeight], [-15, 15]),
          }}
        />
        
        <motion.circle
          cx={1200}
          cy={250}
          r="60"
          stroke="rgba(255, 107, 53, 0.25)"
          strokeWidth="2"
          fill="none"
          style={{
            x: useTransform(mouseX, [0, window.innerWidth], [10, -10]),
            y: useTransform(mouseY, [0, window.innerHeight], [10, -10]),
          }}
        />
        
        <motion.circle
          cx={700}
          cy={450}
          r="30"
          stroke="rgba(204, 0, 0, 0.15)"
          strokeWidth="1"
          fill="none"
          strokeDasharray="5 5"
          style={{
            x: useTransform(mouseX, [0, window.innerWidth], [-8, 8]),
            y: useTransform(mouseY, [0, window.innerHeight], [12, -12]),
          }}
        />

        {/* Curved lines */}
        <motion.path
          d="M100,600 Q400,550 700,600"
          stroke="rgba(255, 150, 50, 0.18)"
          strokeWidth="1.5"
          fill="none"
          strokeLinecap="round"
          style={{
            x: useTransform(mouseX, [0, window.innerWidth], [-5, 5]),
          }}
        />
      </motion.svg>
      
      {/* Subtle grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.02]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 400 400' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' /%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)' /%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
}
