import Image from "next/image";
import { useRouter } from "next/navigation";

interface HeroProps {
  isSubmitting: boolean;
  analysisResult: string | null;
}

export default function Hero({ isSubmitting, analysisResult }: HeroProps) {
  const router = useRouter();

  return (
    <div className="overflow-hidden rounded-3xl border border-white/10 bg-slate-900/50 shadow-2xl shadow-cyan-950/40">
      <div className="relative aspect-[4/3] w-full sm:aspect-[16/11] lg:aspect-[16/10] flex items-center justify-center">
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-300/10 via-transparent to-transparent " />
        
        {isSubmitting ? (
          <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source
              src="/videos/make_it_running_202604251715.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        ) : analysisResult ? (
          <div className="z-10 w-full p-6 sm:p-10 text-center animate-in fade-in zoom-in duration-500">
            <h3 className="text-xl font-bold text-cyan-300 sm:text-2xl mb-4">
              Analysis Deep Dive
            </h3>
            <p className="text-base text-slate-200 leading-relaxed max-w-2xl mx-auto">
              {analysisResult}
            </p>
            <button
              onClick={() => router.push("/analytics")}
              className="mt-8 rounded-xl bg-cyan-500/20 px-6 py-3.5 text-sm font-semibold text-cyan-200 ring-1 ring-cyan-300/40 transition hover:bg-cyan-500/30 hover:scale-[1.02] active:scale-[0.98]"
            >
              View Detailed Analytics →
            </button>
          </div>
        ) : (
         <video
            autoPlay
            loop
            muted
            playsInline
            className="h-full w-full object-cover"
          >
            <source
              src="/videos/Hydramon_appears_and_202604251713.mp4"
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        )}
      </div>
    </div>
  );
}
