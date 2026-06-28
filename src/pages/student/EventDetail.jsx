import { ArrowLeft, Bookmark, Calendar, CheckCircle, Flag, MapPin, Share2, Star, Users, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { eventViewModel, getEvent } from "../../components/shared/dataHelpers";

export default function EventDetail() {
  const { eventId } = useParams();
  const navigate = useNavigate();
  const event = eventViewModel(getEvent(eventId));
  const [isRSVPed, setIsRSVPed] = useState(false);
  const [isSaved, setIsSaved] = useState(false);
  const [showCancel, setShowCancel] = useState(false);
  const [rsvpCount, setRsvpCount] = useState(event.rsvpCount);
  const [toast, setToast] = useState("");

  const rsvp = () => {
    if (isRSVPed) return setShowCancel(true);
    setIsRSVPed(true);
    setRsvpCount((count) => count + 1);
    setToast("You're going! See you there.");
    setTimeout(() => setToast(""), 2500);
  };
  const cancel = () => {
    setIsRSVPed(false);
    setRsvpCount((count) => count - 1);
    setShowCancel(false);
  };

  return (
    <div className="min-h-screen bg-background">
      {toast && <div className="fixed top-20 left-1/2 -translate-x-1/2 z-50 bg-green-600 text-white px-5 py-3 rounded-full shadow-xl flex items-center gap-2"><CheckCircle className="w-4 h-4" />{toast}</div>}
      {showCancel && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center p-4">
          <div className="bg-card rounded-2xl p-6 w-full max-w-sm shadow-xl">
            <X className="w-8 h-8 text-red-600 mb-3" />
            <h2 className="text-lg font-semibold mb-2">Cancel RSVP?</h2>
            <p className="text-sm text-muted-foreground mb-6">Your spot for {event.title} will be released.</p>
            <div className="flex gap-3"><button onClick={() => setShowCancel(false)} className="flex-1 py-3 border border-border rounded-lg">Keep RSVP</button><button onClick={cancel} className="flex-1 py-3 bg-red-600 text-white rounded-lg">Yes, Cancel</button></div>
          </div>
        </div>
      )}
      <div className="relative">
        <img src={event.image} alt={event.title} className="w-full h-72 object-cover" />
        <button onClick={() => navigate(-1)} className="absolute top-4 left-4 w-10 h-10 bg-white/90 rounded-full grid place-items-center shadow-lg"><ArrowLeft className="w-5 h-5" /></button>
        <div className="absolute top-4 right-4 flex gap-2">
          <button className="w-10 h-10 bg-white/90 rounded-full grid place-items-center shadow-lg"><Share2 className="w-5 h-5" /></button>
          <button onClick={() => setIsSaved((v) => !v)} className={`w-10 h-10 rounded-full grid place-items-center shadow-lg ${isSaved ? "bg-primary text-white" : "bg-white/90"}`}><Bookmark className={`w-5 h-5 ${isSaved ? "fill-current" : ""}`} /></button>
        </div>
      </div>
      <div className="max-w-screen-sm mx-auto px-4 py-6 pb-28">
        <h1 className="text-2xl font-bold mb-4">{event.title}</h1>
        <div className="flex items-center justify-between mb-6 pb-6 border-b border-border">
          <Link to={`/student/clubs/${event.club.id}`} className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary rounded-full text-white grid place-items-center font-semibold">{event.club.initials}</div>
            <div><div className="flex items-center gap-2 font-semibold">{event.club.name}{event.club.verified && <CheckCircle className="w-4 h-4 text-primary fill-current" />}</div><p className="text-sm text-muted-foreground">{event.club.followers} followers</p></div>
          </Link>
          <button className="px-4 py-2 border border-primary text-primary rounded-lg">Follow</button>
        </div>
        <div className="space-y-4 mb-6">
          <p className="flex gap-3"><Calendar className="w-5 h-5 text-primary" /><span>{event.date}<br /><span className="text-sm text-muted-foreground">{event.time}</span></span></p>
          <p className="flex gap-3"><MapPin className="w-5 h-5 text-primary" /><span>{event.venue.name}<br /><Link to="/student/map" className="text-sm text-primary">View on map</Link></span></p>
          <p className="flex gap-3"><Users className="w-5 h-5 text-primary" /><span>{rsvpCount} people going<br /><span className="text-sm text-muted-foreground">See who's attending</span></span></p>
        </div>
        <div className="mb-6 space-y-3">
          <Link to={`/student/events/${event.id}/report`} className="w-full flex items-center justify-center gap-2 py-3 border border-destructive/30 text-destructive rounded-lg hover:bg-destructive/5">
            <Flag className="w-4 h-4" /> Report this event to admin
          </Link>
          {isRSVPed && <Link to={`/student/feedback/${event.id}`} className="w-full flex items-center justify-center gap-2 py-3 border border-primary/40 text-primary rounded-lg"><Star className="w-4 h-4" /> Leave Feedback for this Event</Link>}
        </div>
        <h2 className="font-semibold mb-2">About this event</h2>
        <p className="text-muted-foreground leading-relaxed mb-6">{event.description}</p>
      </div>
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-40">
        <div className="max-w-screen-sm mx-auto"><button onClick={rsvp} className={`w-full py-3 rounded-lg font-medium flex justify-center gap-2 ${isRSVPed ? "bg-green-600 text-white" : "bg-primary text-primary-foreground"}`}>{isRSVPed ? <><CheckCircle className="w-5 h-5" /> Going</> : "RSVP"}</button></div>
      </div>
    </div>
  );
}
