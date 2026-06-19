import { Bell, Calendar, Check, Settings } from "lucide-react";
import { Link } from "react-router";
import { getStoredRole } from "../../components/shared/authRole";
import { getClub } from "../../components/shared/dataHelpers";
import { getNotificationFallback } from "../../components/shared/roleNav";
import { notificationItems } from "../../data/mockUsers";

export default function Notifications() {
  const role = getStoredRole();
  const fallback = getNotificationFallback(role);
  const unread = notificationItems.filter((item) => !item.isRead).length;

  return (
    <div className="max-w-screen-sm mx-auto px-4 py-6 pb-24 md:pb-6">
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-2xl font-bold">Notification Centre</h1>
          <p className="text-sm text-muted-foreground">{unread} unread updates</p>
        </div>
        <Link
          to="/platform/notifications/preferences"
          className="p-3 bg-card border border-border rounded-xl hover:bg-muted"
          aria-label="Notification settings"
        >
          <Settings className="w-5 h-5" />
        </Link>
      </div>
      <div className="space-y-3">
        {notificationItems.map((item) => (
          <Link
            key={item.id}
            to={item.eventId && role === "student" ? `/student/events/${item.eventId}` : fallback}
            className={`block bg-card rounded-xl p-4 border transition-colors hover:border-primary/30 ${
              !item.isRead ? "border-primary/30 bg-red-50/70" : "border-border"
            }`}
          >
            <div className="flex gap-3">
              <div className="w-10 h-10 rounded-full bg-primary/10 text-primary grid place-items-center shrink-0">
                {item.type === "reminder" ? (
                  <Calendar className="w-5 h-5" />
                ) : item.type === "confirmation" ? (
                  <Check className="w-5 h-5" />
                ) : (
                  <Bell className="w-5 h-5" />
                )}
              </div>
              <div>
                <p className={`text-sm ${!item.isRead ? "font-bold" : ""}`}>{item.title}</p>
                <p className="text-xs text-muted-foreground">
                  {item.clubId ? `${getClub(item.clubId).name} · ` : ""}
                  {item.timestamp}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
