import {
  AlertTriangle,
  BarChart3,
  CalendarDays,
  LayoutDashboard,
  Map,
  Megaphone,
  Plus,
  Search,
  Shield,
  Sparkles,
  Trophy,
  Users,
} from "lucide-react";
import { roleHomes } from "./authRole";

export const roleNavigation = {
  student: {
    home: roleHomes.student,
    label: "Student",
    primaryLinks: [
      { to: "/student/feed", label: "Feed", icon: Sparkles },
      { to: "/student/search", label: "Search", icon: Search },
      { to: "/student/map", label: "Map", icon: Map },
      { to: "/student/my-events", label: "My Events", icon: CalendarDays },
    ],
    menuLinks: [],
  },
  organizer: {
    home: roleHomes.organizer,
    label: "Organizer",
    primaryLinks: [
      { to: "/organizer/dashboard", label: "Dashboard", icon: LayoutDashboard },
      { to: "/organizer/events/new", label: "Create", icon: Plus },
      { to: "/organizer/broadcast", label: "Broadcast", icon: Megaphone },
      { to: "/organizer/club", label: "Club", icon: Users },
    ],
    menuLinks: [
      { to: "/platform/health-score", label: "Health Score", icon: Trophy },
    ],
  },
  admin: {
    home: roleHomes.admin,
    label: "Admin",
    primaryLinks: [
      { to: "/platform/admin", label: "Dashboard", icon: Shield },
      { to: "/platform/admin/moderation", label: "Moderation", icon: AlertTriangle },
      { to: "/platform/admin/club-moderation", label: "Clubs", icon: Users },
      { to: "/platform/analytics", label: "Analytics", icon: BarChart3 },
    ],
    menuLinks: [],
  },
};

export function getRoleNav(role) {
  return roleNavigation[role] || roleNavigation.student;
}

export function getNotificationFallback(role) {
  return getRoleNav(role).home;
}
