import React from 'react';

interface GoldFrameBorderProps {
  children: React.ReactNode;
  className?: string;
  cornerSparkles?: boolean;
}

export const GoldFrameBorder: React.FC<GoldFrameBorderProps> = ({
  children,
  className = '',
  cornerSparkles = true,
}) => {
  return (
    <div className={`relative p-6 sm:p-10 rounded-xl luxury-card-border bg-[#1A0B2E]/90 overflow-hidden ${className}`}>
      {/* Subtle Topographic Lines Overlay */}
      <div className="absolute inset-0 bg-topo-pattern opacity-40 pointer-events-none" />

      {/* Thin Gold Outer & Inner Frame Lines */}
      <div className="absolute inset-3 border border-[#E6C363]/30 pointer-events-none rounded-lg" />
      <div className="absolute inset-4 border border-[#E6C363]/15 pointer-events-none rounded-md" />

      {/* Top Left Geometric Corner */}
      <svg
        className="absolute top-0 left-0 w-24 h-24 text-[#F5CE62]/60 pointer-events-none"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path d="M0 0 L100 0 L0 100 Z" fill="rgba(37, 17, 71, 0.4)" />
        <line x1="0" y1="0" x2="100" y2="0" stroke="currentColor" strokeWidth="1.5" />
        <line x1="0" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1.5" />
        <line x1="0" y1="35" x2="35" y2="0" stroke="currentColor" strokeWidth="1" opacity="0.8" />
        <line x1="0" y1="70" x2="70" y2="0" stroke="currentColor" strokeWidth="1" opacity="0.8" />
        <line x1="0" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      </svg>

      {/* Bottom Right Geometric Corner */}
      <svg
        className="absolute bottom-0 right-0 w-24 h-24 text-[#F5CE62]/60 pointer-events-none rotate-180"
        viewBox="0 0 100 100"
        fill="none"
      >
        <path d="M0 0 L100 0 L0 100 Z" fill="rgba(37, 17, 71, 0.4)" />
        <line x1="0" y1="0" x2="100" y2="0" stroke="currentColor" strokeWidth="1.5" />
        <line x1="0" y1="0" x2="0" y2="100" stroke="currentColor" strokeWidth="1.5" />
        <line x1="0" y1="35" x2="35" y2="0" stroke="currentColor" strokeWidth="1" opacity="0.8" />
        <line x1="0" y1="70" x2="70" y2="0" stroke="currentColor" strokeWidth="1" opacity="0.8" />
        <line x1="0" y1="100" x2="100" y2="0" stroke="currentColor" strokeWidth="1" opacity="0.6" />
      </svg>

      {/* Sparkling Light Points */}
      {cornerSparkles && (
        <>
          <div className="absolute top-3 left-3 w-2 h-2 rounded-full bg-[#FFF3C4] shadow-[0_0_12px_#F5CE62] animate-pulse" />
          <div className="absolute top-10 left-10 w-1.5 h-1.5 rounded-full bg-[#FFF3C4] shadow-[0_0_8px_#F5CE62] animate-ping opacity-75" />
          <div className="absolute bottom-3 right-3 w-2 h-2 rounded-full bg-[#FFF3C4] shadow-[0_0_12px_#F5CE62] animate-pulse" />
          <div className="absolute bottom-10 right-10 w-1.5 h-1.5 rounded-full bg-[#FFF3C4] shadow-[0_0_8px_#F5CE62] animate-ping opacity-75" />
        </>
      )}

      {/* Content wrapper */}
      <div className="relative z-10">{children}</div>
    </div>
  );
};
