import React, { useState } from 'react';
import { Sparkles, Volume2, VolumeX, MessageSquare, Heart, Star, Award } from 'lucide-react';
import { CHARACTER_WISHES } from '../data/initialData';
import { CharacterWish } from '../types';
import { GoldFrameBorder } from './GoldFrameBorder';

interface CharacterWishesSectionProps {
  hostName: string;
  characters?: CharacterWish[];
}

export const CharacterWishesSection: React.FC<CharacterWishesSectionProps> = ({
  hostName,
  characters = CHARACTER_WISHES,
}) => {
  const activeCharacters = characters.length > 0 ? characters : CHARACTER_WISHES;
  const [selectedCharacter, setSelectedCharacter] = useState<CharacterWish>(activeCharacters[0]);
  const [isPlayingVoice, setIsPlayingVoice] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);

  const handleCharacterClick = (char: CharacterWish) => {
    setSelectedCharacter(char);

    // Trigger Browser Speech Synthesis if supported and voice enabled
    if (voiceEnabled && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel(); // Stop current speech
      const utterance = new SpeechSynthesisUtterance(char.voiceText);
      utterance.rate = 1.0;
      utterance.pitch = 1.2; // Cheerful pitch for cartoon feel

      utterance.onstart = () => setIsPlayingVoice(true);
      utterance.onend = () => setIsPlayingVoice(false);
      utterance.onerror = () => setIsPlayingVoice(false);

      window.speechSynthesis.speak(utterance);
    }
  };

  const toggleVoiceMode = () => {
    if (isPlayingVoice && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsPlayingVoice(false);
    }
    setVoiceEnabled(!voiceEnabled);
  };

  return (
    <section id="character-wishes" className="relative py-12 px-4 sm:px-8 max-w-5xl mx-auto text-center z-10">
      <GoldFrameBorder>
        {/* Section Header */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Sparkles className="w-5 h-5 text-[#F5CE62]" />
          <p className="text-xs uppercase tracking-[0.25em] text-[#E6C363] font-bold">
            Interactive Cartoon Friends
          </p>
          <Sparkles className="w-5 h-5 text-[#F5CE62]" />
        </div>

        <h2 className="font-script text-4xl sm:text-6xl gold-text-gradient mb-2">
          Special Birthday Wishes
        </h2>

        <p className="text-xs sm:text-sm text-slate-300 max-w-md mx-auto mb-6 font-light">
          Tap any of Azghan&apos;s 3D cartoon heroes to hear their interactive animated birthday wish!
        </p>

        {/* Voice Speech Audio Toggle Button */}
        <div className="flex justify-center mb-8">
          <button
            onClick={toggleVoiceMode}
            className={`px-4 py-2 rounded-full border text-xs font-semibold flex items-center gap-2 transition-all cursor-pointer ${
              voiceEnabled
                ? 'bg-emerald-950/80 border-emerald-500/50 text-emerald-300 shadow-[0_0_15px_rgba(16,185,129,0.3)]'
                : 'bg-[#1F0A3D] border-[#E6C363]/30 text-slate-400'
            }`}
          >
            {voiceEnabled ? <Volume2 className="w-4 h-4 text-emerald-400" /> : <VolumeX className="w-4 h-4" />}
            <span>Voice Speech Narration: {voiceEnabled ? 'ON 🔊' : 'OFF 🔇'}</span>
          </button>
        </div>

        {/* Character Avatar Selector Cards */}
        <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 mb-8">
          {activeCharacters.map((char) => {
            const isSelected = selectedCharacter.id === char.id;
            return (
              <button
                key={char.id}
                onClick={() => handleCharacterClick(char)}
                className={`group relative p-4 rounded-2xl border transition-all duration-300 cursor-pointer flex flex-col items-center text-center ${
                  isSelected
                    ? 'bg-gradient-to-b from-[#321361] to-[#1F0A3D] border-[#F5CE62] shadow-[0_0_20px_rgba(245,206,98,0.5)] scale-105'
                    : 'bg-[#15072B]/80 border-[#E6C363]/30 hover:border-[#E6C363] hover:scale-102'
                }`}
              >
                {/* Avatar Icon Circle */}
                <div
                  className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl mb-2 transition-transform duration-300 group-hover:scale-110 shadow-lg ${
                    isSelected ? 'animate-bounce' : ''
                  }`}
                  style={{
                    backgroundColor: `${char.color}20`,
                    border: `2px solid ${char.color}`,
                    boxShadow: isSelected ? `0 0 20px ${char.color}` : 'none',
                  }}
                >
                  <span>{char.avatarIcon}</span>
                </div>

                <span className="text-xs font-bold text-[#FFF0B3] line-clamp-1">{char.name}</span>
                <span className="text-[10px] text-slate-400 line-clamp-1">{char.role}</span>

                {isSelected && (
                  <span className="mt-2 text-[9px] px-2 py-0.5 rounded-full bg-[#F5CE62] text-[#190933] font-black uppercase tracking-wider">
                    Active
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Active Character Speech Bubble Box */}
        <div
          className={`relative p-6 sm:p-8 rounded-3xl border-2 bg-gradient-to-br ${selectedCharacter.bgGradient} border-[#F5CE62] shadow-[0_0_35px_rgba(245,206,98,0.3)] transition-all duration-500 text-left max-w-2xl mx-auto`}
        >
          {/* Header Role Badge */}
          <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
            <div className="flex items-center gap-3">
              <span className="text-4xl p-2 rounded-2xl bg-black/40 border border-[#E6C363]/40">
                {selectedCharacter.avatarIcon}
              </span>
              <div>
                <h3 className="text-lg sm:text-xl font-bold text-white flex items-center gap-2">
                  <span>{selectedCharacter.name}</span>
                  <Star className="w-4 h-4 text-[#F5CE62] fill-current" />
                </h3>
                <span className="text-xs text-[#E6C363] font-medium">{selectedCharacter.role}</span>
              </div>
            </div>

            {isPlayingVoice && (
              <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-400 text-emerald-300 text-xs font-semibold animate-pulse">
                <Volume2 className="w-4 h-4" />
                <span>Speaking Wish...</span>
              </div>
            )}
          </div>

          {/* Speech Bubble Quote */}
          <div className="relative p-4 sm:p-6 rounded-2xl bg-[#0F0524]/90 border border-[#E6C363]/30 text-slate-100 text-sm sm:text-base leading-relaxed font-light shadow-inner mb-4">
            <MessageSquare className="w-5 h-5 text-[#F5CE62] absolute -top-3 left-6 bg-[#0F0524] px-0.5" />
            <p className="italic font-medium text-[#FFF0B3]">&ldquo;{selectedCharacter.message}&rdquo;</p>
          </div>

          {/* Pose & Action Tag */}
          <div className="flex items-center justify-between text-xs text-slate-300 font-light pt-2 border-t border-[#E6C363]/20">
            <span className="flex items-center gap-1">
              <Award className="w-3.5 h-3.5 text-[#F5CE62]" />
              <span>Pose: {selectedCharacter.actionPose}</span>
            </span>
            <span className="text-[#E6C363] font-semibold">Special Wish for {hostName}</span>
          </div>
        </div>
      </GoldFrameBorder>
    </section>
  );
};
