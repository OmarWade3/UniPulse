import { clubs } from "../../data/mockClubs";
import { healthMetrics } from "../../data/mockAnalytics";

export default function HealthScore() {
  const club = clubs[0];
  return <div className="max-w-md mx-auto px-4 py-8"><div className="text-center mb-6"><div className="w-24 h-24 bg-green-500 rounded-full text-white grid place-items-center mx-auto text-4xl font-bold">{club.healthScore}</div><h1 className="text-2xl font-bold mt-4">Club Health Score</h1><p className="text-sm text-muted-foreground">{club.name} performance breakdown</p></div><div className="space-y-4">{healthMetrics.map((metric) => <div key={metric.label} className="bg-card rounded-xl p-4 border border-border"><div className="flex justify-between mb-2"><span className="font-medium text-sm">{metric.label}</span><b style={{ color: metric.color }}>{metric.score}</b></div><div className="h-2 bg-muted rounded-full overflow-hidden"><div className="h-full rounded-full" style={{ width: `${metric.score}%`, backgroundColor: metric.color }} /></div></div>)}</div></div>;
}
