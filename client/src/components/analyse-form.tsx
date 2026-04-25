"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Card from "./ui/Card";
import getTemperature from "@/lib/getTemp";
import Field from "./ui/Field";

type Unit = "glasses" | "ml";
type Activity = "Low" | "Medium" | "High";

interface AnalyseFormProps {
  isSubmitting: boolean;
  setIsSubmitting: (submitting: boolean) => void;
  setAnalysisResult: (result: string | null) => void;
}

function AnalyseForm({ isSubmitting, setIsSubmitting, setAnalysisResult }: AnalyseFormProps) {
  const router = useRouter();
  const [unit, setUnit] = useState<Unit>("glasses");
  const [age, setAge] = useState("24");
  const [gender, setGender] = useState("Male");
  const [activity, setActivity] = useState<Activity>("Medium");
  const [temp, setTemp] = useState<number | null>(null);
  const [tempStatus, setTempStatus] = useState<"idle" | "loading" | "error">(
    "idle",
  );
  const [tempError, setTempError] = useState("");
  const [manualLocation, setManualLocation] = useState("");
  const [manualError, setManualError] = useState("");
  const [glassesIntake, setGlassesIntake] = useState("8");
  const [mlIntake, setMlIntake] = useState("2000");

  const handleSubmit = async () => {
    if (temp === null) {
      setTempError("Please get temperature first");
      return;
    }

    setIsSubmitting(true);
    setAnalysisResult(null); // Clear previous result
    const intakeMl = unit === "glasses" ? parseInt(glassesIntake) * 250 : parseInt(mlIntake);

    try {
      const response = await fetch("http://localhost:8000/log-intake", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          user_id: "user_1",
          intake_ml: intakeMl,
          age: parseInt(age),
          gender: gender,
          activity_level: activity,
          curr_temp: `${temp}°C`,
        }),
      });

      const data = await response.json();
      setAnalysisResult(data.analysis);
      localStorage.setItem("hydrationAnalysis", data.analysis);
      localStorage.setItem("hydrationData", JSON.stringify({
        intake_ml: intakeMl,
        age: parseInt(age),
        gender,
        activity,
        temp,
      }));
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleTemp = () => {
    if (!navigator.geolocation) {
      setTempError("Location not supported on this device.");
      setTempStatus("error");
      return;
    }

    setTempStatus("loading");
    setTempError("");

    navigator.geolocation.getCurrentPosition(
      async (pos) => {
        try {
          const value = await getTemperature(
            pos.coords.latitude,
            pos.coords.longitude,
          );
          setTemp(value);
          setTempStatus("idle");
        } catch (error) {
          console.log(error);
          setTempStatus("error");
          setTempError("Couldn’t fetch local weather.");
        }
      },
      () => {
        setTempStatus("error");
        setTempError("Location blocked. Allow access to fetch weather.");
      },
    );
  };

  return (
    <div className="space-y-4">
      <Card>
        <div className="flex rounded-2xl bg-slate-900/60 p-1 ring-1 ring-white/5">
          {(["glasses", "ml"] as Unit[]).map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setUnit(value)}
              className={`flex-1 rounded-xl px-4 py-3 text-sm font-semibold capitalize transition ${unit === value
                ? "bg-linear-to-r from-cyan-400 to-cyan-500 text-slate-950 shadow-lg shadow-cyan-900/50"
                : "text-slate-200"
                }`}
            >
              {value}
            </button>
          ))}
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-1">
          <Field label="Daily intake">
            <input
              value={unit === "glasses" ? glassesIntake : mlIntake}
              onChange={(e) => {
                if (unit === "glasses") setGlassesIntake(e.target.value);
                else setMlIntake(e.target.value);
              }}
              className="h-12 w-full rounded-2xl bg-slate-800/80 px-4 text-slate-100 outline-none ring-1 ring-white/10 placeholder:text-slate-500"
              placeholder={unit === "glasses" ? "Number of glasses per day (e.g. 8)" : "Total ml per day (e.g. 2000)"}
              inputMode="numeric"
            />
          </Field>
        </div>

        <div className="mt-4 grid grid-cols-1 gap-3 text-sm sm:grid-cols-2">
          <Field label="Age">
            <input
              value={age}
              onChange={(e) => setAge(e.target.value)}
              className="h-12 w-full rounded-2xl bg-slate-800/80 px-4 text-slate-100 outline-none ring-1 ring-white/10 placeholder:text-slate-500"
              placeholder="24"
              inputMode="numeric"
            />
          </Field>
          <Field label="Gender">
            <div className="relative h-12">
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="h-full w-full appearance-none rounded-2xl bg-slate-800/80 px-4 text-slate-100 outline-none ring-1 ring-white/10"
              >
                <option>Male</option>
                <option>Female</option>
                <option>Other</option>
              </select>
              <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-slate-400">
                v
              </span>
            </div>
          </Field>
        </div>

        <div className="mt-4 space-y-2">
          <p className="text-xs text-slate-400">Physical Activity</p>
          <div className="grid grid-cols-1 gap-2 sm:grid-cols-3">
            {(["Low", "Medium", "High"] as Activity[]).map((value) => (
              <button
                key={value}
                type="button"
                onClick={() => setActivity(value)}
                className={`rounded-xl px-3 py-3 text-sm font-medium transition ${activity === value
                  ? "bg-cyan-500/20 text-cyan-200 ring-1 ring-cyan-300/60"
                  : "bg-slate-800/70 text-slate-200 ring-1 ring-white/5"
                  }`}
              >
                {value}
              </button>
            ))}
          </div>
        </div>

        <div className="mt-4 space-y-2">
          <button
            type="button"
            onClick={handleTemp}
            className="flex w-full items-center justify-center gap-2 rounded-2xl bg-slate-900/80 px-4 py-3 text-sm font-semibold text-slate-100 ring-1 ring-white/10 transition hover:bg-slate-800"
          >
            <span className="text-cyan-300">🌡️</span>
            Find Current Temperature
          </button>
          <p className="text-[11px] text-slate-500">
            Requires location access for local weather.
          </p>
          {tempStatus === "loading" && (
            <p className="text-sm text-cyan-200">Getting weather...</p>
          )}
          {temp !== null && tempStatus === "idle" && (
            <p className="text-sm text-cyan-200">
              Current temp near you: <span className="font-semibold">{temp}°C</span>
            </p>
          )}
          {tempStatus === "error" && (
            <div className="space-y-2">
              <p className="text-sm text-rose-200">{tempError}</p>

              <div className="flex gap-2">
                <input
                  value={manualLocation}
                  onChange={(e) => setManualLocation(e.target.value)}
                  placeholder="Enter city or lat,lng (e.g. 37.77,-122.42)"
                  className="flex-1 h-10 rounded-xl bg-slate-800/80 px-3 text-slate-100 outline-none ring-1 ring-white/10"
                />
                <button
                  type="button"
                  onClick={async () => {
                    setManualError("");
                    setTempStatus("loading");
                    try {
                      // if input looks like lat,lng
                      const val = manualLocation.trim();
                      let lat: number | null = null;
                      let lon: number | null = null;

                      if (/^-?\d+(?:\.\d+)?\s*,\s*-?\d+(?:\.\d+)?$/.test(val)) {
                        const parts = val.split(",").map((p) => p.trim());
                        lat = parseFloat(parts[0]);
                        lon = parseFloat(parts[1]);
                      } else if (val.length > 0) {
                        // forward geocode using Nominatim
                        const r = await fetch(
                          `https://nominatim.openstreetmap.org/search?format=json&limit=1&q=${encodeURIComponent(val)}`,
                        );
                        const js = await r.json();
                        if (Array.isArray(js) && js.length > 0) {
                          lat = parseFloat(js[0].lat);
                          lon = parseFloat(js[0].lon);
                        }
                      }

                      if (lat === null || lon === null || Number.isNaN(lat) || Number.isNaN(lon)) {
                        throw new Error("Could not resolve location. Try a different query or use 'lat,lng'.");
                      }

                      const value = await getTemperature(lat, lon);
                      setTemp(value);
                      setTempStatus("idle");
                    } catch (err: any) {
                      console.error(err);
                      setTempStatus("error");
                      setManualError(err?.message || "Failed to fetch by manual location.");
                    }
                  }}
                  className="rounded-xl px-4 py-2 bg-cyan-500/20 text-cyan-200 ring-1 ring-cyan-300/40"
                >
                  Use manual location
                </button>
              </div>

              {manualError && <p className="text-sm text-rose-200">{manualError}</p>}
            </div>
          )}
        </div>
      </Card>

      <button 
        onClick={handleSubmit}
        disabled={isSubmitting}
        className="relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-full bg-linear-to-r from-cyan-400 via-cyan-500 to-teal-400 px-8 py-4 text-base font-semibold text-slate-950 shadow-[0_20px_60px_-25px_rgba(34,211,238,0.9)] transition hover:scale-[1.01] disabled:opacity-50"
      >
        <span>{isSubmitting ? "Analyzing..." : "Analyze Hydration"}</span>
        <span className="text-lg">🥤</span>
        <div className="absolute inset-0 bg-cyan-200/20 blur-2xl" aria-hidden />
      </button>
    </div>
  );
}

export default AnalyseForm;
