import React, { useState, useEffect } from 'react';
import { Sparkles, Heart, Star, Quote } from 'lucide-react';
import { GoldFrameBorder } from './GoldFrameBorder';

interface EmotionalMessageSectionProps {
  hostName: string;
  customMessage?: string;
}

export const EmotionalMessageSection: React.FC<EmotionalMessageSectionProps> = ({
  hostName,
  customMessage,
}) => {
  const defaultText = `Ten wonderful years of smiles, laughter, grand adventures, and beautiful memories. May this brand new double-digit chapter bring you exciting dreams, soaring confidence, endless victories, and boundless happiness. Keep smiling bright, keep learning, keep exploring the universe, and always believe in the superhero inside you. Happy 10th Birthday ${hostName}!`;

  const fullText = customMessage && customMessage.trim().length > 0 ? customMessage : defaultText;

  const [displayedText, setDisplayedText] = useState('');
  const [isRevealing, setIsRevealing] = useState(false);

  useEffect(() => {
    let index = 0;
    setIsRevealing(true);
    setDisplayedText('');

    const interval = setInterval(() => {
      if (index < fullText.length) {
        setDisplayedText(fullText.slice(0, index + 1));
        index++;
      } else {
        clearInterval(interval);
        setIsRevealing(false);
      }
    }, 25);

    return () => clearInterval(interval);
  }, [fullText]);

  return (
    <section className="relative py-12 px-4 sm:px-8 max-w-4xl mx-auto text-center z-10">
      <GoldFrameBorder>
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#F5CE62]" />
          <p className="text-xs uppercase tracking-[0.25em] text-[#E6C363] font-bold">
            Heartfelt Letter
          </p>
          <Sparkles className="w-5 h-5 text-[#F5CE62]" />
        </div>

        <h2 className="font-script text-4xl sm:text-6xl gold-text-gradient mb-6">
          A Special Message For You
        </h2>

        {/* Cinematic Message Card Container */}
        <div className="relative p-6 sm:p-10 rounded-3xl bg-gradient-to-br from-[#1A0B2E] via-[#2A1152] to-[#15072B] border-2 border-[#E6C363]/50 shadow-2xl text-left max-w-2xl mx-auto">
          <Quote className="w-10 h-10 text-[#F5CE62]/30 absolute top-4 left-4" />
          <Quote className="w-10 h-10 text-[#F5CE62]/30 absolute bottom-4 right-4 rotate-180" />

          <p className="relative z-10 font-serif-display text-sm sm:text-lg text-[#FFF3C4] leading-relaxed font-normal tracking-wide min-h-[140px]">
            {displayedText}
            {isRevealing && <span className="inline-block w-2 h-5 bg-[#F5CE62] ml-1 animate-pulse" />}
          </p>

          <div className="mt-8 pt-4 border-t border-[#E6C363]/30 flex items-center justify-between text-xs text-slate-300 font-light">
            <span className="flex items-center gap-1.5 text-[#E6C363] font-bold">
              <Heart className="w-4 h-4 text-rose-400 fill-current" />
              <span>With Unlimited Love & Blessings</span>
            </span>
            <span className="text-[10px] uppercase tracking-wider text-slate-400">
              For Azghan • Age 10
            </span>
          </div>
        </div>
      </GoldFrameBorder>
    </section>
  );
};
