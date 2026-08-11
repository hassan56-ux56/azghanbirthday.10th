import React, { useState, useEffect } from 'react';
import { Sparkles, PartyPopper, Cake, Star } from 'lucide-react';

interface LoadingScreenProps {
  onStartParty: () => void;
  hostName: string;
}

export const LoadingScreen: React.FC<LoadingScreenProps> = ({ onStartParty, hostName }) => {
  const [progress, setProgress] = useState(0);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setIsReady(true);
          return 100;
        }
        return prev + Math.floor(Math.random() * 15) + 5;
      });
    }, 120);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#0C041C] flex flex-col items-center justify-center p-6 text-center text-white overflow-hidden">
      {/* Animated Background Particle Rays */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(168,85,247,0.25)_0%,rgba(12,4,28,1)_70%)] animate-pulse" />

      {/* Floating Star Orbs */}
      <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-cyan-500/10 blur-3xl animate-bounce" />
      <div className="absolute bottom-1/4 right-1/4 w-40 h-40 rounded-full bg-purple-500/10 blur-3xl animate-pulse" />

      <div className="relative z-10 max-w-md w-full flex flex-col items-center">
        {/* Animated Cake Icon Box */}
        <div className="relative mb-6">
          <div className="w-24 h-24 rounded-3xl bg-gradient-to-tr from-[#321361] via-[#52298F] to-[#251147] border-2 border-[#E6C363] shadow-[0_0_30px_rgba(245,206,98,0.4)] flex items-center justify-center animate-bounce">
            <Cake className="w-12 h-12 text-[#F5CE62]" />
          </div>
          <Sparkles className="w-6 h-6 text-[#F5CE62] absolute -top-2 -right-2 animate-spin" />
        </div>

        {/* Title */}
        <p className="text-xs uppercase tracking-[0.3em] text-[#E6C363] font-semibold mb-2 flex items-center gap-1.5">
          <Star className="w-3.5 h-3.5 fill-current text-[#F5CE62]" />
          <span>ENTERING THE 3D BIRTHDAY WORLD</span>
          <Star className="w-3.5 h-3.5 fill-current text-[#F5CE62]" />
        </p>

        <h1 className="font-script text-4xl sm:text-5xl gold-text-gradient mb-4">
          Azghan&apos;s 10th Birthday
        </h1>

        {/* Progress Bar Container */}
        <div className="w-full bg-[#1A0B2E] border border-[#E6C363]/40 rounded-full h-4 p-0.5 shadow-inner mb-3 relative overflow-hidden">
          <div
            className="h-full rounded-full bg-gradient-to-r from-[#F5CE62] via-[#38BDF8] to-[#A855F7] transition-all duration-300 shadow-[0_0_12px_#38BDF8]"
            style={{ width: `${progress}%` }}
          />
        </div>

        <p className="text-xs text-slate-300 font-medium tracking-wide mb-8">
          {progress < 100 ? `Loading Magical Memories... ${progress}%` : "Ready for the Party! 🎉"}
        </p>

        {/* Enter Button when ready */}
        {isReady && (
          <button
            onClick={onStartParty}
            className="group px-8 py-4 rounded-2xl gold-bg-gradient text-[#190933] font-black text-sm tracking-widest uppercase flex items-center gap-3 transition-all transform hover:scale-110 active:scale-95 shadow-[0_0_25px_rgba(245,206,98,0.6)] cursor-pointer animate-pulse"
          >
            <PartyPopper className="w-5 h-5 group-hover:rotate-12 transition-transform" />
            <span>ENTER THE PARTY 🎁</span>
          </button>
        )}
      </div>
    </div>
  );
};
