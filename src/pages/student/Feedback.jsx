import { ArrowLeft, CheckCircle, Star } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import { getEvent } from "../../components/shared/dataHelpers";
import { feedbackAspects } from "../../data/mockEvents";

export default function Feedback() {
  const { eventId } = useParams();
  const event = getEvent(eventId);
  const navigate = useNavigate();
  const [ratings, setRatings] = useState({});
  const [review, setReview] = useState("");
  const [submitted, setSubmitted] = useState(false);
  const canSubmit = (ratings["Overall Experience"] || 0) > 0 && review.trim().length >= 10;
  if (submitted) return <div className="min-h-[80vh] grid place-items-center p-6"><div className="text-center max-w-sm"><div className="w-20 h-20 bg-green-100 rounded-full grid place-items-center mx-auto mb-6"><CheckCircle className="w-10 h-10 text-green-600" /></div><h1 className="text-2xl font-bold mb-3">Thank You!</h1><p className="text-muted-foreground mb-8">Your feedback helps organisers improve future events.</p><button onClick={() => navigate("/student/my-events")} className="w-full bg-primary text-primary-foreground py-3 rounded-lg">Back to My Events</button></div></div>;
  return (
    <div className="max-w-screen-sm mx-auto px-4 py-6 pb-28">
      <div className="flex items-center gap-3 mb-6"><button onClick={() => navigate(-1)} className="w-10 h-10 rounded-full grid place-items-center hover:bg-muted"><ArrowLeft className="w-5 h-5" /></button><div><h1 className="text-xl font-bold">Submit Feedback</h1><p className="text-xs text-muted-foreground">{event.title}</p></div></div>
      <div className="space-y-5 mb-6">{feedbackAspects.map((aspect) => <div key={aspect} className="bg-card rounded-xl p-4 border border-border"><div className="flex justify-between mb-3"><p className="font-medium text-sm">{aspect}</p><span className="text-xs text-muted-foreground">{ratings[aspect] ? ["", "Poor", "Fair", "Good", "Great", "Excellent"][ratings[aspect]] : ""}</span></div><div className="flex gap-1">{[1, 2, 3, 4, 5].map((n) => <button key={n} onClick={() => setRatings((current) => ({ ...current, [aspect]: n }))} className="p-0.5 hover:scale-110 transition-transform"><Star className={`w-8 h-8 ${n <= (ratings[aspect] || 0) ? "text-yellow-400 fill-current" : "text-muted-foreground/30"}`} /></button>)}</div></div>)}</div>
      <div className="bg-card rounded-xl p-4 border border-border mb-4"><label className="block font-medium text-sm mb-3">Write a Review</label><textarea value={review} onChange={(e) => setReview(e.target.value)} rows={5} className="w-full bg-transparent resize-none focus:outline-none text-sm leading-relaxed" placeholder="Share your experience..." /><div className="flex justify-end mt-2"><span className={`text-xs ${review.length < 10 ? "text-muted-foreground" : "text-green-600"}`}>{review.length} / 500</span></div></div>
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-40"><div className="max-w-screen-sm mx-auto"><button disabled={!canSubmit} onClick={() => setSubmitted(true)} className="w-full bg-primary text-primary-foreground py-3 rounded-lg disabled:opacity-50">Submit Feedback</button></div></div>
    </div>
  );
}
