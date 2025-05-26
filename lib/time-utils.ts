/**
 * Calculates time until the next breakfast time
 * @param breakfastHour - Hour for breakfast (0-23), defaults to 6
 * @param breakfastMinute - Minute for breakfast (0-59), defaults to 0
 * @returns Time objects with various formats
 */
export function getTimeUntilBreakfast(breakfastHour: number = 6, breakfastMinute: number = 0) {
  const now = new Date();
  const nextBreakfast = new Date(now);
  
  // Set the breakfast time for today
  nextBreakfast.setHours(breakfastHour, breakfastMinute, 0, 0);
  
  // If breakfast time today has already passed, move to tomorrow
  if (nextBreakfast <= now) {
    nextBreakfast.setDate(nextBreakfast.getDate() + 1);
  }

  const diffMs = nextBreakfast.getTime() - now.getTime();
  const diffSeconds = Math.floor(diffMs / 1000);
  
  // Calculate hours, minutes, seconds
  const hours = Math.floor(diffSeconds / 3600);
  const minutes = Math.floor((diffSeconds % 3600) / 60);
  const seconds = diffSeconds % 60;
  
  // Round down to nearest half hour for display
  let roundedHours = hours;
  let roundedMinutes = 0;
  
  if (minutes >= 30) {
    roundedMinutes = 30;
  }
  
  // Format for display
  const formattedExact = `${String(hours).padStart(2, '0')}:${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  
  // Text representation for rounded time in Chinese
  let roundedText = '';
  if (roundedHours > 0) {
    roundedText += `${roundedHours}小时`;
  }
  
  if (roundedMinutes > 0) {
    if (roundedText.length > 0) roundedText += ' ';
    roundedText += `${roundedMinutes}分钟`;
  }
  
  if (roundedText === '') {
    roundedText = '不到30分钟';
  }
  
  return {
    exact: {
      hours,
      minutes,
      seconds,
      formatted: formattedExact
    },
    rounded: {
      hours: roundedHours,
      minutes: roundedMinutes,
      text: roundedText
    },
    totalSeconds: diffSeconds,
    nextBreakfastTime: nextBreakfast
  };
}

/**
 * Legacy function for backward compatibility
 */
export function getTimeUntil6AM() {
  return getTimeUntilBreakfast(6, 0);
}

/**
 * Format breakfast time for display in Chinese
 */
export function formatBreakfastTime(hour: number, minute: number = 0): string {
  const period = hour >= 12 ? '下午' : '上午';
  const displayHour = hour === 0 ? 12 : hour > 12 ? hour - 12 : hour;
  const displayMinute = minute.toString().padStart(2, '0');
  return `${period} ${displayHour}:${displayMinute}`;
}

/**
 * Get breakfast time from localStorage or default
 */
export function getBreakfastTime(): { hour: number; minute: number } {
  if (typeof window === 'undefined') {
    return { hour: 6, minute: 0 };
  }
  
  const saved = localStorage.getItem('breakfast-time');
  if (saved) {
    try {
      const parsed = JSON.parse(saved);
      return { 
        hour: Math.max(0, Math.min(23, parsed.hour || 6)), 
        minute: Math.max(0, Math.min(59, parsed.minute || 0)) 
      };
    } catch {
      return { hour: 6, minute: 0 };
    }
  }
  return { hour: 6, minute: 0 };
}

/**
 * Save breakfast time to localStorage
 */
export function saveBreakfastTime(hour: number, minute: number): void {
  if (typeof window === 'undefined') return;
  
  localStorage.setItem('breakfast-time', JSON.stringify({ hour, minute }));
}