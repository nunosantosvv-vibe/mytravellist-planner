import santorini from "@/assets/santorini.jpg";
import tokyo from "@/assets/tokyo.jpg";
import bali from "@/assets/bali.jpg";
import newyork from "@/assets/newyork.jpg";
import paris from "@/assets/paris.jpg";
import capetown from "@/assets/capetown.jpg";

export type TripType = "Leisure" | "Business";

export interface Trip {
  id: string;
  destination: string;
  dates: string;
  type: TripType;
  image: string;
}

export const upcomingTrips: Trip[] = [
  { id: "santorini", destination: "Santorini, Greece", dates: "Jun 12 – Jun 19, 2026", type: "Leisure", image: santorini },
  { id: "tokyo", destination: "Tokyo, Japan", dates: "Jul 3 – Jul 10, 2026", type: "Business", image: tokyo },
  { id: "bali", destination: "Bali, Indonesia", dates: "Aug 15 – Aug 25, 2026", type: "Leisure", image: bali },
  { id: "newyork", destination: "New York, USA", dates: "Sep 1 – Sep 5, 2026", type: "Business", image: newyork },
];

export const pastTrips: Trip[] = [
  { id: "paris", destination: "Paris, France", dates: "Apr 2 – Apr 9, 2025", type: "Leisure", image: paris },
  { id: "capetown", destination: "Cape Town, South Africa", dates: "Feb 10 – Feb 18, 2025", type: "Leisure", image: capetown },
  { id: "newyork-past", destination: "New York, USA", dates: "Nov 5 – Nov 9, 2024", type: "Business", image: newyork },
];