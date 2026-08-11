import React, { useState } from 'react';
import { Sparkles, Flame, RefreshCw, Heart, Music, Award } from 'lucide-react';
import { GoldFrameBorder } from './GoldFrameBorder';

interface BirthdayCakeSectionProps {
  hostName: string;
  turningAge: number;
  onBlowOut: () => void;
}

export const BirthdayCakeSection: React.FC<BirthdayCakeSectionProps> = ({
  hostName,
  turningAge,
  onBlowOut,
}) => {
  const totalCandles = 5;
  const [litCandles, setLitCandles] = useState<boolean[]>(Array(totalCandles).fill(true));
  const [hasMadeWish, setHasMadeWish] = useState<boolean>(false);
  const [wishText, setWishText] = useState<string>('');
  const [savedWish, setSavedWish] = useState<string | null>(null);

  const isAllBlown = litCandles.every((lit) => !lit);

  const toggleCandle = (index: number) => {
    const updated = [...litCandles];
    updated[index] = !updated[index];
    setLitCandles(updated);

    if (updated.every((lit) => !lit) && !hasMadeWish) {
      setHasMadeWish(true);
      onBlowOut();
    }
  };

  const blowAllCandles = () => {
    setLitCandles(Array(totalCandles).fill(false));
    setHasMadeWish(true);
    onBlowOut();
  };

  const relightCandles = () => {
    setLitCandles(Array(totalCandles).fill(true));
    setHasMadeWish(false);
  };

  const handleMakeWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (wishText.trim()) {
      setSavedWish(wishText.trim());
      setWishText('');
    }
  };

  return (
    <section id="cake" className="relative py-12 px-4 sm:px-8 max-w-3xl mx-auto text-center">
      <GoldFrameBorder>
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#F5CE62]" />
          <p className="text-xs uppercase tracking-[0.25em] text-[#E6C363] font-semibold">
            Virtual Birthday Ceremony
          </p>
          <Sparkles className="w-5 h-5 text-[#F5CE62]" />
        </div>

        <h2 className="font-script text-4xl sm:text-6xl gold-text-gradient mb-2">
          Blow The Candles
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-8 font-light">
          Tap the candles or click below to blow out all candles and send {hostName} a magical birthday wish!
        </p>

        {/* Birthday Cake Graphic Frame */}
        <div className="relative max-w-sm mx-auto p-6 rounded-2xl bg-[#15072B] border border-[#E6C363]/30 shadow-2xl mb-8 flex flex-col items-center">
          
          {/* Candles Container */}
          <div className="flex items-end justify-center gap-4 sm:gap-6 mb-2 relative z-10 h-16">
            {litCandles.map((isLit, idx) => (
              <div
                key={idx}
                onClick={() => toggleCandle(idx)}
                className="group cursor-pointer flex flex-col items-center transition-transform hover:scale-110"
                title={isLit ? "Click to blow out this candle" : "Click to re-light"}
              >
                {/* Flame */}
                {isLit ? (
                  <div className="relative animate-bounce">
                    <div className="w-4 h-6 rounded-full bg-gradient-to-t from-amber-500 via-yellow-300 to-white shadow-[0_0_15px_#F5CE62]" />
                    <Flame className="w-4 h-4 text-amber-300 absolute -top-1 left-0 animate-ping opacity-75" />
                  </div>
                ) : (
                  <div className="h-6 flex items-center justify-center">
                    {/* Smoke Effect */}
                    <span className="w-1.5 h-1.5 rounded-full bg-slate-400 opacity-60 animate-ping" />
                  </div>
                )}

                {/* Candle Stick */}
                <div className="w-2.5 h-10 rounded-t bg-gradient-to-r from-[#F5CE62] via-[#FFF0B3] to-[#E6B830] border border-[#E6C363]/50 shadow-inner mt-1" />
              </div>
            ))}
          </div>

          {/* 3 Tier Cake Illustration */}
          <div className="w-full flex flex-col items-center">
            {/* Top Tier */}
            <div className="w-28 h-10 bg-gradient-to-r from-[#3B1C6B] via-[#52298F] to-[#3B1C6B] border border-[#E6C363]/60 rounded-t-xl flex items-center justify-center text-[10px] font-bold tracking-widest text-[#FFF0B3] shadow-md relative">
              <span className="absolute -top-1 inset-x-0 h-1 bg-[#F5CE62] rounded-full" />
              AGE {turningAge}
            </div>

            {/* Middle Tier */}
            <div className="w-44 h-12 bg-gradient-to-r from-[#2A1152] via-[#431B82] to-[#2A1152] border border-[#E6C363]/50 rounded-t-xl flex items-center justify-between px-3 text-xs font-semibold text-[#E6C363] shadow-md">
              <span>✨</span>
              <span className="font-serif-display uppercase tracking-wider">{hostName}</span>
              <span>✨</span>
            </div>

            {/* Bottom Tier */}
            <div className="w-60 h-14 bg-gradient-to-r from-[#1F0A3D] via-[#321361] to-[#1F0A3D] border border-[#E6C363]/60 rounded-t-xl flex items-center justify-center text-xs font-bold text-[#FFF0B3] shadow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-topo-pattern opacity-30" />
              <span className="relative z-10 font-script text-2xl text-[#F5CE62]">Happy Birthday</span>
            </div>

            {/* Cake Stand Plate */}
            <div className="w-72 h-4 bg-gradient-to-r from-[#E6C363] via-[#FFF3C4] to-[#C9991D] rounded-full shadow-2xl border border-amber-300" />
          </div>

          {/* Status Message */}
          <div className="mt-6">
            {isAllBlown ? (
              <div className="p-3 rounded-lg bg-emerald-950/80 border border-emerald-500/40 text-emerald-300 text-xs font-semibold animate-fade-in flex items-center justify-center gap-2">
                <Sparkles className="w-4 h-4 text-emerald-400" />
                <span>All candles blown out! Your wish has been sent to the stars! 🌟</span>
              </div>
            ) : (
              <p className="text-xs text-[#E6C363] font-medium">
                {litCandles.filter(Boolean).length} of {totalCandles} candles burning bright
              </p>
            )}
          </div>
        </div>

        {/* Action Controls */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-8">
          {!isAllBlown ? (
            <button
              onClick={blowAllCandles}
              className="px-6 py-3 rounded-lg gold-bg-gradient hover:gold-bg-gradient-hover text-[#190933] font-bold text-xs tracking-wider uppercase flex items-center gap-2 transition-transform hover:scale-105 shadow-lg shadow-[#D4AF37]/20 cursor-pointer"
            >
              <Flame className="w-4 h-4 fill-current" />
              <span>Blow Out All Candles</span>
            </button>
          ) : (
            <button
              onClick={relightCandles}
              className="px-6 py-3 rounded-lg border border-[#E6C363]/40 bg-[#251147] hover:bg-[#321361] text-[#F5CE62] text-xs font-semibold tracking-wider uppercase flex items-center gap-2 transition-all cursor-pointer"
            >
              <RefreshCw className="w-4 h-4" />
              <span>Light Candles Again</span>
            </button>
          )}
        </div>

        {/* Make a Secret Wish Form */}
        <div className="p-5 rounded-xl bg-[#1D0C38]/80 border border-[#E6C363]/30 text-left max-w-md mx-auto">
          <h4 className="text-xs font-bold uppercase tracking-wider text-[#E6C363] mb-2 flex items-center gap-1.5">
            <Heart className="w-3.5 h-3.5 text-rose-400" />
            <span>Make a Birthday Prayer or Secret Wish</span>
          </h4>

          {savedWish ? (
            <div className="p-3 rounded-lg bg-[#251147] border border-[#E6C363]/40 text-xs text-slate-200">
              <p className="italic text-[#FFF0B3]">&ldquo;{savedWish}&rdquo;</p>
              <p className="text-[10px] text-emerald-400 mt-2 font-medium">✓ Saved with blessings!</p>
            </div>
          ) : (
            <form onSubmit={handleMakeWishSubmit} className="flex gap-2">
              <input
                type="text"
                value={wishText}
                onChange={(e) => setWishText(e.target.value)}
                placeholder="Write a secret prayer/wish..."
                className="flex-1 bg-[#251147] border border-[#E6C363]/30 rounded-lg px-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#F5CE62]"
              />
              <button
                type="submit"
                className="px-4 py-2 rounded-lg gold-bg-gradient text-[#190933] font-bold text-xs shrink-0 cursor-pointer hover:scale-105 transition-transform"
              >
                Wish
              </button>
            </form>
          )}
        </div>
      </GoldFrameBorder>
    </section>
  );
};
