import React, { useState } from 'react';
import { EventDetails } from '../types';
import { Maximize2, Sparkles } from 'lucide-react';
import decorCardImage from '../assets/images/regenerated_image_1786208908399.jpg';
import boyPortraitImage from '../assets/images/regenerated_image_1786208736254.jpg';

interface HonoringSectionProps {
  eventDetails: EventDetails;
}

export const HonoringSection: React.FC<HonoringSectionProps> = ({ eventDetails }) => {
  const [selectedImage, setSelectedImage] = useState<{ url: string; title: string } | null>(null);
  const cakeImgSrc = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaYTi9InJnqyyXvEHWW9EyqIMaNkMDZ2fCQwg5u1gxHeZOIPKxAGUcH3s&s=10";
  const partyImgSrc = "https://m.media-amazon.com/images/I/71TbfsfpzdL._AC_UF894,1000_QL80_.jpg";
  const mainPortraitSrc = boyPortraitImage;

  return (
    <section id="honoring" className="relative py-16 px-4 sm:px-8 max-w-4xl mx-auto text-center">
      {/* Top Section Cursive Header */}
      <h2 className="font-script text-5xl sm:text-7xl gold-text-gradient mb-8 leading-tight">
        Birthday Party
      </h2>

      {/* Two Decor & Treats Cards */}
      <div className="grid grid-cols-2 gap-3 sm:gap-6 max-w-xl mx-auto mb-8">
        <div 
          onClick={() => setSelectedImage({ url: cakeImgSrc, title: "Golden Birthday Cake & Treats" })}
          className="group overflow-hidden rounded-2xl border-2 border-[#E6C363]/40 bg-[#16072D] p-1.5 shadow-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer relative"
        >
          <div className="w-full h-40 sm:h-52 rounded-xl overflow-hidden bg-[#0A0318] flex items-center justify-center p-1">
            <img
              src={cakeImgSrc}
              alt="Golden Birthday Cake"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#190933]/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-2 justify-center">
            <span className="text-xs text-[#F5CE62] font-bold uppercase tracking-wider flex items-center gap-1">
              <Maximize2 className="w-3 h-3" /> Birthday Cake
            </span>
          </div>
        </div>

        <div 
          onClick={() => setSelectedImage({ url: partyImgSrc, title: "Birthday Party Celebration Decor" })}
          className="group overflow-hidden rounded-2xl border-2 border-[#E6C363]/40 bg-[#16072D] p-1.5 shadow-xl transition-all duration-300 hover:scale-[1.03] cursor-pointer relative"
        >
          <div className="w-full h-40 sm:h-52 rounded-xl overflow-hidden bg-[#0A0318] flex items-center justify-center p-1">
            <img
              src={partyImgSrc}
              alt="Party Celebration Decor"
              className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-700"
              referrerPolicy="no-referrer"
            />
          </div>
          <div className="absolute inset-0 bg-gradient-to-t from-[#190933]/80 via-transparent to-transparent opacity-80 group-hover:opacity-100 transition-opacity flex items-end p-2 justify-center">
            <span className="text-xs text-[#F5CE62] font-bold uppercase tracking-wider flex items-center gap-1">
              <Maximize2 className="w-3 h-3" /> Party Decor
            </span>
          </div>
        </div>
      </div>

      {/* Honoring Label */}
      <p className="font-sans-body text-sm uppercase tracking-[0.25em] text-[#E6C363] font-bold mb-6 flex items-center justify-center gap-2">
        <Sparkles className="w-4 h-4 text-[#F5CE62]" />
        <span>Honoring</span>
        <Sparkles className="w-4 h-4 text-[#F5CE62]" />
      </p>

      {/* Main Maximum Frame Size Portrait Card */}
      <div className="relative max-w-lg mx-auto mb-6">
        <div 
          onClick={() => setSelectedImage({ url: mainPortraitSrc, title: `${eventDetails.fullName} - 10th Birthday Portrait` })}
          className="w-72 sm:w-96 h-88 sm:h-[420px] mx-auto rounded-[80px] overflow-hidden border-4 border-[#E6C363] shadow-[0_0_45px_rgba(230,195,99,0.45)] relative group cursor-pointer bg-[#0D0421] p-2 flex items-center justify-center transition-all duration-300 hover:scale-[1.02]"
        >
          <img
            src={mainPortraitSrc}
            alt={eventDetails.fullName}
            className="w-full h-full object-contain rounded-[70px] group-hover:scale-105 transition-transform duration-700"
            referrerPolicy="no-referrer"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#1A0B2E]/80 via-transparent to-transparent flex items-end justify-center pb-4 opacity-90 group-hover:opacity-100 transition-opacity">
            <span className="px-4 py-1.5 rounded-full gold-bg-gradient text-[#190933] font-bold text-xs shadow-xl flex items-center gap-1.5">
              <Maximize2 className="w-3.5 h-3.5" /> Full Frame View
            </span>
          </div>
        </div>
      </div>

      {/* Host Name in Script Calligraphy */}
      <h3 className="font-script text-4xl sm:text-6xl text-[#FFF0B3] font-semibold my-2">
        {eventDetails.fullName}
      </h3>

      <p className="font-sans-body text-xs sm:text-sm tracking-widest text-[#E6C363] uppercase font-medium">
        As He Turn {eventDetails.ageText}
      </p>

      {/* Lightbox Full Size Modal */}
      {selectedImage && (
        <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-lg flex items-center justify-center p-4">
          <div className="relative bg-[#1D0C38] border-2 border-[#E6C363] rounded-3xl p-6 max-w-4xl w-full text-center shadow-2xl">
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute top-4 right-4 w-9 h-9 rounded-full bg-black/70 text-white font-bold text-sm border border-[#E6C363]/50 hover:bg-[#E6C363] hover:text-[#190933] transition-colors cursor-pointer flex items-center justify-center z-10"
            >
              ✕
            </button>

            <div className="w-full max-h-[75vh] flex items-center justify-center bg-[#090214] rounded-2xl border border-[#E6C363]/40 mb-4 p-2 overflow-hidden shadow-2xl">
              <img
                src={selectedImage.url}
                alt={selectedImage.title}
                className="max-h-[70vh] w-auto max-w-full object-contain rounded-xl"
                referrerPolicy="no-referrer"
              />
            </div>

            <h4 className="text-xl font-bold text-white">{selectedImage.title}</h4>
          </div>
        </div>
      )}
    </section>
  );
};
