import { Search, SlidersHorizontal, X } from "lucide-react";
import { useMemo, useState } from "react";
import { EventCard } from "../../components/shared/EventCard";
import { clubs } from "../../data/mockClubs";
import { eventSearchFilters, events } from "../../data/mockEvents";

export default function SearchEvents() {
  const [query, setQuery] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [category, setCategory] = useState("All");
  const [faculty, setFaculty] = useState("All");
  const [club, setClub] = useState("All");
  const results = useMemo(
    () =>
      events.filter(
        (event) =>
          event.status === "published" &&
          event.title.toLowerCase().includes(query.toLowerCase()) &&
          (category === "All" || event.category === category) &&
          (club === "All" || event.clubId === clubs.find((item) => item.name === club)?.id)
      ),
    [query, category, faculty, club]
  );
  return (
    <div className="max-w-screen-sm mx-auto">
      <div className="bg-card border-b border-border sticky top-[65px] z-30 px-4 py-4">
        <h1 className="text-xl font-semibold mb-4">Discover Events</h1>
        <div className="flex gap-2"><div className="relative flex-1"><Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" /><input value={query} onChange={(e) => setQuery(e.target.value)} className="w-full pl-10 pr-4 py-2.5 bg-background rounded-lg border border-border" placeholder="Search events, clubs, venues..." /></div><button onClick={() => setShowFilters((v) => !v)} className="px-4 py-2.5 bg-primary text-primary-foreground rounded-lg"><SlidersHorizontal className="w-5 h-5" /></button></div>
      </div>
      {showFilters && <div className="bg-card border-b border-border px-4 py-4 space-y-4"><div className="flex justify-between"><h2 className="font-semibold">Filters</h2><button onClick={() => setShowFilters(false)}><X className="w-5 h-5" /></button></div><FilterPills label="Category" items={eventSearchFilters.categories} value={category} onChange={setCategory} /><FilterPills label="Date Range" items={eventSearchFilters.dateRanges} value="All" onChange={() => {}} /><Select label="Faculty" value={faculty} onChange={setFaculty} items={eventSearchFilters.faculties} /><Select label="Club" value={club} onChange={setClub} items={["All", ...clubs.map((item) => item.name)]} /><div className="flex gap-2"><button onClick={() => { setCategory("All"); setFaculty("All"); setClub("All"); }} className="flex-1 px-4 py-2 border border-border rounded-lg">Reset</button><button onClick={() => setShowFilters(false)} className="flex-1 px-4 py-2 bg-primary text-primary-foreground rounded-lg">Apply Filters</button></div></div>}
      <div className="px-4 py-4 space-y-4"><p className="text-sm text-muted-foreground">Found {results.length} events</p>{results.map((event) => <EventCard key={event.id} event={event} />)}</div>
    </div>
  );
}

function FilterPills({ label, items, value, onChange }) {
  return <div><label className="block text-sm font-medium mb-2">{label}</label><div className="flex flex-wrap gap-2">{items.map((item) => <button key={item} onClick={() => onChange(item)} className={`px-3 py-1.5 rounded-full text-sm ${value === item ? "bg-primary text-primary-foreground" : "bg-muted"}`}>{item}</button>)}</div></div>;
}

function Select({ label, value, onChange, items }) {
  return <label className="block text-sm font-medium">{label}<select value={value} onChange={(e) => onChange(e.target.value)} className="mt-2 w-full px-3 py-2 bg-background rounded-lg border border-border">{items.map((item) => <option key={item}>{item}</option>)}</select></label>;
}
