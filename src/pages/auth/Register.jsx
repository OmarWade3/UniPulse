import { Mail, Lock } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import { roleHomes, roleLabels, setPendingRole, setStoredRole } from "../../components/shared/authRole";

const roles = ["student", "organizer", "admin"];

export default function Register() {
  const [role, setRole] = useState("student");
  const navigate = useNavigate();
  const continueRegistration = () => {
    setPendingRole(role);
    if (role === "admin") {
      setStoredRole(role);
      navigate(roleHomes.admin);
      return;
    }
    navigate("/auth/otp");
  };

  return (
    <div className="min-h-screen grid place-items-center bg-background p-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <img src={logo} alt="UniPulse" className="h-16 w-auto mx-auto mb-4 object-contain" />
          <h1 className="text-3xl font-bold">Create UniPulse Account</h1>
          <p className="text-muted-foreground text-sm">Register with your UTM email</p>
        </div>
        <div className="bg-card rounded-2xl p-6 shadow-lg border border-border space-y-4">
          <div>
            <p className="text-sm font-medium mb-2">Choose role</p>
            <div className="grid grid-cols-3 gap-2">
              {roles.map((item) => (
                <button
                  key={item}
                  type="button"
                  onClick={() => setRole(item)}
                  className={`px-3 py-2 rounded-lg border text-sm ${role === item ? "border-primary bg-primary text-primary-foreground" : "border-border bg-background"}`}
                >
                  {roleLabels[item]}
                </button>
              ))}
            </div>
          </div>
          <label className="block text-sm">
            UTM Email
            <span className="relative block mt-2">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input className="w-full pl-10 pr-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" placeholder="yourname@graduate.utm.my" />
            </span>
          </label>
          <label className="block text-sm">
            Password
            <span className="relative block mt-2">
              <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
              <input type="password" className="w-full pl-10 pr-4 py-3 bg-input-background rounded-lg border border-border focus:outline-none focus:ring-2 focus:ring-primary" placeholder="Create a password" />
            </span>
          </label>
          <button onClick={continueRegistration} className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 transition-colors">
            {role === "admin" ? "Continue to Admin" : "Send OTP"}
          </button>
          <p className="text-center text-sm text-muted-foreground">
            Already have an account? <Link className="text-primary hover:underline" to="/auth/login">Sign in</Link>
          </p>
        </div>
      </div>
    </div>
  );
}
