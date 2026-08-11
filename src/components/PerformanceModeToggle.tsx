import React, { useState } from 'react';
import { Zap, Sliders, Check } from 'lucide-react';
import { PerformanceMode } from '../types';

interface PerformanceModeToggleProps {
  mode: PerformanceMode;
  onChangeMode: (newMode: PerformanceMode) => void;
}

export const PerformanceModeToggle: React.FC<PerformanceModeToggleProps> = ({
  mode,
  onChangeMode,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const modeLabels: Record<PerformanceMode, string> = {
    high: 'High Quality 3D ✨',
    balanced: 'Balanced ⚡',
    low: 'Mobile Performance 🚀',
  };

  return (
    <div className="relative">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="px-3 py-1.5 rounded-full bg-[#1D0C38]/90 border border-[#E6C363]/40 text-[#FFF0B3] text-xs font-semibold flex items-center gap-1.5 shadow-lg backdrop-blur-md hover:border-[#F5CE62] transition-all cursor-pointer"
        title="Change 3D Performance Mode"
      >
        <Zap className="w-3.5 h-3.5 text-[#F5CE62]" />
        <span className="hidden sm:inline">{modeLabels[mode]}</span>
        <span className="sm:hidden">3D Mode</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 top-10 z-50 w-52 p-2 rounded-2xl bg-[#15072B] border border-[#E6C363]/50 shadow-2xl backdrop-blur-xl animate-fade-in text-left">
          <p className="text-[10px] uppercase font-bold text-[#E6C363] px-3 py-1 border-b border-[#E6C363]/20 mb-1">
            ⚡ 3D Graphics Settings
          </p>

          {(['high', 'balanced', 'low'] as PerformanceMode[]).map((m) => (
            <button
              key={m}
              onClick={() => {
                onChangeMode(m);
                setIsOpen(false);
              }}
              className={`w-full px-3 py-2 rounded-xl text-xs font-medium flex items-center justify-between transition-colors cursor-pointer ${
                mode === m
                  ? 'bg-[#321361] text-[#F5CE62] font-bold'
                  : 'text-slate-300 hover:bg-[#251147]'
              }`}
            >
              <span>{modeLabels[m]}</span>
              {mode === m && <Check className="w-3.5 h-3.5 text-[#F5CE62]" />}
            </button>
          ))}
        </div>
      )}
    </div>
  );
};
