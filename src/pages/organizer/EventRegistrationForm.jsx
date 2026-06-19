import { ArrowLeft, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { getEvent } from "../../components/shared/dataHelpers";
import { registrationSessions } from "../../data/mockEvents";
import { students } from "../../data/mockUsers";

export default function EventRegistrationForm() {
  const { eventId = "hackathon-2026" } = useParams();
  const event = getEvent(eventId);
  const student = students[0];
  const navigate = useNavigate();
  const [dietary, setDietary] = useState("");
  const [session, setSession] = useState("");
  return <div className="max-w-2xl mx-auto px-4 py-6 pb-28"><div className="flex gap-3 mb-6"><Link to={`/student/events/${event.id}`}><ArrowLeft className="w-5 h-5" /></Link><div><h1 className="font-bold">Event Registration</h1><p className="text-sm text-muted-foreground">{event.title}</p></div></div><section className="bg-card rounded-2xl border border-border overflow-hidden mb-5"><div className="bg-muted/30 px-5 py-3 border-b"><h2 className="font-semibold text-sm flex gap-2"><Lock className="w-4 h-4" />Your Information</h2><p className="text-xs text-muted-foreground">Pre-filled from your profile</p></div><div className="p-5 space-y-4">{[["Full Name", student.fullName], ["Matric Number", student.matricNumber], ["Faculty", student.faculty], ["Year of Study", student.yearOfStudy]].map(([label, value]) => <label key={label} className="block text-sm text-muted-foreground">{label}<input value={value} disabled className="mt-2 w-full px-4 py-3 bg-muted/50 rounded-lg border border-border text-foreground" /></label>)}</div></section><section className="bg-card rounded-2xl border border-border p-5 space-y-5"><label className="block text-sm font-medium">Any dietary restrictions?<input value={dietary} onChange={(e) => setDietary(e.target.value)} className="mt-2 w-full px-4 py-3 bg-background rounded-lg border border-border" placeholder="Vegetarian, Halal, allergies..." /></label><div><p className="font-medium text-sm mb-3">Which session will you attend?</p>{registrationSessions.map((item) => <label key={item} className={`flex gap-3 p-4 rounded-lg border-2 mb-3 ${session === item ? "border-primary bg-primary/5" : "border-border"}`}><input type="radio" checked={session === item} onChange={() => setSession(item)} />{item}</label>)}</div></section><div className="fixed bottom-0 left-0 right-0 bg-card border-t p-4"><div className="max-w-2xl mx-auto"><button disabled={!session} onClick={() => navigate(`/student/events/${event.id}`)} className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl disabled:opacity-50">Submit Registration</button></div></div></div>;
}
