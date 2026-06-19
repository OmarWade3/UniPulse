import { Calendar, Check, ChevronDown, GripVertical, Link as LinkIcon, MapPin, Plus, Sparkles, Trash2, Upload, X } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate, useParams } from "react-router";
import { getEvent } from "../../components/shared/dataHelpers";
import { eventTagSuggestions, venues } from "../../data/mockEvents";

export default function CreateEvent() {
  const { eventId } = useParams();
  const editEvent = eventId ? getEvent(eventId) : null;
  const navigate = useNavigate();
  const [title, setTitle] = useState(editEvent?.title || "");
  const [description, setDescription] = useState(editEvent?.description || "");
  const [venue, setVenue] = useState(editEvent?.venueId || "");
  const [accepted, setAccepted] = useState([]);
  const [dismissed, setDismissed] = useState([]);
  const [uploadedFile, setUploadedFile] = useState("");
  const [questions, setQuestions] = useState([]);
  const [registrationTab, setRegistrationTab] = useState("builder");
  const [externalUrl, setExternalUrl] = useState("");
  const visibleTags = eventTagSuggestions.filter((tag) => !dismissed.includes(tag.id));
  const addQuestion = (type) => setQuestions((items) => [...items, { id: crypto.randomUUID(), type, question: "", required: false, options: type === "short-text" ? [] : [""] }]);
  return (
    <div className="max-w-2xl mx-auto px-4 py-6 pb-28">
      <div className="flex justify-between items-start mb-6"><div><h1 className="text-2xl font-bold">{editEvent ? "Edit Event" : "Create New Event"}</h1><p className="text-sm text-muted-foreground">Poster upload, AI tags, venue, and custom registration form</p></div><Link to="/organizer/dashboard" className="text-primary">Back</Link></div>
      <div className="space-y-5">
        <section className="bg-card rounded-xl p-5 border border-border space-y-4">
          <h2 className="font-semibold">Step 1: Event Details</h2>
          <input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Event title" className="w-full px-4 py-2.5 bg-background rounded-lg border border-border" />
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} rows={5} placeholder="Describe your event" className="w-full px-4 py-2.5 bg-background rounded-lg border border-border resize-none" />
          <div className="bg-purple-50 border border-purple-200 rounded-xl p-4"><div className="flex items-center gap-2 mb-2"><Sparkles className="w-4 h-4 text-purple-600" /><h3 className="font-medium text-purple-900">AI Auto-Tag Suggester</h3></div><div className="space-y-2">{visibleTags.map((tag) => <div key={tag.id} className={`flex items-center justify-between p-3 rounded-lg border ${accepted.includes(tag.id) ? "bg-green-100 border-green-500" : "bg-white border-purple-200"}`}><div><span className="font-medium">{tag.label}</span><div className="inline-flex items-center gap-2 ml-3"><span className="inline-block w-20 h-2 bg-muted rounded-full overflow-hidden"><span className="block h-full bg-secondary" style={{ width: `${tag.confidence}%` }} /></span><span className="text-xs text-muted-foreground">{tag.confidence}%</span></div></div><div className="flex gap-1"><button onClick={() => setAccepted((items) => items.includes(tag.id) ? items : [...items, tag.id])} className="w-6 h-6 bg-green-500 text-white rounded-full grid place-items-center"><Check className="w-3 h-3" /></button><button onClick={() => setDismissed((items) => [...items, tag.id])} className="w-6 h-6 bg-red-500 text-white rounded-full grid place-items-center"><X className="w-3 h-3" /></button></div></div>)}</div></div>
          <div className="grid grid-cols-2 gap-3"><label className="text-sm">Date<input type="date" className="mt-2 w-full px-4 py-2.5 bg-background rounded-lg border border-border" /></label><label className="text-sm">Time<input type="time" className="mt-2 w-full px-4 py-2.5 bg-background rounded-lg border border-border" /></label></div>
          <label className="block text-sm">UTM Campus Venue<div className="relative mt-2"><MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" /><select value={venue} onChange={(e) => setVenue(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-background rounded-lg border border-border appearance-none"><option value="">Select a venue</option>{venues.map((item) => <option key={item.id} value={item.id}>{item.name}</option>)}</select><ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4" /></div></label>
          <label className="block text-sm">Event Poster<div className={`mt-2 relative border-2 border-dashed rounded-xl p-8 text-center ${uploadedFile ? "border-green-500 bg-green-50" : "border-border hover:border-primary/50"}`}><input type="file" accept="image/*" onChange={(e) => setUploadedFile(e.target.files?.[0]?.name || "")} className="absolute inset-0 opacity-0 cursor-pointer" />{uploadedFile ? <><Check className="w-12 h-12 text-green-600 mx-auto mb-2" /><p className="font-medium text-green-900">{uploadedFile}</p></> : <><Upload className="w-12 h-12 text-primary mx-auto mb-3" /><p className="font-medium">Drag and drop or click to browse</p><p className="text-xs text-muted-foreground">Max 10MB, PNG/JPG</p></>}</div></label>
        </section>
        <section className="bg-card rounded-xl p-5 border border-border">
          <h2 className="font-semibold">Step 2: Attach Custom Registration Form</h2>
          <div className="flex gap-2 my-4 bg-muted/50 rounded-lg p-1"><button onClick={() => setRegistrationTab("builder")} className={`flex-1 py-2 rounded-md ${registrationTab === "builder" ? "bg-card shadow-sm" : ""}`}>Form Builder</button><button onClick={() => setRegistrationTab("external")} className={`flex-1 py-2 rounded-md flex justify-center gap-2 ${registrationTab === "external" ? "bg-card shadow-sm" : ""}`}><LinkIcon className="w-4 h-4" />External URL</button></div>
          {registrationTab === "builder" ? <div className="space-y-4"><div className="flex flex-wrap gap-2">{["short-text", "multiple-choice", "checkbox"].map((type) => <button key={type} onClick={() => addQuestion(type)} className="px-3 py-2 bg-primary/10 text-primary rounded-lg text-sm flex gap-2"><Plus className="w-4 h-4" />{type}</button>)}</div>{questions.length === 0 && <p className="text-center py-8 text-muted-foreground text-sm">No questions yet.</p>}{questions.map((question, index) => <QuestionEditor key={question.id} question={question} index={index} setQuestions={setQuestions} />)}</div> : <input value={externalUrl} onChange={(e) => setExternalUrl(e.target.value)} className="w-full px-4 py-2.5 bg-background rounded-lg border border-border" placeholder="https://forms.google.com/..." />}
        </section>
      </div>
      <div className="fixed bottom-16 md:bottom-0 left-0 right-0 bg-card border-t border-border p-4 z-40"><div className="max-w-2xl mx-auto flex gap-3"><button onClick={() => navigate("/organizer/dashboard")} className="flex-1 px-6 py-3 border border-primary text-primary rounded-lg">Save as Draft</button><button onClick={() => navigate("/organizer/dashboard")} className="flex-1 px-6 py-3 bg-primary text-primary-foreground rounded-lg">Publish Event</button></div></div>
    </div>
  );
}

