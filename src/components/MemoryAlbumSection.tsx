import React, { useState, useEffect } from 'react';
import { Sparkles, Maximize2, X, ChevronLeft, ChevronRight, Heart, Play, Pause, Grid, Layers, Search } from 'lucide-react';

export interface AlbumPhoto {
  id: string;
  url: string;
  title: string;
  category?: string;
  caption?: string;
}

export const MEMORY_ALBUM_PHOTOS: AlbumPhoto[] = [
  {
    id: 'alb-1',
    url: 'https://i.ibb.co/v4SpTKVZ/IMG-20260808-WA0059.jpg',
    title: 'Bright Joyful Smile',
    category: 'Portraits',
    caption: 'Azghan radiating happiness and warm energy!'
  },
  {
    id: 'alb-2',
    url: 'https://i.ibb.co/99NWms8p/IMG-20260808-WA0061.jpg',
    title: 'Happy Moments',
    category: 'Celebrations',
    caption: 'Making golden memories with a joyful heart.'
  },
  {
    id: 'alb-3',
    url: 'https://i.ibb.co/7dXmXmSX/IMG-20260808-WA0063-1.jpg',
    title: 'Unforgettable Days',
    category: 'Precious Moments',
    caption: 'Cherished laughter and special family times.'
  },
  {
    id: 'alb-4',
    url: 'https://i.ibb.co/PGjdN9cG/IMG-20260808-WA0065.jpg',
    title: 'Playful Spirit',
    category: 'Adventures',
    caption: 'Always full of energy and ready for fun.'
  },
  {
    id: 'alb-5',
    url: 'https://i.ibb.co/rGZzVFxV/IMG-20260808-WA0066.jpg',
    title: 'Sweet Childhood Memories',
    category: 'Precious Moments',
    caption: 'Growing up surrounded by love and warmth.'
  },
  {
    id: 'alb-6',
    url: 'https://i.ibb.co/r2jTgbQq/IMG-20260808-WA0072.jpg',
    title: 'Golden Smiles',
    category: 'Portraits',
    caption: 'A smile that lights up the entire room!'
  },
  {
    id: 'alb-7',
    url: 'https://i.ibb.co/v6sg723F/IMG-20260808-WA0073.jpg',
    title: 'Outdoor Explorer',
    category: 'Adventures',
    caption: 'Exploring the world with curious and bright eyes.'
  },
  {
    id: 'alb-8',
    url: 'https://i.ibb.co/j957h6WG/IMG-20260808-WA0074.jpg',
    title: 'Special Celebration',
    category: 'Celebrations',
    caption: 'Dressed up and ready for special festivities.'
  },
  {
    id: 'alb-9',
    url: 'https://i.ibb.co/5hmCcZFY/IMG-20260808-WA0078.jpg',
    title: 'Little Champ',
    category: 'Portraits',
    caption: 'Confidence and charm in every pose.'
  },
  {
    id: 'alb-10',
    url: 'https://i.ibb.co/DDJg4yYY/IMG-20260808-WA0083.jpg',
    title: 'Cherished Smiles',
    category: 'Precious Moments',
    caption: 'Capturing the purest innocent moments.'
  },
  {
    id: 'alb-11',
    url: 'https://i.ibb.co/G4yM7F4W/IMG-20260808-WA0086.jpg',
    title: 'Family Treasure',
    category: 'Celebrations',
    caption: 'A priceless memory kept close to heart.'
  },
  {
    id: 'alb-12',
    url: 'https://i.ibb.co/fd3tP41V/IMG-20260808-WA0087.jpg',
    title: 'Sparkling Eyes',
    category: 'Portraits',
    caption: 'Bright dreams for a wonderful double-digit future.'
  },
  {
    id: 'alb-13',
    url: 'https://i.ibb.co/Wj7Yt5L/IMG-20260808-WA0088.jpg',
    title: 'Joyful Days',
    category: 'Adventures',
    caption: 'Laughing out loud on a sunny afternoon.'
  },
  {
    id: 'alb-14',
    url: 'https://i.ibb.co/M5RvrB33/IMG-20260808-WA0089.jpg',
    title: 'Precious Snapshots',
    category: 'Precious Moments',
    caption: 'Every picture tells a beautiful story.'
  },
  {
    id: 'alb-15',
    url: 'https://i.ibb.co/Xk2G7TW5/IMG-20260808-WA0090.jpg',
    title: 'Shining Star',
    category: 'Portraits',
    caption: 'Standing proud and bright.'
  },
  {
    id: 'alb-16',
    url: 'https://i.ibb.co/rG46GHHF/IMG-20260808-WA0091.jpg',
    title: 'Wonderful Journey',
    category: 'Precious Moments',
    caption: 'Looking back at 10 amazing years.'
  },
  {
    id: 'alb-17',
    url: 'https://i.ibb.co/B2YHHzrw/IMG-20260808-WA0094.jpg',
    title: 'Happy Festivities',
    category: 'Celebrations',
    caption: 'Warm celebrations with loved ones.'
  },
  {
    id: 'alb-18',
    url: 'https://i.ibb.co/39xJD5C2/IMG-20260808-WA0095.jpg',
    title: 'Brave Explorer',
    category: 'Adventures',
    caption: 'Ready for new adventures and discoveries.'
  },
  {
    id: 'alb-19',
    url: 'https://i.ibb.co/mk4gSx2/IMG-20260808-WA0097.jpg',
    title: 'Golden Heart',
    category: 'Portraits',
    caption: 'Spreading kindness and cheerful smiles.'
  },
  {
    id: 'alb-20',
    url: 'https://i.ibb.co/4RxWj2sx/IMG-20260808-WA0098.jpg',
    title: 'Unconditional Joy',
    category: 'Precious Moments',
    caption: 'Simple moments turned into lifelong treasures.'
  },
  {
    id: 'alb-21',
    url: 'https://i.ibb.co/pj1fc4Yq/IMG-20260808-WA0100.jpg',
    title: 'Pure Innocence',
    category: 'Portraits',
    caption: 'The sweetest memories of childhood.'
  },
  {
    id: 'alb-22',
    url: 'https://i.ibb.co/sJkZbPyC/IMG-20260808-WA0101.jpg',
    title: 'Birthday Joy',
    category: 'Celebrations',
    caption: 'Counting blessings as double-digits unlock.'
  },
  {
    id: 'alb-23',
    url: 'https://i.ibb.co/G47Hz6Sb/IMG-20260808-WA0102.jpg',
    title: 'Radiant Charm',
    category: 'Portraits',
    caption: 'Dressed with flair and elegance.'
  },
  {
    id: 'alb-24',
    url: 'https://i.ibb.co/Y7xmC9zd/IMG-20260808-WA0103.jpg',
    title: 'Precious Keepsake',
    category: 'Precious Moments',
    caption: 'A timeless portrait of happiness.'
  },
  {
    id: 'alb-25',
    url: 'https://i.ibb.co/TqqJPr19/IMG-20260808-WA0105.jpg',
    title: 'Superstar Energy',
    category: 'Adventures',
    caption: 'Unstoppable joy and positive vibes.'
  },
  {
    id: 'alb-26',
    url: 'https://i.ibb.co/FL8KJYTF/IMG-20260808-WA0108.jpg',
    title: 'Level 10 Legend',
    category: 'Celebrations',
    caption: 'Welcoming 10 years of brilliance!'
  }
];

