import { ArrowLeft } from "lucide-react";
import { useState } from "react";
import { Link, useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import { finishPendingRole, roleHomes } from "../../components/shared/authRole";

export default function OTPVerify() {
    const [otp, setOtp] = useState(["", "", "", "", "", ""]);
    const navigate = useNavigate();

    const update = (index, value) => {
        const next = [...otp];
        next[index] = value.slice(-1);
        setOtp(next);
        if (value && index < 5) {
            document.getElementById(`otp-${index + 1}`)?.focus();
        }
    };

    const verify = () => {
        const pendingRole = localStorage.getItem("unipulsePendingRole") || "student";
        if (pendingRole === "student") {
            navigate("/auth/interests");
            return;
        }
        if (pendingRole === "organizer") {
            navigate("/auth/organizer-club");
            return;
        }
        finishPendingRole("organizer");
        navigate(roleHomes.organizer);
    };

    return (
        <div className="min-h-screen grid place-items-center bg-background p-6">
            <div className="w-full max-w-md">
                <Link to="/auth/register" className="flex items-center gap-2 text-muted-foreground mb-6">
                    <ArrowLeft className="w-5 h-5" /> Back
                </Link>
                <div className="text-center mb-6">
                    <img src={logo} alt="UniPulse" className="h-14 w-auto mx-auto mb-4 object-contain" />
                    <h1 className="text-2xl font-bold mb-2">Verify OTP</h1>
                    <p className="text-sm text-muted-foreground">Enter the 6-digit code sent to your UTM email.</p>
                </div>
                <div className="bg-card rounded-2xl p-6 shadow-lg border border-border">
                    <div className="grid grid-cols-6 gap-2 mb-6">
                        {otp.map((digit, index) => (
                            <input
                                key={index}
                                id={`otp-${index}`}
                                inputMode="numeric"
                                maxLength={1}
                                value={digit}
                                onChange={(event) => update(index, event.target.value.replace(/\D/g, ""))}
                                className="h-12 text-center border border-border rounded-lg bg-background focus:outline-none focus:ring-2 focus:ring-primary text-lg font-semibold"
                            />
                        ))}
                    </div>
                    <button
                        onClick={verify}
                        className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90"
                    >
                        Verify & Continue
                    </button>
                    <p className="text-center text-sm text-muted-foreground mt-4">
                        Did not receive a code? <button className="text-primary hover:underline">Resend OTP</button>
                    </p>
                </div>
            </div>
        </div>
    );
}
