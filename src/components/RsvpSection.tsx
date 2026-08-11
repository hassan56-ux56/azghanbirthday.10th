import React, { useState } from 'react';
import { Send, CheckCircle2, Heart, Sparkles, UserCheck } from 'lucide-react';
import { EventDetails, RsvpSubmission } from '../types';
import { GoldFrameBorder } from './GoldFrameBorder';

interface RsvpSectionProps {
  eventDetails: EventDetails;
  guestName: string;
  onRsvpSubmit: (rsvp: Omit<RsvpSubmission, 'id' | 'createdAt' | 'likes'>) => void;
}

export const RsvpSection: React.FC<RsvpSectionProps> = ({
  eventDetails,
  guestName,
  onRsvpSubmit,
}) => {
  const [name, setName] = useState<string>(guestName || '');
  const [guestCount, setGuestCount] = useState<string>('One');
  const [attendingStatus, setAttendingStatus] = useState<'definitely' | 'declined' | 'deciding'>('definitely');
  const [wishes, setWishes] = useState<string>('');
  const [submitted, setSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !wishes.trim()) return;

    onRsvpSubmit({
      guestName: name.trim(),
      guestCount,
      attendingStatus,
      wishes: wishes.trim(),
    });

    setSubmitted(true);
    setWishes('');
    setTimeout(() => {
      setSubmitted(false);
    }, 5000);
  };

  return (
    <section id="rsvp" className="relative py-12 px-4 sm:px-8 max-w-3xl mx-auto text-center">
      <GoldFrameBorder>
        {/* Title: — RSVP — */}
        <div className="flex items-center justify-center gap-4 mb-8">
          <div className="h-px bg-gradient-to-r from-transparent via-[#E6C363] to-transparent flex-1 max-w-[120px]" />
          <h2 className="font-script text-4xl sm:text-6xl gold-text-gradient font-normal px-2">
            RSVP
          </h2>
          <div className="h-px bg-gradient-to-r from-transparent via-[#E6C363] to-transparent flex-1 max-w-[120px]" />
        </div>

        {/* Success Confirmation Notice */}
        {submitted ? (
          <div className="p-8 my-4 rounded-xl bg-[#251147] border border-[#E6C363] text-center shadow-2xl animate-fade-in">
            <div className="w-16 h-16 rounded-full bg-[#E6C363]/20 text-[#F5CE62] flex items-center justify-center mx-auto mb-4 border border-[#E6C363]">
              <CheckCircle2 className="w-8 h-8" />
            </div>
            <h3 className="text-2xl font-bold text-[#FFF0B3] mb-2 font-serif-display">
              RSVP Sent Successfully!
            </h3>
            <p className="text-sm text-slate-200 mb-4 max-w-md mx-auto font-light">
              Thank you, <span className="font-bold text-[#F5CE62]">{name}</span>! Your attendance and sweet wishes have been received and added to the guestbook wall below.
            </p>
            <button
              onClick={() => setSubmitted(false)}
              className="text-xs text-[#E6C363] underline font-medium hover:text-white transition-colors cursor-pointer"
            >
              Send another message
            </button>
          </div>
        ) : (
          /* RSVP Form (matching image 5) */
          <form onSubmit={handleSubmit} className="p-6 rounded-xl bg-[#1D0C38]/90 border border-[#E6C363]/30 text-left shadow-2xl">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-4">
              {/* Your Name */}
              <div>
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Write your name here"
                  className="w-full bg-[#2A1152] border border-[#E6C363]/30 rounded-lg px-4 py-3 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#F5CE62] transition-colors"
                />
              </div>

              {/* How many guests with you? */}
              <div>
                <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                  How many guests with you?
                </label>
                <div className="relative">
                  <select
                    value={guestCount}
                    onChange={(e) => setGuestCount(e.target.value)}
                    className="w-full bg-[#2A1152] border border-[#E6C363]/30 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5CE62] transition-colors cursor-pointer appearance-none pr-8"
                  >
                    <option value="One">One (Just me)</option>
                    <option value="Two">Two (+1 Guest)</option>
                    <option value="Three">Three (+2 Guests)</option>
                    <option value="Four+">Four or more</option>
                  </select>
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#E6C363] text-xs">
                    ▼
                  </div>
                </div>
              </div>
            </div>

            {/* Will you be there? */}
            <div className="mb-4">
              <label className="block text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Will you be there?
              </label>
              <div className="relative">
                <select
                  value={attendingStatus}
                  onChange={(e) => setAttendingStatus(e.target.value as any)}
                  className="w-full bg-[#2A1152] border border-[#E6C363]/30 rounded-lg px-4 py-3 text-sm text-white focus:outline-none focus:border-[#F5CE62] transition-colors cursor-pointer appearance-none pr-8 font-medium"
                >
                  <option value="definitely">I'll definitely be there</option>
                  <option value="deciding">Still deciding / Tentative</option>
                  <option value="declined">Sorry, I can't make it</option>
                </select>
                <div className="absolute right-3 top-1/2 -translate-y-1/2 pointer-events-none text-[#E6C363] text-xs">
                  ▼
                </div>
              </div>
            </div>

            {/* Your Wishes */}
            <div className="mb-6">
              <div className="flex items-center justify-between mb-2">
                <label className="block text-xs font-semibold text-white uppercase tracking-wider">
                  Your Birthday Wish & Prayer
                </label>
                <span className="text-[10px] text-[#E6C363]">Quick Template:</span>
              </div>

              {/* Quick Wish Template Chips */}
              <div className="flex flex-wrap gap-1.5 mb-3">
                {[
                  `Happy Sweet 17th Birthday ${eventDetails.fullName}! Wishing you endless laughter, success, and joy! ✨`,
                  `Wishing ${eventDetails.fullName} a year filled with grand adventures, peace, and prosperity! 🎉`,
                  `Happy Birthday buddy! So excited to celebrate your 17th milestone together! 🥂`,
                  `May all your dreams and prayers come true this year, ${eventDetails.fullName}! 🌟`
                ].map((template, idx) => (
                  <button
                    key={idx}
                    type="button"
                    onClick={() => setWishes(template)}
                    className="text-[10px] px-2.5 py-1 rounded-full bg-[#251147] border border-[#E6C363]/30 text-[#E6C363] hover:bg-[#E6C363] hover:text-[#190933] transition-all cursor-pointer font-medium"
                  >
                    + Template {idx + 1}
                  </button>
                ))}
              </div>

              <textarea
                required
                rows={4}
                value={wishes}
                onChange={(e) => setWishes(e.target.value)}
                placeholder={`Give words of blessing and prayer for ${eventDetails.fullName}...`}
                className="w-full bg-[#2A1152] border border-[#E6C363]/30 rounded-lg p-4 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-[#F5CE62] transition-colors resize-none"
              />
            </div>

            {/* SEND RSVP Gold Button (matching image 5) */}
            <button
              type="submit"
              className="w-full sm:w-auto px-8 py-3.5 rounded-lg gold-bg-gradient hover:gold-bg-gradient-hover text-[#190933] font-bold text-xs tracking-widest uppercase flex items-center justify-center gap-2 transition-transform hover:scale-105 cursor-pointer shadow-lg shadow-[#D4AF37]/20 active:scale-95"
            >
              <Send className="w-4 h-4" />
              <span>SEND WISH & RSVP</span>
            </button>
          </form>
        )}

        {/* Footer Note & Signature (matching image 5) */}
        <div className="mt-10 text-center">
          <p className="font-sans-body text-xs sm:text-sm text-slate-200 max-w-md mx-auto leading-relaxed font-light mb-2">
            It is a joy and honor if my friends are willing to attend and give their best prayers
          </p>

          <p className="font-sans-body text-xs uppercase tracking-widest text-[#E6C363] font-medium my-2">
            Best Regards.
          </p>

          <h3 className="font-script text-4xl sm:text-6xl gold-text-gradient my-1 font-semibold">
            {eventDetails.fullName}
          </h3>

          <p className="text-[10px] sm:text-xs text-slate-400 mt-6 tracking-wider">
            Copyright {new Date().getFullYear()} @ MettaInvitation - All Rights Reserved
          </p>
        </div>
      </GoldFrameBorder>
    </section>
  );
};
