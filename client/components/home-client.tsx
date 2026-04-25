"use client";

import React, { useState } from "react";

import Header from "./header";
import Navbar from "./navbar";
import Hero from "./hero";
import AnalyseForm from "./analyse-form";
import Card from "./ui/Card";

const features = [
  {
    title: "Smart AI baseline",
    icon: "✦",
    description: "Personalized intake target built around your profile.",
  },
  {
    title: "Metabolic sync",
    icon: "🔥",
    description: "Suggestions adapt to activity and daily intensity.",
  },
  {
    title: "Humidity auto-adjust",
    icon: "☁️",
    description: "Weather-aware hydration guidance in changing climates.",
  },
  {
    title: "Pet profiles",
    icon: "🐾",
    description: "Track hydration plans for your companion pets too.",
  },
];

export default function HomeClient() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<string | null>(null);

  return (
    <main className="relative px-4 pb-28 pt-6 text-slate-100 sm:px-6 lg:px-8">
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-128 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.22),transparent_65%)]"
      />
      <div className="mx-auto w-full max-w-6xl space-y-6">
        <Header />

        <div className="space-y-3 text-center xl:text-left">
          <h1 className="text-2xl text-center font-semibold leading-tight text-slate-100 sm:text-4xl">
            Meet{" "}
            <span className="brand-font text-cyan-300 drop-shadow-[0_0_14px_rgba(34,211,238,0.45)]">
              Hydramon AI
            </span>{" "}
            — Your Smart Hydration Assistant
          </h1>
          <p className="mx-auto max-w-5xl text-center text-sm text-slate-300 sm:text-base">
            Track, analyze, and optimize your daily water intake with a responsive and personalized experience.
          </p>
        </div>
        <div className="grid gap-6 xl:grid-cols-[minmax(0,1.35fr)_minmax(320px,1fr)]">
          <section className="space-y-6">
            <Hero isSubmitting={isSubmitting} analysisResult={analysisResult} />
          </section>
          <AnalyseForm
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            setAnalysisResult={setAnalysisResult}
          />
        </div>

        <aside className="space-y-4">
          <Card>
            <h2 className="text-lg font-semibold text-slate-100 sm:text-xl">
              Why Hydramon stands out
            </h2>
            <p className="mt-2 text-sm text-slate-300">
              Insights tuned to your body, environment, and routine.
            </p>
            <div className="mt-4 grid gap-3 sm:grid-cols-2 xl:grid-cols-1">
              {features.map((item) => (
                <div
                  key={item.title}
                  className="rounded-2xl bg-slate-900/60 p-4 ring-1 ring-white/10"
                >
                  <div className="flex items-start gap-3">
                    <span className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-cyan-500/15 text-base">
                      {item.icon}
                    </span>
                    <div className="space-y-1">
                      <p className="text-sm font-semibold text-slate-100">
                        {item.title}
                      </p>
                      <p className="text-xs leading-relaxed text-slate-300">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </Card>
          <Card className="hidden xl:block">
            <p className="text-sm font-semibold text-cyan-200">
              Pro tip for consistency
            </p>
            <p className="mt-2 text-sm text-slate-300">
              Keep your bottle visible on your desk and log every refill to
              build a daily hydration habit.
            </p>
          </Card>
        </aside>

        <Navbar />
      </div>
    </main>
  );
}
