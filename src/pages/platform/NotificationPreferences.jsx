import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link } from "react-router";
import { getStoredRole } from "../../components/shared/authRole";
import { getNotificationFallback } from "../../components/shared/roleNav";
import { notificationPreferenceDefaults } from "../../data/mockUsers";

export default function NotificationPreferences() {
  const role = getStoredRole();
  const backTo = getNotificationFallback(role);
  const [prefs, setPrefs] = useState(notificationPreferenceDefaults);
  const toggle = (key) => setPrefs((current) => ({ ...current, [key]: !current[key] }));

  return (
    <div className="max-w-md mx-auto px-4 py-6 pb-24 md:pb-6">
      <div className="flex gap-3 items-center mb-6">
        <Link to="/platform/notifications" className="p-2 rounded-lg hover:bg-muted">
          <ArrowLeft className="w-6 h-6" />
        </Link>
        <div>
          <span className="text-sm text-muted-foreground">Settings</span>
          <h1 className="font-bold">Notifications</h1>
        </div>
      </div>
      <Section title="Campus Activity">
        <Toggle
          label="Event Reminders"
          text="Get notified before RSVP'd campus events start."
          enabled={prefs.reminders}
          onToggle={() => toggle("reminders")}
        />
        <Toggle
          label="Club Announcements"
          text="Receive broadcast updates from clubs you follow."
          enabled={prefs.announcements}
          onToggle={() => toggle("announcements")}
        />
      </Section>
      <Section title="System & Personalization">
        <Toggle
          label="AI Recommendations"
          text="Weekly event roundups based on selected interests."
          enabled={prefs.recommendations}
          onToggle={() => toggle("recommendations")}
        />
        <Toggle
          label="Push Notifications"
          text="Allow instant alerts on your mobile home screen."
          enabled={prefs.push}
          onToggle={() => toggle("push")}
        />
      </Section>
      <button
        onClick={() => setPrefs(notificationPreferenceDefaults)}
        className="w-full text-sm text-muted-foreground mt-8 hover:text-foreground"
      >
        Reset to Default Settings
      </button>
      <Link to={backTo} className="block text-center text-sm text-primary mt-4 hover:underline">
        Back to dashboard
      </Link>
    </div>
  );
}

function Section({ title, children }) {
  return (
    <section className="mb-6">
      <h2 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-3 px-1">{title}</h2>
      <div className="bg-card rounded-xl border border-border overflow-hidden">{children}</div>
    </section>
  );
}

function Toggle({ label, text, enabled, onToggle }) {
  return (
    <div className="p-4 border-b border-border/50 last:border-b-0 flex justify-between gap-4">
      <div>
        <h3 className="font-semibold mb-1">{label}</h3>
        <p className="text-sm text-muted-foreground">{text}</p>
      </div>
      <button
        onClick={onToggle}
        aria-pressed={enabled}
        className={`relative inline-flex h-6 w-11 shrink-0 items-center rounded-full transition-colors ${
          enabled ? "bg-primary" : "bg-gray-300"
        }`}
      >
        <span
          className={`h-4 w-4 rounded-full bg-white transition-transform ${
            enabled ? "translate-x-6" : "translate-x-1"
          }`}
        />
      </button>
    </div>
  );
}
