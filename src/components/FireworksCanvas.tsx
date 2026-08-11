import React, { useEffect, useRef, useState } from 'react';
import { Sparkles, Rocket, PartyPopper, Flame } from 'lucide-react';
import confetti from 'canvas-confetti';
import { PerformanceMode } from '../types';
import { GoldFrameBorder } from './GoldFrameBorder';

interface FireworksCanvasProps {
  performanceMode: PerformanceMode;
  hostName: string;
}

export const FireworksCanvas: React.FC<FireworksCanvasProps> = ({
  performanceMode,
  hostName,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [fireworksCount, setFireworksCount] = useState(0);

  // Trigger grand fireworks explosion using canvas-confetti
  const triggerGrandFireworks = () => {
    setFireworksCount((prev) => prev + 1);

    const count = performanceMode === 'high' ? 200 : 100;
    const defaults = { origin: { y: 0.7 } };

    function fire(particleRatio: number, opts: confetti.Options) {
      confetti({
        ...defaults,
        ...opts,
        particleCount: Math.floor(count * particleRatio),
      });
    }

    fire(0.25, {
      spread: 26,
      startVelocity: 55,
      colors: ['#F5CE62', '#38BDF8'],
    });
    fire(0.2, {
      spread: 60,
      colors: ['#A855F7', '#EC4899'],
    });
    fire(0.35, {
      spread: 100,
      decay: 0.91,
      scalar: 0.8,
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 25,
      decay: 0.92,
      colors: ['#10B981', '#FFF0B3'],
    });
    fire(0.1, {
      spread: 120,
      startVelocity: 45,
    });
  };

  useEffect(() => {
    // Launch automatic firework bursts every 4 seconds
    const timer = setInterval(() => {
      triggerGrandFireworks();
    }, 4500);

    return () => clearInterval(timer);
  }, [performanceMode]);

  return (
    <section id="fireworks" className="relative py-16 px-4 sm:px-8 max-w-5xl mx-auto text-center z-10">
      <GoldFrameBorder>
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#F5CE62]" />
          <p className="text-xs uppercase tracking-[0.25em] text-[#E6C363] font-bold">
            Grand Finale Sky
          </p>
          <Sparkles className="w-5 h-5 text-[#F5CE62]" />
        </div>

        <h2 className="font-script text-5xl sm:text-7xl gold-text-gradient mb-3">
          Let&apos;s Celebrate! 🎆
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-8 font-light">
          Tap the button below to launch a sky full of magical golden fireworks and confetti for {hostName}!
        </p>

        {/* Action Button */}
        <div className="flex flex-col items-center justify-center mb-8">
          <button
            onClick={triggerGrandFireworks}
            className="px-8 py-4 rounded-2xl gold-bg-gradient hover:gold-bg-gradient-hover text-[#190933] font-black text-sm tracking-widest uppercase flex items-center gap-3 transition-transform hover:scale-110 active:scale-95 shadow-[0_0_30px_rgba(245,206,98,0.6)] cursor-pointer"
          >
            <Rocket className="w-5 h-5 animate-bounce" />
            <span>LAUNCH FIREWORKS 🚀</span>
          </button>
          <p className="text-[10px] text-[#E6C363] mt-2 font-medium">
            Fireworks launched: {fireworksCount} rounds
          </p>
        </div>

        {/* Final Scene Banner */}
        <div className="p-8 rounded-3xl bg-gradient-to-r from-[#1D0C38] via-[#321361] to-[#1D0C38] border-2 border-[#E6C363] shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-topo-pattern opacity-20" />

          <div className="relative z-10">
            <h3 className="font-script text-4xl sm:text-6xl gold-text-gradient mb-2">
              HAPPY 10TH BIRTHDAY {hostName.toUpperCase()}
            </h3>

            <p className="text-sm sm:text-base text-[#FFF0B3] font-serif-display font-medium mb-4">
              &ldquo;May your next double-digit adventure be even more amazing!&rdquo;
            </p>

            <span className="inline-block px-5 py-2 rounded-full bg-[#15072B] border border-[#E6C363] text-xs font-bold text-[#F5CE62] tracking-widest uppercase shadow-lg">
              THE ADVENTURE CONTINUES... 🚀
            </span>
          </div>
        </div>
      </GoldFrameBorder>
    </section>
  );
};
