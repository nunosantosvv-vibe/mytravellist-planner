import { useTrips } from "@/lib/trips-store";
import { TripCard } from "./TripCard";

export function PastAdventuresGrid() {
  const { past } = useTrips();
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-foreground">
        Past Adventures
      </h2>
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {past.map((trip) => (
          <TripCard key={trip.id} trip={trip} />
        ))}
      </div>
    </section>
  );
}