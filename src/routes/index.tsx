import { createFileRoute } from "@tanstack/react-router";
import { Navbar } from "@/components/Navbar";
import { NewTripButton } from "@/components/NewTripButton";
import { UpcomingCarousel } from "@/components/UpcomingCarousel";
import { PastAdventuresGrid } from "@/components/PastAdventuresGrid";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "MyTravelList Assistant — Plan Trips Together" },
      { name: "description", content: "A playful collaborative travel planner. Create trips, track upcoming journeys, and relive past adventures." },
      { property: "og:title", content: "MyTravelList Assistant" },
      { property: "og:description", content: "Plan your next journey together with MyTravelList Assistant." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="space-y-12 py-10">
        <section className="mx-auto max-w-6xl px-4 text-center sm:px-6">
          <h1 className="text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
            Where to next?
          </h1>
          <p className="mx-auto mt-2 max-w-md text-muted-foreground">
            Plan, organize, and share your adventures — all in one place.
          </p>
          <div className="mt-6 flex justify-center">
            <NewTripButton />
          </div>
        </section>
        <UpcomingCarousel />
        <PastAdventuresGrid />
      </main>
    </div>
  );
}
