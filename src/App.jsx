import { Navigate, Route, Routes } from "react-router";
import { AppShell } from "./components/shared/AppShell";
import { getStoredRole, roleHomes } from "./components/shared/authRole";
import Register from "./pages/auth/Register";
import OTPVerify from "./pages/auth/OTPVerify";
import InterestOnboarding from "./pages/auth/InterestOnboarding";
import Login from "./pages/auth/Login";
import { OrganizerClubSignup } from "./pages/organizer/ClubProfile";
import HomeFeed from "./pages/student/HomeFeed";
import EventDetail from "./pages/student/EventDetail";
import SearchEvents from "./pages/student/SearchEvents";
import CampusMap from "./pages/student/CampusMap";
import MyEvents from "./pages/student/MyEvents";
import Feedback from "./pages/student/Feedback";
import ReportEvent from "./pages/student/ReportEvent";
import OrganizerDashboard from "./pages/organizer/OrganizerDashboard";
import CreateEvent from "./pages/organizer/CreateEvent";
import ClubProfile, { CreateClubProfile } from "./pages/organizer/ClubProfile";
import RegistrationResponses from "./pages/organizer/RegistrationResponses";
import EventRegistrationForm from "./pages/organizer/EventRegistrationForm";
import BroadcastComposer from "./pages/organizer/BroadcastComposer";
import AnalyticsDashboard from "./pages/platform/AnalyticsDashboard";
import Notifications from "./pages/platform/Notifications";
import NotificationPreferences from "./pages/platform/NotificationPreferences";
import HealthScore from "./pages/platform/HealthScore";
import AdminDashboard from "./pages/platform/AdminDashboard";
import AdminModerationQueue from "./pages/platform/AdminModerationQueue";
import AdminClubModeration from "./pages/platform/AdminClubModeration";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<AuthEntry />} />
      <Route path="/auth/register" element={<GuestOnly><Register /></GuestOnly>} />
      <Route path="/auth/otp" element={<GuestOnly><OTPVerify /></GuestOnly>} />
      <Route path="/auth/interests" element={<GuestOnly><InterestOnboarding /></GuestOnly>} />
      <Route path="/auth/organizer-club" element={<GuestOnly><OrganizerClubSignup /></GuestOnly>} />
      <Route path="/auth/login" element={<GuestOnly><Login /></GuestOnly>} />

      <Route element={<AppShell />}>
        <Route path="/student/feed" element={<RoleGate allowed={["student"]}><HomeFeed /></RoleGate>} />
        <Route path="/student/search" element={<RoleGate allowed={["student"]}><SearchEvents /></RoleGate>} />
        <Route path="/student/map" element={<RoleGate allowed={["student"]}><CampusMap /></RoleGate>} />
        <Route path="/student/my-events" element={<RoleGate allowed={["student"]}><MyEvents /></RoleGate>} />
        <Route path="/student/clubs/:clubId" element={<RoleGate allowed={["student"]}><ClubProfile /></RoleGate>} />
        <Route path="/student/events/:eventId" element={<RoleGate allowed={["student"]}><EventDetail /></RoleGate>} />
        <Route path="/student/events/:eventId/register" element={<RoleGate allowed={["student"]}><EventRegistrationForm /></RoleGate>} />
        <Route path="/student/events/:eventId/report" element={<RoleGate allowed={["student"]}><ReportEvent /></RoleGate>} />
        <Route path="/student/feedback/:eventId" element={<RoleGate allowed={["student"]}><Feedback /></RoleGate>} />

        <Route path="/organizer/dashboard" element={<RoleGate allowed={["organizer"]}><OrganizerDashboard /></RoleGate>} />
        <Route path="/organizer/events/new" element={<RoleGate allowed={["organizer"]}><CreateEvent /></RoleGate>} />
        <Route path="/organizer/events/:eventId/edit" element={<RoleGate allowed={["organizer"]}><CreateEvent /></RoleGate>} />
        <Route path="/organizer/club" element={<RoleGate allowed={["organizer"]}><ClubProfile /></RoleGate>} />
        <Route path="/organizer/club/new" element={<RoleGate allowed={["organizer"]}><CreateClubProfile /></RoleGate>} />
        <Route path="/organizer/club/:clubId" element={<RoleGate allowed={["organizer"]}><ClubProfile /></RoleGate>} />
        <Route path="/organizer/responses/:eventId" element={<RoleGate allowed={["organizer"]}><RegistrationResponses /></RoleGate>} />
        <Route path="/organizer/broadcast" element={<RoleGate allowed={["organizer"]}><BroadcastComposer /></RoleGate>} />

        <Route path="/platform/analytics" element={<RoleGate allowed={["admin"]}><AnalyticsDashboard /></RoleGate>} />
        <Route path="/platform/notifications" element={<RoleGate allowed={["student"]}><Notifications /></RoleGate>} />
        <Route path="/platform/notifications/preferences" element={<RoleGate allowed={["student"]}><NotificationPreferences /></RoleGate>} />
        <Route path="/platform/health-score" element={<RoleGate allowed={["admin", "organizer"]}><HealthScore /></RoleGate>} />
        <Route path="/platform/admin" element={<RoleGate allowed={["admin"]}><AdminDashboard /></RoleGate>} />
        <Route path="/platform/admin/moderation" element={<RoleGate allowed={["admin"]}><AdminModerationQueue /></RoleGate>} />
        <Route path="/platform/admin/club-moderation" element={<RoleGate allowed={["admin"]}><AdminClubModeration /></RoleGate>} />
      </Route>

      <Route path="/platform/chatbot" element={<LegacyChatbotRedirect />} />
      <Route path="*" element={<Navigate to="/auth/login" replace />} />
    </Routes>
  );
}

function AuthEntry() {
  const role = getStoredRole();
  if (role) return <Navigate to={roleHomes[role] || "/auth/login"} replace />;
  return <Navigate to="/auth/login" replace />;
}

function GuestOnly({ children }) {
  const role = getStoredRole();
  if (role) return <Navigate to={roleHomes[role] || "/auth/login"} replace />;
  return children;
}

function RoleGate({ allowed, children }) {
  const role = getStoredRole();
  if (!role) return <Navigate to="/auth/login" replace />;
  if (!allowed.includes(role)) return <Navigate to={roleHomes[role] || "/auth/login"} replace />;
  return children;
}

function LegacyChatbotRedirect() {
  const role = getStoredRole();
  if (!role) return <Navigate to="/auth/login" replace />;
  return <Navigate to={roleHomes[role] || "/auth/login"} replace />;
}
