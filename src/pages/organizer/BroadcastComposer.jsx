import { Send, Smartphone, Users } from "lucide-react";
import { useState } from "react";
import { broadcastHistory } from "../../data/mockAnalytics";
import { clubs } from "../../data/mockClubs";

export default function BroadcastComposer() {
  const [message, setMessage] = useState("");
  const [confirm, setConfirm] = useState(false);
  const maxChars = 500;
  const club = clubs[0];
  const isOver = message.length > maxChars;
  return (
    <div className="max-w-2xl mx-auto px-4 py-6">
      <h1 className="text-2xl font-bold">Announcement Broadcast</h1><p className="text-sm text-muted-foreground mb-6">Send updates to all followers</p>
      <section className="bg-card rounded-2xl p-6 border border-border mb-6"><h2 className="text-lg font-semibold mb-4">Broadcast New Announcement</h2><div className="relative"><textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={6} className="w-full px-4 py-4 bg-background rounded-xl border border-border resize-none" placeholder="Type your announcement message here..." /><span className={`absolute bottom-3 right-3 text-sm ${isOver ? "text-red-600" : "text-muted-foreground"}`}>{message.length} / {maxChars}</span></div></section>
      <section className="bg-slate-100 rounded-2xl p-8 border border-slate-300 mb-6"><div className="flex gap-2 mb-6"><Smartphone className="w-5 h-5" /><h2 className="font-semibold">Live Notification Preview</h2></div><div className="bg-slate-900 rounded-3xl p-6 text-white shadow-xl"><div className="bg-white/10 rounded-2xl p-4 flex gap-3"><div className="w-10 h-10 bg-primary rounded-xl grid place-items-center font-bold">{club.initials}</div><div><div className="flex justify-between gap-4"><b>{club.name}</b><span className="text-xs text-white/60">Just now</span></div><p className="text-sm text-white/90">{message || "Your message will appear here..."}</p></div></div></div></section>
      <button disabled={!message.trim() || isOver} onClick={() => setConfirm(true)} className="w-full px-6 py-4 bg-primary text-primary-foreground rounded-xl font-semibold flex justify-center gap-3 disabled:opacity-50"><Send className="w-5 h-5" />Send Broadcast to All Followers</button>
      <h2 className="text-lg font-semibold mt-10 mb-4">Broadcast History Log</h2><div className="space-y-3">{broadcastHistory.map((item) => <div key={item.id} className="bg-card rounded-xl p-5 border border-border"><div className="flex justify-between gap-3 mb-3"><p className="text-sm text-muted-foreground">{item.sentAt}</p><span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-xs flex gap-1"><Users className="w-3.5 h-3.5" />Delivered to {item.deliveredTo.toLocaleString()}</span></div><p>{item.message}</p></div>)}</div>
      {confirm && <div className="fixed inset-0 bg-black/50 z-50 grid place-items-center p-4"><div className="bg-card rounded-2xl p-6 max-w-sm"><h2 className="text-lg font-bold mb-2">Send broadcast?</h2><p className="text-sm text-muted-foreground mb-6">This will notify {club.followers.toLocaleString()} followers.</p><div className="flex gap-2"><button onClick={() => setConfirm(false)} className="flex-1 py-3 border rounded-lg">Cancel</button><button onClick={() => { setConfirm(false); setMessage(""); }} className="flex-1 py-3 bg-primary text-primary-foreground rounded-lg">Send</button></div></div></div>}
    </div>
  );
}
