import { pastTrips } from "@/lib/trips-data";
import { TripCard } from "./TripCard";

export function PastAdventuresGrid() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-foreground">
        Past Adventures
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {pastTrips.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </section>
  );
}