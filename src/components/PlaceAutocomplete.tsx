/// <reference types="google.maps" />
import { useEffect, useId, useRef, useState } from "react";
import { MapPin, Loader2 } from "lucide-react";
import { Input } from "@/components/ui/input";
import { loadGoogleMaps } from "@/lib/google-maps-loader";

export interface PlaceSelection {
  description: string;
  placeId: string;
  location?: { lat: number; lng: number };
}

interface Props {
  id?: string;
  value: string;
  onChange: (value: string) => void;
  onSelect: (place: PlaceSelection) => void;
  placeholder?: string;
  /** Restrict autocomplete to specific place types. */
  types?: string[];
  required?: boolean;
}

interface Suggestion {
  placeId: string;
  primary: string;
  secondary: string;
  full: string;
}

export function PlaceAutocomplete({
  id,
  value,
  onChange,
  onSelect,
  placeholder,
  types,
  required,
}: Props) {
  const fallbackId = useId();
  const inputId = id ?? fallbackId;
  const sessionTokenRef = useRef<google.maps.places.AutocompleteSessionToken | null>(null);
  const placesLibRef = useRef<google.maps.PlacesLibrary | null>(null);
  const [ready, setReady] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [suggestions, setSuggestions] = useState<Suggestion[]>([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const debounceRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadGoogleMaps()
      .then(async (g) => {
        const lib = (await g.maps.importLibrary("places")) as google.maps.PlacesLibrary;
        if (cancelled) return;
        placesLibRef.current = lib;
        sessionTokenRef.current = new lib.AutocompleteSessionToken();
        setReady(true);
      })
      .catch((e) => {
        if (!cancelled) setError(e.message ?? "Failed to load Google Maps");
      });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    if (!ready || !value.trim()) {
      setSuggestions([]);
      return;
    }
    if (debounceRef.current) clearTimeout(debounceRef.current);
    debounceRef.current = setTimeout(async () => {
      const lib = placesLibRef.current;
      const token = sessionTokenRef.current;
      if (!lib || !token) return;
      setLoading(true);
      try {
        const { suggestions: results } =
          await lib.AutocompleteSuggestion.fetchAutocompleteSuggestions({
            input: value,
            sessionToken: token,
            ...(types && types.length ? { includedPrimaryTypes: types } : {}),
          });
        const mapped: Suggestion[] = results
          .map((s) => {
            const p = s.placePrediction;
            if (!p) return null;
            return {
              placeId: p.placeId,
              primary: p.mainText?.toString() ?? p.text.toString(),
              secondary: p.secondaryText?.toString() ?? "",
              full: p.text.toString(),
            } satisfies Suggestion;
          })
          .filter((s): s is Suggestion => s !== null);
        setSuggestions(mapped);
        setOpen(true);
      } catch (e) {
        console.error("Autocomplete error", e);
      } finally {
        setLoading(false);
      }
    }, 220);

    return () => {
      if (debounceRef.current) clearTimeout(debounceRef.current);
    };
  }, [value, ready, types]);

  const handleSelect = async (s: Suggestion) => {
    onChange(s.full);
    setOpen(false);
    setSuggestions([]);
    const lib = placesLibRef.current;
    const token = sessionTokenRef.current;
    if (!lib) {
      onSelect({ description: s.full, placeId: s.placeId });
      return;
    }
    try {
      const place = new lib.Place({ id: s.placeId });
      await place.fetchFields({ fields: ["location", "displayName", "formattedAddress"] });
      const loc = place.location;
      onSelect({
        description:
          place.formattedAddress ?? place.displayName?.toString() ?? s.full,
        placeId: s.placeId,
        location: loc ? { lat: loc.lat(), lng: loc.lng() } : undefined,
      });
    } catch (e) {
      console.error("Place details error", e);
      onSelect({ description: s.full, placeId: s.placeId });
    } finally {
      // New session token for the next search
      if (placesLibRef.current) {
        sessionTokenRef.current = new placesLibRef.current.AutocompleteSessionToken();
      }
    }
  };

  return (
    <div className="relative">
      <div className="relative">
        <MapPin className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          id={inputId}
          value={value}
          onChange={(e) => onChange(e.target.value)}
          onFocus={() => suggestions.length > 0 && setOpen(true)}
          onBlur={() => setTimeout(() => setOpen(false), 150)}
          placeholder={placeholder}
          required={required}
          autoComplete="off"
          className="pl-9"
        />
        {loading && (
          <Loader2 className="absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 animate-spin text-muted-foreground" />
        )}
      </div>
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
      {open && suggestions.length > 0 && (
        <ul className="absolute z-50 mt-1 max-h-72 w-full overflow-auto rounded-2xl border border-border bg-popover p-1 shadow-lg">
          {suggestions.map((s) => (
            <li key={s.placeId}>
              <button
                type="button"
                onMouseDown={(e) => e.preventDefault()}
                onClick={() => handleSelect(s)}
                className="flex w-full items-start gap-2 rounded-xl px-3 py-2 text-left transition-colors hover:bg-accent/40"
              >
                <MapPin className="mt-0.5 h-4 w-4 shrink-0 text-primary" />
                <span className="min-w-0 flex-1">
                  <span className="block truncate text-sm font-semibold text-foreground">
                    {s.primary}
                  </span>
                  {s.secondary && (
                    <span className="block truncate text-xs text-muted-foreground">
                      {s.secondary}
                    </span>
                  )}
                </span>
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}