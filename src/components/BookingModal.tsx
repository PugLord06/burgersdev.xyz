import { Video, X } from 'lucide-react';
import Cal, { getCalApi } from "@calcom/embed-react";
import { useEffect, useRef } from "react";

interface BookingModalProps {
  isOpen: boolean;
  onClose: () => void;
  selectedDate?: Date | null;
  onBookingComplete?: () => void;
}

export default function BookingModal({ isOpen, onClose, selectedDate, onBookingComplete }: BookingModalProps) {
  const onBookingCompleteRef = useRef(onBookingComplete);
  
  useEffect(() => {
    onBookingCompleteRef.current = onBookingComplete;
  }, [onBookingComplete]);

  useEffect(() => {
    (async function () {
      const cal = await getCalApi({});
      cal("ui", {
        theme: "dark",
        styles: { branding: { brandColor: "#000000" } },
        hideEventTypeDetails: false,
        layout: "month_view",
      });
      cal("on", {
        action: "bookingSuccessful",
        callback: () => {
          if (onBookingCompleteRef.current) onBookingCompleteRef.current();
        }
      });
    })();
  }, []);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4 animate-fadeIn">
      <div className="bg-workspace-editor border border-workspace-border rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] flex flex-col overflow-hidden">
        <div className="flex items-center justify-between p-4 border-b border-workspace-border bg-workspace-sidebar">
          <div className="flex items-center gap-2">
            <Video className="w-5 h-5 text-workspace-accent" />
            <h3 className="font-bold text-workspace-textActive">Book a Session</h3>
          </div>
          <button 
            onClick={onClose}
            className="p-1 hover:bg-workspace-chipHover text-workspace-textSecondary hover:text-workspace-textActive rounded transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
        
        <div className="flex-1 w-full bg-workspace-editor overflow-y-auto">
          <Cal 
            calLink={selectedDate ? `michaelburgers?date=${selectedDate.getFullYear()}-${String(selectedDate.getMonth() + 1).padStart(2, '0')}-${String(selectedDate.getDate()).padStart(2, '0')}` : "michaelburgers"}
            style={{ width: "100%", height: "100%", minHeight: "600px", overflow: "scroll" }}
            config={{ layout: "month_view" }}
          />
        </div>
      </div>
    </div>
  );
}
