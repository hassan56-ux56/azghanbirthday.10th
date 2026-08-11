import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, X, Maximize2, Sparkles } from 'lucide-react';
import { GalleryPhoto } from '../types';

interface PhotoSliderProps {
  photos: GalleryPhoto[];
}

export const PhotoSlider: React.FC<PhotoSliderProps> = ({ photos }) => {
  const [activeCategory, setActiveCategory] = useState<string>('All');
  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [selectedLightboxPhoto, setSelectedLightboxPhoto] = useState<GalleryPhoto | null>(null);

  const categories = ['All', 'Celebration', 'Decor', 'Moments', 'Pre-Party'];

  const filteredPhotos = activeCategory === 'All'
    ? photos
    : photos.filter((p) => p.category === activeCategory);

  const totalPhotos = filteredPhotos.length;

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? totalPhotos - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === totalPhotos - 1 ? 0 : prev + 1));
  };

  // Autoplay slider every 5 seconds
  useEffect(() => {
    if (totalPhotos <= 1) return;
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === totalPhotos - 1 ? 0 : prev + 1));
    }, 5000);
    return () => clearInterval(interval);
  }, [totalPhotos]);

  // Determine 3 visible slides for desktop view
  const getVisiblePhotos = () => {
    if (totalPhotos === 0) return [];
    if (totalPhotos <= 3) return filteredPhotos;
    const visible = [];
    for (let i = 0; i < 3; i++) {
      const index = (currentIndex + i) % totalPhotos;
      visible.push(filteredPhotos[index]);
    }
    return visible;
  };

  const visiblePhotos = getVisiblePhotos();

  return (
    <div className="relative my-8 max-w-4xl mx-auto">
      {/* Category Tabs */}
      <div className="flex flex-wrap items-center justify-center gap-2 mb-6">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => {
              setActiveCategory(cat);
              setCurrentIndex(0);
            }}
            className={`px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-all cursor-pointer ${
              activeCategory === cat
                ? 'gold-bg-gradient text-[#190933] shadow-md shadow-[#D4AF37]/20 scale-105'
                : 'bg-[#251147]/70 text-slate-300 border border-[#E6C363]/20 hover:border-[#E6C363]/50'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Main Slider Container with Maximum Size Frames */}
      <div className="relative px-2 sm:px-10">
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {visiblePhotos.map((photo, idx) => (
            <div
              key={`${photo.id}-${idx}`}
              onClick={() => setSelectedLightboxPhoto(photo)}
              className="group relative h-72 sm:h-80 md:h-96 rounded-2xl overflow-hidden border border-[#E6C363]/40 bg-[#16072D] p-2 flex flex-col justify-between shadow-2xl cursor-pointer transition-all duration-300 hover:scale-[1.03] hover:border-[#F5CE62]"
            >
              <div className="relative w-full h-full rounded-xl overflow-hidden bg-[#0A0318] flex items-center justify-center p-1">
                <img
                  src={photo.url}
                  alt={photo.title}
                  className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
                  referrerPolicy="no-referrer"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-[#15072B]/90 via-transparent to-transparent opacity-70 group-hover:opacity-90 transition-opacity" />
              </div>
              
              <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between text-white bg-black/60 backdrop-blur-sm p-2 rounded-xl border border-[#E6C363]/30">
                <div>
                  <p className="text-xs font-bold text-[#FFF0B3] line-clamp-1">{photo.title}</p>
                  <span className="text-[10px] uppercase text-[#E6C363] tracking-wider font-semibold">{photo.category}</span>
                </div>
                <div className="p-1.5 rounded-full bg-[#1A0B2E] text-[#F5CE62] border border-[#E6C363]/40">
                  <Maximize2 className="w-3.5 h-3.5" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Previous & Next Floating Buttons */}
        {totalPhotos > 1 && (
          <>
            <button
              onClick={handlePrev}
              className="absolute left-0 sm:left-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1A0B2E]/90 border border-[#E6C363]/60 text-[#F5CE62] flex items-center justify-center hover:bg-[#F5CE62] hover:text-[#190933] transition-all shadow-xl z-20 cursor-pointer"
              aria-label="Previous Photo"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={handleNext}
              className="absolute right-0 sm:right-2 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-[#1A0B2E]/90 border border-[#E6C363]/60 text-[#F5CE62] flex items-center justify-center hover:bg-[#F5CE62] hover:text-[#190933] transition-all shadow-xl z-20 cursor-pointer"
              aria-label="Next Photo"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </>
        )}
      </div>

      {/* Dot Indicators */}
      {totalPhotos > 1 && (
        <div className="flex items-center justify-center gap-2 mt-6">
          {Array.from({ length: totalPhotos }).map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentIndex(idx)}
              className={`h-2 rounded-full transition-all cursor-pointer ${
                currentIndex === idx
                  ? 'w-6 bg-[#F5CE62] shadow-[0_0_8px_#F5CE62]'
                  : 'w-2 bg-[#E6C363]/30 hover:bg-[#E6C363]/60'
              }`}
              aria-label={`Go to slide ${idx + 1}`}
            />
          ))}
        </div>
      )}

      {/* Lightbox Modal */}
      {selectedLightboxPhoto && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full bg-[#1A0B2E] border-2 border-[#E6C363] rounded-3xl overflow-hidden shadow-2xl p-4 sm:p-6 text-center">
            <button
              onClick={() => setSelectedLightboxPhoto(null)}
              className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-[#1A0B2E]/90 text-white border border-[#E6C363]/60 flex items-center justify-center hover:bg-[#F5CE62] hover:text-[#190933] transition-all cursor-pointer shadow-lg"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="relative max-h-[75vh] flex items-center justify-center bg-[#0A0318] rounded-2xl border border-[#E6C363]/30 p-2 mb-4 overflow-hidden shadow-2xl">
              <img
                src={selectedLightboxPhoto.url}
                alt={selectedLightboxPhoto.title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <div className="p-3 bg-[#251147] rounded-xl border border-[#E6C363]/30 flex items-center justify-between text-left">
              <div>
                <h4 className="text-base sm:text-lg font-bold text-[#FFF0B3]">{selectedLightboxPhoto.title}</h4>
                <p className="text-xs text-[#E6C363] uppercase tracking-wider font-semibold">{selectedLightboxPhoto.category}</p>
              </div>
              <span className="px-3 py-1 rounded-full gold-bg-gradient text-[#190933] font-bold text-xs shadow-md">
                Full Frame Resolution
              </span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
