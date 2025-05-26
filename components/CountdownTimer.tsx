'use client';

import { useState, useEffect } from 'react';
import { getTimeUntilBreakfast, getBreakfastTime, formatBreakfastTime } from '@/lib/time-utils';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';

interface CountdownTimerProps {
  breakfastHour?: number;
  breakfastMinute?: number;
  onTimeUpdate?: (data: any) => void;
}

export function CountdownTimer({ breakfastHour, breakfastMinute, onTimeUpdate }: CountdownTimerProps) {
  const [timeData, setTimeData] = useState(() => {
    const savedTime = typeof window !== 'undefined' ? getBreakfastTime() : { hour: 6, minute: 0 };
    return getTimeUntilBreakfast(
      breakfastHour ?? savedTime.hour, 
      breakfastMinute ?? savedTime.minute
    );
  });
  const [isVisible, setIsVisible] = useState(true);
  const [currentBreakfastTime, setCurrentBreakfastTime] = useState({ hour: 6, minute: 0 });

  useEffect(() => {
    // Load current breakfast time
    const savedTime = getBreakfastTime();
    setCurrentBreakfastTime(savedTime);
  }, []);

  useEffect(() => {
    // Update time every second
    const timer = setInterval(() => {
      const hour = breakfastHour ?? currentBreakfastTime.hour;
      const minute = breakfastMinute ?? currentBreakfastTime.minute;
      const newTimeData = getTimeUntilBreakfast(hour, minute);
      setTimeData(newTimeData);
      onTimeUpdate?.(newTimeData);
    }, 1000);

    // Subtle pulsing animation effect
    const pulseTimer = setInterval(() => {
      setIsVisible(prev => !prev);
    }, 3000);

    return () => {
      clearInterval(timer);
      clearInterval(pulseTimer);
    };
  }, [breakfastHour, breakfastMinute, currentBreakfastTime, onTimeUpdate]);

  // Update when external props change
  useEffect(() => {
    if (breakfastHour !== undefined || breakfastMinute !== undefined) {
      const hour = breakfastHour ?? currentBreakfastTime.hour;
      const minute = breakfastMinute ?? currentBreakfastTime.minute;
      const newTimeData = getTimeUntilBreakfast(hour, minute);
      setTimeData(newTimeData);
      setCurrentBreakfastTime({ hour, minute });
    }
  }, [breakfastHour, breakfastMinute, currentBreakfastTime.hour, currentBreakfastTime.minute]);

  return (
    <div className="w-full max-w-2xl space-y-6">
      {/* Main Countdown Card */}
      <Card className={cn(
        "relative overflow-hidden transition-all duration-500",
        "bg-white/70 backdrop-blur-xl dark:bg-black/60",
        "border border-gray-200/30 dark:border-gray-800/30",
        "shadow-2xl hover:shadow-3xl",
        "hover:bg-white/80 dark:hover:bg-black/70"
      )}>
        {/* Animated gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-blue-50/50 via-purple-50/30 to-pink-50/50 dark:from-blue-950/20 dark:via-purple-950/10 dark:to-pink-950/20 animate-gradient-shift" />
        
        <CardContent className="relative pt-12 pb-10 px-8 md:px-16">
          <div className="flex flex-col items-center justify-center space-y-6">
            
            {/* Main Time Display */}
            <div className={cn(
              "text-center transition-all duration-1000 ease-out",
              isVisible ? "opacity-100 scale-100" : "opacity-90 scale-[0.98]"
            )}>
              <div className="text-5xl md:text-7xl lg:text-8xl font-black leading-none tracking-tight bg-gradient-to-br from-gray-900 via-gray-700 to-gray-800 dark:from-gray-100 dark:via-gray-300 dark:to-gray-200 bg-clip-text text-transparent">
                {timeData.rounded.text}
              </div>
            </div>
            
            {/* Precise Time */}
            <div className="flex items-center space-x-2 text-lg md:text-xl font-mono font-semibold text-gray-600 dark:text-gray-400">
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 animate-pulse" />
              <span>{timeData.exact.formatted}</span>
              <div className="w-2 h-2 rounded-full bg-gradient-to-r from-purple-500 to-pink-600 animate-pulse" style={{ animationDelay: '0.5s' }} />
            </div>

            {/* Progress Bar */}
            <div className="w-full max-w-md">
              <div className="h-2 bg-gray-200 dark:bg-gray-800 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 transition-all duration-1000 ease-out"
                  style={{ 
                    width: `${Math.max(0, Math.min(100, (1 - timeData.totalSeconds / (24 * 3600)) * 100))}%`,
                    animation: 'shimmer 2s infinite'
                  }}
                />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Breakfast Time Info */}
      <div className="text-center space-y-2">
        <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">
          Time until breakfast at
        </p>
        <p className="text-lg font-semibold text-gray-700 dark:text-gray-300">
          {formatBreakfastTime(currentBreakfastTime.hour, currentBreakfastTime.minute)}
        </p>
      </div>
    </div>
  );
}

// Add custom CSS animations in globals.css later
// @keyframes gradient-shift {
//   0%, 100% { background-position: 0% 50%; }
//   50% { background-position: 100% 50%; }
// }

// @keyframes shimmer {
//   0% { background-position: -200px 0; }
//   100% { background-position: calc(200px + 100%) 0; }
// }