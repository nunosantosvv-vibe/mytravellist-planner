import santorini from "@/assets/santorini.jpg";
import tokyo from "@/assets/tokyo.jpg";
import bali from "@/assets/bali.jpg";
import newyork from "@/assets/newyork.jpg";
import paris from "@/assets/paris.jpg";
import capetown from "@/assets/capetown.jpg";

export type TripType = "Leisure" | "Business";

export interface ChecklistItem {
  id: string;
  label: string;
  done: boolean;
}

export interface Trip {
  id: string;
  destination: string;
  dates: string;
  type: TripType;
  image: string;
  workAddress?: string;
  placeId?: string;
  location?: { lat: number; lng: number };
  workPlaceId?: string;
  workLocation?: { lat: number; lng: number };
  checklist: ChecklistItem[];
  category: "upcoming" | "past";
}

const LEISURE_TASKS = [
  "Book flights",
  "Reserve accommodation",
  "Research local sights",
  "Pack swimwear",
  "Book restaurant reservations",
  "Check the weather forecast",
  "Download offline maps",
];

const BUSINESS_TASKS = [
  "Book flights",
  "Reserve accommodation",
  "Print boarding pass",
  "Confirm meeting location",
  "Pack business attire",
  "Charge laptop and devices",
  "Prepare presentation materials",
];

export function buildChecklist(type: TripType): ChecklistItem[] {
  const tasks = type === "Business" ? BUSINESS_TASKS : LEISURE_TASKS;
  return tasks.map((label, i) => ({
    id: `${i}-${label.toLowerCase().replace(/\s+/g, "-")}`,
    label,
    done: false,
  }));
}

export const fallbackImages = [santorini, tokyo, bali, newyork, paris, capetown];

export const upcomingTrips: Trip[] = [
  { id: "santorini", destination: "Santorini, Greece", dates: "Jun 12 – Jun 19, 2026", type: "Leisure", image: santorini, category: "upcoming", checklist: buildChecklist("Leisure") },
  { id: "tokyo", destination: "Tokyo, Japan", dates: "Jul 3 – Jul 10, 2026", type: "Business", image: tokyo, workAddress: "Shibuya Office Tower, Tokyo", category: "upcoming", checklist: buildChecklist("Business") },
  { id: "bali", destination: "Bali, Indonesia", dates: "Aug 15 – Aug 25, 2026", type: "Leisure", image: bali, category: "upcoming", checklist: buildChecklist("Leisure") },
  { id: "newyork", destination: "New York, USA", dates: "Sep 1 – Sep 5, 2026", type: "Business", image: newyork, workAddress: "350 5th Ave, New York", category: "upcoming", checklist: buildChecklist("Business") },
];

export const pastTrips: Trip[] = [
  { id: "paris", destination: "Paris, France", dates: "Apr 2 – Apr 9, 2025", type: "Leisure", image: paris, category: "past", checklist: buildChecklist("Leisure") },
  { id: "capetown", destination: "Cape Town, South Africa", dates: "Feb 10 – Feb 18, 2025", type: "Leisure", image: capetown, category: "past", checklist: buildChecklist("Leisure") },
  { id: "newyork-past", destination: "New York, USA", dates: "Nov 5 – Nov 9, 2024", type: "Business", image: newyork, workAddress: "350 5th Ave, New York", category: "past", checklist: buildChecklist("Business") },
];