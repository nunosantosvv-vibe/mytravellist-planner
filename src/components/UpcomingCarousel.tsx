import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { upcomingTrips } from "@/lib/trips-data";
import { TripCard } from "./TripCard";

export function UpcomingCarousel() {
  return (
    <section className="mx-auto w-full max-w-6xl px-4 sm:px-6">
      <h2 className="mb-4 text-2xl font-extrabold tracking-tight text-foreground">
        Upcoming Journeys
      </h2>
      <Carousel opts={{ align: "start" }} className="w-full">
        <CarouselContent className="-ml-4">
          {upcomingTrips.map((trip) => (
            <CarouselItem
              key={trip.id}
              className="basis-4/5 pl-4 sm:basis-1/2 lg:basis-1/3"
            >
              <TripCard trip={trip} />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:flex" />
        <CarouselNext className="hidden sm:flex" />
      </Carousel>
    </section>
  );
}