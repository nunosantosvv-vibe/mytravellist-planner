import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import { ArrowLeft, Calendar, MapPin, Briefcase, Palmtree } from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Checkbox } from "@/components/ui/checkbox";
import { useTrips } from "@/lib/trips-store";

export const Route = createFileRoute("/trips/$tripId")({
  head: () => ({
    meta: [
      { title: "Trip Details — MyTravelList Assistant" },
      { name: "description", content: "View your trip details and pre-populated travel checklist." },
    ],
  }),
  component: TripDetail,
});

function TripDetail() {
  const { tripId } = useParams({ from: "/trips/$tripId" });
  const { getTrip, toggleChecklistItem } = useTrips();
  const trip = getTrip(tripId);

  if (!trip) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <div className="mx-auto max-w-md px-4 py-24 text-center">
          <h1 className="text-2xl font-extrabold text-foreground">Trip not found</h1>
          <p className="mt-2 text-muted-foreground">This trip may have been removed.</p>
          <Link
            to="/"
            className="mt-6 inline-flex rounded-full bg-primary px-5 py-2.5 font-semibold text-primary-foreground"
          >
            Back home
          </Link>
        </div>
      </div>
    );
  }

  const isLeisure = trip.type === "Leisure";
  const completed = trip.checklist.filter((i) => i.done).length;
  const total = trip.checklist.length;
  const pct = total ? Math.round((completed / total) * 100) : 0;

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-8 sm:px-6">
        <Link
          to="/"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-muted-foreground transition-colors hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to trips
        </Link>

        <div className="mt-4 overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)]">
          <div className="relative h-52 sm:h-64">
            <img
              src={trip.image}
              alt={trip.destination}
              width={800}
              height={600}
              className="h-full w-full object-cover"
            />
            <span
              className={`absolute right-4 top-4 inline-flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-bold text-white shadow ${
                isLeisure ? "bg-primary" : "bg-accent"
              }`}
            >
              {isLeisure ? <Palmtree className="h-3.5 w-3.5" /> : <Briefcase className="h-3.5 w-3.5" />}
              {trip.type}
            </span>
          </div>
          <div className="space-y-2 p-5 sm:p-6">
            <h1 className="text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
              {trip.destination}
            </h1>
            <p className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              {trip.dates}
            </p>
            {trip.type === "Business" && trip.workAddress && (
              <p className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-4 w-4" />
                {trip.workAddress}
              </p>
            )}
          </div>
        </div>

        <section className="mt-6 rounded-3xl bg-card p-5 shadow-[var(--shadow-soft)] sm:p-6">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-xl font-extrabold text-foreground">Trip checklist</h2>
            <span className="text-sm font-semibold text-muted-foreground">
              {completed}/{total} done
            </span>
          </div>
          <div className="mb-5 h-2 w-full overflow-hidden rounded-full bg-secondary">
            <div
              className="h-full rounded-full bg-primary transition-all duration-300"
              style={{ width: `${pct}%` }}
            />
          </div>
          <ul className="space-y-2">
            {trip.checklist.map((item) => (
              <li key={item.id}>
                <label className="flex cursor-pointer items-center gap-3 rounded-2xl border border-border/70 px-4 py-3 transition-colors hover:bg-secondary/50">
                  <Checkbox
                    checked={item.done}
                    onCheckedChange={() => toggleChecklistItem(trip.id, item.id)}
                  />
                  <span
                    className={`font-medium ${
                      item.done ? "text-muted-foreground line-through" : "text-foreground"
                    }`}
                  >
                    {item.label}
                  </span>
                </label>
              </li>
            ))}
          </ul>
        </section>
      </main>
    </div>
  );
}