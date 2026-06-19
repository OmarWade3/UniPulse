export const students = [
  { id: "sarah", fullName: "Sarah Chen", initials: "SC", matricNumber: "1234567890", faculty: "Faculty of Computing", yearOfStudy: "Year 2", interests: ["Technology", "Entrepreneurship", "Photography"] },
  { id: "ahmad", fullName: "Ahmad Faris", initials: "AF", matricNumber: "1234567891", faculty: "Engineering", yearOfStudy: "Year 3" },
  { id: "priya", fullName: "Priya Nair", initials: "PN", matricNumber: "1234567892", faculty: "Management", yearOfStudy: "Year 2" },
  { id: "lee", fullName: "Lee Jun Hao", initials: "LJ", matricNumber: "1234567893", faculty: "Computing", yearOfStudy: "Year 1" },
  { id: "nurul", fullName: "Nurul Ain", initials: "NA", matricNumber: "1234567894", faculty: "Science", yearOfStudy: "Year 2" },
  { id: "vikram", fullName: "Vikram Raj", initials: "VR", matricNumber: "1234567895", faculty: "Engineering", yearOfStudy: "Year 4" },
];

export const registrationResponses = [
  { id: "1", studentId: "sarah", eventId: "hackathon-2026", submissionDate: "Jun 5, 2026", dietaryRestrictions: "Vegetarian", selectedSession: "Morning Session (9:00 AM - 12:00 PM)" },
  { id: "2", studentId: "ahmad", eventId: "hackathon-2026", submissionDate: "Jun 5, 2026", dietaryRestrictions: "Halal", selectedSession: "Afternoon Session (2:00 PM - 5:00 PM)" },
  { id: "3", studentId: "priya", eventId: "hackathon-2026", submissionDate: "Jun 4, 2026", dietaryRestrictions: "", selectedSession: "Morning Session (9:00 AM - 12:00 PM)" },
  { id: "4", studentId: "lee", eventId: "hackathon-2026", submissionDate: "Jun 4, 2026", dietaryRestrictions: "No peanuts", selectedSession: "Evening Session (6:00 PM - 9:00 PM)" },
  { id: "5", studentId: "nurul", eventId: "hackathon-2026", submissionDate: "Jun 4, 2026", dietaryRestrictions: "", selectedSession: "Afternoon Session (2:00 PM - 5:00 PM)" },
  { id: "6", studentId: "vikram", eventId: "hackathon-2026", submissionDate: "Jun 3, 2026", dietaryRestrictions: "Vegan", selectedSession: "Morning Session (9:00 AM - 12:00 PM)" },
];

export const notificationItems = [
  { id: "n1", type: "announcement", title: "Venue Change: Tech Talk", clubId: "tech-society", eventId: "tech-talk", timestamp: "10m ago", isRead: false },
  { id: "n2", type: "reminder", title: "Reminder: Hackathon starts in 1 hour!", eventId: "hackathon-2026", timestamp: "1h ago", isRead: false },
  { id: "n3", type: "confirmation", title: "Your RSVP for Cultural Night is confirmed", eventId: "cultural-night", timestamp: "Yesterday", isRead: true },
  { id: "n4", type: "system", title: "Welcome to the new UniPulse app!", timestamp: "2 days ago", isRead: true },
];

export const interestOptions = ["Technology", "Sports", "Arts", "Volunteering", "Gaming", "Entrepreneurship", "Music", "Photography"];

export const notificationPreferenceDefaults = {
  reminders: true,
  announcements: true,
  recommendations: false,
  push: true,
};

export const chatbotSeed = {
  greeting: "Hi! I'm your UniPulse AI assistant. I can help you discover events, answer club questions, and provide personalised recommendations.",
  prompts: [
    "What tech events are happening this week?",
    "Show me events related to entrepreneurship",
    "When is the basketball tournament?",
  ],
};
