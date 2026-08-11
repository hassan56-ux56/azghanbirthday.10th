import React, { useState } from 'react';
import { Gift, Sparkles, Heart, Star, Check } from 'lucide-react';
import { GoldFrameBorder } from './GoldFrameBorder';

interface SurpriseGiftBoxesProps {
  hostName: string;
}

interface GiftBoxItem {
  id: number;
  title: string;
  badge: string;
  message: string;
  isOpen: boolean;
}

export const SurpriseGiftBoxes: React.FC<SurpriseGiftBoxesProps> = ({ hostName }) => {
  const [boxes, setBoxes] = useState<GiftBoxItem[]>([
    {
      id: 1,
      title: "Health & Vitality",
      badge: "🎁 Gift Box 1",
      message: `May every day of your 17th year bring robust health, boundless energy, and peace of mind to ${hostName}!`,
      isOpen: false,
    },
    {
      id: 2,
      title: "Success & Bright Future",
      badge: "🎁 Gift Box 2",
      message: `Wishing ${hostName} towering achievements in studies, passions, and every path chosen in life!`,
      isOpen: false,
    },
    {
      id: 3,
      title: "Everlasting Friendships",
      badge: "🎁 Gift Box 3",
      message: `May your life be surrounded by genuine friends, laughter, unforgettable road trips, and endless love!`,
      isOpen: false,
    },
  ]);

  const handleOpenBox = (id: number) => {
    setBoxes((prev) =>
      prev.map((box) => (box.id === id ? { ...box, isOpen: true } : box))
    );
  };

  return (
    <section className="relative py-12 px-4 sm:px-8 max-w-4xl mx-auto text-center">
      <div className="flex items-center justify-center gap-4 mb-3">
        <div className="h-px bg-gradient-to-r from-transparent via-[#E6C363] to-transparent flex-1 max-w-[100px]" />
        <h2 className="font-script text-4xl sm:text-6xl gold-text-gradient font-normal px-2">
          Unwrap Surprise Blessings
        </h2>
        <div className="h-px bg-gradient-to-r from-transparent via-[#E6C363] to-transparent flex-1 max-w-[100px]" />
      </div>

      <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-8 font-light">
        Tap a golden gift box to unwrap special birthday blessings for {hostName}!
      </p>

      {/* 3 Gift Box Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {boxes.map((box) => (
          <div
            key={box.id}
            onClick={() => handleOpenBox(box.id)}
            className={`group relative p-6 rounded-2xl border transition-all duration-500 cursor-pointer text-center flex flex-col justify-between ${
              box.isOpen
                ? 'bg-[#251147]/90 border-[#E6C363] shadow-2xl scale-[1.02]'
                : 'bg-[#1A0B2E] border-[#E6C363]/30 hover:border-[#E6C363] hover:scale-105 shadow-lg'
            }`}
          >
            {box.isOpen ? (
              <div className="animate-fade-in">
                <div className="w-12 h-12 rounded-full bg-[#E6C363]/20 text-[#F5CE62] border border-[#E6C363] flex items-center justify-center mx-auto mb-3">
                  <Sparkles className="w-6 h-6 animate-pulse" />
                </div>
                <span className="text-[10px] uppercase tracking-widest text-[#E6C363] font-bold block mb-1">
                  {box.title}
                </span>
                <p className="text-xs text-slate-200 leading-relaxed font-light my-2">
                  &ldquo;{box.message}&rdquo;
                </p>
                <div className="mt-4 pt-3 border-t border-[#E6C363]/20 flex items-center justify-center gap-1 text-[10px] text-emerald-400 font-semibold">
                  <Check className="w-3.5 h-3.5" /> Unwrapped!
                </div>
              </div>
            ) : (
              <div className="py-4">
                <div className="w-16 h-16 rounded-2xl gold-bg-gradient text-[#190933] flex items-center justify-center mx-auto mb-4 shadow-lg group-hover:rotate-12 transition-transform duration-300">
                  <Gift className="w-8 h-8" />
                </div>
                <span className="text-xs font-bold text-[#FFF0B3] uppercase tracking-wider block mb-1">
                  {box.badge}
                </span>
                <p className="text-[11px] text-[#E6C363] font-medium">Tap to unwrap surprise</p>
              </div>
            )}
          </div>
        ))}
      </div>
    </section>
  );
};
