"use client";
import getTemperature from "../lib/getTemp";
import { useEffect, useState } from "react";

export default function FindLocation() {
  const [temperature, setTemperature] = useState<any>(null);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        const lat: number = pos.coords.latitude;
        const lng: number = pos.coords.longitude;
        const temp = await getTemperature(lat, lng);
        setTemperature(temp);
      },
      (err) => console.log(err.message)
    );
  }, []);

  return <div>{temperature !== null ? `Current Temperature: ${temperature}°C` : "Loading..."}</div>;
}