import { Bell, LogOut, Menu, X } from "lucide-react";
import { useState } from "react";
import { NavLink, Navigate, Outlet, useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import { clearStoredRole, getStoredRole, roleLabels } from "./authRole";
import { FloatingChatbot } from "./FloatingChatbot";
import { getRoleNav } from "./roleNav";

export function AppShell() {
  const role = getStoredRole();
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false);

  if (!role) {
    return <Navigate to="/auth/login" replace />;
  }

  const nav = getRoleNav(role);
  const allLinks = [...nav.primaryLinks, ...nav.menuLinks];
  const isStudent = role === "student";

  const logout = () => {
    clearStoredRole();
    setMenuOpen(false);
    navigate("/auth/login", { replace: true });
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      <header className="sticky top-0 z-40 bg-card/95 backdrop-blur border-b border-border">
        <div className="max-w-7xl mx-auto px-4 py-3 flex items-center gap-3">
          <NavLink to={nav.home} className="flex items-center gap-2 shrink-0 min-w-0">
            <img src={logo} alt="UniPulse" className="h-9 w-auto object-contain" />
            <span className="font-bold text-primary hidden sm:inline truncate">UniPulse</span>
          </NavLink>

          <span className="hidden lg:inline-flex items-center px-2.5 py-1 rounded-full bg-primary/10 text-primary text-xs font-medium">
            {roleLabels[role]}
          </span>

          <nav className="hidden md:flex items-center gap-1 ml-auto overflow-x-auto">
            {allLinks.map((link) => (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `px-3 py-1.5 rounded-lg text-sm whitespace-nowrap transition-colors ${
                    isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted text-foreground"
                  }`
                }
              >
                {link.label}
              </NavLink>
            ))}
            <button
              onClick={logout}
              className="px-3 py-1.5 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-destructive flex items-center gap-1.5 whitespace-nowrap"
            >
              <LogOut className="w-4 h-4" />
              Sign out
            </button>
          </nav>

          <div className="flex items-center gap-2 ml-auto md:ml-0">
            {isStudent && (
              <NavLink
                to="/platform/notifications"
                className="relative p-2 rounded-lg hover:bg-muted"
                aria-label="Notifications"
              >
                <Bell className="w-5 h-5" />
                <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-destructive rounded-full" />
              </NavLink>
            )}

            <button
              onClick={() => setMenuOpen(true)}
              className="md:hidden p-2 rounded-lg hover:bg-muted"
              aria-label="Open menu"
            >
              <Menu className="w-5 h-5" />
            </button>
          </div>
        </div>
      </header>

      {menuOpen && (
        <>
          <button
            className="fixed inset-0 bg-black/40 z-50 md:hidden"
            onClick={() => setMenuOpen(false)}
            aria-label="Close menu overlay"
          />
          <aside className="fixed top-0 right-0 h-full w-[min(20rem,calc(100vw-2rem))] bg-card border-l border-border z-50 shadow-2xl md:hidden flex flex-col animate-in fade-in-0">
            <div className="flex items-center justify-between p-4 border-b border-border">
              <div>
                <p className="font-semibold">Menu</p>
                <p className="text-xs text-muted-foreground">{roleLabels[role]} account</p>
              </div>
              <button
                onClick={() => setMenuOpen(false)}
                className="p-2 rounded-lg hover:bg-muted"
                aria-label="Close menu"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            <nav className="flex-1 overflow-y-auto p-3 space-y-1">
              {allLinks.map((link) => {
                const Icon = link.icon;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setMenuOpen(false)}
                    className={({ isActive }) =>
                      `flex items-center gap-3 px-3 py-3 rounded-xl text-sm transition-colors ${
                        isActive ? "bg-primary text-primary-foreground" : "hover:bg-muted"
                      }`
                    }
                  >
                    <Icon className="w-5 h-5 shrink-0" />
                    {link.label}
                  </NavLink>
                );
              })}
              <button
                onClick={logout}
                className="w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm text-destructive hover:bg-destructive/5"
              >
                <LogOut className="w-5 h-5 shrink-0" />
                Sign out
              </button>
            </nav>

            <div className="p-4 border-t border-border">
              <button
                onClick={logout}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl border border-border text-destructive hover:bg-destructive/5"
              >
                <LogOut className="w-4 h-4" />
                Sign out
              </button>
            </div>
          </aside>
        </>
      )}

      <main className="pb-24 md:pb-8">
        <Outlet />
      </main>

      <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-card border-t border-border z-40 safe-area-bottom">
        <div className="grid grid-cols-4 max-w-screen-sm mx-auto">
          {nav.primaryLinks.map((link) => {
            const Icon = link.icon;
            return (
              <NavLink
                key={link.to}
                to={link.to}
                className={({ isActive }) =>
                  `flex flex-col items-center gap-1 py-2.5 text-[11px] ${
                    isActive ? "text-primary font-medium" : "text-muted-foreground"
                  }`
                }
              >
                <Icon className="w-5 h-5" />
                {link.label}
              </NavLink>
            );
          })}
        </div>
      </nav>

      {isStudent && <FloatingChatbot />}
    </div>
  );
}
