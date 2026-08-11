import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  Heart,
  Star,
  Send,
  PartyPopper,
  MessageCircle,
  Calendar,
  MapPin,
  Clock,
  Award,
  Plus,
  CheckCircle2,
  Share2,
} from 'lucide-react';
import { EventDetails } from '../types';
import { GoldFrameBorder } from './GoldFrameBorder';

interface EventCountdownProps {
  eventDetails: EventDetails;
}

interface BestWishItem {
  id: string;
  sender: string;
  relation: string;
  avatar: string;
  badge: string;
  category: 'All' | 'Family' | 'Friends' | 'Heroes' | 'Blessings';
  wish: string;
  likes: number;
  hasLiked?: boolean;
  color: string;
}

const INITIAL_BEST_WISHES: BestWishItem[] = [
  {
    id: 'wish_1',
    sender: 'Mom & Dad',
    relation: 'Loving Parents',
    avatar: '❤️',
    badge: 'Endless Love',
    category: 'Family',
    wish: 'To our dearest son Azghan, 10 years ago you brought a golden light into our lives that shines brighter every day. Welcome to the double digits! May your life be filled with boundless joy, health, courage, and infinite adventures!',
    likes: 88,
    color: 'from-amber-500/20 to-[#2A1152]',
  },
  {
    id: 'wish_2',
    sender: 'Grandma & Grandpa',
    relation: 'Grandparents',
    avatar: '👵‍👨',
    badge: 'Golden Blessing',
    category: 'Blessings',
    wish: 'Happy 10th Birthday our precious grandson! Watching you grow into such a kind, brave, and bright boy fills our hearts with immense pride. May God always bless and protect your beautiful smile!',
    likes: 64,
    color: 'from-purple-500/20 to-[#1A0B2E]',
  },
  {
    id: 'wish_3',
    sender: 'Captain Cosmic & Superhero Squad',
    relation: '3D Friends',
    avatar: '🚀',
    badge: 'Level 10 Legend',
    category: 'Heroes',
    wish: 'BEEP BOOP! Mission Control confirms: Azghan has officially upgraded to Level 10 Superhero! Keep soaring high, conquering new goals, and inspiring everyone around you!',
    likes: 52,
    color: 'from-sky-500/20 to-[#15072B]',
  },
  {
    id: 'wish_5',
    sender: 'Leo, Ethan & The Squad',
    relation: 'School Besties',
    avatar: '🎮',
    badge: 'Gamer Master',
    category: 'Friends',
    wish: 'Happy 10th Birthday Azghan! You are the coolest, funniest best friend in the universe! Can’t wait for the epic birthday party, cake, and victory royales!',
    likes: 37,
    color: 'from-pink-500/20 to-[#2A1152]',
  },
  {
    id: 'wish_6',
    sender: 'The Birthday Guardian Angel',
    relation: 'Magical Wish',
    avatar: '✨',
    badge: 'Sweet Wishes',
    category: 'Blessings',
    wish: 'Wishing 10-year-old Azghan a magical year overflowing with bright dreams coming true, heartwarming surprises, soaring success in school, and pure happiness!',
    likes: 49,
    color: 'from-yellow-500/20 to-[#15072B]',
  },
];

