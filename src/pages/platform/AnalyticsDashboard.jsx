import { Calendar, Download, Star, TrendingUp, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Bar, BarChart, CartesianGrid, Cell, Line, LineChart, Pie, PieChart, ResponsiveContainer, Tooltip, XAxis, YAxis } from "recharts";
import { eventViewModel } from "../../components/shared/dataHelpers";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { clubs } from "../../data/mockClubs";
import { events } from "../../data/mockEvents";
import { facultyData, rsvpTrendData, yearData } from "../../data/mockAnalytics";

const COLORS = ["#7C0A02", "#D4AF37", "#374151", "#F59E0B", "#8B5CF6"];

function parseEventDate(value) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? null : new Date(parsed);
}

export default function AnalyticsDashboard() {
  const club = clubs[0];
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [selectedTag, setSelectedTag] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [engagementThreshold, setEngagementThreshold] = useState("all");

  const availableTags = Array.from(new Set(events.flatMap((event) => event.tags))).sort();

  const filteredEvents = useMemo(() => {
    const start = startDate ? parseEventDate(startDate) : null;
    const end = endDate ? parseEventDate(endDate) : null;

    return events.filter((event) => {
      const eventDate = parseEventDate(event.date);
      if (start && eventDate && eventDate < start) return false;
      if (end && eventDate && eventDate > end) return false;

      if (selectedTag !== "all" && !event.tags.some((tag) => tag.toLowerCase() === selectedTag.toLowerCase())) {
        return false;
      }

      if (selectedStatus !== "all" && event.status !== selectedStatus) {
        return false;
      }

      if (engagementThreshold !== "all") {
        const minimum = Number(engagementThreshold);
        if (event.rsvpCount < minimum) return false;
      }

      return true;
    });
  }, [startDate, endDate, selectedTag, selectedStatus, engagementThreshold]);

  const comparison = filteredEvents.slice(0, 6).map(eventViewModel);
  const totalRsvps = filteredEvents.reduce((sum, event) => sum + (event.rsvpCount || 0), 0);
  const averageRating = filteredEvents.length
    ? (filteredEvents.reduce((sum, event) => sum + (event.rating || 0), 0) / filteredEvents.length).toFixed(1)
    : "0.0";

  const exportAnalytics = () => {
    const rows = [
      ["Event Name", "Date", "RSVPs", "Views", "Rating", "Status", "Tags"],
      ...filteredEvents.map((event) => [event.title, event.date, event.rsvpCount, event.views, event.rating, event.status, event.tags.join(" | ")]),
    ];
    const csvContent = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "organizer-analytics.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Platform Analytics</h1>
          <p className="text-muted-foreground">System-wide performance overview</p>
        </div>
        <Button onClick={exportAnalytics} variant="outline" className="w-full lg:w-auto">
          <Download className="w-4 h-4" />
          Export CSV
        </Button>
      </div>

      <div className="bg-card rounded-xl border border-border p-4 md:p-5 mb-6">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-5">
          <label className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Date range</span>
            <div className="flex gap-2">
              <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" />
              <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" />
            </div>
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Tags</span>
            <Select value={selectedTag} onValueChange={setSelectedTag}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All tags" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All tags</SelectItem>
                {availableTags.map((tag) => (
                  <SelectItem key={tag} value={tag}>
                    {tag}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Status</span>
            <Select value={selectedStatus} onValueChange={setSelectedStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="published">Published</SelectItem>
                <SelectItem value="draft">Draft</SelectItem>
              </SelectContent>
            </Select>
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Engagement threshold</span>
            <Select value={engagementThreshold} onValueChange={setEngagementThreshold}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All events</SelectItem>
                <SelectItem value="50">50+ RSVPs</SelectItem>
                <SelectItem value="100">100+ RSVPs</SelectItem>
                <SelectItem value="150">150+ RSVPs</SelectItem>
              </SelectContent>
            </Select>
          </label>

          <div className="flex items-end">
            <Button variant="ghost" className="w-full" onClick={() => { setStartDate(""); setEndDate(""); setSelectedTag("all"); setSelectedStatus("all"); setEngagementThreshold("all"); }}>
              Clear filters
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
        {[[Calendar, "Total Events", filteredEvents.length, `${filteredEvents.length === events.length ? "+3 this month" : "filtered view"}`], [Users, "Total RSVPs", totalRsvps.toLocaleString(), filteredEvents.length ? "+updated" : "no matches"], [Star, "Average Rating", averageRating, "from filtered events"], [TrendingUp, "Followers", club.followers.toLocaleString(), "+47 this week"]].map(([Icon, label, value, note]) => (
          <div key={label} className="bg-card rounded-xl p-4 border border-border">
            <div className="flex justify-between text-sm text-muted-foreground mb-2">
              <p>{label}</p>
              <Icon className="w-5 h-5 text-primary" />
            </div>
            <p className="text-2xl font-bold">{value}</p>
            <p className="text-xs text-green-600 mt-1">{note}</p>
          </div>
        ))}
      </div>

      <div className="grid lg:grid-cols-2 gap-6 mb-6">
        <Chart title="RSVP Trends (Last 30 Days)">
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={rsvpTrendData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="rsvps" stroke="#7C0A02" strokeWidth={2} />
            </LineChart>
          </ResponsiveContainer>
        </Chart>
        <Chart title="Faculty Distribution">
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie data={facultyData} dataKey="value" outerRadius={80} label>
                {facultyData.map((entry, index) => <Cell key={entry.name} fill={COLORS[index % COLORS.length]} />)}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </Chart>
        <Chart title="Year of Study Distribution">
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={yearData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="year" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="count" fill="#D4AF37" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Chart>
        <Chart title="Quick Actions">
          <div className="space-y-3">
            <Link to="/platform/admin/moderation" className="block p-4 bg-background rounded-lg hover:bg-muted">
              <b>Moderation Queue</b>
              <p className="text-sm text-muted-foreground">Review flagged events and announcements</p>
            </Link>
            <Link to="/platform/admin/club-moderation" className="block p-4 bg-background rounded-lg hover:bg-muted">
              <b>Club Verification</b>
              <p className="text-sm text-muted-foreground">Approve or reject club profile submissions</p>
            </Link>
            <Link to="/platform/admin" className="block p-4 bg-background rounded-lg hover:bg-muted">
              <b>Admin Dashboard</b>
              <p className="text-sm text-muted-foreground">Return to platform overview</p>
            </Link>
          </div>
        </Chart>
      </div>

      <div className="bg-card rounded-xl p-6 border border-border overflow-x-auto">
        <div className="flex items-center justify-between gap-3 mb-4">
          <h2 className="font-semibold">Event Comparison</h2>
          <p className="text-sm text-muted-foreground">{comparison.length} events shown</p>
        </div>
        <table className="w-full min-w-[640px] text-sm">
          <thead>
            <tr className="border-b">
              <th className="p-3 text-left">Event Name</th>
              <th className="p-3 text-left">Date</th>
              <th className="p-3 text-left">RSVPs</th>
              <th className="p-3 text-left">Views</th>
              <th className="p-3 text-left">Rating</th>
            </tr>
          </thead>
          <tbody>
            {comparison.map((event) => (
              <tr key={event.id} className="border-b hover:bg-muted/50">
                <td className="p-3 font-medium">{event.title}</td>
                <td className="p-3 text-muted-foreground">{event.date}</td>
                <td className="p-3"><span className="px-2 py-1 bg-primary/10 text-primary rounded-full">{event.rsvpCount}</span></td>
                <td className="p-3 text-muted-foreground">{event.views}</td>
                <td className="p-3"><Star className="w-4 h-4 text-yellow-500 fill-current inline" /> {event.rating}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function Chart({ title, children }) {
  return (
    <section className="bg-card rounded-xl p-4 lg:p-6 border border-border">
      <h2 className="font-semibold mb-4">{title}</h2>
      {children}
    </section>
  );
}
