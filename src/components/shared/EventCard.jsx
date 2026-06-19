import { Calendar, CheckCircle, MapPin, Sparkles, Users } from "lucide-react";
import { Link } from "react-router";
import { eventViewModel } from "./dataHelpers";

export function EventCard({ event, compact = false, actionLabel = "View Details" }) {
  const item = eventViewModel(event);

  return (
    <Link
      to={`/student/events/${item.id}`}
      className="block bg-card rounded-xl overflow-hidden border border-border shadow-sm hover:shadow-md hover:border-primary/30 transition-all"
    >
      <img src={item.image} alt={item.title} className={`w-full object-cover ${compact ? "h-28" : "h-44"}`} />
      <div className="p-4">
        {item.aiReason && (
          <div className="flex items-center gap-1 text-xs text-secondary mb-2">
            <Sparkles className="w-3.5 h-3.5" />
            <span>{item.aiReason}</span>
          </div>
        )}
        <h3 className="font-semibold mb-2">{item.title}</h3>
        <div className="flex items-center gap-1.5 text-sm text-muted-foreground mb-3">
          <span>{item.club.name}</span>
          {item.club.verified && <CheckCircle className="w-4 h-4 text-primary fill-current" />}
        </div>
        <div className="space-y-1 text-sm text-muted-foreground">
          <div className="flex items-center gap-2">
            <Calendar className="w-4 h-4" />
            <span>{item.date} · {item.time}</span>
          </div>
          <div className="flex items-center gap-2">
            <MapPin className="w-4 h-4" />
            <span>{item.venue.name}</span>
          </div>
          <div className="flex items-center gap-2">
            <Users className="w-4 h-4" />
            <span>{item.rsvpCount} going</span>
          </div>
        </div>
        <div className="mt-4 text-sm text-primary font-medium">{actionLabel}</div>
      </div>
    </Link>
  );
}
