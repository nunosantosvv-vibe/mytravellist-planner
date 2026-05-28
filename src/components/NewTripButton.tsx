import { Plus } from "lucide-react";

export function NewTripButton() {
  return (
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
  );
}