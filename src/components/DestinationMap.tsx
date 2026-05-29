/// <reference types="google.maps" />
import { useEffect, useRef, useState } from "react";
import { loadGoogleMaps } from "@/lib/google-maps-loader";

interface Props {
  location: { lat: number; lng: number };
  label?: string;
  zoom?: number;
  className?: string;
}

export function DestinationMap({ location, label, zoom = 12, className }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const mapRef = useRef<google.maps.Map | null>(null);
  const markerRef = useRef<google.maps.Marker | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelled = false;
    loadGoogleMaps()
      .then((g) => {
        if (cancelled || !containerRef.current) return;
        if (!mapRef.current) {
          mapRef.current = new g.maps.Map(containerRef.current, {
            center: location,
            zoom,
            disableDefaultUI: true,
            zoomControl: true,
            clickableIcons: false,
          });
        } else {
          mapRef.current.setCenter(location);
          mapRef.current.setZoom(zoom);
        }
        if (markerRef.current) markerRef.current.setMap(null);
        markerRef.current = new g.maps.Marker({
          map: mapRef.current,
          position: location,
          title: label,
        });
      })
      .catch((e) => !cancelled && setError(e.message ?? "Map failed to load"));
    return () => {
      cancelled = true;
    };
  }, [location.lat, location.lng, zoom, label]);

  return (
    <div className={className}>
      <div
        ref={containerRef}
        className="h-64 w-full overflow-hidden rounded-2xl bg-secondary"
        role="img"
        aria-label={label ? `Map of ${label}` : "Destination map"}
      />
      {error && <p className="mt-2 text-xs text-destructive">{error}</p>}
    </div>
  );
}