'use client';

import { useState, useEffect } from 'react';
import { CountdownTimer } from '@/components/CountdownTimer';
import { BreakfastSettings } from '@/components/BreakfastSettings';
import { EnhancedBackground } from '@/components/EnhancedBackground';
import { getBreakfastTime, formatBreakfastTime } from '@/lib/time-utils';

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [breakfastTime, setBreakfastTime] = useState({ hour: 6, minute: 0 });
  const [timeData, setTimeData] = useState<any>(null);

  // Only show the timer after hydration to prevent SSR/CSR mismatch
  useEffect(() => {
    setMounted(true);
    const savedTime = getBreakfastTime();
    setBreakfastTime(savedTime);
  }, []);

  const handleTimeChange = (hour: number, minute: number) => {
    setBreakfastTime({ hour, minute });
  };

  const handleTimeUpdate = (data: any) => {
    setTimeData(data);
  };

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-950">
        <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <main className="min-h-screen relative overflow-hidden">
      {/* Enhanced Background */}
      <EnhancedBackground />
      
      {/* Base gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-gray-50/80 via-blue-50/40 to-purple-50/60 dark:from-gray-900/90 dark:via-gray-900/80 dark:to-gray-950/90" />
      
      {/* Settings Component */}
      <BreakfastSettings onTimeChange={handleTimeChange} />
      
      {/* Main Content */}
      <div className="relative z-10 min-h-screen flex flex-col items-center justify-center p-6">
        <div className="flex flex-col items-center justify-center space-y-8 w-full max-w-4xl">
          
          {/* Header Section */}
          <div className="text-center space-y-4 mb-8">
            <h1 className="text-4xl md:text-6xl font-black bg-gradient-to-r from-gray-900 via-blue-800 to-purple-800 dark:from-gray-100 dark:via-blue-200 dark:to-purple-200 bg-clip-text text-transparent leading-tight">
              Time to Cook
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 font-medium max-w-lg mx-auto">
              Your elegant countdown to the next delicious meal
            </p>
          </div>
          
          {/* Countdown Timer */}
          <CountdownTimer 
            breakfastHour={breakfastTime.hour}
            breakfastMinute={breakfastTime.minute}
            onTimeUpdate={handleTimeUpdate}
          />
          
          {/* Footer Info */}
          <div className="text-center space-y-4 mt-12">
            {timeData && timeData.nextBreakfastTime && (
              <div className="bg-white/50 dark:bg-black/30 backdrop-blur-sm rounded-2xl px-6 py-4 border border-gray-200/30 dark:border-gray-800/30">
                <p className="text-sm text-gray-500 dark:text-gray-400 font-medium mb-1">
                  Next breakfast scheduled for
                </p>
                <p className="text-lg font-semibold text-gray-700 dark:text-gray-200">
                  {timeData.nextBreakfastTime.toLocaleDateString('en-US', { 
                    weekday: 'long', 
                    month: 'long', 
                    day: 'numeric' 
                  })} at {formatBreakfastTime(breakfastTime.hour, breakfastTime.minute)}
                </p>
              </div>
            )}
            
            <p className="text-xs text-gray-400 dark:text-gray-500 font-medium">
              Click the settings icon to customize your breakfast time
            </p>
          </div>
        </div>
      </div>
      
      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-gray-300 dark:via-gray-700 to-transparent" />
    </main>
  );
}