import { Calendar, ChevronUp, MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { eventViewModel } from "../../components/shared/dataHelpers";
import { events, venues } from "../../data/mockEvents";

export default function CampusMap() {
  const [selectedVenue, setSelectedVenue] = useState(null);
  const venueEvents = events.filter((event) => event.venueId === selectedVenue).map(eventViewModel);
  const venue = venues.find((item) => item.id === selectedVenue);
  return (
    <div className="max-w-screen-sm mx-auto pb-20">
      <div className="bg-card border-b border-border px-4 py-4">
        <h1 className="text-xl font-semibold mb-1">Campus Map</h1>
        <p className="text-sm text-muted-foreground">Explore UTM venues and upcoming events</p>
      </div>
      <div className="p-4">
        <div className="bg-card rounded-xl overflow-hidden border border-border">
          <div className="relative w-full aspect-[4/3] bg-gradient-to-br from-green-50 to-blue-50">
            <svg className="absolute inset-0 w-full h-full" viewBox="0 0 100 100">
              <path d="M 10 20 Q 30 15 50 20 T 90 25" stroke="#9CA3AF" strokeWidth="0.5" fill="none" strokeDasharray="2,2" />
              <path d="M 15 80 L 85 80" stroke="#9CA3AF" strokeWidth="0.8" fill="none" />
              <rect x="20" y="25" width="25" height="20" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.5" rx="1" />
              <rect x="55" y="20" width="25" height="15" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.5" rx="1" />
              <rect x="35" y="50" width="30" height="25" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.5" rx="1" />
              <rect x="70" y="60" width="20" height="18" fill="#E5E7EB" stroke="#9CA3AF" strokeWidth="0.5" rx="1" />
            </svg>
            {venues.map((item) => (
              <button key={item.id} onClick={() => setSelectedVenue(item.id)} className="absolute -translate-x-1/2 -translate-y-1/2" style={{ left: `${item.x}%`, top: `${item.y}%` }}>
                <MapPin className={`w-8 h-8 drop-shadow-lg ${selectedVenue === item.id ? "text-primary scale-110" : "text-destructive"}`} fill="currentColor" />
                <span className="absolute -top-1 -right-1 w-5 h-5 bg-primary text-white text-xs rounded-full grid place-items-center">{item.events}</span>
              </button>
            ))}
          </div>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {venues.map((item) => <button key={item.id} onClick={() => setSelectedVenue(item.id)} className={`p-3 rounded-lg border text-left ${selectedVenue === item.id ? "border-primary bg-primary/5" : "border-border bg-card"}`}><div className="text-sm font-medium">{item.name}</div><div className="text-xs text-muted-foreground">{item.events} events</div></button>)}
        </div>
      </div>
      {selectedVenue && (
        <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-card border-t border-border rounded-t-3xl shadow-2xl z-50 max-h-[55vh] overflow-y-auto">
          <div className="max-w-screen-sm mx-auto">
            <div className="sticky top-0 bg-card px-4 py-3 border-b border-border">
              <div className="w-12 h-1 bg-border rounded-full mx-auto mb-3" />
              <div className="flex justify-between"><div><h2 className="font-semibold">{venue?.name}</h2><p className="text-sm text-muted-foreground">{venueEvents.length} upcoming events</p></div><button onClick={() => setSelectedVenue(null)}><ChevronUp className="w-5 h-5" /></button></div>
            </div>
            <div className="px-4 py-3 space-y-3">{venueEvents.map((event) => <Link key={event.id} to={`/student/events/${event.id}`} className="flex gap-3 p-3 bg-background rounded-lg"><Calendar className="w-5 h-5 text-primary" /><div><h3 className="font-medium">{event.title}</h3><p className="text-sm text-muted-foreground">{event.date}, {event.time}</p></div></Link>)}</div>
          </div>
        </div>
      )}
    </div>
  );
}
