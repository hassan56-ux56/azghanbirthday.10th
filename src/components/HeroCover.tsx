import React from 'react';
import { Sparkles, PartyPopper, Star } from 'lucide-react';
import { EventDetails } from '../types';
import { GoldFrameBorder } from './GoldFrameBorder';

interface HeroCoverProps {
  eventDetails: EventDetails;
  guestName: string;
  onGuestNameChange: (name: string) => void;
  onOpenInvitation: () => void;
  onShareClick: () => void;
  isOpen: boolean;
}

export const HeroCover: React.FC<HeroCoverProps> = ({
  eventDetails,
  guestName,
  onGuestNameChange,
  onOpenInvitation,
  onShareClick,
  isOpen,
}) => {
  return (
    <section className="relative min-h-screen flex items-center justify-center p-4 pt-16 sm:p-8 sm:pt-20 overflow-hidden z-10">
      {/* Background Ambient Glowing Orbs */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-[#3B1C6B]/40 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-1/4 left-1/2 -translate-x-1/2 w-80 h-80 bg-[#E6C363]/10 rounded-full blur-3xl pointer-events-none" />

      {/* Main Centered Invitation Frame Card */}
      <div className="w-full max-w-xl mx-auto">
        <GoldFrameBorder className="text-center shadow-2xl relative">

          {/* Top Invitation Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-[#1F0A3D] border border-[#E6C363]/50 mb-4 shadow-lg">
            <Sparkles className="w-4 h-4 text-[#F5CE62] animate-spin" />
            <span className="text-xs font-bold uppercase tracking-widest text-[#E6C363]">
              3D Fantasy Celebration
            </span>
            <Star className="w-4 h-4 text-[#F5CE62] fill-current" />
          </div>

          {/* Script Calligraphy Heading */}
          <h1 className="font-script text-5xl sm:text-7xl font-normal gold-text-gradient my-1 drop-shadow-md leading-tight">
            Happy 10th Birthday
          </h1>

          {/* Host Name in Display Font */}
          <h2 className="font-serif-display text-4xl sm:text-6xl font-black tracking-[0.15em] text-white uppercase mt-1 mb-2 drop-shadow-2xl">
            {eventDetails.hostName}
          </h2>

          <p className="text-xs sm:text-sm text-[#FFF0B3] font-serif-display tracking-wider mb-8 italic">
            &ldquo;A Magical 3D Birthday Adventure Awaits You...&rdquo;
          </p>

          {/* Action Button */}
          <div className="flex items-center justify-center mt-6">
            <button
              onClick={onOpenInvitation}
              className="w-full sm:w-auto px-10 py-4 rounded-xl gold-bg-gradient hover:gold-bg-gradient-hover text-[#190933] font-black text-sm tracking-widest uppercase flex items-center justify-center gap-2.5 transition-all transform hover:scale-110 shadow-xl shadow-[#D4AF37]/30 active:scale-95 cursor-pointer animate-pulse"
            >
              <PartyPopper className="w-5 h-5" />
              <span>🎁 ENTER THE PARTY</span>
            </button>
          </div>
        </GoldFrameBorder>
      </div>
    </section>
  );
};

