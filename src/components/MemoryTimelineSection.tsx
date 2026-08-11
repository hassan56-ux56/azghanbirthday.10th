import React, { useState } from 'react';
import { Sparkles, Calendar, Award, Star, ChevronRight, Image as ImageIcon } from 'lucide-react';
import { TIMELINE_MILESTONES } from '../data/initialData';
import { TimelineMilestone } from '../types';
import { GoldFrameBorder } from './GoldFrameBorder';

interface MemoryTimelineSectionProps {
  hostName: string;
  milestones?: TimelineMilestone[];
}

export const MemoryTimelineSection: React.FC<MemoryTimelineSectionProps> = ({
  hostName,
  milestones = TIMELINE_MILESTONES,
}) => {
  const activeMilestones = milestones.length > 0 ? milestones : TIMELINE_MILESTONES;
  const [activeMilestone, setActiveMilestone] = useState<TimelineMilestone>(
    activeMilestones[activeMilestones.length - 1]
  );
  const [modalMilestone, setModalMilestone] = useState<TimelineMilestone | null>(null);

  return (
    <section id="timeline" className="relative py-12 px-4 sm:px-8 max-w-5xl mx-auto text-center z-10">
      <GoldFrameBorder>
        {/* Header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#F5CE62]" />
          <p className="text-xs uppercase tracking-[0.25em] text-[#E6C363] font-bold">
            Interactive Journey (2017 - 2026)
          </p>
          <Sparkles className="w-5 h-5 text-[#F5CE62]" />
        </div>

        <h2 className="font-script text-4xl sm:text-6xl gold-text-gradient mb-2">
          10 Years of Amazing Memories
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-8 font-light">
          Scroll through {hostName}&apos;s 10-year growth timeline from his first baby steps to turning 10!
        </p>

        {/* Milestone Age Quick Selector Buttons */}
        <div className="flex items-center justify-start sm:justify-center gap-2 overflow-x-auto pb-4 mb-8 no-scrollbar px-2">
          {activeMilestones.map((m) => {
            const isSelected = activeMilestone.age === m.age;
            return (
              <button
                key={m.age}
                onClick={() => setActiveMilestone(m)}
                className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all shrink-0 cursor-pointer flex items-center gap-1.5 ${
                  isSelected
                    ? 'gold-bg-gradient text-[#190933] shadow-[0_0_15px_rgba(245,206,98,0.5)] scale-105'
                    : 'bg-[#1D0C38] border border-[#E6C363]/30 text-[#E6C363] hover:border-[#E6C363]'
                }`}
              >
                <span>{m.icon}</span>
                <span>Age {m.age}</span>
              </button>
            );
          })}
        </div>

        {/* Featured Milestone Card */}
        <div className="relative p-6 sm:p-8 rounded-3xl bg-gradient-to-br from-[#1D0C38] via-[#2A1152] to-[#15072B] border border-[#E6C363]/40 shadow-2xl max-w-3xl mx-auto mb-8 text-left grid grid-cols-1 md:grid-cols-2 gap-6 items-center">
          {/* Milestone Image Frame */}
          <div className="relative rounded-2xl overflow-hidden border-2 border-[#E6C363] shadow-2xl group cursor-pointer bg-[#0A0318] p-2 flex items-center justify-center min-h-[280px]"
               onClick={() => setModalMilestone(activeMilestone)}>
            <img
              src={activeMilestone.photoUrl}
              alt={activeMilestone.title}
              className="w-full h-64 sm:h-80 object-contain rounded-xl transition-transform duration-500 group-hover:scale-105"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent flex items-end p-3 opacity-90 group-hover:opacity-100 transition-opacity">
              <span className="text-xs text-[#F5CE62] font-bold flex items-center gap-1.5 bg-black/70 px-3 py-1.5 rounded-full border border-[#E6C363]/40 shadow-lg">
                <ImageIcon className="w-4 h-4" /> Expand Maximum Size Frame
              </span>
            </div>
          </div>

          {/* Milestone Content */}
          <div className="flex flex-col justify-between h-full py-2">
            <div>
              <div className="flex items-center gap-2 mb-2 text-xs font-bold text-[#E6C363]">
                <Calendar className="w-4 h-4" />
                <span>YEAR {activeMilestone.year} • AGE {activeMilestone.age}</span>
              </div>

              <h3 className="text-xl sm:text-2xl font-bold text-white mb-3">
                {activeMilestone.title}
              </h3>

              <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light mb-6">
                {activeMilestone.description}
              </p>
            </div>

            <button
              onClick={() => setModalMilestone(activeMilestone)}
              className="self-start px-4 py-2 rounded-lg bg-[#321361] border border-[#E6C363]/40 text-[#FFF0B3] hover:bg-[#E6C363] hover:text-[#190933] text-xs font-bold transition-all cursor-pointer flex items-center gap-2"
            >
              <span>Explore Memory Details</span>
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Milestone Vertical Timeline List */}
        <div className="relative border-l-2 border-[#E6C363]/30 pl-4 sm:pl-6 text-left max-w-2xl mx-auto space-y-6">
          {activeMilestones.map((m) => (
            <div
              key={m.age}
              onClick={() => setActiveMilestone(m)}
              className={`group relative p-4 rounded-xl border transition-all cursor-pointer ${
                activeMilestone.age === m.age
                  ? 'bg-[#2A1152] border-[#F5CE62] shadow-lg'
                  : 'bg-[#15072B]/60 border-[#E6C363]/20 hover:border-[#E6C363]/60'
              }`}
            >
              {/* Timeline Point Dot */}
              <div
                className={`absolute -left-[23px] sm:-left-[31px] top-4 w-4 h-4 rounded-full border-2 border-[#F5CE62] ${
                  activeMilestone.age === m.age ? 'bg-[#F5CE62] animate-ping' : 'bg-[#15072B]'
                }`}
              />

              <div className="flex items-center justify-between mb-1">
                <span className="text-xs font-bold text-[#F5CE62] flex items-center gap-1.5">
                  <span>{m.icon}</span>
                  <span>Age {m.age} ({m.year})</span>
                </span>
                <span className="text-[10px] text-slate-400 font-medium">{m.badge}</span>
              </div>

              <h4 className="text-sm font-semibold text-white">{m.title}</h4>
              <p className="text-xs text-slate-300 font-light line-clamp-1 mt-1">{m.description}</p>
            </div>
          ))}
        </div>
      </GoldFrameBorder>

      {/* Modal View for Milestone */}
      {modalMilestone && (
        <div className="fixed inset-0 z-50 bg-black/90 backdrop-blur-md flex items-center justify-center p-4">
          <div className="relative bg-[#1D0C38] border-2 border-[#E6C363] rounded-3xl p-6 max-w-3xl w-full text-center shadow-2xl">
            <button
              onClick={() => setModalMilestone(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 text-white font-bold text-sm border border-[#E6C363]/50 hover:bg-[#E6C363] hover:text-[#190933] transition-colors cursor-pointer flex items-center justify-center z-10"
            >
              ✕
            </button>

            <div className="w-full max-h-[70vh] flex items-center justify-center bg-[#090214] rounded-2xl border border-[#E6C363]/40 mb-4 p-2 overflow-hidden shadow-2xl">
              <img
                src={modalMilestone.photoUrl}
                alt={modalMilestone.title}
                className="max-h-[65vh] w-auto max-w-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <span className="inline-block px-3 py-1 rounded-full gold-bg-gradient text-[#190933] font-bold text-xs mb-2">
              {modalMilestone.badge}
            </span>

            <h3 className="text-2xl font-bold text-white mb-2">{modalMilestone.title}</h3>
            <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light">{modalMilestone.description}</p>
          </div>
        </div>
      )}
    </section>
  );
};