interface MemoryAlbumSectionProps {
  hostName?: string;
}

export const MemoryAlbumSection: React.FC<MemoryAlbumSectionProps> = ({
  hostName = 'Azghan'
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [isAutoPlay, setIsAutoPlay] = useState<boolean>(false);
  const [viewMode, setViewMode] = useState<'grid' | 'slideshow'>('grid');

  const categories = ['All', 'Celebrations', 'Adventures', 'Portraits', 'Precious Moments'];

  const filteredPhotos = MEMORY_ALBUM_PHOTOS.filter((photo) => {
    const matchesCategory = selectedCategory === 'All' || photo.category === selectedCategory;
    const matchesSearch =
      photo.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (photo.caption && photo.caption.toLowerCase().includes(searchQuery.toLowerCase()));
    return matchesCategory && matchesSearch;
  });

  // Auto Play Slideshow in Lightbox
  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isAutoPlay && lightboxIndex !== null) {
      interval = setInterval(() => {
        setLightboxIndex((prev) =>
          prev !== null ? (prev + 1) % filteredPhotos.length : 0
        );
      }, 3500);
    }
    return () => clearInterval(interval);
  }, [isAutoPlay, lightboxIndex, filteredPhotos.length]);

  const handlePrevPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev !== null ? (prev - 1 + filteredPhotos.length) % filteredPhotos.length : 0
      );
    }
  };

  const handleNextPhoto = () => {
    if (lightboxIndex !== null) {
      setLightboxIndex((prev) =>
        prev !== null ? (prev + 1) % filteredPhotos.length : 0
      );
    }
  };

  return (
    <section id="memory-album" className="relative py-16 px-4 sm:px-8 max-w-6xl mx-auto text-center scroll-mt-20">
      {/* Title Header */}
      <div className="mb-10 text-center">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full gold-bg-gradient text-[#190933] font-bold text-xs uppercase tracking-widest shadow-lg mb-3">
          <Sparkles className="w-4 h-4" /> 26 Special Memories
        </span>
        <h2 className="font-serif-display text-3xl sm:text-5xl font-bold gold-text-gradient tracking-wide mb-3">
          {hostName}&apos;s Memory Album
        </h2>
        <p className="font-sans-body text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-light leading-relaxed">
          A dedicated photo gallery capturing 26 precious childhood moments, smiles, celebrations, and golden adventures!
        </p>
      </div>

      {/* Filter Tabs & Search Bar */}
      <div className="bg-[#1B0C38]/80 border border-[#E6C363]/40 rounded-2xl p-4 mb-8 shadow-xl backdrop-blur-md max-w-4xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
        {/* Category Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-2">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                selectedCategory === cat
                  ? 'gold-bg-gradient text-[#190933] shadow-md scale-105 border border-[#F5CE62]'
                  : 'bg-[#120526] text-slate-300 border border-[#E6C363]/30 hover:border-[#E6C363] hover:text-white'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Search & View Mode Controls */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="relative flex-1 md:w-56">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-[#E6C363]" />
            <input
              type="text"
              placeholder="Search album..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-[#100424] border border-[#E6C363]/30 rounded-xl pl-9 pr-3 py-1.5 text-xs text-white placeholder-slate-400 focus:outline-none focus:border-[#F5CE62]"
            />
          </div>

          <div className="flex items-center gap-1 bg-[#100424] border border-[#E6C363]/30 rounded-xl p-1">
            <button
              onClick={() => setViewMode('grid')}
              title="Grid View"
              className={`p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                viewMode === 'grid' ? 'gold-bg-gradient text-[#190933]' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => {
                setViewMode('slideshow');
                if (filteredPhotos.length > 0) setLightboxIndex(0);
              }}
              title="Slideshow Mode"
              className={`p-1.5 rounded-lg text-xs cursor-pointer transition-colors ${
                viewMode === 'slideshow' ? 'gold-bg-gradient text-[#190933]' : 'text-slate-300 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Album Grid View */}
      {filteredPhotos.length === 0 ? (
        <div className="py-12 text-slate-400 text-sm bg-[#1A0B2E]/50 rounded-2xl border border-[#E6C363]/20">
          No memory photos found matching &quot;{searchQuery}&quot;. Try selecting another category!
        </div>
      ) : (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 sm:gap-6">
          {filteredPhotos.map((photo, index) => (
            <div
              key={photo.id}
              onClick={() => {
                setLightboxIndex(index);
                setIsAutoPlay(false);
              }}
              className="group relative bg-[#16072D] border-2 border-[#E6C363]/40 rounded-2xl p-2 shadow-xl hover:border-[#F5CE62] transition-all duration-300 hover:scale-[1.03] cursor-pointer flex flex-col justify-between overflow-hidden"
            >
              {/* Image Frame Box */}
              <div className="relative w-full h-44 sm:h-52 md:h-60 rounded-xl overflow-hidden bg-[#0A0318] flex items-center justify-center p-1">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500"
                  referrerPolicy="no-referrer"
                  loading="lazy"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15072B]/90 via-transparent to-transparent opacity-60 group-hover:opacity-90 transition-opacity" />

                {/* Expand overlay badge */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <span className="px-3 py-1.5 rounded-full gold-bg-gradient text-[#190933] font-bold text-xs flex items-center gap-1.5 shadow-xl transform translate-y-2 group-hover:translate-y-0 transition-transform">
                    <Maximize2 className="w-3.5 h-3.5" /> Full Size Frame
                  </span>
                </div>
              </div>

              {/* Title & Caption */}
              <div className="pt-2 text-left px-1">
                <p className="text-xs sm:text-sm font-bold text-[#FFF0B3] truncate">{photo.title}</p>
                <div className="flex items-center justify-between text-[10px] text-[#E6C363] mt-0.5">
                  <span className="uppercase tracking-wider font-semibold">{photo.category || 'Memory'}</span>
                  <span className="opacity-80">#{index + 1}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Lightbox / Slideshow Modal */}
      {lightboxIndex !== null && filteredPhotos[lightboxIndex] && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-xl flex items-center justify-center p-4 sm:p-6 animate-fade-in">
          <div className="relative max-w-5xl w-full bg-[#1A0B2E] border-2 border-[#E6C363] rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 text-center flex flex-col items-center">
            {/* Top Bar Controls */}
            <div className="w-full flex items-center justify-between mb-3 border-b border-[#E6C363]/30 pb-3">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full gold-bg-gradient text-[#190933] font-bold text-xs shadow-md">
                  {lightboxIndex + 1} / {filteredPhotos.length}
                </span>
                <span className="text-xs text-[#E6C363] uppercase tracking-wider font-semibold hidden sm:inline-block">
                  {filteredPhotos[lightboxIndex].category}
                </span>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center gap-3">
                <button
                  onClick={() => setIsAutoPlay(!isAutoPlay)}
                  className={`px-3 py-1.5 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-all cursor-pointer ${
                    isAutoPlay
                      ? 'bg-amber-400 text-[#190933] animate-pulse shadow-lg'
                      : 'bg-[#281347] text-white border border-[#E6C363]/40 hover:bg-[#E6C363] hover:text-[#190933]'
                  }`}
                >
                  {isAutoPlay ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
                  <span>{isAutoPlay ? 'Auto-Playing' : 'Slideshow'}</span>
                </button>

                <button
                  onClick={() => {
                    setLightboxIndex(null);
                    setIsAutoPlay(false);
                  }}
                  className="w-9 h-9 rounded-full bg-black/70 text-white font-bold text-sm border border-[#E6C363]/50 hover:bg-[#E6C363] hover:text-[#190933] transition-colors cursor-pointer flex items-center justify-center shadow-lg"
                  title="Close Modal"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Main Image View with Left / Right Controls */}
            <div className="relative w-full max-h-[72vh] flex items-center justify-center bg-[#080214] rounded-2xl border border-[#E6C363]/40 p-2 overflow-hidden shadow-2xl my-2 group">
              <img
                src={filteredPhotos[lightboxIndex].url}
                alt={filteredPhotos[lightboxIndex].title}
                className="max-h-[68vh] w-auto max-w-full object-contain rounded-xl transition-all duration-500"
                referrerPolicy="no-referrer"
              />

              {/* Prev Button */}
              <button
                onClick={handlePrevPhoto}
                className="absolute left-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/80 text-[#E6C363] border border-[#E6C363]/60 flex items-center justify-center hover:bg-[#E6C363] hover:text-[#190933] transition-all cursor-pointer shadow-2xl hover:scale-110"
                title="Previous Memory"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>

              {/* Next Button */}
              <button
                onClick={handleNextPhoto}
                className="absolute right-3 top-1/2 -translate-y-1/2 w-11 h-11 rounded-full bg-black/80 text-[#E6C363] border border-[#E6C363]/60 flex items-center justify-center hover:bg-[#E6C363] hover:text-[#190933] transition-all cursor-pointer shadow-2xl hover:scale-110"
                title="Next Memory"
              >
                <ChevronRight className="w-6 h-6" />
              </button>
            </div>

            {/* Bottom Caption & Title */}
            <div className="w-full p-3 bg-[#251147] rounded-xl border border-[#E6C363]/30 text-left flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-[#FFF0B3]">{filteredPhotos[lightboxIndex].title}</h3>
                <p className="text-xs sm:text-sm text-slate-300 font-light mt-0.5">
                  {filteredPhotos[lightboxIndex].caption}
                </p>
              </div>

              <span className="text-xs text-[#E6C363] flex items-center gap-1 font-semibold shrink-0">
                <Heart className="w-4 h-4 text-[#F5CE62]" /> Azghan&apos;s Memory Album
              </span>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
