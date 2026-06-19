import { Check } from "lucide-react";
import { useState } from "react";
import { useNavigate } from "react-router";
import logo from "../../assets/logo.png";
import { finishPendingRole, roleHomes } from "../../components/shared/authRole";
import { interestOptions } from "../../data/mockUsers";

export default function InterestOnboarding() {
    const [selected, setSelected] = useState(["Technology"]);
    const navigate = useNavigate();
    const toggle = (item) =>
        setSelected((current) =>
            current.includes(item) ? current.filter((x) => x !== item) : [...current, item]
        );

    const continueToApp = () => {
        finishPendingRole("student");
        navigate(roleHomes.student);
    };

    return (
        <div className="min-h-screen bg-background p-6 grid place-items-center">
            <div className="w-full max-w-2xl">
                <div className="text-center mb-6">
                    <img src={logo} alt="UniPulse" className="h-14 w-auto mx-auto mb-4 object-contain" />
                    <h1 className="text-3xl font-bold mb-2">Personalise Your Feed</h1>
                    <p className="text-muted-foreground">
                        Choose interests for AI recommendations and trending event discovery.
                    </p>
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-8">
                    {interestOptions.map((interest) => (
                        <button
                            key={interest}
                            onClick={() => toggle(interest)}
                            className={`p-4 rounded-xl border-2 text-left transition-all ${selected.includes(interest) ? "border-primary bg-primary/5" : "border-border bg-card"
                                }`}
                        >
                            <div className="flex items-center justify-between">
                                <span className="font-medium text-sm">{interest}</span>
                                {selected.includes(interest) && <Check className="w-4 h-4 text-primary" />}
                            </div>
                        </button>
                    ))}
                </div>
                <button
                    onClick={continueToApp}
                    disabled={selected.length === 0}
                    className="w-full bg-primary text-primary-foreground py-3 rounded-lg hover:bg-primary/90 disabled:opacity-50"
                >
                    Start Exploring ({selected.length} selected)
                </button>
            </div>
        </div>
    );
}
