import { ArrowLeft, Download, Eye, Search } from "lucide-react";
import { useState } from "react";
import { Link, useParams } from "react-router";
import { getEvent, getStudent } from "../../components/shared/dataHelpers";
import { registrationResponses } from "../../data/mockUsers";

export default function RegistrationResponses() {
  const { eventId = "hackathon-2026" } = useParams();
  const event = getEvent(eventId);
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(null);
  const [exportOpen, setExportOpen] = useState(false);
  const rows = registrationResponses.filter((item) => item.eventId === event.id).map((item) => ({ ...item, student: getStudent(item.studentId) })).filter((item) => item.student.fullName.toLowerCase().includes(query.toLowerCase()) || item.student.matricNumber.includes(query) || item.student.faculty.toLowerCase().includes(query.toLowerCase()));
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="bg-primary text-primary-foreground rounded-2xl p-5 mb-5"><div className="flex gap-3 items-center mb-3"><Link to="/organizer/dashboard"><ArrowLeft className="w-5 h-5" /></Link><div><h1 className="font-bold">Event Responses</h1><p className="text-sm text-primary-foreground/80">{event.title}</p></div></div><div className="flex items-center gap-3"><span className="px-3 py-2 bg-white/10 rounded-lg">Total Responses: <b>{rows.length}</b></span><button onClick={() => setExportOpen(true)} className="px-4 py-2 bg-secondary text-secondary-foreground rounded-lg flex gap-2"><Download className="w-4 h-4" />Export CSV</button></div></div>
      <div className="relative mb-5"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full pl-11 pr-4 py-3 bg-card border border-border rounded-xl" placeholder="Search by name, matric number, or faculty..." /></div>
      <div className="bg-card rounded-xl border border-border overflow-x-auto"><table className="w-full min-w-[680px] text-sm"><thead className="bg-muted/30"><tr><th className="p-4 text-left">Student Name</th><th className="p-4 text-left">Matric Number</th><th className="p-4 text-left">Faculty</th><th className="p-4 text-left">Submission Date</th><th className="p-4 text-left">Action</th></tr></thead><tbody>{rows.map((row) => <tr key={row.id} className="border-t border-border"><td className="p-4 font-medium">{row.student.fullName}</td><td className="p-4 font-mono text-muted-foreground">{row.student.matricNumber}</td><td className="p-4 text-muted-foreground">{row.student.faculty}</td><td className="p-4 text-muted-foreground">{row.submissionDate}</td><td className="p-4"><button onClick={() => setSelected(row)} className="text-primary flex gap-1"><Eye className="w-4 h-4" />View Full Answer</button></td></tr>)}</tbody></table></div>
      {selected && <div className="fixed inset-0 bg-black/50 z-50 flex items-end sm:items-center justify-center" onClick={() => setSelected(null)}><div className="bg-card rounded-t-2xl sm:rounded-2xl w-full max-w-2xl p-6" onClick={(e) => e.stopPropagation()}><h2 className="text-lg font-bold">Full Response Details</h2><p className="text-sm text-muted-foreground mb-5">{selected.student.fullName}</p><div className="space-y-4"><Info label="Full Name" value={selected.student.fullName} /><Info label="Matric Number" value={selected.student.matricNumber} /><Info label="Faculty" value={selected.student.faculty} /><Info label="Dietary restrictions" value={selected.dietaryRestrictions || "No response"} /><Info label="Which session will you attend?" value={selected.selectedSession} /></div><button onClick={() => setSelected(null)} className="w-full mt-6 px-4 py-3 bg-primary text-primary-foreground rounded-xl">Close</button></div></div>}
      {exportOpen && <div className="fixed inset-0 bg-black/50 z-50 grid place-items-center p-4"><div className="bg-card rounded-2xl p-6 max-w-sm"><h2 className="font-bold text-lg mb-2">Export CSV?</h2><p className="text-sm text-muted-foreground mb-6">Download {rows.length} registration records for {event.title}.</p><div className="flex gap-2"><button onClick={() => setExportOpen(false)} className="flex-1 py-3 border rounded-lg">Cancel</button><button onClick={() => setExportOpen(false)} className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg">Download</button></div></div></div>}
    </div>
  );
}
function Info({ label, value }) { return <div className="flex justify-between gap-4 bg-muted/30 p-3 rounded-lg"><span className="text-sm text-muted-foreground">{label}</span><span className="text-sm font-medium text-right">{value}</span></div>; }
