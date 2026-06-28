import { AlertTriangle, BarChart3, CheckCircle, Download, Shield, Users } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { Button } from "../../components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../../components/ui/select";
import { adminStats, moderationQueueItems } from "../../data/mockAnalytics";
import { clubs, pendingClubs } from "../../data/mockClubs";

const statIcons = {
  users: Users,
  alert: AlertTriangle,
  check: CheckCircle,
  chart: BarChart3,
};

function parseDateValue(value) {
  const parsed = Date.parse(value);
  return Number.isNaN(parsed) ? null : new Date(parsed);
}

export default function AdminDashboard() {
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [contentType, setContentType] = useState("all");
  const [status, setStatus] = useState("all");

  const activeClubs = clubs.filter((club) => club.verified).length;
  const stats = adminStats.map((item) => ({
    ...item,
    value: item.value === "dynamic" ? activeClubs : item.value,
  }));

  const filteredModerationItems = useMemo(() => {
    const start = startDate ? parseDateValue(startDate) : null;
    const end = endDate ? parseDateValue(endDate) : null;

    return moderationQueueItems.filter((item) => {
      if (contentType !== "all" && item.type.toLowerCase() !== contentType) {
        return false;
      }

      const itemStatus = item.priorityScore >= 80 ? "flagged" : "pending";
      if (status !== "all" && itemStatus !== status) {
        return false;
      }

      const itemDate = parseDateValue(item.reportedAt || "Jun 4, 2026");
      if (start && itemDate && itemDate < start) return false;
      if (end && itemDate && itemDate > end) return false;

      return true;
    });
  }, [startDate, endDate, contentType, status]);

  const filteredPendingClubs = useMemo(() => {
    const start = startDate ? parseDateValue(startDate) : null;
    const end = endDate ? parseDateValue(endDate) : null;

    return pendingClubs.filter((club) => {
      const itemDate = parseDateValue(club.submittedAt || "Jun 5, 2026");
      if (start && itemDate && itemDate < start) return false;
      if (end && itemDate && itemDate > end) return false;
      return true;
    });
  }, [startDate, endDate]);

  const highPriorityItems = filteredModerationItems
    .slice()
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 3);

  const exportAdminReport = () => {
    const rows = [
      ["Section", "Title", "Type", "Status", "Reason", "Priority Score"],
      ...filteredModerationItems.map((item) => ["Moderation", item.title, item.type, item.priorityScore >= 80 ? "Flagged" : "Pending", item.reason, item.priorityScore]),
      ...filteredPendingClubs.map((club) => ["Club Verification", club.name, "Club", "Pending", club.reason, "-"]),
    ];
    const csvContent = rows.map((row) => row.map((value) => `"${String(value).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "admin-analytics.csv";
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 pb-24">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between mb-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform moderation and club operations overview</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button onClick={exportAdminReport} variant="outline" className="w-full sm:w-auto">
            <Download className="w-4 h-4" />
            Export CSV
          </Button>
          <Link to="/platform/analytics" className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg inline-flex items-center justify-center gap-2">
            <BarChart3 className="w-4 h-4" />
            View Analytics
          </Link>
        </div>
      </div>

      <div className="bg-card rounded-xl border border-border p-4 md:p-5 mb-6">
        <div className="grid gap-3 md:grid-cols-2 xl:grid-cols-4">
          <label className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Date range</span>
            <div className="flex gap-2">
              <input type="date" value={startDate} onChange={(event) => setStartDate(event.target.value)} className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" />
              <input type="date" value={endDate} onChange={(event) => setEndDate(event.target.value)} className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm" />
            </div>
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Content type</span>
            <Select value={contentType} onValueChange={setContentType}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All content" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All content</SelectItem>
                <SelectItem value="event">Events</SelectItem>
                <SelectItem value="announcement">Announcements</SelectItem>
                <SelectItem value="club">Clubs</SelectItem>
              </SelectContent>
            </Select>
          </label>

          <label className="space-y-1.5">
            <span className="text-xs font-medium text-muted-foreground">Status</span>
            <Select value={status} onValueChange={setStatus}>
              <SelectTrigger className="w-full">
                <SelectValue placeholder="All statuses" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">All statuses</SelectItem>
                <SelectItem value="pending">Pending</SelectItem>
                <SelectItem value="flagged">Flagged</SelectItem>
              </SelectContent>
            </Select>
          </label>

          <div className="flex items-end">
            <Button variant="ghost" className="w-full" onClick={() => { setStartDate(""); setEndDate(""); setContentType("all"); setStatus("all"); }}>
              Clear filters
            </Button>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-6">
        {stats.map((stat) => {
          const Icon = statIcons[stat.icon] || Shield;
          return (
            <div key={stat.label} className="bg-card rounded-xl p-4 border border-border">
              <div className="flex items-center justify-between text-muted-foreground mb-3">
                <span className="text-xs">{stat.label}</span>
                <Icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-2xl font-bold">{stat.value}</p>
            </div>
          );
        })}
      </div>

      <div className="grid lg:grid-cols-3 gap-6">
        <section className="lg:col-span-2 bg-card rounded-xl border border-border overflow-hidden">
          <div className="p-5 border-b border-border flex items-center justify-between gap-3">
            <div>
              <h2 className="font-semibold">Priority Moderation</h2>
              <p className="text-sm text-muted-foreground">{filteredModerationItems.length} items matching current filters</p>
            </div>
            <Link to="/platform/admin/moderation" className="text-sm text-primary font-medium">Open queue</Link>
          </div>
          <div className="divide-y divide-border">
            {highPriorityItems.map((item) => (
              <Link key={item.id} to="/platform/admin/moderation" className="block p-5 hover:bg-muted/40">
                <div className="flex items-start justify-between gap-3 mb-2">
                  <div>
                    <span className="text-xs px-2 py-0.5 bg-muted rounded-full">{item.type}</span>
                    <h3 className="font-medium mt-2">{item.title}</h3>
                  </div>
                  <span className="text-xs font-semibold px-2 py-1 rounded-full bg-destructive/10 text-destructive">{item.priorityScore}</span>
                </div>
                <p className="text-sm text-muted-foreground">{item.reason}</p>
              </Link>
            ))}
          </div>
        </section>

        <aside className="space-y-6">
          <section className="bg-card rounded-xl border border-border p-5">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h2 className="font-semibold">Club Verification</h2>
                <p className="text-sm text-muted-foreground">{filteredPendingClubs.length} submissions matching current filters</p>
              </div>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3">
              {filteredPendingClubs.map((club) => (
                <div key={club.id} className="p-3 bg-background rounded-lg border border-border">
                  <p className="font-medium text-sm">{club.name}</p>
                  <p className="text-xs text-muted-foreground">{club.reason}</p>
                </div>
              ))}
            </div>
            <Link to="/platform/admin/club-moderation" className="mt-4 w-full px-4 py-2.5 bg-primary/10 text-primary rounded-lg inline-flex justify-center">
              Review clubs
            </Link>
          </section>

          <section className="bg-card rounded-xl border border-border p-5">
            <h2 className="font-semibold mb-4">Club Health Snapshot</h2>
            <div className="space-y-3">
              {clubs.slice(0, 4).map((club) => (
                <div key={club.id}>
                  <div className="flex justify-between text-sm mb-1">
                    <span>{club.name}</span>
                    <b>{club.healthScore}</b>
                  </div>
                  <div className="h-2 bg-muted rounded-full overflow-hidden">
                    <div className="h-full bg-primary" style={{ width: `${club.healthScore}%` }} />
                  </div>
                </div>
              ))}
            </div>
          </section>
        </aside>
      </div>
    </div>
  );
}
