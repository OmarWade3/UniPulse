export const clubs = [
  {
    id: "developer-community",
    name: "UTM Developer Community",
    initials: "DC",
    category: "Technology",
    verified: true,
    followers: 1234,
    eventsHeld: 48,
    healthScore: 87,
    description: "UTM's developer community for coding culture, tech events, peer learning, and industry connections.",
    social: { instagram: "https://instagram.com/utmdev", facebook: "https://facebook.com/utmdev", website: "https://utmdev.example" },
  },
  { id: "ai-society", name: "UTM AI Society", initials: "AI", category: "Technology", verified: true, followers: 842, eventsHeld: 21, healthScore: 82, description: "Student community exploring AI and ML." },
  { id: "tech-society", name: "UTM Tech Society", initials: "TS", category: "Technology", verified: true, followers: 990, eventsHeld: 32, healthScore: 84, description: "Talks and workshops on emerging technology." },
  { id: "sports-club", name: "UTM Sports Club", initials: "SC", category: "Sports", verified: true, followers: 1502, eventsHeld: 66, healthScore: 79, description: "Campus sports competitions and recreation." },
  { id: "cultural-society", name: "UTM Cultural Society", initials: "CS", category: "Arts", verified: true, followers: 1108, eventsHeld: 39, healthScore: 80, description: "Cultural showcases and arts events." },
  { id: "startup-club", name: "UTM Startup Club", initials: "SU", category: "Business", verified: true, followers: 612, eventsHeld: 17, healthScore: 76, description: "Entrepreneurship learning and founder networking." },
  { id: "photo-society", name: "UTM Photo Society", initials: "PS", category: "Arts", verified: false, followers: 430, eventsHeld: 14, healthScore: 68, description: "Photography walks, critique nights, and exhibitions." },
];

export const clubReviews = [
  { id: "r1", clubId: "developer-community", userId: "ahmad", rating: 5, date: "Apr 2026", eventId: "hackathon-2026", text: "Amazing event. The mentors were helpful and the vibe was electric." },
  { id: "r2", clubId: "developer-community", userId: "priya", rating: 4, date: "Mar 2026", eventId: "ml-workshop", text: "Well organised and practical. More Q&A time would make it even better." },
  { id: "r3", clubId: "developer-community", userId: "lee", rating: 5, date: "Feb 2026", eventId: "tech-talk", text: "Clear explanations and friendly facilitators." },
  { id: "r4", clubId: "developer-community", userId: "nurul", rating: 3, date: "Jan 2026", eventId: "tech-talk", text: "Good content, but the room was a little cramped." },
  { id: "r5", clubId: "developer-community", userId: "vikram", rating: 5, date: "Dec 2025", eventId: "cultural-night", text: "Strong speakers and valuable networking afterward." },
];

export const pendingClubs = [
  { id: "robotics", name: "UTM Robotics Lab", category: "Technology", submittedBy: "Aina Rahman", reason: "New club verification" },
  { id: "green-campus", name: "Green Campus Collective", category: "Environment", submittedBy: "Marcus Lee", reason: "Profile verification" },
];

export const clubCategoryOptions = [
  "Technology",
  "Arts & Culture",
  "Sports & Fitness",
  "Academic",
  "Social & Networking",
  "Volunteering",
  "Business & Entrepreneurship",
  "Gaming & Esports",
  "Music & Performance",
  "Photography",
  "Environment & Sustainability",
  "Health & Wellness",
];
