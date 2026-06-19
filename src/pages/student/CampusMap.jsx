import { Calendar, ChevronUp, MapPin } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import campusMap from "../../../map.png";
import { eventViewModel } from "../../components/shared/dataHelpers";
import { events, venues } from "../../data/mockEvents";

const venueHitAreas = [
  { id: "n24", left: 14, top: 16, width: 25, height: 28 },
  { id: "p19", left: 43, top: 13, width: 29, height: 23 },
  { id: "main-hall", left: 33, top: 40, width: 27, height: 24 },
  { id: "sports", left: 62, top: 50, width: 27, height: 24 },
  { id: "stadium", left: 71, top: 64, width: 22, height: 22 },
  { id: "lake", left: 8, top: 50, width: 28, height: 29 },
];
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
          <div className="relative w-full aspect-[4/3] bg-muted overflow-hidden">
            <img src={campusMap} alt="UTM campus map" className="absolute inset-0 w-full h-full object-cover" />
            <div className="absolute inset-0 bg-background/5" />
            {venueHitAreas.map((area) => (
              <button
                key={area.id}
                type="button"
                aria-label={`Show events at ${venues.find((item) => item.id === area.id)?.name}`}
                onClick={() => setSelectedVenue(area.id)}
                className={`absolute rounded-xl transition-colors ${selectedVenue === area.id ? "bg-primary/15 ring-2 ring-primary/60" : "hover:bg-primary/10"}`}
                style={{ left: `${area.left}%`, top: `${area.top}%`, width: `${area.width}%`, height: `${area.height}%` }}
              />
            ))}
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


