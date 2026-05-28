import { createFileRoute, Link, useParams } from "@tanstack/react-router";
import {
  ArrowLeft,
  Calendar,
  MapPin,
  Briefcase,
  Palmtree,
  ExternalLink,
  Car,
  TrainFront,
  TramFront,
  Navigation,
  Compass,
} from "lucide-react";
import { Navbar } from "@/components/Navbar";
import { Checkbox } from "@/components/ui/checkbox";
import { useTrips } from "@/lib/trips-store";
import { getQuickLinks, getGettingAround, type TransportOption } from "@/lib/trip-helpers";

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
  const gettingAround = getGettingAround(trip);

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
            {trip.checklist.map((item) => {
              const quickLinks = getQuickLinks(item.label);
              return (
                <li
                  key={item.id}
                  className="rounded-2xl border border-border/70 px-4 py-3 transition-colors hover:bg-secondary/50"
                >
                  <div className="flex flex-wrap items-center gap-3">
                    <label className="flex flex-1 cursor-pointer items-center gap-3">
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
                    {quickLinks.length > 0 && (
                      <div className="flex flex-wrap gap-2">
                        {quickLinks.map((link) => (
                          <a
                            key={link.label}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-1 rounded-full bg-secondary px-3 py-1 text-xs font-semibold text-secondary-foreground transition-colors hover:bg-primary hover:text-primary-foreground"
                          >
                            {link.label}
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        ))}
                      </div>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        </section>

        <section className="mt-6 rounded-3xl bg-card p-5 shadow-[var(--shadow-soft)] sm:p-6">
          <div className="mb-1 flex items-center gap-2">
            <Compass className="h-5 w-5 text-primary" />
            <h2 className="text-xl font-extrabold text-foreground">Getting Around</h2>
          </div>
          <p className="mb-5 flex items-center gap-1.5 text-sm text-muted-foreground">
            <Navigation className="h-3.5 w-3.5" />
            ~{gettingAround.distanceKm.toLocaleString()} km away ·{" "}
            {gettingAround.nearby ? "Nearby city" : "Long-distance / domestic"} — here's how to
            move around:
          </p>
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
            {gettingAround.options.map((opt) => (
              <TransportCard key={opt.name} option={opt} />
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}

function TransportCard({ option }: { option: TransportOption }) {
  const iconMap = {
    uber: Car,
    subway: TramFront,
    car: Car,
    train: TrainFront,
  } as const;
  const Icon = iconMap[option.icon];
  return (
    <div className="flex items-center gap-3 rounded-2xl border border-border/70 p-4">
      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
        <Icon className="h-5 w-5" />
      </span>
      <div>
        <p className="font-bold text-foreground">{option.name}</p>
        <p className="text-sm text-muted-foreground">{option.description}</p>
      </div>
    </div>
  );
}