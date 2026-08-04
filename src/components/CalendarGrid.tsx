import { ChevronLeft, ChevronRight, Video } from 'lucide-react';
import type { TimelineEvent } from '../data/timelineData';
import { getGoogleColor } from '../utils/getGoogleColor';
import { getEventsByDay, monthNames, dayNames } from '../utils/calendarUtils';
interface CalendarGridProps {
  currentDate: Date;
  events: TimelineEvent[];
  usingFallback: boolean;
  onPrevMonth: () => void;
  onNextMonth: () => void;
  onDayClick?: (date: Date) => void;
}

export default function CalendarGrid({ 
  currentDate, 
  events, 
  usingFallback, 
  onPrevMonth, 
  onNextMonth,
  onDayClick
}: CalendarGridProps) {
  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const firstDayOfMonth = new Date(year, month, 1).getDay();
  const startOffset = firstDayOfMonth === 0 ? 6 : firstDayOfMonth - 1;
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  return (
    <>
      <div className="flex items-center justify-between mb-4 shrink-0 bg-workspace-sidebar border border-workspace-border rounded-xl p-3">
        <button onClick={onPrevMonth} className="p-1.5 hover:bg-workspace-chipHover rounded-lg text-workspace-textSecondary hover:text-white transition-colors">
          <ChevronLeft className="w-5 h-5" />
        </button>
        <h2 className="text-lg font-bold text-white tracking-widest uppercase">
          {monthNames[month]} {year}
        </h2>
        <button onClick={onNextMonth} className="p-1.5 hover:bg-workspace-chipHover rounded-lg text-workspace-textSecondary hover:text-white transition-colors">
          <ChevronRight className="w-5 h-5" />
        </button>
      </div>

      <div className="flex-1 overflow-x-auto bg-workspace-sidebar border border-workspace-border rounded-xl">
        <div className="min-w-[700px] h-full flex flex-col min-h-0">
          <div className="grid grid-cols-7 border-b border-workspace-border bg-black/40 shrink-0">
            {dayNames.map(day => (
              <div key={day} className="py-2.5 text-center text-[10px] font-bold uppercase tracking-wider text-workspace-textSecondary">
                {day}
              </div>
            ))}
          </div>

          <div className="flex-1 grid grid-cols-7 grid-rows-[repeat(auto-fit,minmax(100px,1fr))] auto-rows-[minmax(100px,1fr)] overflow-y-auto">
            {Array.from({ length: startOffset }).map((_, i) => (
              <div key={`empty-${i}`} className="border-r border-b border-workspace-border/50 bg-workspace-sidebar/30"></div>
            ))}

            {Array.from({ length: daysInMonth }).map((_, i) => {
              const day = i + 1;
              const dayEvents = getEventsByDay(events, usingFallback, year, month, day);
              const isToday = day === new Date().getDate() && month === new Date().getMonth() && year === new Date().getFullYear();

              const colIndex = (startOffset + i) % 7 + 1;
              const isMonday = colIndex === 1;
              const isSunday = colIndex === 7;
              const currentCellDate = new Date(year, month, day);

              return (
                <div 
                  key={day} 
                  onClick={() => onDayClick && onDayClick(currentCellDate)}
                  className={`border-r border-b border-workspace-border/50 transition-colors hover:bg-workspace-chipBg/30 flex flex-col min-h-0 overflow-y-auto overflow-x-hidden custom-scrollbar relative group ${onDayClick ? 'cursor-pointer' : ''} ${isToday ? 'bg-workspace-accent/5' : ''}`}
                >
                  <div className="sticky top-0 bg-transparent p-1.5 sm:p-2 pb-0 z-20 pointer-events-none flex justify-between items-start">
                    <div className={`text-xs font-bold w-6 h-6 shrink-0 flex items-center justify-center rounded-full mb-1 ${isToday ? 'bg-workspace-accent text-white' : 'text-workspace-textSecondary bg-workspace-sidebar/80 backdrop-blur-sm'}`}>
                      {day}
                    </div>
                  </div>

                  {onDayClick && (
                    <div className="absolute top-1.5 right-1.5 opacity-0 group-hover:opacity-100 transition-opacity z-30 pointer-events-none">
                      <div className="text-[9px] font-bold uppercase tracking-widest text-white bg-workspace-accent px-1.5 py-0.5 rounded shadow-lg flex items-center gap-1">
                        <Video className="w-2 h-2" /> Book
                      </div>
                    </div>
                  )}
                  
                  <div className="flex flex-col space-y-1 mt-1 pb-2">
                    {dayEvents.map(event => {
                      const eventStart = new Date(event.date);
                      const startDay = new Date(eventStart.getFullYear(), eventStart.getMonth(), eventStart.getDate());
                      let endDay = startDay;
                      
                      if (event.endDate) {
                        const eventEnd = new Date(event.endDate);
                        endDay = new Date(eventEnd.getFullYear(), eventEnd.getMonth(), eventEnd.getDate());
                        if (eventEnd.getHours() === 0 && eventEnd.getMinutes() === 0) {
                          endDay = new Date(endDay.getTime() - 1);
                        }
                      }
                      
                      const cellDate = new Date(year, month, day);
                      const isStart = cellDate.getTime() === startDay.getTime();
                      const isEnd = cellDate.getTime() === endDay.getTime();
                      const isMultiDay = startDay.getTime() !== endDay.getTime();
                      
                      let shapeClasses = "rounded border";
                      let marginClasses = "mx-1.5 sm:mx-2";
                      
                      if (isMultiDay) {
                        const isVisualStart = isStart || isMonday;
                        const isVisualEnd = isEnd || isSunday;

                        if (isVisualStart && !isVisualEnd) {
                           shapeClasses = "rounded-l border border-r-0";
                           marginClasses = "ml-1.5 sm:ml-2 mr-0 z-10"; 
                        } else if (isVisualEnd && !isVisualStart) {
                           shapeClasses = "rounded-r border border-l-0";
                           marginClasses = "mr-1.5 sm:mr-2 ml-0 z-10";
                        } else if (!isVisualStart && !isVisualEnd) {
                           shapeClasses = "border-y border-x-0";
                           marginClasses = "mx-0 z-0";
                        }
                      }

                      let isTextRendererDay = isStart || !isMultiDay;
                      if (isMultiDay) {
                        const mondayDate = new Date(year, month, day - colIndex + 1);
                        const sundayDate = new Date(year, month, day - colIndex + 7);
                        
                        const segmentStart = startDay > mondayDate ? startDay : mondayDate;
                        const segmentEnd = endDay < sundayDate ? endDay : sundayDate;
                        
                        const diffTime = Math.abs(segmentEnd.getTime() - segmentStart.getTime());
                        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
                        const middleOffset = Math.floor(diffDays / 2);
                        
                        const middleDate = new Date(segmentStart.getFullYear(), segmentStart.getMonth(), segmentStart.getDate() + middleOffset);
                        
                        isTextRendererDay = cellDate.getTime() === middleDate.getTime();
                      }

                      const colorClasses = getGoogleColor(event.googleColorId);

                      return (
                        <div 
                          key={event.id} 
                          className={`text-[10px] p-1 ${marginClasses} ${shapeClasses} leading-tight truncate cursor-default relative hover:opacity-90 hover:z-20 ${colorClasses}`}
                          title={event.title}
                        >
                          {isTextRendererDay ? event.title : '\u00A0'}
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
