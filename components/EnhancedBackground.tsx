'use client';

import { useEffect, useState } from 'react';

export function EnhancedBackground() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [time, setTime] = useState(0);

  useEffect(() => {
    const handleMouseMove = (event: MouseEvent) => {
      setMousePosition({ 
        x: event.clientX / window.innerWidth, 
        y: event.clientY / window.innerHeight 
      });
    };

    const timeInterval = setInterval(() => {
      setTime(prev => prev + 0.01);
    }, 50);
    
    window.addEventListener('mousemove', handleMouseMove);
    
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      clearInterval(timeInterval);
    };
  }, []);

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Animated gradient background */}
      <div 
        className="absolute inset-0 opacity-60 transition-all duration-1000"
        style={{
          background: `
            radial-gradient(circle at ${50 + mousePosition.x * 20}% ${50 + mousePosition.y * 20}%, 
              rgba(59, 130, 246, 0.08) 0%, 
              rgba(147, 51, 234, 0.06) 35%, 
              rgba(236, 72, 153, 0.04) 70%, 
              transparent 100%
            ),
            linear-gradient(
              ${135 + Math.sin(time) * 30}deg, 
              rgba(59, 130, 246, 0.03) 0%, 
              rgba(147, 51, 234, 0.05) 25%, 
              rgba(236, 72, 153, 0.03) 50%, 
              rgba(59, 130, 246, 0.04) 75%, 
              transparent 100%
            )
          `
        }}
      />

      {/* Floating orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full bg-gradient-to-r from-blue-400/10 to-purple-600/10 blur-3xl animate-float" />
      <div className="absolute top-3/4 right-1/4 w-80 h-80 rounded-full bg-gradient-to-r from-purple-400/8 to-pink-600/8 blur-3xl animate-float" style={{ animationDelay: '2s' }} />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 rounded-full bg-gradient-to-r from-pink-400/6 to-blue-600/6 blur-3xl animate-float" style={{ animationDelay: '4s' }} />

      {/* Dynamic mesh gradient */}
      <div 
        className="absolute inset-0 opacity-30"
        style={{
          background: `
            radial-gradient(
              ellipse ${400 + mousePosition.x * 200}px ${300 + mousePosition.y * 150}px at ${mousePosition.x * 100}% ${mousePosition.y * 100}%, 
              rgba(59, 130, 246, 0.1) 0%, 
              transparent 50%
            )
          `
        }}
      />

      {/* Subtle grain texture */}
      <div 
        className="absolute inset-0 opacity-[0.015] mix-blend-overlay"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 256 256' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='noiseFilter'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23noiseFilter)'/%3E%3C/svg%3E")`,
        }}
      />
    </div>
  );
} 