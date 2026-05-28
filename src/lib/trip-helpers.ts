import type { Trip } from "./trips-data";

export interface QuickLink {
  label: string;
  url: string;
}

/** Returns quick-link buttons relevant to a checklist task, if any. */
export function getQuickLinks(label: string): QuickLink[] {
  const l = label.toLowerCase();

  if (l.includes("flight") || l.includes("boarding pass")) {
    return [
      { label: "Skyscanner", url: "https://www.skyscanner.net" },
      { label: "Google Flights", url: "https://www.google.com/travel/flights" },
    ];
  }

  if (l.includes("accommodation") || l.includes("hotel") || l.includes("lodging")) {
    return [
      { label: "Booking.com", url: "https://www.booking.com" },
      { label: "Agoda", url: "https://www.agoda.com" },
    ];
  }

  return [];
}

export interface TransportOption {
  name: string;
  description: string;
  icon: "uber" | "subway" | "car" | "train";
}

export interface GettingAroundInfo {
  distanceKm: number;
  nearby: boolean;
  options: TransportOption[];
}

/** Deterministic pseudo-distance so the same trip always classifies the same way. */
function simulateDistanceKm(trip: Trip): number {
  let hash = 0;
  const seed = trip.destination + trip.id;
  for (let i = 0; i < seed.length; i++) {
    hash = (hash * 31 + seed.charCodeAt(i)) >>> 0;
  }
  // Range roughly 20km – 3000km
  return 20 + (hash % 2980);
}

export function getGettingAround(trip: Trip): GettingAroundInfo {
  const distanceKm = simulateDistanceKm(trip);
  const nearby = distanceKm <= 300;

  const options: TransportOption[] = nearby
    ? [
        { name: "Uber", description: "Quick rides around the city", icon: "uber" },
        { name: "Subway / Metro", description: "Fast and affordable public transit", icon: "subway" },
      ]
    : [
        { name: "Car Rental", description: "Flexible road trips at your own pace", icon: "car" },
        { name: "Trains", description: "Comfortable intercity travel", icon: "train" },
      ];

  return { distanceKm, nearby, options };
}