import { Calendar, Star, TrendingUp, Users } from "lucide-react";
import { Link } from "react-router";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { eventViewModel } from "../../components/shared/dataHelpers";
import { clubs } from "../../data/mockClubs";
import { events } from "../../data/mockEvents";
import { facultyData, rsvpTrendData, yearData } from "../../data/mockAnalytics";

const COLORS = ["#7C0A02", "#D4AF37", "#374151", "#F59E0B", "#8B5CF6"];

export default function AnalyticsDashboard() {
  const club = clubs[0];
  const comparison = events.filter((event) => event.status === "published").slice(0, 5).map(eventViewModel);
  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex justify-between items-center mb-6"><div><h1 className="text-2xl font-bold">Platform Analytics</h1><p className="text-muted-foreground">System-wide performance overview</p></div></div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">{[[Calendar, "Total Events", 24, "+3 this month"], [Users, "Total RSVPs", "1,247", "+156 this week"], [Star, "Average Rating", "4.7", "out of 5.0"], [TrendingUp, "Followers", club.followers.toLocaleString(), "+47 this week"]].map(([Icon, label, value, note]) => <div key={label} className="bg-card rounded-xl p-4 border border-border"><div className="flex justify-between text-sm text-muted-foreground mb-2"><p>{label}</p><Icon className="w-5 h-5 text-primary" /></div><p className="text-2xl font-bold">{value}</p><p className="text-xs text-green-600 mt-1">{note}</p></div>)}</div>
      <div className="grid lg:grid-cols-2 gap-6 mb-6"><Chart title="RSVP Trends (Last 30 Days)"><ResponsiveContainer width="100%" height={250}><LineChart data={rsvpTrendData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="date" /><YAxis /><Tooltip /><Line type="monotone" dataKey="rsvps" stroke="#7C0A02" strokeWidth={2} /></LineChart></ResponsiveContainer></Chart><Chart title="Faculty Distribution"><ResponsiveContainer width="100%" height={250}><PieChart><Pie data={facultyData} dataKey="value" outerRadius={80} label>{facultyData.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}</Pie><Tooltip /></PieChart></ResponsiveContainer></Chart><Chart title="Year of Study Distribution"><ResponsiveContainer width="100%" height={250}><BarChart data={yearData}><CartesianGrid strokeDasharray="3 3" /><XAxis dataKey="year" /><YAxis /><Tooltip /><Bar dataKey="count" fill="#D4AF37" radius={[8, 8, 0, 0]} /></BarChart></ResponsiveContainer></Chart><Chart title="Quick Actions"><div className="space-y-3"><Link to="/platform/admin/moderation" className="block p-4 bg-background rounded-lg hover:bg-muted"><b>Moderation Queue</b><p className="text-sm text-muted-foreground">Review flagged events and announcements</p></Link><Link to="/platform/admin/club-moderation" className="block p-4 bg-background rounded-lg hover:bg-muted"><b>Club Verification</b><p className="text-sm text-muted-foreground">Approve or reject club profile submissions</p></Link><Link to="/platform/admin" className="block p-4 bg-background rounded-lg hover:bg-muted"><b>Admin Dashboard</b><p className="text-sm text-muted-foreground">Return to platform overview</p></Link></div></Chart></div>
      <div className="bg-card rounded-xl p-6 border border-border overflow-x-auto"><h2 className="font-semibold mb-4">Event Comparison</h2><table className="w-full min-w-[640px] text-sm"><thead><tr className="border-b"><th className="p-3 text-left">Event Name</th><th className="p-3 text-left">Date</th><th className="p-3 text-left">RSVPs</th><th className="p-3 text-left">Views</th><th className="p-3 text-left">Rating</th></tr></thead><tbody>{comparison.map((event) => <tr key={event.id} className="border-b hover:bg-muted/50"><td className="p-3 font-medium">{event.title}</td><td className="p-3 text-muted-foreground">{event.date}</td><td className="p-3"><span className="px-2 py-1 bg-primary/10 text-primary rounded-full">{event.rsvpCount}</span></td><td className="p-3 text-muted-foreground">{event.views}</td><td className="p-3"><Star className="w-4 h-4 text-yellow-500 fill-current inline" /> {event.rating}</td></tr>)}</tbody></table></div>
    </div>
  );
}
function Chart({ title, children }) { return <section className="bg-card rounded-xl p-4 lg:p-6 border border-border"><h2 className="font-semibold mb-4">{title}</h2>{children}</section>; }
