import React, { useState, useEffect } from 'react';
import {
  Sparkles,
  ShieldCheck,
  MessageSquare,
  Gift,
  Calendar,
  Heart,
  ArrowUp,
  Award,
  Zap,
} from 'lucide-react';
import { EventDetails, RsvpSubmission, GalleryPhoto, CharacterWish, TimelineMilestone, PerformanceMode } from './types';
import {
  INITIAL_EVENT_DETAILS,
  INITIAL_GALLERY_PHOTOS,
  INITIAL_RSVP_WISHES,
  CHARACTER_WISHES,
  TIMELINE_MILESTONES,
} from './data/initialData';
import {
  seedInitialFirestoreData,
  subscribeEventDetails,
  subscribeWishes,
  subscribeTimeline,
  subscribeGallery,
  subscribeRsvps,
  addRsvpToDb,
  toggleRsvpLikeInDb,
  updateEventDetailsInDb,
  saveWishToDb,
  saveTimelineItemToDb,
  saveGalleryPhotoToDb,
  deleteRsvpFromDb,
} from './lib/firebaseService';
import { LoadingScreen } from './components/LoadingScreen';
import { ThreeBackgroundCanvas } from './components/ThreeBackgroundCanvas';
import { PerformanceModeToggle } from './components/PerformanceModeToggle';
import { HeroCover } from './components/HeroCover';
import { HonoringSection } from './components/HonoringSection';
import { CharacterWishesSection } from './components/CharacterWishesSection';
import { MemoryTimelineSection } from './components/MemoryTimelineSection';
import { MemoryAlbumSection } from './components/MemoryAlbumSection';
import { BirthdayCakeSection } from './components/BirthdayCakeSection';
import { SurpriseGiftBoxes } from './components/SurpriseGiftBoxes';
import { EventCountdown } from './components/EventCountdown';
import { GiftSection } from './components/GiftSection';
import { RsvpSection } from './components/RsvpSection';
import { GuestbookWall } from './components/GuestbookWall';
import { EmotionalMessageSection } from './components/EmotionalMessageSection';
import { FireworksCanvas } from './components/FireworksCanvas';
import { AudioPlayer } from './components/AudioPlayer';
import { ConfettiCanvas } from './components/ConfettiCanvas';
import { SocialShareModal } from './components/SocialShareModal';
import { AdminPanelModal } from './components/AdminPanelModal';

