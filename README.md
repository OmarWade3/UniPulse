# UniPulse PWA Prototype

## Objective

The objective of this README is to provide an index table that helps students quickly navigate between the main functional modules in the UniPulse prototype and their corresponding frontend scripts, and to map each module to the team member responsible for it.

The table has three columns:

| Column | Description |
| --- | --- |
| Module | Lists the name of each functional module in the project. |
| Frontend Script | Provides clickable links to the actual script files in the repository. |
| PIC | The team member responsible (Person In Charge) for that module. |

## Setup Instructions

Install the project dependencies once:

```bash
npm install
```

Start the local Vite development server:

```bash
npm run dev
```

Open the app in your browser:

```text
http://localhost:5173/
```

Build the production version:

```bash
npm run build
```

## Team

| Name | Matric Number | Subsystem |
| --- | --- | --- |
| Fan Yujie | A24CS4010 | Subsystem 1: Student Experience System |
| Hosam Sayed Abdelaziz Eltalib | A24CS4015 | Subsystem 2: Organizer & Club Management System |
| Omer Haydar Elwadia | A24CS0321 | Subsystem 3: Platform Intelligence & Analytics System |

## Frontend Module Index

### Core Application (Shared — All Members)

| Module | Frontend Script | PIC |
| --- | --- | --- |
| App Routes | [`src/App.jsx`](src/App.jsx) | Shared |
| App Entry | [`src/main.jsx`](src/main.jsx) | Shared |
| Application Shell / Navigation | [`src/components/shared/AppShell.jsx`](src/components/shared/AppShell.jsx) | Shared |
| Role Storage and Redirect Helpers | [`src/components/shared/authRole.js`](src/components/shared/authRole.js) | Shared |
| Role-Based Navigation Config | [`src/components/shared/roleNav.js`](src/components/shared/roleNav.js) | Shared |
| Shared Event Card | [`src/components/shared/EventCard.jsx`](src/components/shared/EventCard.jsx) | Shared |
| Shared Floating Chatbot | [`src/components/shared/FloatingChatbot.jsx`](src/components/shared/FloatingChatbot.jsx) | Shared |
| Shared Notification Badge | [`src/components/shared/NotificationBadge.jsx`](src/components/shared/NotificationBadge.jsx) | Shared |

### Authentication & Onboarding (Module 1 & 2 — Subsystem 1)

| Module | Frontend Script | PIC |
| --- | --- | --- |
| Register Account | [`src/pages/auth/Register.jsx`](src/pages/auth/Register.jsx) | Fan Yujie |
| Verify Email via OTP | [`src/pages/auth/OTPVerify.jsx`](src/pages/auth/OTPVerify.jsx) | Fan Yujie |
| Login to Account / Forgot Password | [`src/pages/auth/Login.jsx`](src/pages/auth/Login.jsx) | Fan Yujie |
| Set Interest Profile (Onboarding) | [`src/pages/auth/InterestOnboarding.jsx`](src/pages/auth/InterestOnboarding.jsx) | Fan Yujie |

### Subsystem 1: Student Experience System — Fan Yujie

| Module | Frontend Script | PIC |
| --- | --- | --- |
| Module 3: Personalised Event Feed | [`src/pages/student/HomeFeed.jsx`](src/pages/student/HomeFeed.jsx) | Fan Yujie |
| Module 4: Event Discovery & Search | [`src/pages/student/SearchEvents.jsx`](src/pages/student/SearchEvents.jsx) | Fan Yujie |
| Module 4: View Event Details | [`src/pages/student/EventDetail.jsx`](src/pages/student/EventDetail.jsx) | Fan Yujie |
| Module 5: Campus Venue Map | [`src/pages/student/CampusMap.jsx`](src/pages/student/CampusMap.jsx) | Fan Yujie |
| Module 6: RSVP & Save (My Events) | [`src/pages/student/MyEvents.jsx`](src/pages/student/MyEvents.jsx) | Fan Yujie |
| Module 7: Post-Event Feedback | [`src/pages/student/Feedback.jsx`](src/pages/student/Feedback.jsx) | Fan Yujie |

### Subsystem 2: Organizer & Club Management System — Hosam Sayed

| Module | Frontend Script | PIC |
| --- | --- | --- |
| Module 1: Club & Channel Profile | [`src/pages/organizer/ClubProfile.jsx`](src/pages/organizer/ClubProfile.jsx) | Hosam Sayed |
| Module 2: Event Creation & Management | [`src/pages/organizer/OrganizerDashboard.jsx`](src/pages/organizer/OrganizerDashboard.jsx) | Hosam Sayed |
| Module 2: Create / Edit Event | [`src/pages/organizer/CreateEvent.jsx`](src/pages/organizer/CreateEvent.jsx) | Hosam Sayed |
| Module 3: Event Registration Form Builder (Organizer View) | [`src/pages/organizer/RegistrationResponses.jsx`](src/pages/organizer/RegistrationResponses.jsx) | Hosam Sayed |
| Module 3: Student Event Registration Form (Student-Facing) | [`src/pages/organizer/EventRegistrationForm.jsx`](src/pages/organizer/EventRegistrationForm.jsx) | Hosam Sayed |
| Module 4: Announcement Broadcast | [`src/pages/organizer/BroadcastComposer.jsx`](src/pages/organizer/BroadcastComposer.jsx) | Hosam Sayed |

### Subsystem 3: Platform Intelligence & Analytics System — Omer Haydar

| Module | Frontend Script | PIC |
| --- | --- | --- |
| Module 1: AI Recommendation Engine (surfaced in Home Feed) | [`src/pages/student/HomeFeed.jsx`](src/pages/student/HomeFeed.jsx) | Omer Haydar |
| Module 2: Analytics Dashboard | [`src/pages/platform/AnalyticsDashboard.jsx`](src/pages/platform/AnalyticsDashboard.jsx) | Omer Haydar |
| Module 3: Notification Delivery — Notification Centre | [`src/pages/platform/Notifications.jsx`](src/pages/platform/Notifications.jsx) | Omer Haydar |
| Module 3: Notification Delivery — Preferences | [`src/pages/platform/NotificationPreferences.jsx`](src/pages/platform/NotificationPreferences.jsx) | Omer Haydar |
| Module 4: AI Chatbot | [`src/pages/platform/Chatbot.jsx`](src/pages/platform/Chatbot.jsx) | Omer Haydar |
| Module 5: Club Health Score Engine | [`src/pages/platform/HealthScore.jsx`](src/pages/platform/HealthScore.jsx) | Omer Haydar |

### System Admin Pages (Cross-Subsystem — Omer Haydar)

| Module | Frontend Script | PIC |
| --- | --- | --- |
| Admin Dashboard | [`src/pages/platform/AdminDashboard.jsx`](src/pages/platform/AdminDashboard.jsx) | Omer Haydar |
| Admin Moderation Queue | [`src/pages/platform/AdminModerationQueue.jsx`](src/pages/platform/AdminModerationQueue.jsx) | Omer Haydar |
| Admin Club Verification / Moderation | [`src/pages/platform/AdminClubModeration.jsx`](src/pages/platform/AdminClubModeration.jsx) | Omer Haydar |
