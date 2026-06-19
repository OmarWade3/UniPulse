import { ArrowLeft, Eye, EyeOff, Lock, Mail } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import { roleHomes, roleLabels, setStoredRole } from "../../components/shared/authRole";

const roles = ["student", "organizer", "admin"];

export default function Login() {
    const [showPassword, setShowPassword] = useState(false);
    const [forgot, setForgot] = useState(false);
    const [sent, setSent] = useState(false);
    const [role, setRole] = useState("student");
    const navigate = useNavigate();
    const signIn = () => {
        setStoredRole(role);
        navigate(roleHomes[role]);
    };

    if (forgot) {
        return (
            <div className="min-h-screen grid place-items-center bg-background p-6">
                <div className="w-full max-w-md bg-card rounded-2xl p-6 border border-border shadow-lg">
                    <img src={logo} alt="UniPulse" className="h-12 w-auto mb-5 object-contain" />
                    <button onClick={() => { setForgot(false); setSent(false); }} className="flex items-center gap-2 text-muted-foreground mb-6"><ArrowLeft className="w-5 h-5" /> Back to Sign In</button>
                    {sent ? (
                        <>
                            <h1 className="text-2xl font-bold mb-2">Check Your Email</h1>
                            <p className="text-sm text-muted-foreground mb-6">A password reset link has been sent to your UTM email.</p>
                            <button onClick={() => setForgot(false)} className="w-full bg-primary text-primary-foreground py-3 rounded-lg">Back to Sign In</button>
                        </>
                    ) : (
                        <>
                            <h1 className="text-2xl font-bold mb-2">Forgot Password?</h1>
                            <p className="text-sm text-muted-foreground mb-6">Enter your UTM email and we will send a reset link.</p>
                            <input className="w-full px-4 py-3 bg-background rounded-lg border border-border mb-4" placeholder="yourname@graduate.utm.my" />
                            <button onClick={() => setSent(true)} className="w-full bg-primary text-primary-foreground py-3 rounded-lg">Send Reset Link</button>
                        </>
                    )}
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen grid place-items-center bg-background p-6">
            <div className="w-full max-w-md">
                <div className="text-center mb-8">
                    <img src={logo} alt="UniPulse" className="h-16 w-auto mx-auto mb-4 object-contain" />
                    <h1 className="text-3xl font-bold">Welcome Back</h1>
                    <p className="text-muted-foreground text-sm">Sign in to your UniPulse account</p>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-lg border border-border space-y-4">
                    <div>
                        <p className="text-sm font-medium mb-2">Sign in as</p>
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
                            <input className="w-full pl-10 pr-4 py-3 bg-input-background rounded-lg border border-border" placeholder="yourname@graduate.utm.my" />
                        </span>
                    </label>
                    <label className="block text-sm">
                        <span className="flex justify-between">Password <button onClick={() => setForgot(true)} className="text-xs text-primary">Forgot Password?</button></span>
                        <span className="relative block mt-2">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
                            <input type={showPassword ? "text" : "password"} className="w-full pl-10 pr-11 py-3 bg-input-background rounded-lg border border-border" placeholder="Enter your password" />
                            <button type="button" onClick={() => setShowPassword((v) => !v)} className="absolute right-3 top-1/2 -translate-y-1/2">{showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}</button>
                        </span>
                    </label>
                    <button onClick={signIn} className="w-full bg-primary text-primary-foreground py-3 rounded-lg">Sign In</button>
                    <p className="text-center text-sm text-muted-foreground">
                        New to UniPulse? <Link className="text-primary hover:underline" to="/auth/register">Create an account</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
