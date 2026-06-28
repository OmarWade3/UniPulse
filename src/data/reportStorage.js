const STORAGE_KEY = "unipulse-event-reports";

export function getStoredEventReports() {
  if (typeof window === "undefined") return [];

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function saveEventReport(report) {
  const reports = getStoredEventReports();
  const entry = {
    id: `report-${Date.now()}`,
    type: "Event",
    title: report.eventTitle,
    reason: report.reason,
    details: report.details,
    reportedBy: report.reportedBy || "Student",
    eventId: report.eventId,
    priorityScore: 78,
    reportedAt: new Date().toISOString(),
  };

  const nextReports = [entry, ...reports];
  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(nextReports));
  window.dispatchEvent(new Event("event-reports-updated"));
  return entry;
}
