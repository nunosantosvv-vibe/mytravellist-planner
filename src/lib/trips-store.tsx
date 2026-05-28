import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import {
  buildChecklist,
  fallbackImages,
  pastTrips,
  upcomingTrips,
  type Trip,
  type TripType,
} from "./trips-data";

const STORAGE_KEY = "mytravellist:trips:v1";

interface NewTripInput {
  destination: string;
  dates: string;
  type: TripType;
  workAddress?: string;
}

interface TripsContextValue {
  upcoming: Trip[];
  past: Trip[];
  getTrip: (id: string) => Trip | undefined;
  addTrip: (input: NewTripInput) => Trip;
  toggleChecklistItem: (tripId: string, itemId: string) => void;
}

const TripsContext = createContext<TripsContextValue | null>(null);

export function TripsProvider({ children }: { children: ReactNode }) {
  const [created, setCreated] = useState<Trip[]>([]);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setCreated(JSON.parse(raw) as Trip[]);
    } catch {
      /* ignore */
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(created));
    } catch {
      /* ignore */
    }
  }, [created]);

  const value = useMemo<TripsContextValue>(() => {
    const upcoming = [...created, ...upcomingTrips];
    const all = [...created, ...upcomingTrips, ...pastTrips];

    return {
      upcoming,
      past: pastTrips,
      getTrip: (id) => all.find((t) => t.id === id) ?? created.find((t) => t.id === id),
      addTrip: (input) => {
        const trip: Trip = {
          id: `trip-${Date.now()}`,
          destination: input.destination,
          dates: input.dates,
          type: input.type,
          workAddress: input.type === "Business" ? input.workAddress : undefined,
          image: fallbackImages[Math.floor(Math.random() * fallbackImages.length)],
          checklist: buildChecklist(input.type),
        };
        setCreated((prev) => [trip, ...prev]);
        return trip;
      },
      toggleChecklistItem: (tripId, itemId) => {
        setCreated((prev) =>
          prev.map((t) =>
            t.id === tripId
              ? {
                  ...t,
                  checklist: t.checklist.map((item) =>
                    item.id === itemId ? { ...item, done: !item.done } : item,
                  ),
                }
              : t,
          ),
        );
      },
    };
  }, [created]);

  return <TripsContext.Provider value={value}>{children}</TripsContext.Provider>;
}

export function useTrips() {
  const ctx = useContext(TripsContext);
  if (!ctx) throw new Error("useTrips must be used within a TripsProvider");
  return ctx;
}