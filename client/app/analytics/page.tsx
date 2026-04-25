"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Card from "../../components/ui/Card";
import Navbar from "../../components/navbar";

interface HydrationData {
  intake_ml: number;
  age: number;
  gender: string;
  activity: string;
  temp: number;
}

export default function AnalyticsPage() {
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [hydrationData, setHydrationData] = useState<HydrationData | null>(null);

  useEffect(() => {
    const savedAnalysis = localStorage.getItem("hydrationAnalysis");
    const savedData = localStorage.getItem("hydrationData");

    if (savedAnalysis) setAnalysis(savedAnalysis);
    if (savedData) setHydrationData(JSON.parse(savedData));
  }, []);

  const getHydrationScore = () => {
    if (!analysis) return 0;
    const text = analysis.toLowerCase();
    if (text.includes("excellent") || text.includes("optimal") || text.includes("sufficient")) return 90;
    if (text.includes("good") || text.includes("adequate")) return 75;
    if (text.includes("moderate") || text.includes("consider")) return 60;
    if (text.includes("increase") || text.includes("low") || text.includes("insufficient")) return 40;
    return 65;
  };

  const getHydrationStatus = () => {
    const score = getHydrationScore();
    if (score >= 80) return { text: "Great", color: "text-emerald-400" };
    if (score >= 60) return { text: "Good", color: "text-cyan-400" };
    if (score >= 40) return { text: "Moderate", color: "text-yellow-400" };
    return { text: "Low", color: "text-rose-400" };
  };

  const getTips = () => {
    if (!analysis) return [];
    const text = analysis.toLowerCase();
    const tips = [];

    if (text.includes("increase") || text.includes("more")) {
      tips.push("Try drinking a glass of water every 2 hours");
    }
    if (text.includes("activity") || text.includes("exercise")) {
      tips.push("Drink extra water before and after workouts");
    }
    if (text.includes("temperature") || text.includes("hot") || text.includes("climate")) {
      tips.push("Increase intake in hot weather conditions");
    }
    if (tips.length === 0) {
      tips.push("Keep up your current hydration routine");
      tips.push("Monitor your water intake throughout the day");
    }
    return tips;
  };

  const score = getHydrationScore();
  const status = getHydrationStatus();

  if (!analysis || !hydrationData) {
    return (
      <main className="relative min-h-screen px-4 pb-28 pt-6 text-slate-100 sm:px-6 lg:px-8">
        <div className="mx-auto max-w-2xl space-y-6">
          <Card>
            <div className="text-center py-8">
              <p className="text-lg text-slate-300">No analysis data available</p>
              <p className="mt-2 text-sm text-slate-400">Please analyze your hydration first</p>
              <Link
                href="/"
                className="mt-4 inline-block rounded-xl bg-cyan-500/20 px-6 py-3 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-300/40"
              >
                Go to Hydration Form
              </Link>
            </div>
          </Card>
          <Navbar />
        </div>
      </main>
    );
  }

  return (
    <main className="relative min-h-screen px-4 pb-28 pt-6 text-slate-100 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-128 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.22),transparent_65%)]"
      />
      <div className="mx-auto max-w-2xl space-y-6">
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-semibold text-slate-100 sm:text-2xl">
            Hydration Analytics
          </h1>
          <Link
            href="/"
            className="rounded-xl bg-slate-800/80 px-4 py-2 text-sm text-slate-200 ring-1 ring-white/10"
          >
            ← Back
          </Link>
        </div>

        <Card>
          <div className="flex flex-col items-center py-4 sm:py-6">
            <div className="relative flex h-28 w-28 items-center justify-center rounded-full bg-slate-800/60 ring-4 ring-cyan-400/30 sm:h-32 sm:w-32">
              <span className="text-3xl font-bold text-cyan-300 sm:text-4xl">{score}</span>
              <span className="absolute -bottom-1 text-xs text-slate-400">/ 100</span>
            </div>
            <p className={`mt-4 text-lg font-semibold ${status.color}`}>
              {status.text} Hydration
            </p>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-slate-100">Your Stats</h2>
          <div className="mt-4 grid grid-cols-2 gap-3 sm:grid-cols-4">
            <div className="rounded-xl bg-slate-800/60 p-3 text-center ring-1 ring-white/5">
              <p className="text-xs text-slate-400">Intake</p>
              <p className="mt-1 text-lg font-semibold text-cyan-200">{hydrationData.intake_ml}ml</p>
            </div>
            <div className="rounded-xl bg-slate-800/60 p-3 text-center ring-1 ring-white/5">
              <p className="text-xs text-slate-400">Age</p>
              <p className="mt-1 text-lg font-semibold text-slate-100">{hydrationData.age}</p>
            </div>
            <div className="rounded-xl bg-slate-800/60 p-3 text-center ring-1 ring-white/5">
              <p className="text-xs text-slate-400">Activity</p>
              <p className="mt-1 text-lg font-semibold text-slate-100">{hydrationData.activity}</p>
            </div>
            <div className="rounded-xl bg-slate-800/60 p-3 text-center ring-1 ring-white/5">
              <p className="text-xs text-slate-400">Temp</p>
              <p className="mt-1 text-lg font-semibold text-slate-100">{hydrationData.temp}°C</p>
            </div>
          </div>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-slate-100">AI Analysis</h2>
          <p className="mt-3 text-sm leading-relaxed text-slate-300">{analysis}</p>
        </Card>

        <Card>
          <h2 className="text-lg font-semibold text-slate-100">Tips for You</h2>
          <ul className="mt-3 space-y-2">
            {getTips().map((tip, index) => (
              <li key={index} className="flex items-start gap-2 text-sm text-slate-300">
                <span className="mt-0.5 text-cyan-400">•</span>
                {tip}
              </li>
            ))}
          </ul>
        </Card>

        <Navbar />
      </div>
    </main>
  );
}
