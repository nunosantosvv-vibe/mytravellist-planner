import { useState } from "react";
import { useNavigate } from "@tanstack/react-router";
import { Plus, Briefcase, Palmtree } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useTrips } from "@/lib/trips-store";
import type { TripType } from "@/lib/trips-data";
import { PlaceAutocomplete, type PlaceSelection } from "@/components/PlaceAutocomplete";

export function NewTripDialog() {
  const navigate = useNavigate();
  const { addTrip } = useTrips();
  const [open, setOpen] = useState(false);
  const [destination, setDestination] = useState("");
  const [dates, setDates] = useState("");
  const [type, setType] = useState<TripType>("Leisure");
  const [workAddress, setWorkAddress] = useState("");
  const [destinationPlace, setDestinationPlace] = useState<PlaceSelection | null>(null);
  const [workPlace, setWorkPlace] = useState<PlaceSelection | null>(null);

  const reset = () => {
    setDestination("");
    setDates("");
    setType("Leisure");
    setWorkAddress("");
    setDestinationPlace(null);
    setWorkPlace(null);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!destination.trim() || !dates.trim()) return;
    const trip = addTrip({
      destination: destination.trim(),
      dates: dates.trim(),
      type,
      workAddress: workAddress.trim() || undefined,
      placeId: destinationPlace?.placeId,
      location: destinationPlace?.location,
      workPlaceId: workPlace?.placeId,
      workLocation: workPlace?.location,
    });
    setOpen(false);
    reset();
    navigate({ to: "/trips/$tripId", params: { tripId: trip.id } });
  };

  return (
    <Dialog
      open={open}
      onOpenChange={(o) => {
        setOpen(o);
        if (!o) reset();
      }}
    >
      <DialogTrigger asChild>
        <button
          type="button"
          className="group inline-flex items-center gap-3 rounded-full px-8 py-4 text-lg font-bold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform duration-200 hover:scale-[1.03] active:scale-100"
          style={{ backgroundImage: "var(--gradient-hero)" }}
        >
          <span className="flex h-7 w-7 items-center justify-center rounded-full bg-white/25">
            <Plus className="h-5 w-5 transition-transform duration-200 group-hover:rotate-90" />
          </span>
          New Trip
        </button>
      </DialogTrigger>
      <DialogContent className="rounded-3xl sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-extrabold">Plan a new trip</DialogTitle>
          <DialogDescription>
            Tell us a few details and we'll prep a checklist for you.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-1.5">
            <Label htmlFor="destination">Destination</Label>
            <PlaceAutocomplete
              id="destination"
              placeholder="Search a city or place…"
              value={destination}
              onChange={(v) => {
                setDestination(v);
                if (destinationPlace && v !== destinationPlace.description) {
                  setDestinationPlace(null);
                }
              }}
              onSelect={(p) => {
                setDestination(p.description);
                setDestinationPlace(p);
              }}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label htmlFor="dates">Dates</Label>
            <Input
              id="dates"
              placeholder="e.g. Oct 4 – Oct 11, 2026"
              value={dates}
              onChange={(e) => setDates(e.target.value)}
              required
            />
          </div>
          <div className="space-y-1.5">
            <Label>Trip type</Label>
            <div className="grid grid-cols-2 gap-3">
              {(["Leisure", "Business"] as TripType[]).map((t) => {
                const active = type === t;
                const Icon = t === "Leisure" ? Palmtree : Briefcase;
                return (
                  <button
                    type="button"
                    key={t}
                    onClick={() => setType(t)}
                    className={`flex items-center justify-center gap-2 rounded-2xl border-2 px-4 py-3 font-semibold transition-colors ${
                      active
                        ? "border-primary bg-primary/10 text-primary"
                        : "border-border bg-background text-muted-foreground hover:border-primary/40"
                    }`}
                  >
                    <Icon className="h-4 w-4" />
                    {t}
                  </button>
                );
              })}
            </div>
          </div>
          {type === "Business" && (
            <div className="space-y-1.5">
              <Label htmlFor="workAddress">Work address</Label>
              <PlaceAutocomplete
                id="workAddress"
                placeholder="Search the office address…"
                value={workAddress}
                onChange={(v) => {
                  setWorkAddress(v);
                  if (workPlace && v !== workPlace.description) setWorkPlace(null);
                }}
                onSelect={(p) => {
                  setWorkAddress(p.description);
                  setWorkPlace(p);
                }}
              />
            </div>
          )}
          <Button type="submit" className="w-full rounded-full py-6 text-base font-bold">
            Create trip & build checklist
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
}