export default function App() {
  // Loading Screen State
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Performance Mode State ('high' | 'balanced' | 'low')
  const [performanceMode, setPerformanceMode] = useState<PerformanceMode>('high');

  // Read Guest Name from URL parameter ?guest=...
  const [guestName, setGuestName] = useState<string>(() => {
    const params = new URLSearchParams(window.location.search);
    const guest = params.get('guest');
    return guest ? decodeURIComponent(guest) : 'Dear Friend';
  });

  // Real-time Firebase Firestore State
  const [eventDetails, setEventDetails] = useState<EventDetails>(INITIAL_EVENT_DETAILS);
  const [wishes, setWishes] = useState<RsvpSubmission[]>(INITIAL_RSVP_WISHES);
  const [characterWishes, setCharacterWishes] = useState<CharacterWish[]>(CHARACTER_WISHES);
  const [timelineMilestones, setTimelineMilestones] = useState<TimelineMilestone[]>(TIMELINE_MILESTONES);
  const [galleryPhotos, setGalleryPhotos] = useState<GalleryPhoto[]>(INITIAL_GALLERY_PHOTOS);

  // App UI State
  const [isInvitationOpen, setIsInvitationOpen] = useState<boolean>(false);
  const [isPlayingMusic, setIsPlayingMusic] = useState<boolean>(false);
  const [confettiTrigger, setConfettiTrigger] = useState<boolean>(false);
  const [isShareModalOpen, setIsShareModalOpen] = useState<boolean>(false);
  const [isAdminOpen, setIsAdminOpen] = useState<boolean>(false);
  const [showBackToTop, setShowBackToTop] = useState<boolean>(false);

  // Initialize and subscribe to Firestore
  useEffect(() => {
    // Seed initial data if empty
    seedInitialFirestoreData().catch((err) => console.warn("Firestore seed note:", err));

    // Listen to real-time updates from Firebase
    const unsubEvent = subscribeEventDetails((data) => setEventDetails(data));
    const unsubWishes = subscribeWishes((data) => setCharacterWishes(data));
    const unsubTimeline = subscribeTimeline((data) => setTimelineMilestones(data));
    const unsubGallery = subscribeGallery((data) => setGalleryPhotos(data));
    const unsubRsvps = subscribeRsvps((data) => setWishes(data));

    return () => {
      unsubEvent();
      unsubWishes();
      unsubTimeline();
      unsubGallery();
      unsubRsvps();
    };
  }, []);

  // Handlers for Firestore Sync
  const handleSaveEventDetails = async (updated: EventDetails) => {
    setEventDetails(updated);
    await updateEventDetailsInDb(updated);
  };

  const handleResetEventDetails = async () => {
    setEventDetails(INITIAL_EVENT_DETAILS);
    await updateEventDetailsInDb(INITIAL_EVENT_DETAILS);
  };

  const handleSaveCharacterWishes = async (updated: CharacterWish[]) => {
    setCharacterWishes(updated);
    for (const wish of updated) {
      await saveWishToDb(wish);
    }
  };

  const handleSaveTimelineMilestones = async (updated: TimelineMilestone[]) => {
    setTimelineMilestones(updated);
    for (const milestone of updated) {
      await saveTimelineItemToDb(milestone);
    }
  };

  const handleSaveGalleryPhotos = async (updated: GalleryPhoto[]) => {
    setGalleryPhotos(updated);
    for (const photo of updated) {
      await saveGalleryPhotoToDb(photo);
    }
  };

  const handleAddRsvpSubmission = async (rsvp: Omit<RsvpSubmission, 'id' | 'createdAt' | 'likes'>) => {
    const newRsvp = await addRsvpToDb(rsvp);
    setWishes((prev) => [newRsvp, ...prev]);
  };

  const handleToggleRsvpLike = async (id: string, currentLikes: number, isLiked: boolean) => {
    await toggleRsvpLikeInDb(id, currentLikes, isLiked);
  };

  const handleDeleteRsvpWish = async (id: string) => {
    await deleteRsvpFromDb(id);
    setWishes((prev) => prev.filter((w) => w.id !== id));
  };


  // Check for developer admin URL query param ?admin=true or ?dev=true
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get('admin') === 'true' || params.get('admin') === '1' || params.get('dev') === 'true') {
      setIsAdminOpen(true);
    }
  }, []);

  // Listen for secret developer keyboard shortcut: Ctrl+Shift+A or Cmd+Shift+A
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key.toLowerCase() === 'a') {
        e.preventDefault();
        setIsAdminOpen((prev) => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Handle Scroll to toggle Back to Top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowBackToTop(true);
      } else {
        setShowBackToTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle Start Party from Loading Screen
  const handleStartParty = () => {
    setIsLoading(false);
    setIsInvitationOpen(true);
    setIsPlayingMusic(true);
    setConfettiTrigger(true);
  };

  // Handle Open Invitation Action from Hero
  const handleOpenInvitation = () => {
    setIsInvitationOpen(true);
    setIsPlayingMusic(true);
    setConfettiTrigger(true);

    setTimeout(() => {
      const el = document.getElementById('honoring');
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' });
      }
    }, 100);
  };

  // Handle Submitting new RSVP
  const handleRsvpSubmit = async (newRsvp: Omit<RsvpSubmission, 'id' | 'createdAt' | 'likes'>) => {
    await handleAddRsvpSubmission(newRsvp);
    setConfettiTrigger(true);
  };

  // Handle toggling like on guest wish
  const handleToggleLike = async (id: string) => {
    const target = wishes.find((w) => w.id === id);
    if (target) {
      const isLiked = !target.isLiked;
      await handleToggleRsvpLike(id, target.likes, !isLiked);
    }
  };

  const handleDeleteWish = (id: string) => {
    setWishes((prev) => prev.filter((item) => item.id !== id));
  };

  const handleResetDefaults = () => {
    setEventDetails(INITIAL_EVENT_DETAILS);
    localStorage.removeItem('birthday_event_details');
  };

  const scrollToSection = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#0C041C] text-slate-100 font-sans-body relative pb-20 selection:bg-[#E6C363] selection:text-[#190933]">
      {/* Interactive 3D WebGL Background Canvas */}
      <ThreeBackgroundCanvas
        performanceMode={performanceMode}
        cameraZoomIn={isInvitationOpen}
      />

      {/* Loading Screen Overlay */}
      {isLoading && (
        <LoadingScreen
          onStartParty={handleStartParty}
          hostName={eventDetails.fullName}
        />
      )}

      {/* Celebration Confetti Effect */}
      <ConfettiCanvas
        trigger={confettiTrigger}
        onComplete={() => setConfettiTrigger(false)}
      />

      {/* Fixed Sticky Top Header Navigation Bar */}
      <header className="fixed top-0 left-0 right-0 z-50 px-3 py-2 sm:px-6 bg-[#130624]/90 backdrop-blur-md border-b border-[#E6C363]/30 flex items-center justify-between gap-2 shadow-2xl">
        {/* Left: Audio Player Music Controls */}
        <AudioPlayer
          isPlaying={isPlayingMusic}
          onTogglePlay={() => setIsPlayingMusic(!isPlayingMusic)}
          youtubeVideoId={eventDetails.youtubeMusicId}
        />

        {/* Right: Performance Mode + Admin Panel Controls */}
        <div className="flex items-center gap-2">
          <PerformanceModeToggle
            mode={performanceMode}
            onChangeMode={setPerformanceMode}
          />

          <button
            onClick={() => setIsAdminOpen(true)}
            className="px-3 py-1.5 rounded-full bg-[#251147] border border-[#E6C363]/50 text-[#F5CE62] hover:bg-[#E6C363] hover:text-[#190933] transition-all shadow-md cursor-pointer flex items-center gap-1.5 text-xs font-bold"
            title="Admin Panel Login"
          >
            <ShieldCheck className="w-4 h-4 text-[#F5CE62]" />
            <span className="hidden sm:inline">Admin Panel</span>
          </button>
        </div>
      </header>

      {/* Section 1: Main 3D Hero Opening Screen */}
      <HeroCover
        eventDetails={eventDetails}
        guestName={guestName}
        onGuestNameChange={setGuestName}
        onOpenInvitation={handleOpenInvitation}
        onShareClick={() => setIsShareModalOpen(true)}
        isOpen={isInvitationOpen}
      />

      {/* Full 3D Interactive Birthday World Content */}
      <div className="animate-fade-in transition-all duration-700 relative z-10">
        {/* Section 2: Honoring Host Profile */}
        <HonoringSection eventDetails={eventDetails} />

        {/* Section 3: Interactive 3D Cartoon Friends & Character Wishes */}
        <CharacterWishesSection
          hostName={eventDetails.fullName}
          characters={characterWishes}
        />

        {/* Section 4: 10 Years of Amazing Memories Timeline */}
        <MemoryTimelineSection
          hostName={eventDetails.fullName}
          milestones={timelineMilestones}
        />

        {/* Section 5: Dedicated 26-Photo Memory Album */}
        <MemoryAlbumSection hostName={eventDetails.fullName} />

        {/* Section 6: Party Event Information & 3D Countdown */}
        <EventCountdown eventDetails={eventDetails} />

        {/* Section 7: Unwrap Surprise Gift Box Blessings */}
        <SurpriseGiftBoxes hostName={eventDetails.fullName} />

        {/* Section 8: Blow The Candles Virtual Birthday Cake Ceremony */}
        <BirthdayCakeSection
          hostName={eventDetails.fullName}
          turningAge={eventDetails.turningAge}
          onBlowOut={() => setConfettiTrigger(true)}
        />

        {/* Section 9: Emotional Heartfelt Letter */}
        <EmotionalMessageSection
          hostName={eventDetails.fullName}
          customMessage={eventDetails.emotionalLetter}
        />

        {/* Section 10: Send Your Gift & Monetary Blessings */}
        <GiftSection
          photos={galleryPhotos}
          paypalEmail={eventDetails.paypalEmail}
          bankAccount={eventDetails.bankAccount}
          eWalletNumber={eventDetails.eWalletNumber}
        />

        {/* Section 11: RSVP Form */}
        <RsvpSection
          eventDetails={eventDetails}
          guestName={guestName}
          onRsvpSubmit={handleRsvpSubmit}
        />

        {/* Section 13: Grand Finale 3D Fireworks & Celebration */}
        <FireworksCanvas
          performanceMode={performanceMode}
          hostName={eventDetails.fullName}
        />

        {/* Discreet Developer Footer */}
        <footer className="mt-12 text-center text-xs text-slate-400 py-6 border-t border-[#E6C363]/20 relative z-10 max-w-4xl mx-auto">
          <p>© 2026 Azghan&apos;s 10th Birthday • 3D Fantasy World</p>
          <p className="text-[10px] text-slate-400 mt-1 flex items-center justify-center gap-2">
            <span>Crafted with love & magic</span>
            <button
              onClick={() => setIsAdminOpen(true)}
              className="opacity-25 hover:opacity-100 transition-opacity text-slate-400 hover:text-[#F5CE62] cursor-pointer"
              title="Developer Access (Ctrl+Shift+A or ?admin=true)"
            >
              🔒
            </button>
          </p>
        </footer>

        {/* Bottom Sticky Quick Navigation Dock */}
        <nav className="fixed bottom-4 left-1/2 -translate-x-1/2 z-40 bg-[#1D0C38]/90 border border-[#E6C363]/40 rounded-full px-3 py-1.5 flex items-center gap-1.5 sm:gap-3 shadow-2xl backdrop-blur-md max-w-[95vw] overflow-x-auto no-scrollbar">
          <button
            onClick={() => scrollToSection('character-wishes')}
            className="p-1.5 sm:p-2 text-xs font-semibold text-[#FFF0B3] hover:text-[#F5CE62] flex items-center gap-1 transition-colors cursor-pointer shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5CE62]" />
            <span className="hidden sm:inline">3D Heroes</span>
          </button>

          <div className="w-px h-4 bg-[#E6C363]/30 shrink-0" />

          <button
            onClick={() => scrollToSection('timeline')}
            className="p-1.5 sm:p-2 text-xs font-semibold text-[#FFF0B3] hover:text-[#F5CE62] flex items-center gap-1 transition-colors cursor-pointer shrink-0"
          >
            <Award className="w-3.5 h-3.5 text-[#F5CE62]" />
            <span className="hidden sm:inline">10 Years</span>
          </button>

          <div className="w-px h-4 bg-[#E6C363]/30 shrink-0" />

          <button
            onClick={() => scrollToSection('memory-room')}
            className="p-1.5 sm:p-2 text-xs font-semibold text-[#FFF0B3] hover:text-[#F5CE62] flex items-center gap-1 transition-colors cursor-pointer shrink-0"
          >
            <Gift className="w-3.5 h-3.5 text-[#F5CE62]" />
            <span className="hidden sm:inline">3D Room</span>
          </button>

          <div className="w-px h-4 bg-[#E6C363]/30 shrink-0" />

          <button
            onClick={() => scrollToSection('cake')}
            className="p-1.5 sm:p-2 text-xs font-semibold text-[#FFF0B3] hover:text-[#F5CE62] flex items-center gap-1 transition-colors cursor-pointer shrink-0"
          >
            <Sparkles className="w-3.5 h-3.5 text-[#F5CE62]" />
            <span className="hidden sm:inline">Cake</span>
          </button>

          <div className="w-px h-4 bg-[#E6C363]/30 shrink-0" />

          <button
            onClick={() => scrollToSection('event-details')}
            className="p-1.5 sm:p-2 text-xs font-semibold text-[#FFF0B3] hover:text-[#F5CE62] flex items-center gap-1 transition-colors cursor-pointer shrink-0"
          >
            <Calendar className="w-3.5 h-3.5 text-[#F5CE62]" />
            <span className="hidden sm:inline">Event</span>
          </button>

          <div className="w-px h-4 bg-[#E6C363]/30 shrink-0" />

          <button
            onClick={() => scrollToSection('rsvp')}
            className="p-1.5 sm:p-2 text-xs font-semibold text-[#FFF0B3] hover:text-[#F5CE62] flex items-center gap-1 transition-colors cursor-pointer shrink-0"
          >
            <Heart className="w-3.5 h-3.5 text-[#F5CE62]" />
            <span className="hidden sm:inline">RSVP</span>
          </button>

          <div className="w-px h-4 bg-[#E6C363]/30 shrink-0" />

          <button
            onClick={() => scrollToSection('fireworks')}
            className="p-1.5 sm:p-2 text-xs font-semibold text-[#FFF0B3] hover:text-[#F5CE62] flex items-center gap-1 transition-colors cursor-pointer shrink-0"
          >
            <MessageSquare className="w-3.5 h-3.5 text-[#F5CE62]" />
            <span className="hidden sm:inline">Finale</span>
          </button>
        </nav>
      </div>

      {/* Floating Back to Top Button */}
      {showBackToTop && (
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-20 right-6 z-40 p-3 rounded-full bg-[#251147] border border-[#E6C363]/40 text-[#F5CE62] hover:bg-[#F5CE62] hover:text-[#190933] transition-all shadow-xl cursor-pointer"
          title="Back to top"
        >
          <ArrowUp className="w-4 h-4" />
        </button>
      )}

      {/* Social Media Sharing Modal */}
      <SocialShareModal
        isOpen={isShareModalOpen}
        onClose={() => setIsShareModalOpen(false)}
        eventDetails={eventDetails}
        guestName={guestName}
      />

      {/* Password Protected Admin Panel Modal */}
      <AdminPanelModal
        isOpen={isAdminOpen}
        onClose={() => setIsAdminOpen(false)}
        eventDetails={eventDetails}
        onSaveEventDetails={handleSaveEventDetails}
        onResetEventDetails={handleResetEventDetails}
        wishes={wishes}
        onDeleteWish={handleDeleteRsvpWish}
        characterWishes={characterWishes}
        onSaveCharacterWishes={handleSaveCharacterWishes}
        timelineMilestones={timelineMilestones}
        onSaveTimelineMilestones={handleSaveTimelineMilestones}
        galleryPhotos={galleryPhotos}
        onSaveGalleryPhotos={handleSaveGalleryPhotos}
      />
    </div>
  );
}
