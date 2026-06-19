export const roleHomes = {
  student: "/student/feed",
  organizer: "/organizer/dashboard",
  admin: "/platform/admin",
};

export const roleLabels = {
  student: "Student",
  organizer: "Organizer",
  admin: "Admin",
};

export function getStoredRole() {
  if (typeof window === "undefined") return "";
  return localStorage.getItem("unipulseRole") || "";
}

export function setStoredRole(role) {
  if (typeof window === "undefined") return;
  localStorage.setItem("unipulseRole", role);
}

export function setPendingRole(role) {
  if (typeof window === "undefined") return;
  localStorage.setItem("unipulsePendingRole", role);
}

export function finishPendingRole(fallback = "student") {
  if (typeof window === "undefined") return fallback;
  const role = localStorage.getItem("unipulsePendingRole") || fallback;
  localStorage.removeItem("unipulsePendingRole");
  setStoredRole(role);
  return role;
}

export function clearStoredRole() {
  if (typeof window === "undefined") return;
  localStorage.removeItem("unipulseRole");
  localStorage.removeItem("unipulsePendingRole");
}
