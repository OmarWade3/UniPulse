export const rsvpTrendData = [
  { date: "Apr 20", rsvps: 45 },
  { date: "Apr 27", rsvps: 67 },
  { date: "May 4", rsvps: 89 },
  { date: "May 11", rsvps: 125 },
  { date: "May 18", rsvps: 156 },
];

export const facultyData = [
  { name: "Computing", value: 35 },
  { name: "Engineering", value: 28 },
  { name: "Management", value: 18 },
  { name: "Science", value: 12 },
  { name: "Others", value: 7 },
];

export const yearData = [
  { year: "Year 1", count: 45 },
  { year: "Year 2", count: 67 },
  { year: "Year 3", count: 52 },
  { year: "Year 4", count: 38 },
];

export const healthMetrics = [
  { label: "Posting Frequency", score: 92, color: "#10B981" },
  { label: "RSVP Attendance Rate", score: 85, color: "#22C55E" },
  { label: "Follower Growth", score: 85, color: "#7C0A02" },
  { label: "Student Feedback Rating", score: 95, color: "#22C55E" },
  { label: "Post-Event Reporting", score: 60, color: "#D4AF37" },
];

export const broadcastHistory = [
  { id: "1", message: "Reminder: Hackathon 2026 registration closes tonight at 11:59 PM.", sentAt: "Jun 4, 2026 at 3:45 PM", deliveredTo: 1234 },
  { id: "2", message: "New workshop added. Learn about AI Ethics this Friday. Limited seats available.", sentAt: "Jun 2, 2026 at 10:20 AM", deliveredTo: 1234 },
  { id: "3", message: "Thank you to everyone who attended our ML Workshop yesterday. Slides are available on our website.", sentAt: "May 30, 2026 at 6:15 PM", deliveredTo: 1189 },
];

export const adminStats = [
  { label: "Active Clubs", value: "dynamic", icon: "users" },
  { label: "Pending Reviews", value: 6, icon: "alert" },
  { label: "Flags Resolved", value: 47, icon: "check" },
  { label: "Platform Health", value: "96%", icon: "chart" },
];

export const moderationQueueItems = [
  { id: "item1", type: "Event", title: "Cryptocurrency Trading Seminar", reportCount: 12, priorityScore: 85, reason: "Potentially misleading financial advice", flaggedBy: "Multiple users", image: "https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=800&h=400&fit=crop" },
  { id: "item2", type: "Event", title: "Gaming Tournament - Prize Pool", reportCount: 5, priorityScore: 62, reason: "Unverified prize claims", flaggedBy: "Automated system", image: "https://images.unsplash.com/photo-1542751371-adc38448a05e?w=800&h=400&fit=crop" },
  { id: "item3", type: "Announcement", title: "Exclusive Job Opportunity - Quick Money", reportCount: 18, priorityScore: 92, reason: "Potential scam/spam content", flaggedBy: "Multiple users", image: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?w=800&h=400&fit=crop" },
  { id: "item4", type: "Event", title: "Political Debate Session", reportCount: 8, priorityScore: 48, reason: "Potentially inflammatory content", flaggedBy: "User reports", image: "https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?w=800&h=400&fit=crop" },
];

export const moderationQueueStats = [
  { label: "Items Reviewed", value: 47 },
  { label: "Content Removed", value: 12 },
  { label: "Warnings Issued", value: 8 },
];
