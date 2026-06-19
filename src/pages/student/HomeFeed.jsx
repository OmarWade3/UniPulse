import { Bell, Check, Search, Sparkles } from "lucide-react";
import { useMemo, useState } from "react";
import { Link } from "react-router";
import { EventCard } from "../../components/shared/EventCard";
import { eventViewModel } from "../../components/shared/dataHelpers";
import { notificationItems } from "../../data/mockUsers";
import { events, trendingEventIds } from "../../data/mockEvents";

export default function HomeFeed() {
  const [activeTab, setActiveTab] = useState("foryou");
  const [notificationOpen, setNotificationOpen] = useState(false);
  const trending = trendingEventIds.map((id) => eventViewModel(events.find((event) => event.id === id)));
  const visibleEvents = useMemo(() => events.filter((event) => event.status === "published"), []);
  const unread = notificationItems.filter((item) => !item.isRead).length;

  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="bg-card border-b border-border sticky top-[65px] z-30 px-4 py-3">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-primary rounded-full text-white grid place-items-center font-semibold">SC</div>
            <div>
              <h1 className="font-semibold">Welcome back!</h1>
              <p className="text-xs text-muted-foreground">Discover events for you</p>
            </div>
          </div>
          <div className="relative">
            <button onClick={() => setNotificationOpen((v) => !v)} className="relative"><Bell className="w-6 h-6" />{unread > 0 && <span className="absolute -top-1 -right-1 w-2 h-2 bg-destructive rounded-full" />}</button>
            {notificationOpen && (
              <div className="absolute right-0 top-full mt-3 w-80 bg-card rounded-xl shadow-xl border border-border overflow-hidden">
                <div className="p-4 border-b border-border flex justify-between"><h2 className="font-bold">Notifications</h2><Link to="/platform/notifications" className="text-sm text-primary">Open centre</Link></div>
                {notificationItems.map((item) => (
                  <Link key={item.id} to={item.eventId ? `/student/events/${item.eventId}` : "/platform/notifications"} className={`block p-4 hover:bg-muted/50 ${!item.isRead ? "bg-red-50" : ""}`}>
                    <p className={`text-sm ${!item.isRead ? "font-bold" : ""}`}>{item.title}</p>
                    <p className="text-xs text-muted-foreground">{item.timestamp}</p>
                  </Link>
                ))}
              </div>
            )}
          </div>
        </div>
        <Link to="/student/search" className="flex items-center gap-2 bg-background border border-border rounded-lg px-3 py-2 text-muted-foreground"><Search className="w-5 h-5" /> Search events, clubs, venues...</Link>
        <div className="grid grid-cols-2 mt-3 border-t border-border -mx-4">
          <button onClick={() => setActiveTab("foryou")} className={`py-3 font-medium ${activeTab === "foryou" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}><Sparkles className="w-4 h-4 inline mr-1" />For You</button>
          <button onClick={() => setActiveTab("all")} className={`py-3 font-medium ${activeTab === "all" ? "text-primary border-b-2 border-primary" : "text-muted-foreground"}`}>Trending</button>
        </div>
      </div>
      <section className="px-4 py-4">
        <div className="flex justify-between mb-3"><h2 className="font-semibold">Trending This Week</h2><span className="text-sm text-primary">See all</span></div>
        <div className="flex gap-3 overflow-x-auto pb-2">
          {trending.map((event) => (
            <Link key={event.id} to={`/student/events/${event.id}`} className="w-64 shrink-0 relative rounded-xl overflow-hidden">
              <img src={event.image} alt={event.title} className="w-full h-40 object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
              <div className="absolute bottom-0 p-3 text-white"><h3 className="font-semibold line-clamp-1">{event.title}</h3><p className="text-xs">{event.club.name}</p></div>
            </Link>
          ))}
        </div>
      </section>
      <section className="px-4 space-y-4 pb-6">
        {visibleEvents.map((event) => <EventCard key={event.id} event={event} actionLabel={activeTab === "foryou" ? "Recommended event" : "Open event"} />)}
      </section>
    </div>
  );
}
