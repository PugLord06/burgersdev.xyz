import type { TimelineEvent } from '../data/timelineData';

export const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
export const dayNames = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

function parseFallbackDate(dateStr: string): { year: number; month: number } | null {
  const yearMatch = dateStr.match(/\b\d{4}\b/);
  if (!yearMatch) return null;
  
  const eventYear = parseInt(yearMatch[0], 10);
  let eventMonth = 0;
  
  const lower = dateStr.toLowerCase();
  if (lower.includes('late')) {
    eventMonth = 10;
  } else if (lower.includes('mid')) {
    eventMonth = 5;
  } else if (lower.includes('early')) {
    eventMonth = 1;
  } else {
    const monthIndex = monthNames.findIndex(m => lower.includes(m.toLowerCase()));
    if (monthIndex !== -1) {
      eventMonth = monthIndex;
    }
  }
  
  return { year: eventYear, month: eventMonth };
}

export function getEventsByDay(events: TimelineEvent[], usingFallback: boolean, year: number, month: number, day: number) {
  return events.filter(e => {
    if (usingFallback && e.date.length <= 10) {
      const parsed = parseFallbackDate(e.date);
      if (parsed) {
        return parsed.year === year && parsed.month === month && day === 15;
      }
      return false;
    }

    const eventStart = new Date(e.date);
    const cellDate = new Date(year, month, day);
    
    const startDay = new Date(eventStart.getFullYear(), eventStart.getMonth(), eventStart.getDate());
    let endDay = startDay;
    
    if (e.endDate) {
      const eventEnd = new Date(e.endDate);
      endDay = new Date(eventEnd.getFullYear(), eventEnd.getMonth(), eventEnd.getDate());
      
      if (eventEnd.getHours() === 0 && eventEnd.getMinutes() === 0) {
         endDay = new Date(endDay.getTime() - 1);
      }
    }
    
    return cellDate >= startDay && cellDate <= endDay;
  });
}
