import { useEffect, useState } from "react";

export interface GeoCoords {
  latitude: number;
  longitude: number;
  accuracy?: number;
}

interface GPSStatusProps {
  onLocation?: (coords: GeoCoords | null) => void;
  watch?: boolean; // optional continuous updates
}

export default function GPSStatus({ onLocation, watch = false }: GPSStatusProps) {
  const [coords, setCoords] = useState<GeoCoords | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [status, setStatus] = useState<
    "requesting" | "granted" | "denied" | "error"
  >("requesting");

  const [error, setError] = useState<string | null>(null);
  const [watchId, setWatchId] = useState<number | null>(null);

  // ------------------------
  // AUTO LOCATION FETCH
  // ------------------------
  const requestLocation = () => {
    if (!("geolocation" in navigator)) {
      setError("Geolocation not supported in this browser.");
      setStatus("error");
      setLoading(false);
      onLocation?.(null);
      return;
    }

    setLoading(true);
    setError(null);
    setStatus("requesting");

    const success = (pos: GeolocationPosition) => {
      const c: GeoCoords = {
        latitude: pos.coords.latitude,
        longitude: pos.coords.longitude,
        accuracy: pos.coords.accuracy,
      };
      setCoords(c);
      setLoading(false);
      setStatus("granted");
      onLocation?.(c);
    };

    const fail = (err: GeolocationPositionError) => {
      console.error("GPS error:", err);
      setLoading(false);

      if (err.code === err.PERMISSION_DENIED) {
        setStatus("denied");
        setError("Permission denied by user.");
      } else if (err.code === err.TIMEOUT) {
        setStatus("error");
        setError("GPS timeout. Try again.");
      } else {
        setStatus("error");
        setError("Unable to get location.");
      }

      onLocation?.(null);
    };

    const options: PositionOptions = {
      enableHighAccuracy: true,
      timeout: 10000,
      maximumAge: 0,
    };

    if (watch) {
      const id = navigator.geolocation.watchPosition(success, fail, options);
      setWatchId(id);
    } else {
      navigator.geolocation.getCurrentPosition(success, fail, options);
    }
  };

  // ------------------------
  // AUTO RUN ON MOUNT
  // ------------------------
  useEffect(() => {
    requestLocation();

    return () => {
      if (watchId !== null) {
        navigator.geolocation.clearWatch(watchId);
      }
    };
  }, []);

  return (
    <div className="bg-white p-4 rounded-lg shadow w-full max-w-md text-sm">
      <h4 className="font-semibold text-gray-700 mb-2">Location</h4>

      {loading && (
        <p className="text-gray-600">Fetching location...</p>
      )}

      {status === "granted" && coords && (
        <div className="text-gray-700">
          <p>Latitude: {coords.latitude.toFixed(6)}</p>
          <p>Longitude: {coords.longitude.toFixed(6)}</p>
          <p>Accuracy: {Math.round(coords.accuracy || 0)}m</p>
        </div>
      )}

      {status === "denied" && (
        <p className="text-red-600">
          Location permission denied. Please enable it.
        </p>
      )}

      {status === "error" && (
        <p className="text-red-600">{error || "Unable to fetch location."}</p>
      )}
    </div>
  );
}
