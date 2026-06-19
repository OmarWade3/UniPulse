import { Calendar, Check, CheckCircle, ChevronRight, Facebook, Globe, Instagram, Star, Upload, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { finishPendingRole, getStoredRole, roleHomes } from "../../components/shared/authRole";
import { clubCategoryOptions, clubReviews, clubs } from "../../data/mockClubs";
import { events } from "../../data/mockEvents";
import { getEvent, getStudent } from "../../components/shared/dataHelpers";

export default function ClubProfile() {
  const { clubId = "developer-community" } = useParams();
  const role = getStoredRole();
  const isStudent = role === "student";
  const club = clubs.find((item) => item.id === clubId) || clubs[0];
  const [following, setFollowing] = useState(false);
  const [showAll, setShowAll] = useState(false);
  const reviews = clubReviews.filter((review) => review.clubId === club.id);
  const visibleReviews = showAll ? reviews : reviews.slice(0, 3);
  const avg = useMemo(() => reviews.length ? (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1) : "0.0", [reviews]);
  const upcoming = events.filter((event) => event.clubId === club.id);
  return (
    <div className="max-w-screen-sm mx-auto pb-8">
      <div className="relative h-36 bg-primary" />
      <div className="px-4">
        <div className="relative -mt-12 mb-4"><div className="w-24 h-24 bg-primary rounded-2xl border-4 border-background shadow-lg text-white grid place-items-center text-2xl font-bold">{club.initials}</div></div>
        <div className="flex justify-between gap-4 mb-4"><div><div className="flex items-center gap-2 flex-wrap"><h1 className="text-xl font-bold">{club.name}</h1>{club.verified && <CheckCircle className="w-5 h-5 text-primary fill-current" />}</div><p className="text-sm text-muted-foreground">{club.category} · Est. 2015</p></div>{isStudent && <button onClick={() => setFollowing((v) => !v)} className={`px-4 py-2 rounded-lg text-sm ${following ? "bg-primary/10 text-primary border border-primary/30" : "bg-primary text-primary-foreground"}`}>{following ? "Following" : "Follow"}</button>}</div>
        <div className="grid grid-cols-3 gap-3 mb-6">{[["Followers", club.followers, Users], ["Events Held", club.eventsHeld, Calendar], ["Avg Rating", avg, Star]].map(([label, value, Icon]) => <div key={label} className="bg-card rounded-xl p-3 text-center border border-border"><Icon className="w-4 h-4 text-primary mx-auto mb-1" /><p className="font-bold">{value}</p><p className="text-xs text-muted-foreground">{label}</p></div>)}</div>
        <p className="text-sm text-muted-foreground mb-6 leading-relaxed">{club.description}</p>
        <section className="bg-card rounded-xl p-5 border border-border mb-6"><h2 className="font-semibold mb-4">Rating Overview</h2><div className="flex items-center gap-4"><div className="text-center"><p className="text-5xl font-bold text-yellow-500">{avg}</p><Stars rating={Math.round(avg)} /><p className="text-xs text-muted-foreground mt-1">{reviews.length} reviews</p></div><div className="flex-1 space-y-1.5">{[5, 4, 3, 2, 1].map((star) => { const count = reviews.filter((review) => review.rating === star).length; return <div key={star} className="flex items-center gap-2"><span className="text-xs w-3">{star}</span><Star className="w-3 h-3 text-yellow-400 fill-current" /><div className="flex-1 h-2 bg-muted rounded-full overflow-hidden"><div className="h-full bg-yellow-400" style={{ width: `${reviews.length ? (count / reviews.length) * 100 : 0}%` }} /></div><span className="text-xs w-3">{count}</span></div>; })}</div></div></section>
        <section className="mb-6"><h2 className="font-semibold mb-3">Upcoming Events</h2><div className="space-y-2">{upcoming.map((event) => <Link key={event.id} to={isStudent ? `/student/events/${event.id}` : `/organizer/responses/${event.id}`} className="bg-card rounded-xl p-4 border border-border flex justify-between"><div><p className="font-medium text-sm">{event.title}</p><p className="text-xs text-muted-foreground mt-1">{event.date} · {event.rsvpCount} going</p></div><ChevronRight className="w-4 h-4 text-muted-foreground" /></Link>)}</div></section>
        <section><div className="flex justify-between mb-4"><h2 className="font-semibold">Recent Reviews</h2><span className="text-xs text-muted-foreground">{reviews.length} total</span></div><div className="space-y-4">{visibleReviews.map((review) => { const user = getStudent(review.userId); const event = getEvent(review.eventId); return <div key={review.id} className="bg-card rounded-xl p-4 border border-border"><div className="flex gap-3 mb-3"><div className="w-9 h-9 bg-primary/10 rounded-full text-primary grid place-items-center text-xs font-semibold">{user.initials}</div><div className="flex-1"><div className="flex justify-between"><p className="font-medium text-sm">{user.fullName}</p><span className="text-xs text-muted-foreground">{review.date}</span></div><div className="flex items-center gap-2"><Stars rating={review.rating} /><span className="text-xs text-muted-foreground">· {event.title}</span></div></div></div><p className="text-sm text-muted-foreground">{review.text}</p></div>; })}</div>{reviews.length > 3 && <button onClick={() => setShowAll((v) => !v)} className="w-full mt-4 py-3 border border-border rounded-xl text-sm text-muted-foreground">{showAll ? "Show Less" : `View All ${reviews.length} Reviews`}</button>}</section>
      </div>
    </div>
  );
}

export function CreateClubProfile({ onSubmit, onSubmitTo = "/organizer/club", submitLabel = "Submit for Verification" }) {
  const [selected, setSelected] = useState([]);
  const [logo, setLogo] = useState("");
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-28">
      <h1 className="text-2xl font-bold">Create Club Profile</h1><p className="text-sm text-muted-foreground mb-6">Register your club on UniPulse and submit for verification</p>
      <div className="space-y-6"><section className="bg-card rounded-2xl p-6 border border-border text-center"><h2 className="font-semibold mb-1">Club Logo</h2><label className={`relative mx-auto mt-5 w-48 h-48 rounded-full border-4 border-dashed grid place-items-center ${logo ? "border-green-500 bg-green-50" : "border-border"}`}><input type="file" className="absolute inset-0 opacity-0 cursor-pointer rounded-full" onChange={(e) => setLogo(e.target.files?.[0]?.name || "")} />{logo ? <><Check className="w-10 h-10 text-green-600" /><span className="text-sm text-green-900">Logo uploaded</span></> : <><Upload className="w-12 h-12 text-primary" /><span className="text-sm">Drop logo here</span></>}</label></section><section className="bg-card rounded-2xl p-6 border border-border space-y-4"><input className="w-full px-4 py-3 bg-background rounded-lg border border-border" placeholder="Club Name" /><textarea rows={6} className="w-full px-4 py-3 bg-background rounded-lg border border-border resize-none" placeholder="Club description" /></section><section className="bg-card rounded-2xl p-6 border border-border"><h2 className="font-semibold mb-4">Categories</h2><div className="flex flex-wrap gap-2">{clubCategoryOptions.map((category) => <button key={category} onClick={() => setSelected((items) => items.includes(category) ? items.filter((item) => item !== category) : [...items, category])} className={`px-4 py-2 rounded-full border-2 text-sm ${selected.includes(category) ? "bg-primary text-primary-foreground border-primary" : "bg-background border-border"}`}>{category}</button>)}</div></section><section className="bg-card rounded-2xl p-6 border border-border space-y-3"><h2 className="font-semibold">Social Media & Links</h2>{[[Instagram, "Instagram"], [Facebook, "Facebook"], [Globe, "Website"]].map(([Icon, label]) => <label key={label} className="block text-sm"><span className="flex gap-2 items-center mb-2"><Icon className="w-4 h-4 text-primary" />{label}</span><input className="w-full px-4 py-3 bg-background rounded-lg border border-border" placeholder={`https://${label.toLowerCase()}.com/yourclub`} /></label>)}</section><div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 text-sm text-blue-900"><b>Verification Process:</b> The UniPulse admin team reviews club profiles within 1-3 business days.</div></div>
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-40"><div className="max-w-2xl mx-auto">{onSubmit ? <button type="button" onClick={onSubmit} className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold">{submitLabel}</button> : <Link to={onSubmitTo} className="block text-center w-full px-6 py-4 bg-primary text-primary-foreground rounded-lg font-semibold">{submitLabel}</Link>}</div></div>
    </div>
  );
}

export function OrganizerClubSignup() {
  const navigate = useNavigate();
  const completeSignup = (event) => {
    event.preventDefault();
    finishPendingRole("organizer");
    navigate(roleHomes.organizer, { replace: true });
  };

  return (
    <CreateClubProfile onSubmit={completeSignup} submitLabel="Submit Club & Continue" />
  );
}

function Stars({ rating }) { return <div className="flex items-center gap-0.5">{[1, 2, 3, 4, 5].map((n) => <Star key={n} className={`w-4 h-4 ${n <= rating ? "text-yellow-400 fill-current" : "text-muted-foreground/25"}`} />)}</div>; }