function QuestionEditor({ question, index, setQuestions }) {
  const update = (updates) => setQuestions((items) => items.map((item) => item.id === question.id ? { ...item, ...updates } : item));
  return <div className="bg-muted/30 rounded-lg p-4 border border-border"><div className="flex gap-3"><GripVertical className="w-4 h-4 mt-3 text-muted-foreground" /><div className="flex-1 space-y-3"><input value={question.question} onChange={(e) => update({ question: e.target.value })} placeholder={`Question ${index + 1}`} className="w-full px-3 py-2 bg-card rounded-lg border border-border" />{question.options?.map((option, optionIndex) => <input key={optionIndex} value={option} onChange={(e) => update({ options: question.options.map((value, i) => i === optionIndex ? e.target.value : value) })} placeholder={`Option ${optionIndex + 1}`} className="w-full px-3 py-1.5 bg-card rounded-lg border border-border" />)}{question.options?.length > 0 && <button onClick={() => update({ options: [...question.options, ""] })} className="text-xs text-primary">+ Add option</button>}<div className="flex justify-between"><label className="text-sm text-muted-foreground"><input type="checkbox" checked={question.required} onChange={(e) => update({ required: e.target.checked })} className="mr-2" />Required field</label><button onClick={() => setQuestions((items) => items.filter((item) => item.id !== question.id))} className="text-red-600"><Trash2 className="w-4 h-4" /></button></div></div></div></div>;
}
