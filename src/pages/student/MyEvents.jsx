import { Bookmark, Calendar, CheckCircle, Clock, MapPin, Star, Users, X } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { eventViewModel, getEvent } from "../../components/shared/dataHelpers";
import { pastEventIds, rsvpEventIds, savedEventIds } from "../../data/mockEvents";

export default function MyEvents() {
  const [activeTab, setActiveTab] = useState("rsvps");
  const [rsvps, setRsvps] = useState(rsvpEventIds);
  const [removedSaved, setRemovedSaved] = useState([]);
  const [cancelTarget, setCancelTarget] = useState(null);
  const upcoming = rsvps.filter((id) => !pastEventIds.includes(id)).map((id) => eventViewModel(getEvent(id)));
  const past = rsvps.filter((id) => pastEventIds.includes(id)).map((id) => eventViewModel(getEvent(id)));
  const saved = savedEventIds.filter((id) => !removedSaved.includes(id)).map((id) => eventViewModel(getEvent(id)));
  return (
    <div className="max-w-screen-sm mx-auto px-4 py-6">
      {cancelTarget && <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4"><div className="bg-card rounded-2xl p-6 max-w-sm w-full"><X className="w-8 h-8 text-red-600 mb-3" /><h2 className="text-lg font-semibold mb-2">Cancel RSVP?</h2><p className="text-sm text-muted-foreground mb-6">Remove your RSVP for {eventViewModel(getEvent(cancelTarget)).title}?</p><div className="flex gap-3"><button onClick={() => setCancelTarget(null)} className="flex-1 py-3 border rounded-lg">Keep RSVP</button><button onClick={() => { setRsvps((items) => items.filter((id) => id !== cancelTarget)); setCancelTarget(null); }} className="flex-1 py-3 bg-red-600 text-white rounded-lg">Yes, Cancel</button></div></div></div>}
      <h1 className="text-2xl font-bold">My Events</h1>
      <p className="text-sm text-muted-foreground mt-1 mb-4">Track RSVPs and saved events</p>
      <div className="flex bg-muted rounded-xl p-1 mb-4"><button onClick={() => setActiveTab("rsvps")} className={`flex-1 py-2.5 rounded-lg ${activeTab === "rsvps" ? "bg-card shadow-sm" : "text-muted-foreground"}`}>My RSVPs</button><button onClick={() => setActiveTab("saved")} className={`flex-1 py-2.5 rounded-lg ${activeTab === "saved" ? "bg-card shadow-sm" : "text-muted-foreground"}`}>Saved</button></div>
      {activeTab === "rsvps" ? <div className="space-y-4"><SectionTitle>Upcoming</SectionTitle>{upcoming.map((event) => <EventRow key={event.id} event={event} badge={<><CheckCircle className="w-3 h-3" />Going</>} action={<button onClick={() => setCancelTarget(event.id)} className="w-full py-2 border border-red-200 text-red-600 rounded-lg text-sm">Cancel RSVP</button>} />)}<SectionTitle>Past Events</SectionTitle>{past.map((event) => <EventRow key={event.id} event={event} muted badge={<><Clock className="w-3 h-3" />Past</>} action={<Link to={`/student/feedback/${event.id}`} className="w-full py-2 border border-primary/40 text-primary rounded-lg text-sm flex justify-center gap-2"><Star className="w-4 h-4" />Leave Feedback</Link>} />)}</div> : <div className="space-y-4">{saved.length === 0 && <Empty icon={Bookmark} title="No saved events" text="Bookmark events to keep them handy." />}{saved.map((event) => <EventRow key={event.id} event={event} badge={<button onClick={() => setRemovedSaved((items) => [...items, event.id])}><X className="w-4 h-4" /></button>} action={<Link to={`/student/events/${event.id}`} className="w-full mt-3 py-2 bg-primary text-primary-foreground rounded-lg text-sm block text-center">RSVP Now</Link>} />)}</div>}
    </div>
  );
}

function SectionTitle({ children }) { return <p className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">{children}</p>; }
function Empty({ icon: Icon, title, text }) { return <div className="text-center py-16 text-muted-foreground"><Icon className="w-12 h-12 mx-auto mb-3 opacity-30" /><p className="font-medium">{title}</p><p className="text-sm mt-1">{text}</p></div>; }
function EventRow({ event, badge, action, muted = false }) {
  return <div className={`bg-card rounded-xl overflow-hidden border border-border shadow-sm ${muted ? "opacity-75" : ""}`}><div className="relative"><img src={event.image} alt={event.title} className={`w-full h-32 object-cover ${muted ? "grayscale" : ""}`} /><div className="absolute top-2 right-2 bg-white/90 text-foreground text-xs px-2 py-1 rounded-full flex items-center gap-1">{badge}</div></div><div className="p-4"><Link to={`/student/events/${event.id}`} className="font-semibold mb-2 block hover:text-primary">{event.title}</Link><div className="space-y-1 mb-4 text-sm text-muted-foreground"><p className="flex gap-2"><Calendar className="w-4 h-4" />{event.date} · {event.time}</p><p className="flex gap-2"><MapPin className="w-4 h-4" />{event.venue.name}</p><p className="flex gap-2"><Users className="w-4 h-4" />{event.rsvpCount} going</p></div>{action}</div></div>;
}