export const EventCountdown: React.FC<EventCountdownProps> = ({ eventDetails }) => {
  // Best Wishes State
  const [wishesList, setWishesList] = useState<BestWishItem[]>(() => {
    const saved = localStorage.getItem('birthday_best_wishes_showcase');
    if (saved) {
      try {
        const parsed: BestWishItem[] = JSON.parse(saved);
        return parsed.filter((w) => w.id !== 'wish_4');
      } catch (e) {
        return INITIAL_BEST_WISHES;
      }
    }
    return INITIAL_BEST_WISHES;
  });

  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [showAddForm, setShowAddForm] = useState<boolean>(false);
  const [newSender, setNewSender] = useState<string>('');
  const [newRelation, setNewRelation] = useState<string>('');
  const [newWishText, setNewWishText] = useState<string>('');
  const [newCategory, setNewCategory] = useState<'Family' | 'Friends' | 'Heroes' | 'Blessings'>('Family');
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [sparkleShower, setSparkleShower] = useState<boolean>(false);

  // Countdown timer calculation
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  useEffect(() => {
    localStorage.setItem('birthday_best_wishes_showcase', JSON.stringify(wishesList));
  }, [wishesList]);

  useEffect(() => {
    const calculateTimeLeft = () => {
      const target = new Date(eventDetails.rawDateISO).getTime();
      const now = new Date().getTime();
      const diff = target - now;
      if (diff > 0) {
        setTimeLeft({
          days: Math.floor(diff / (1000 * 60 * 60 * 24)),
          hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((diff / 1000 / 60) % 60),
          seconds: Math.floor((diff / 1000) % 60),
        });
      }
    };
    calculateTimeLeft();
    const timer = setInterval(calculateTimeLeft, 1000);
    return () => clearInterval(timer);
  }, [eventDetails.rawDateISO]);

  // Handle Like / Reaction Toggle
  const handleLike = (id: string) => {
    setWishesList((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          const isLiked = item.hasLiked;
          return {
            ...item,
            likes: isLiked ? item.likes - 1 : item.likes + 1,
            hasLiked: !isLiked,
          };
        }
        return item;
      })
    );
  };

  // Handle Add New Best Wish
  const handleAddWishSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSender.trim() || !newWishText.trim()) return;

    const newWishObj: BestWishItem = {
      id: 'wish_' + Date.now(),
      sender: newSender.trim(),
      relation: newRelation.trim() || 'Well Wisher',
      avatar: newCategory === 'Family' ? '❤️' : newCategory === 'Friends' ? '🎉' : newCategory === 'Heroes' ? '🦸' : '✨',
      badge: 'Special Blessing',
      category: newCategory,
      wish: newWishText.trim(),
      likes: 1,
      hasLiked: true,
      color: 'from-amber-500/20 to-[#2A1152]',
    };

    setWishesList([newWishObj, ...wishesList]);
    setNewSender('');
    setNewRelation('');
    setNewWishText('');
    setFormSubmitted(true);

    setTimeout(() => {
      setFormSubmitted(false);
      setShowAddForm(false);
    }, 2000);
  };

  // Trigger Sparkle Shower
  const handleShowerBlessings = () => {
    setSparkleShower(true);
    setTimeout(() => setSparkleShower(false), 3000);
  };

  const filteredWishes =
    activeCategory === 'All'
      ? wishesList
      : wishesList.filter((w) => w.category === activeCategory);

  return (
    <section id="event-details" className="relative py-12 px-4 sm:px-8 max-w-4xl mx-auto text-center z-10">
      {/* Sparkle Shower Particles Effect */}
      {sparkleShower && (
        <div className="fixed inset-0 pointer-events-none z-50 flex items-center justify-center overflow-hidden">
          <div className="absolute top-10 left-1/4 animate-bounce text-3xl">✨</div>
          <div className="absolute top-20 right-1/4 animate-ping text-3xl">🌟</div>
          <div className="absolute top-1/3 left-10 animate-spin text-4xl">💖</div>
          <div className="absolute top-1/2 right-12 animate-pulse text-4xl">🎂</div>
          <div className="absolute bottom-20 left-1/3 animate-bounce text-3xl">🎉</div>
          <div className="absolute bottom-10 right-1/3 animate-spin text-3xl">⭐</div>
        </div>
      )}

      <GoldFrameBorder>
        {/* Header Section */}
        <div className="flex items-center justify-center gap-3 mb-2">
          <Sparkles className="w-6 h-6 text-[#F5CE62] animate-pulse" />
          <p className="text-xs sm:text-sm uppercase tracking-[0.25em] text-[#E6C363] font-bold">
            Golden Blessings & Tributes
          </p>
          <Sparkles className="w-6 h-6 text-[#F5CE62] animate-pulse" />
        </div>

        <h2 className="font-script text-4xl sm:text-6xl gold-text-gradient mb-3">
          Beautiful Best Wishes
        </h2>

        <p className="font-sans-body text-sm sm:text-base text-[#FFF0B3] max-w-xl mx-auto mb-8 font-light leading-relaxed">
          Heartfelt prayers, loving tributes, and magical blessings celebrating {eventDetails.fullName}&apos;s grand 10th Birthday milestone!
        </p>

        {/* Action Toolbar: Categories & Add Wish Button */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 mb-8 pb-4 border-b border-[#E6C363]/30">
          {/* Category Filter Pills */}
          <div className="flex items-center gap-2 overflow-x-auto max-w-full pb-2 sm:pb-0 no-scrollbar">
            {['All', 'Family', 'Blessings', 'Heroes', 'Friends'].map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer whitespace-nowrap ${
                  activeCategory === cat
                    ? 'gold-bg-gradient text-[#190933] shadow-md scale-105'
                    : 'bg-[#251147]/80 border border-[#E6C363]/30 text-slate-300 hover:text-white hover:border-[#E6C363]'
                }`}
              >
                {cat === 'All' ? '✨ All Wishes' : cat === 'Family' ? '💖 Family' : cat === 'Blessings' ? '🌸 Blessings' : cat === 'Heroes' ? '🚀 Heroes' : '🎮 Friends'}
              </button>
            ))}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-2">
            <button
              onClick={handleShowerBlessings}
              className="px-3 py-2 rounded-xl bg-[#321361] border border-[#E6C363]/50 text-[#FFF0B3] hover:bg-[#E6C363] hover:text-[#190933] text-xs font-bold transition-all cursor-pointer flex items-center gap-1.5 shadow-md"
              title="Trigger golden sparkle animation"
            >
              <Sparkles className="w-3.5 h-3.5 text-[#F5CE62]" />
              <span>Shower Blessings</span>
            </button>

            <button
              onClick={() => setShowAddForm(!showAddForm)}
              className="px-4 py-2 rounded-xl gold-bg-gradient hover:gold-bg-gradient-hover text-[#190933] font-bold text-xs transition-all cursor-pointer flex items-center gap-1.5 shadow-lg shadow-[#D4AF37]/20"
            >
              <Plus className="w-4 h-4" />
              <span>Send Your Best Wish</span>
            </button>
          </div>
        </div>

        {/* Expandable Add Best Wish Form */}
        {showAddForm && (
          <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-br from-[#251147] to-[#1A0B2E] border-2 border-[#E6C363] text-left shadow-2xl relative animate-fade-in">
            <div className="flex items-center justify-between mb-4 pb-2 border-b border-[#E6C363]/30">
              <h3 className="font-serif-display text-lg font-bold text-[#FFF0B3] flex items-center gap-2">
                <Heart className="w-5 h-5 text-rose-400 fill-current" />
                <span>Write A Beautiful Best Wish for {eventDetails.fullName}</span>
              </h3>
              <button
                onClick={() => setShowAddForm(false)}
                className="text-slate-400 hover:text-white text-xs font-bold"
              >
                Cancel
              </button>
            </div>

            {formSubmitted ? (
              <div className="p-4 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 text-center font-bold text-sm flex items-center justify-center gap-2 my-4">
                <CheckCircle2 className="w-5 h-5 text-emerald-400" />
                <span>Your beautiful wish has been published with golden blessings!</span>
              </div>
            ) : (
              <form onSubmit={handleAddWishSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold text-[#E6C363] uppercase mb-1">
                      Your Name *
                    </label>
                    <input
                      type="text"
                      required
                      value={newSender}
                      onChange={(e) => setNewSender(e.target.value)}
                      placeholder="e.g. Uncle Mark"
                      className="w-full bg-[#110524] border border-[#E6C363]/40 rounded-xl p-2.5 text-xs text-white focus:border-[#F5CE62] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#E6C363] uppercase mb-1">
                      Relationship
                    </label>
                    <input
                      type="text"
                      value={newRelation}
                      onChange={(e) => setNewRelation(e.target.value)}
                      placeholder="e.g. Family Friend"
                      className="w-full bg-[#110524] border border-[#E6C363]/40 rounded-xl p-2.5 text-xs text-white focus:border-[#F5CE62] focus:outline-none"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold text-[#E6C363] uppercase mb-1">
                      Wish Category
                    </label>
                    <select
                      value={newCategory}
                      onChange={(e) => setNewCategory(e.target.value as any)}
                      className="w-full bg-[#110524] border border-[#E6C363]/40 rounded-xl p-2.5 text-xs text-white focus:border-[#F5CE62] focus:outline-none cursor-pointer"
                    >
                      <option value="Family">💖 Family</option>
                      <option value="Blessings">🌸 Blessings</option>
                      <option value="Heroes">🚀 Heroes</option>
                      <option value="Friends">🎮 Friends</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold text-[#E6C363] uppercase mb-1">
                    Your Best Wish Message *
                  </label>
                  <textarea
                    rows={3}
                    required
                    value={newWishText}
                    onChange={(e) => setNewWishText(e.target.value)}
                    placeholder="Write your heartfelt birthday wishes, blessings, and warm words..."
                    className="w-full bg-[#110524] border border-[#E6C363]/40 rounded-xl p-3 text-xs text-white leading-relaxed focus:border-[#F5CE62] focus:outline-none"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 rounded-xl gold-bg-gradient hover:gold-bg-gradient-hover text-[#190933] font-black text-xs uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer shadow-lg"
                >
                  <Send className="w-4 h-4" />
                  <span>Publish Best Wish</span>
                </button>
              </form>
            )}
          </div>
        )}

        {/* BEST WISHES DISPLAY GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left mb-8">
          {filteredWishes.map((item) => (
            <div
              key={item.id}
              className={`p-5 rounded-3xl bg-gradient-to-br ${item.color} border-2 border-[#E6C363]/40 shadow-xl hover:border-[#F5CE62] transition-all duration-300 flex flex-col justify-between group relative overflow-hidden`}
            >
              {/* Top Accent Ribbon */}
              <div className="flex items-center justify-between mb-3 gap-2">
                <div className="flex items-center gap-2.5">
                  <div className="w-10 h-10 rounded-2xl bg-[#321361] border border-[#E6C363] flex items-center justify-center text-xl shadow-inner shrink-0">
                    {item.avatar}
                  </div>
                  <div>
                    <h3 className="font-serif-display text-base font-bold text-white group-hover:text-[#FFF0B3] transition-colors leading-tight">
                      {item.sender}
                    </h3>
                    <p className="text-[10px] text-[#E6C363] uppercase font-semibold">
                      {item.relation}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-bold px-2.5 py-1 rounded-full bg-[#190933]/80 border border-[#E6C363]/30 text-[#FFF0B3]">
                  {item.badge}
                </span>
              </div>

              {/* Wish Text */}
              <p className="font-sans-body text-xs sm:text-sm text-[#FFF3C4] leading-relaxed mb-4 italic font-light">
                &ldquo;{item.wish}&rdquo;
              </p>

              {/* Bottom Card Footer with Like / Reaction Button */}
              <div className="pt-3 border-t border-[#E6C363]/20 flex items-center justify-between text-xs">
                <span className="text-[10px] text-slate-400 flex items-center gap-1">
                  <Sparkles className="w-3 h-3 text-[#F5CE62]" />
                  <span>Double Digits Blessing</span>
                </span>

                <button
                  onClick={() => handleLike(item.id)}
                  className={`px-3 py-1 rounded-full text-[11px] font-bold flex items-center gap-1.5 transition-transform active:scale-95 cursor-pointer ${
                    item.hasLiked
                      ? 'bg-rose-500/30 text-rose-300 border border-rose-400'
                      : 'bg-[#251147] text-slate-300 border border-[#E6C363]/30 hover:border-[#E6C363] hover:text-white'
                  }`}
                >
                  <Heart
                    className={`w-3.5 h-3.5 ${
                      item.hasLiked ? 'text-rose-400 fill-current' : 'text-slate-400'
                    }`}
                  />
                  <span>{item.likes}</span>
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Bottom Banner: Quick Event Details & Countdown Summary Pill */}
        <div className="p-4 rounded-2xl bg-gradient-to-r from-[#251147] via-[#1F0D3D] to-[#251147] border border-[#E6C363]/40 flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-[#321361] border border-[#E6C363] text-[#F5CE62] shrink-0 hidden sm:block">
              <PartyPopper className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs font-bold text-white flex items-center justify-center sm:justify-start gap-1.5">
                <Calendar className="w-3.5 h-3.5 text-[#F5CE62]" />
                <span>{eventDetails.eventDate}</span>
                <span className="text-[#E6C363]">• {eventDetails.timeString}</span>
              </p>
              <p className="text-[11px] text-slate-300 mt-0.5 flex items-center justify-center sm:justify-start gap-1">
                <MapPin className="w-3 h-3 text-[#F5CE62]" />
                <span className="line-clamp-1">{eventDetails.locationName}</span>
              </p>
            </div>
          </div>

          {/* Mini Countdown Badge */}
          <div className="flex items-center gap-2 bg-[#110524] px-3.5 py-2 rounded-xl border border-[#E6C363]/30 font-mono text-xs text-[#FFF0B3] shrink-0">
            <Clock className="w-3.5 h-3.5 text-[#F5CE62]" />
            <span className="font-bold text-white">{timeLeft.days}d {timeLeft.hours}h {timeLeft.minutes}m {timeLeft.seconds}s</span>
          </div>
        </div>
      </GoldFrameBorder>
    </section>
  );
};
