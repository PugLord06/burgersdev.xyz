import { useState, useEffect } from 'react';
import { Calendar as CalendarIcon, Video, Loader2, AlertCircle } from 'lucide-react';
import { TIMELINE_EVENTS } from '../data/timelineData';
import type { TimelineEvent } from '../data/timelineData';
import BookingModal from '../components/BookingModal';
import CalendarGrid from '../components/CalendarGrid';

interface GoogleCalendarItem {
  id: string;
  summary?: string;
  description?: string;
  colorId?: string;
  start: {
    dateTime?: string;
    date?: string;
  };
  end?: {
    dateTime?: string;
    date?: string;
  };
}

export default function ScheduledTasksView() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [events, setEvents] = useState<TimelineEvent[]>(TIMELINE_EVENTS);
  const [loading, setLoading] = useState(false);
  const [usingFallback, setUsingFallback] = useState(false);
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false);
  const [selectedBookingDate, setSelectedBookingDate] = useState<Date | null>(null);
  const [refreshKey, setRefreshKey] = useState(0);

  const year = currentDate.getFullYear();
  const month = currentDate.getMonth();

  const prevMonth = () => setCurrentDate(new Date(year, month - 1, 1));
  const nextMonth = () => setCurrentDate(new Date(year, month + 1, 1));

  useEffect(() => {
    const fetchGoogleCalendar = async () => {
      setLoading(true);
      try {
        const apiKey = import.meta.env.VITE_GOOGLE_CALENDAR_API_KEY;
        const calendarId = import.meta.env.VITE_GOOGLE_CALENDAR_ID;

        if (!apiKey || !calendarId || apiKey === 'your_api_key_here') {
          setUsingFallback(true);
          setEvents(TIMELINE_EVENTS);
          setLoading(false);
          return;
        }

        const timeMin = new Date(year, month, 1).toISOString();
        const timeMax = new Date(year, month + 1, 0, 23, 59, 59).toISOString();

        const response = await fetch(
          `https://www.googleapis.com/calendar/v3/calendars/${encodeURIComponent(calendarId)}/events?key=${apiKey}&orderBy=startTime&singleEvents=true&timeMin=${timeMin}&timeMax=${timeMax}`
        );

        if (!response.ok) throw new Error('Failed to fetch from Google Calendar API');

        const data = await response.json();
        
        if (data.items) {
          const fetchedEvents: TimelineEvent[] = data.items.map((item: GoogleCalendarItem) => {
            const sDate = item.start.dateTime || (item.start.date + 'T00:00:00');
            const eDate = item.end?.dateTime || (item.end?.date ? item.end.date + 'T00:00:00' : undefined);
            
            let title = item.summary || 'Untitled Event';
            // Sanitize Cal.com bookings to hide the attendee's name
            if (title.includes('between Michael') || title.includes('with Michael') || (item.description && item.description.toLowerCase().includes('cal.com'))) {
              title = 'Booked Session';
            }
            
            return {
              id: item.id,
              date: new Date(sDate).toISOString(),
              endDate: eDate ? new Date(eDate).toISOString() : undefined,
              title: title,
              description: '', // Clear description to prevent leaking meeting links/emails
              icon: undefined,
              color: "", 
              googleColorId: item.colorId 
            };
          });
          setEvents(fetchedEvents);
          setUsingFallback(false);
        }
      } catch (err) {
        console.error('Calendar Fetch Error:', err);
        setUsingFallback(true);
        setEvents(TIMELINE_EVENTS);
      } finally {
        setLoading(false);
      }
    };

    fetchGoogleCalendar();
  }, [month, year, refreshKey]);

  return (
    <div id="scheduled-tasks-container" className="p-6 max-w-6xl mx-auto flex flex-col h-full animate-fadeIn relative">
      <div className="flex items-center justify-between border-b border-workspace-border pb-4 mb-6 shrink-0">
        <div className="space-y-1">
          <h1 className="text-xl font-bold text-workspace-textActive tracking-tight flex items-center gap-2">
            <CalendarIcon className="w-5 h-5 text-workspace-accent" /> Scheduled Tasks & Availability
          </h1>
          <div className="flex items-center gap-3">
            <p className="text-xs text-workspace-textSecondary">Your central hub for events and bookings.</p>
            {loading ? (
              <Loader2 className="w-3 h-3 animate-spin text-workspace-accent" />
            ) : usingFallback ? (
              <span className="flex items-center gap-1 text-[9px] uppercase font-bold tracking-wider text-amber-500 bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
                <AlertCircle className="w-2.5 h-2.5" /> Local Mock Data
              </span>
            ) : (
              <span className="flex items-center gap-1 text-[9px] uppercase font-bold tracking-wider text-emerald-500 bg-emerald-500/10 px-2 py-0.5 rounded border border-emerald-500/20">
                <span className="relative flex h-1.5 w-1.5"><span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span><span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-emerald-500"></span></span> Live Sync
              </span>
            )}
          </div>
        </div>

        <button onClick={() => { setIsBookingModalOpen(true); setSelectedBookingDate(null); }} className="flex items-center gap-2 bg-workspace-accent hover:opacity-90 text-white px-4 py-2 rounded-lg text-sm font-bold shadow-lg shadow-workspace-accent/20 transition-all">
          <Video className="w-4 h-4" /> Book a Session
        </button>
      </div>

      <CalendarGrid 
        currentDate={currentDate} 
        events={events} 
        usingFallback={usingFallback} 
        onPrevMonth={prevMonth} 
        onNextMonth={nextMonth} 
        onDayClick={(date) => {
          setSelectedBookingDate(date);
          setIsBookingModalOpen(true);
        }}
      />

      <BookingModal 
        isOpen={isBookingModalOpen} 
        onClose={() => setIsBookingModalOpen(false)} 
        selectedDate={selectedBookingDate}
        onBookingComplete={() => {
          // Refresh immediately and also after a short delay to account for Google Calendar sync time
          setRefreshKey(k => k + 1);
          setTimeout(() => setRefreshKey(k => k + 1), 3000);
        }}
      />
    </div>
  );
}
