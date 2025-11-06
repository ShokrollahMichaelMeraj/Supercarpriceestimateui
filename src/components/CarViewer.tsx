import { useState } from 'react';
import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';

export function CarViewer() {
  const [rotation, setRotation] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, rotation: 0 });

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.clientX, rotation });
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isDragging) return;
    const delta = e.clientX - dragStart.x;
    const rotationDelta = delta * 0.5;
    setRotation(dragStart.rotation + rotationDelta);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setIsDragging(true);
    setDragStart({ x: e.touches[0].clientX, rotation });
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isDragging) return;
    const delta = e.touches[0].clientX - dragStart.x;
    const rotationDelta = delta * 0.5;
    setRotation(dragStart.rotation + rotationDelta);
  };

  const handleTouchEnd = () => {
    setIsDragging(false);
  };

  return (
    <div
      className="relative w-full h-screen flex items-center justify-center cursor-grab active:cursor-grabbing"
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onMouseLeave={handleMouseUp}
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      <motion.div
        className="relative w-full max-w-4xl"
        style={{
          transform: `rotateY(${rotation}deg) scale(${1 + Math.sin(rotation * Math.PI / 180) * 0.05})`,
          transformStyle: 'preserve-3d',
        }}
        animate={{
          y: [0, -15, 0],
        }}
        transition={{
          y: {
            duration: 4,
            repeat: Infinity,
            ease: 'easeInOut',
          },
        }}
      >
        <div className="relative aspect-[16/9] w-full">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1724861227841-158aef2bc7bf?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxmZXJyYXJpJTIwZjQwJTIwc2lkZXxlbnwxfHx8fDE3NjIzMDgzNTF8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Ferrari F40"
            className="w-full h-full object-contain drop-shadow-2xl"
          />
        </div>

        {/* Light reflections */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent pointer-events-none" 
             style={{ transform: `translateX(${(rotation % 360) * 2}px)` }} />
      </motion.div>

      {/* Drag hint */}
      <div className="absolute top-12 left-1/2 -translate-x-1/2 text-center">
        <div className="text-sm text-gray-600 bg-white/80 backdrop-blur-sm px-4 py-2 rounded-full">
          Drag to rotate
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-12 left-1/2 -translate-x-1/2 text-center"
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <div className="text-sm text-gray-600 mb-2">
          Scroll for details
        </div>
        <div className="w-0.5 h-12 bg-gradient-to-b from-gray-400 to-transparent mx-auto" />
      </motion.div>
    </div>
  );
}
