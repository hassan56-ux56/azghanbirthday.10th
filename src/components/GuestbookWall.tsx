import React, { useState } from 'react';
import { Heart, Search, MessageSquare, Check, Sparkles, User, ThumbsUp } from 'lucide-react';
import { RsvpSubmission } from '../types';

interface GuestbookWallProps {
  wishes: RsvpSubmission[];
  onToggleLike: (id: string) => void;
}

export const GuestbookWall: React.FC<GuestbookWallProps> = ({ wishes, onToggleLike }) => {
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [filterAttending, setFilterAttending] = useState<string>('all');

  const filteredWishes = wishes.filter((w) => {
    const matchesSearch =
      w.guestName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      w.wishes.toLowerCase().includes(searchTerm.toLowerCase());

    if (filterAttending === 'attending') {
      return matchesSearch && w.attendingStatus === 'definitely';
    }
    return matchesSearch;
  });

  return (
    <section id="guestbook" className="relative py-12 px-4 sm:px-8 max-w-4xl mx-auto">
      {/* Title */}
      <div className="text-center mb-8">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#251147] border border-[#E6C363]/40 text-[#E6C363] text-xs font-semibold uppercase tracking-wider mb-2">
          <MessageSquare className="w-3.5 h-3.5" />
          <span>Guestbook & Prayers ({wishes.length})</span>
        </div>
        <h2 className="font-script text-4xl sm:text-6xl gold-text-gradient">
          Blessings & Wishes
        </h2>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="flex flex-col sm:flex-row items-center justify-between gap-3 mb-6 p-3 rounded-xl bg-[#251147]/80 border border-[#E6C363]/30">
        <div className="relative w-full sm:w-72">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#E6C363]/60" />
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder="Search guest wishes..."
            className="w-full bg-[#1A0B2E] border border-[#E6C363]/20 rounded-lg pl-9 pr-3 py-2 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#F5CE62]"
          />
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
          <button
            onClick={() => setFilterAttending('all')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterAttending === 'all'
                ? 'bg-[#E6C363] text-[#190933]'
                : 'bg-[#1A0B2E] text-slate-300 hover:text-white'
            }`}
          >
            All Wishes
          </button>
          <button
            onClick={() => setFilterAttending('attending')}
            className={`px-3 py-1.5 rounded-lg text-xs font-semibold transition-colors cursor-pointer ${
              filterAttending === 'attending'
                ? 'bg-[#E6C363] text-[#190933]'
                : 'bg-[#1A0B2E] text-slate-300 hover:text-white'
            }`}
          >
            Attending Only
          </button>
        </div>
      </div>

      {/* Wishes Feed Cards Grid */}
      {filteredWishes.length === 0 ? (
        <div className="p-8 text-center rounded-xl border border-dashed border-[#E6C363]/30 bg-[#251147]/40 text-slate-400">
          <p className="text-sm">No blessings found matching your filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {filteredWishes.map((w) => (
            <div
              key={w.id}
              className="p-5 rounded-xl border border-[#E6C363]/25 bg-[#251147]/80 hover:border-[#E6C363]/50 transition-all shadow-lg flex flex-col justify-between group"
            >
              <div>
                {/* Header: Name, Status Badge, Timestamp */}
                <div className="flex items-start justify-between gap-2 mb-3">
                  <div className="flex items-center gap-2">
                    <div className="w-8 h-8 rounded-full bg-[#E6C363]/20 text-[#F5CE62] border border-[#E6C363]/40 flex items-center justify-center text-xs font-bold shrink-0">
                      {w.guestName.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <h4 className="text-sm font-bold text-white leading-tight">
                        {w.guestName}
                      </h4>
                      <span className="text-[10px] text-slate-400">{w.createdAt}</span>
                    </div>
                  </div>

                  <span
                    className={`text-[10px] font-bold px-2 py-0.5 rounded-full uppercase tracking-wider shrink-0 ${
                      w.attendingStatus === 'definitely'
                        ? 'bg-emerald-950/80 text-emerald-400 border border-emerald-500/30'
                        : w.attendingStatus === 'deciding'
                        ? 'bg-amber-950/80 text-amber-400 border border-amber-500/30'
                        : 'bg-rose-950/80 text-rose-400 border border-rose-500/30'
                    }`}
                  >
                    {w.attendingStatus === 'definitely'
                      ? 'Attending'
                      : w.attendingStatus === 'deciding'
                      ? 'Tentative'
                      : 'Declined'}
                  </span>
                </div>

                {/* Wishes Content */}
                <p className="text-xs sm:text-sm text-slate-200 leading-relaxed font-light mb-4 whitespace-pre-line">
                  &ldquo;{w.wishes}&rdquo;
                </p>
              </div>

              {/* Footer: Guests Count Badge + Heart Like */}
              <div className="pt-3 border-t border-[#E6C363]/15 flex items-center justify-between text-xs">
                <span className="text-[11px] text-[#E6C363] font-medium">
                  Guests: {w.guestCount}
                </span>

                <button
                  onClick={() => onToggleLike(w.id)}
                  className={`flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-semibold transition-all cursor-pointer ${
                    w.isLiked
                      ? 'bg-rose-500/20 text-rose-300 border border-rose-500/40'
                      : 'bg-[#1A0B2E] text-slate-400 hover:text-rose-400 border border-[#E6C363]/20'
                  }`}
                >
                  <Heart className={`w-3.5 h-3.5 ${w.isLiked ? 'fill-current text-rose-500' : ''}`} />
                  <span>{w.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};
