import { Link } from "@tanstack/react-router";
import type { Trip } from "@/lib/trips-data";
import { Calendar } from "lucide-react";

export function TripCard({ trip }: { trip: Trip }) {
  const isLeisure = trip.type === "Leisure";
  return (
    <Link
      to="/trips/$tripId"
      params={{ tripId: trip.id }}
      className="group block overflow-hidden rounded-3xl bg-card shadow-[var(--shadow-soft)] transition-transform duration-300 hover:-translate-y-1.5"
    >
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={trip.image}
          alt={trip.destination}
          width={800}
          height={600}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <span
          className={`absolute right-3 top-3 rounded-full px-3 py-1 text-xs font-bold text-white shadow ${
            isLeisure ? "bg-primary" : "bg-accent"
          }`}
        >
          {trip.type}
        </span>
      </div>
      <div className="p-4">
        <h3 className="text-base font-bold text-card-foreground">{trip.destination}</h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
          <Calendar className="h-3.5 w-3.5" />
          {trip.dates}
        </p>
      </div>
    </Link>
  );
}