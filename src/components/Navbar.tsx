import { Link } from "@tanstack/react-router";
import { Plane } from "lucide-react";

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border/60 bg-background/80 backdrop-blur-md">
      <nav className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
        <Link to="/" className="flex items-center gap-2">
          <span className="flex h-9 w-9 items-center justify-center rounded-2xl bg-primary text-primary-foreground shadow-[var(--shadow-soft)]">
            <Plane className="h-5 w-5 -rotate-45" />
          </span>
          <span className="text-lg font-extrabold tracking-tight text-foreground">
            MyTravelList
          </span>
        </Link>
        <Link
          to="/"
          className="rounded-full px-4 py-2 text-sm font-semibold text-foreground transition-colors hover:bg-secondary hover:text-secondary-foreground"
        >
          My Trips
        </Link>
      </nav>
    </header>
  );
}