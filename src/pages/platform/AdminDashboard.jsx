import { AlertTriangle, BarChart3, CheckCircle, Shield, Users } from "lucide-react";
import { Link } from "react-router";
import { adminStats, moderationQueueItems } from "../../data/mockAnalytics";
import { clubs, pendingClubs } from "../../data/mockClubs";

const statIcons = {
  users: Users,
  alert: AlertTriangle,
  check: CheckCircle,
  chart: BarChart3,
};

export default function AdminDashboard() {
  const activeClubs = clubs.filter((club) => club.verified).length;
  const stats = adminStats.map((item) => ({
    ...item,
    value: item.value === "dynamic" ? activeClubs : item.value,
  }));
  const highPriorityItems = moderationQueueItems
    .slice()
    .sort((a, b) => b.priorityScore - a.priorityScore)
    .slice(0, 3);

  return (
    <div className="max-w-6xl mx-auto px-4 py-6 pb-24">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">Platform moderation and club operations overview</p>
        </div>
        <Link to="/platform/analytics" className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg inline-flex items-center justify-center gap-2">
          <BarChart3 className="w-4 h-4" />
          View Analytics
        </Link>
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
              <p className="text-sm text-muted-foreground">{moderationQueueItems.length} items pending review</p>
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
                <p className="text-sm text-muted-foreground">{pendingClubs.length} submissions waiting</p>
              </div>
              <Users className="w-5 h-5 text-primary" />
            </div>
            <div className="space-y-3">
              {pendingClubs.map((club) => (
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
