'use client';

import { useState, useEffect } from 'react';
import { Settings, Check, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { getBreakfastTime, saveBreakfastTime, formatBreakfastTime } from '@/lib/time-utils';

interface BreakfastSettingsProps {
  onTimeChange?: (hour: number, minute: number) => void;
}

export function BreakfastSettings({ onTimeChange }: BreakfastSettingsProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [tempHour, setTempHour] = useState(6);
  const [tempMinute, setTempMinute] = useState(0);
  const [currentTime, setCurrentTime] = useState({ hour: 6, minute: 0 });

  useEffect(() => {
    const saved = getBreakfastTime();
    setCurrentTime(saved);
    setTempHour(saved.hour);
    setTempMinute(saved.minute);
  }, []);

  const handleSave = () => {
    saveBreakfastTime(tempHour, tempMinute);
    setCurrentTime({ hour: tempHour, minute: tempMinute });
    onTimeChange?.(tempHour, tempMinute);
    setIsOpen(false);
  };

  const handleCancel = () => {
    setTempHour(currentTime.hour);
    setTempMinute(currentTime.minute);
    setIsOpen(false);
  };

  const handleOpen = () => {
    setTempHour(currentTime.hour);
    setTempMinute(currentTime.minute);
    setIsOpen(true);
  };

  return (
    <>
      {/* Settings Button */}
      <Button
        variant="ghost"
        size="icon"
        onClick={handleOpen}
        className={cn(
          "fixed top-6 right-6 z-40 h-12 w-12 rounded-full",
          "bg-white/80 backdrop-blur-sm dark:bg-black/70",
          "border border-gray-200/50 dark:border-gray-800/50",
          "hover:bg-white/90 dark:hover:bg-black/80",
          "transition-all duration-300 hover:scale-105",
          "shadow-lg hover:shadow-xl"
        )}
      >
        <Settings className="h-5 w-5" />
      </Button>

      {/* Settings Panel Modal */}
      {isOpen && (
        <div className="fixed inset-0 z-50">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={handleCancel}
          />
          
          {/* Modal Content */}
          <div className="relative z-51 flex min-h-full items-center justify-center p-4">
            <Card className="w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl border border-gray-200 dark:border-gray-800">
              <CardContent className="p-6">
                {/* Header */}
                <div className="text-center mb-6">
                  <div className="flex items-center justify-center w-12 h-12 mx-auto mb-4 rounded-full bg-gradient-to-r from-blue-500 to-purple-600">
                    <Clock className="h-6 w-6 text-white" />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-white">Breakfast Time</h2>
                  <p className="text-gray-600 dark:text-gray-400 mt-1">Set your ideal breakfast time</p>
                </div>

                {/* Current Time Display */}
                <div className="text-center p-4 mb-6 rounded-lg bg-gray-50 dark:bg-gray-800">
                  <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Current setting</p>
                  <p className="text-xl font-semibold text-gray-900 dark:text-white">
                    {formatBreakfastTime(currentTime.hour, currentTime.minute)}
                  </p>
                </div>

                {/* Time Pickers */}
                <div className="space-y-4 mb-6">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Hour Picker */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Hour
                      </label>
                      <select
                        value={tempHour}
                        onChange={(e) => setTempHour(parseInt(e.target.value))}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {Array.from({ length: 24 }, (_, i) => (
                          <option key={i} value={i}>
                            {i === 0 ? '12 AM' : i <= 11 ? `${i} AM` : i === 12 ? '12 PM' : `${i - 12} PM`}
                          </option>
                        ))}
                      </select>
                    </div>

                    {/* Minute Picker */}
                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Minute
                      </label>
                      <select
                        value={tempMinute}
                        onChange={(e) => setTempMinute(parseInt(e.target.value))}
                        className="w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        {Array.from({ length: 60 }, (_, i) => (
                          <option key={i} value={i}>
                            {i.toString().padStart(2, '0')}
                          </option>
                        ))}
                      </select>
                    </div>
                  </div>

                  {/* Preview */}
                  <div className="text-center p-3 rounded-lg bg-blue-50 dark:bg-blue-900/30">
                    <p className="text-sm text-blue-600 dark:text-blue-400 mb-1">Preview</p>
                    <p className="text-lg font-semibold text-blue-700 dark:text-blue-300">
                      {formatBreakfastTime(tempHour, tempMinute)}
                    </p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    className="flex-1 h-11"
                  >
                    <X className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                  <Button
                    onClick={handleSave}
                    className="flex-1 h-11 bg-gradient-to-r from-blue-500 to-purple-600 hover:from-blue-600 hover:to-purple-700 text-white border-0"
                  >
                    <Check className="h-4 w-4 mr-2" />
                    Save
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      )}
    </>
  );
}
