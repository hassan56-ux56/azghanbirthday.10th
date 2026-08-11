import React, { useState, useEffect } from 'react';
import {
  X,
  ShieldCheck,
  Lock,
  User,
  Key,
  RotateCcw,
  Save,
  Trash2,
  CheckCircle2,
  LogOut,
  Sparkles,
  MessageSquare,
  Calendar,
  Eye,
  EyeOff,
  Copy,
  Check,
  Music,
  Heart,
  Plus,
  Image as ImageIcon,
  Award,
  Download,
  Upload,
  Play,
  Youtube,
} from 'lucide-react';
import {
  EventDetails,
  RsvpSubmission,
  CharacterWish,
  TimelineMilestone,
  GalleryPhoto,
} from '../types';
import { compressImageFile } from '../lib/imageUtils';

interface AdminPanelModalProps {
  isOpen: boolean;
  onClose: () => void;
  eventDetails: EventDetails;
  onSaveEventDetails: (updated: EventDetails) => void;
  onResetEventDetails: () => void;
  wishes: RsvpSubmission[];
  onDeleteWish?: (id: string) => void;
  characterWishes?: CharacterWish[];
  onSaveCharacterWishes?: (updated: CharacterWish[]) => void;
  timelineMilestones?: TimelineMilestone[];
  onSaveTimelineMilestones?: (updated: TimelineMilestone[]) => void;
  galleryPhotos?: GalleryPhoto[];
  onSaveGalleryPhotos?: (updated: GalleryPhoto[]) => void;
}

export const AdminPanelModal: React.FC<AdminPanelModalProps> = ({
  isOpen,
  onClose,
  eventDetails,
  onSaveEventDetails,
  onResetEventDetails,
  wishes,
  onDeleteWish,
  characterWishes = [],
  onSaveCharacterWishes,
  timelineMilestones = [],
  onSaveTimelineMilestones,
  galleryPhotos = [],
  onSaveGalleryPhotos,
}) => {
  // Authentication State
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [adminUsername, setAdminUsername] = useState<string>('admin');
  const [adminPassword, setAdminPassword] = useState<string>('');
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [loginError, setLoginError] = useState<string>('');
  const [copiedBadge, setCopiedBadge] = useState<boolean>(false);

  // Stored password state (default password: azghan10th)
  const [activePassword, setActivePassword] = useState<string>('azghan10th');

  // Active Admin Tab
  type AdminTab = 'event' | 'letter' | 'music' | 'heroes' | 'timeline' | 'gallery' | 'wishes' | 'security';
  const [activeTab, setActiveTab] = useState<AdminTab>('event');

  // Event Details Form State
  const [formData, setFormData] = useState<EventDetails>(eventDetails);

  // Editable lists
  const [localHeroes, setLocalHeroes] = useState<CharacterWish[]>(characterWishes);
  const [localTimeline, setLocalTimeline] = useState<TimelineMilestone[]>(timelineMilestones);
  const [localPhotos, setLocalPhotos] = useState<GalleryPhoto[]>(galleryPhotos);

  // Sync state when props update
  useEffect(() => {
    setFormData(eventDetails);
  }, [eventDetails]);

  useEffect(() => {
    setLocalHeroes(characterWishes);
  }, [characterWishes]);

  useEffect(() => {
    setLocalTimeline(timelineMilestones);
  }, [timelineMilestones]);

  useEffect(() => {
    setLocalPhotos(galleryPhotos);
  }, [galleryPhotos]);

  // Security & JSON Import/Export State
  const [newPassword, setNewPassword] = useState<string>('');
  const [passwordSuccess, setPasswordSuccess] = useState<string>('');
  const [jsonImportText, setJsonImportText] = useState<string>('');
  const [importStatus, setImportStatus] = useState<string>('');

  // Image Upload States
  const [uploadingId, setUploadingId] = useState<string | null>(null);

  if (!isOpen) return null;

  const DEFAULT_USERNAME = 'admin';

  // Handle Login Submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (
      adminUsername.trim().toLowerCase() === DEFAULT_USERNAME &&
      adminPassword === activePassword
    ) {
      setIsAuthenticated(true);
      setLoginError('');
    } else {
      setLoginError('Invalid Username or Password! Please use the provided credentials.');
    }
  };

  const handleAutoFillDemo = () => {
    setAdminUsername('admin');
    setAdminPassword(activePassword);
    setLoginError('');
  };

  const copyCredentials = () => {
    navigator.clipboard.writeText(`Username: admin\nPassword: ${activePassword}`);
    setCopiedBadge(true);
    setTimeout(() => setCopiedBadge(false), 2000);
  };

  const handleFormChange = (field: keyof EventDetails, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSaveEvent = (e: React.FormEvent) => {
    e.preventDefault();
    onSaveEventDetails(formData);
    if (onSaveCharacterWishes) onSaveCharacterWishes(localHeroes);
    if (onSaveTimelineMilestones) onSaveTimelineMilestones(localTimeline);
    if (onSaveGalleryPhotos) onSaveGalleryPhotos(localPhotos);
    setPasswordSuccess('Website content updated successfully!');
    setTimeout(() => setPasswordSuccess(''), 3000);
  };

  // Add / Edit / Remove Hero
  const handleAddHero = () => {
    const newHero: CharacterWish = {
      id: 'hero_' + Date.now(),
      name: 'New Hero Friend',
      role: 'Special Guest',
      avatarIcon: '🌟',
      color: '#F5CE62',
      bgGradient: 'from-amber-500/30 to-yellow-600/30',
      message: 'Happy Birthday! Wishing you an awesome double digit year!',
      voiceText: 'Happy Birthday! Wishing you an awesome year!',
      actionPose: 'Victory celebrate',
    };
    const updated = [...localHeroes, newHero];
    setLocalHeroes(updated);
    if (onSaveCharacterWishes) onSaveCharacterWishes(updated);
  };

  const handleUpdateHero = (index: number, field: keyof CharacterWish, value: string) => {
    const updated = [...localHeroes];
    updated[index] = { ...updated[index], [field]: value };
    setLocalHeroes(updated);
    if (onSaveCharacterWishes) onSaveCharacterWishes(updated);
  };

  const handleDeleteHero = (id: string) => {
    const updated = localHeroes.filter((h) => h.id !== id);
    setLocalHeroes(updated);
    if (onSaveCharacterWishes) onSaveCharacterWishes(updated);
  };

  // Add / Update / Remove Timeline Milestone
  const handleAddMilestone = () => {
    const newMilestone: TimelineMilestone = {
      year: 2026,
      age: localTimeline.length + 1,
      title: 'New Magical Milestone',
      description: 'A special moment in life filled with wonder and joy.',
      photoUrl: 'https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=800&q=80',
      icon: '✨',
      badge: `Age ${localTimeline.length + 1} • Special`,
    };
    const updated = [...localTimeline, newMilestone];
    setLocalTimeline(updated);
    if (onSaveTimelineMilestones) onSaveTimelineMilestones(updated);
  };

  const handleUpdateMilestone = (index: number, field: keyof TimelineMilestone, value: any) => {
    const updated = [...localTimeline];
    updated[index] = { ...updated[index], [field]: value };
    setLocalTimeline(updated);
    if (onSaveTimelineMilestones) onSaveTimelineMilestones(updated);
  };

  const handleDeleteMilestone = (index: number) => {
    const updated = localTimeline.filter((_, i) => i !== index);
    setLocalTimeline(updated);
    if (onSaveTimelineMilestones) onSaveTimelineMilestones(updated);
  };

  // Add / Update / Remove Photo
  const handleAddPhoto = () => {
    const newPhoto: GalleryPhoto = {
      id: 'photo_' + Date.now(),
      url: 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80',
      title: 'New Memory Photo',
      category: 'Moments',
      caption: 'A wonderful birthday celebration memory.',
      ageTag: 'Age 10',
    };
    const updated = [newPhoto, ...localPhotos];
    setLocalPhotos(updated);
    if (onSaveGalleryPhotos) onSaveGalleryPhotos(updated);
  };

  const handleUploadNewPhotoFile = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingId('new_photo');
    try {
      const dataUrl = await compressImageFile(file, 1200, 1200, 0.85);
      const newPhoto: GalleryPhoto = {
        id: 'photo_' + Date.now(),
        url: dataUrl,
        title: file.name.replace(/\.[^/.]+$/, "") || 'Uploaded Photo',
        category: 'Moments',
        caption: 'Uploaded memory photo',
        ageTag: 'Age 10',
      };
      const updated = [newPhoto, ...localPhotos];
      setLocalPhotos(updated);
      if (onSaveGalleryPhotos) onSaveGalleryPhotos(updated);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to process image. Please try another image file.");
    } finally {
      setUploadingId(null);
      e.target.value = '';
    }
  };

  const handleUploadPhotoFile = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const photoId = localPhotos[index].id;
    setUploadingId(photoId);
    try {
      const dataUrl = await compressImageFile(file, 1200, 1200, 0.85);
      handleUpdatePhoto(index, 'url', dataUrl);
    } catch (err) {
      console.error("Image upload failed:", err);
      alert("Failed to process image. Please try another image file.");
    } finally {
      setUploadingId(null);
      e.target.value = '';
    }
  };

  const handleUploadMilestoneFile = async (index: number, e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setUploadingId(`milestone_${index}`);
    try {
      const dataUrl = await compressImageFile(file, 1000, 1000, 0.85);
      handleUpdateMilestone(index, 'photoUrl', dataUrl);
    } catch (err) {
      console.error("Milestone image upload failed:", err);
      alert("Failed to process image. Please try another image file.");
    } finally {
      setUploadingId(null);
      e.target.value = '';
    }
  };

  const handleUpdatePhoto = (index: number, field: keyof GalleryPhoto, value: string) => {
    const updated = [...localPhotos];
    updated[index] = { ...updated[index], [field]: value };
    setLocalPhotos(updated);
    if (onSaveGalleryPhotos) onSaveGalleryPhotos(updated);
  };

  const handleDeletePhoto = (id: string) => {
    const updated = localPhotos.filter((p) => p.id !== id);
    setLocalPhotos(updated);
    if (onSaveGalleryPhotos) onSaveGalleryPhotos(updated);
  };

  // Change password
  const handleChangePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newPassword || newPassword.length < 4) {
      setPasswordSuccess('Password must be at least 4 characters long.');
      return;
    }
    setActivePassword(newPassword);
    setNewPassword('');
    setPasswordSuccess('Admin password updated successfully!');
    setTimeout(() => setPasswordSuccess(''), 3000);
  };

  // Export JSON Backup
  const handleExportJSON = () => {
    const backupData = {
      eventDetails: formData,
      characterWishes: localHeroes,
      timelineMilestones: localTimeline,
      galleryPhotos: localPhotos,
    };
    const jsonStr = JSON.stringify(backupData, null, 2);
    const blob = new Blob([jsonStr], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `birthday_website_backup_${Date.now()}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  // Import JSON Backup
  const handleImportJSON = () => {
    try {
      const parsed = JSON.parse(jsonImportText);
      if (parsed.eventDetails) {
        setFormData(parsed.eventDetails);
        onSaveEventDetails(parsed.eventDetails);
      }
      if (parsed.characterWishes && onSaveCharacterWishes) {
        setLocalHeroes(parsed.characterWishes);
        onSaveCharacterWishes(parsed.characterWishes);
      }
      if (parsed.timelineMilestones && onSaveTimelineMilestones) {
        setLocalTimeline(parsed.timelineMilestones);
        onSaveTimelineMilestones(parsed.timelineMilestones);
      }
      if (parsed.galleryPhotos && onSaveGalleryPhotos) {
        setLocalPhotos(parsed.galleryPhotos);
        onSaveGalleryPhotos(parsed.galleryPhotos);
      }
      setImportStatus('✅ Complete website configuration restored successfully!');
      setTimeout(() => setImportStatus(''), 4000);
    } catch (err) {
      setImportStatus('❌ Invalid JSON Format! Please check your backup file.');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setAdminPassword('');
    setLoginError('');
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-md flex items-center justify-center p-3 sm:p-4 overflow-y-auto">
      <div className="relative w-full max-w-4xl bg-[#1A0B2E] border-2 border-[#E6C363] rounded-3xl p-4 sm:p-8 shadow-2xl my-6 text-left max-h-[92vh] flex flex-col">
        {/* Modal Header & Close Button */}
        <div className="flex items-center justify-between pb-4 border-b border-[#E6C363]/30 shrink-0 gap-2">
          <div className="flex items-center gap-3">
            <div className="p-2 sm:p-2.5 rounded-2xl bg-[#321361] border border-[#E6C363] text-[#F5CE62]">
              <ShieldCheck className="w-5 h-5 sm:w-6 sm:h-6" />
            </div>
            <div>
              <h3 className="font-serif-display text-lg sm:text-2xl font-bold text-[#FFF0B3] flex items-center gap-2">
                <span>Complete Web Content Admin</span>
                {isAuthenticated && (
                  <span className="text-[10px] px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 border border-emerald-400/40 font-mono hidden sm:inline">
                    EDIT MODE ACTIVE
                  </span>
                )}
              </h3>
              <p className="text-xs text-slate-300">
                Easily edit names, quotes, music, character wishes, timeline & photo gallery
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="text-slate-400 hover:text-white p-2 rounded-full hover:bg-[#251147] transition-colors cursor-pointer shrink-0"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* LOGIN SCREEN IF NOT AUTHENTICATED */}
        {!isAuthenticated ? (
          <div className="max-w-md mx-auto py-6 w-full overflow-y-auto">
            <div className="flex flex-col items-center text-center mb-6">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-[#321361] to-[#52298F] border-2 border-[#E6C363] shadow-[0_0_20px_rgba(245,206,98,0.4)] flex items-center justify-center mb-3">
                <ShieldCheck className="w-8 h-8 text-[#F5CE62]" />
              </div>
              <h3 className="font-serif-display text-2xl font-bold text-[#FFF0B3]">
                Admin Portal Login
              </h3>
              <p className="text-xs text-slate-300 mt-1">
                Enter admin credentials to edit the website content
              </p>
            </div>

            <form onSubmit={handleLogin} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-[#E6C363] uppercase mb-1">
                  Username
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={adminUsername}
                    onChange={(e) => setAdminUsername(e.target.value)}
                    placeholder="admin"
                    className="w-full bg-[#251147] border border-[#E6C363]/40 rounded-xl p-3 pl-10 text-sm text-white focus:border-[#F5CE62] focus:outline-none"
                  />
                  <User className="w-4 h-4 text-[#E6C363] absolute left-3 top-3.5" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-[#E6C363] uppercase mb-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={adminPassword}
                    onChange={(e) => setAdminPassword(e.target.value)}
                    placeholder="Enter password"
                    className="w-full bg-[#251147] border border-[#E6C363]/40 rounded-xl p-3 pl-10 pr-10 text-sm text-white focus:border-[#F5CE62] focus:outline-none"
                  />
                  <Lock className="w-4 h-4 text-[#E6C363] absolute left-3 top-3.5" />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-3.5 text-slate-400 hover:text-white cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {loginError && (
                <p className="text-xs text-rose-400 font-semibold bg-rose-950/50 p-2.5 rounded-xl border border-rose-500/40 text-center">
                  {loginError}
                </p>
              )}

              <button
                type="submit"
                className="w-full py-3.5 rounded-xl gold-bg-gradient hover:gold-bg-gradient-hover text-[#190933] font-black text-sm tracking-widest uppercase flex items-center justify-center gap-2 transition-all cursor-pointer shadow-lg shadow-[#D4AF37]/30"
              >
                <ShieldCheck className="w-4 h-4" />
                <span>LOG IN TO ADMIN PANEL</span>
              </button>
            </form>
          </div>
        ) : (
          /* AUTHENTICATED DASHBOARD WITH COMPLETE WEBSITE EDITING TABS */
          <div className="mt-4 flex flex-col flex-1 overflow-hidden">
            {/* Admin Tabs */}
            <div className="flex items-center gap-1.5 border-b border-[#E6C363]/20 pb-3 overflow-x-auto no-scrollbar shrink-0">
              <button
                onClick={() => setActiveTab('event')}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                  activeTab === 'event'
                    ? 'gold-bg-gradient text-[#190933] shadow-md'
                    : 'bg-[#251147] border border-[#E6C363]/30 text-slate-300 hover:border-[#E6C363]'
                }`}
              >
                <Calendar className="w-3.5 h-3.5" />
                <span>Party Info</span>
              </button>

              <button
                onClick={() => setActiveTab('letter')}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                  activeTab === 'letter'
                    ? 'gold-bg-gradient text-[#190933] shadow-md'
                    : 'bg-[#251147] border border-[#E6C363]/30 text-slate-300 hover:border-[#E6C363]'
                }`}
              >
                <Heart className="w-3.5 h-3.5" />
                <span>Heartfelt Letter</span>
              </button>

              <button
                onClick={() => setActiveTab('music')}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                  activeTab === 'music'
                    ? 'gold-bg-gradient text-[#190933] shadow-md'
                    : 'bg-[#251147] border border-[#E6C363]/30 text-slate-300 hover:border-[#E6C363]'
                }`}
              >
                <Music className="w-3.5 h-3.5" />
                <span>Music Track</span>
              </button>

              <button
                onClick={() => setActiveTab('heroes')}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                  activeTab === 'heroes'
                    ? 'gold-bg-gradient text-[#190933] shadow-md'
                    : 'bg-[#251147] border border-[#E6C363]/30 text-slate-300 hover:border-[#E6C363]'
                }`}
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>3D Cartoon Heroes</span>
              </button>

              <button
                onClick={() => setActiveTab('timeline')}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                  activeTab === 'timeline'
                    ? 'gold-bg-gradient text-[#190933] shadow-md'
                    : 'bg-[#251147] border border-[#E6C363]/30 text-slate-300 hover:border-[#E6C363]'
                }`}
              >
                <Award className="w-3.5 h-3.5" />
                <span>Timeline Milestones</span>
              </button>

              <button
                onClick={() => setActiveTab('gallery')}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                  activeTab === 'gallery'
                    ? 'gold-bg-gradient text-[#190933] shadow-md'
                    : 'bg-[#251147] border border-[#E6C363]/30 text-slate-300 hover:border-[#E6C363]'
                }`}
              >
                <ImageIcon className="w-3.5 h-3.5" />
                <span>Photo Gallery</span>
              </button>

              <button
                onClick={() => setActiveTab('wishes')}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                  activeTab === 'wishes'
                    ? 'gold-bg-gradient text-[#190933] shadow-md'
                    : 'bg-[#251147] border border-[#E6C363]/30 text-slate-300 hover:border-[#E6C363]'
                }`}
              >
                <MessageSquare className="w-3.5 h-3.5" />
                <span>Guest RSVPs ({wishes.length})</span>
              </button>

              <button
                onClick={() => setActiveTab('security')}
                className={`px-3 py-2 rounded-xl text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer shrink-0 ${
                  activeTab === 'security'
                    ? 'gold-bg-gradient text-[#190933] shadow-md'
                    : 'bg-[#251147] border border-[#E6C363]/30 text-slate-300 hover:border-[#E6C363]'
                }`}
              >
                <Key className="w-3.5 h-3.5" />
                <span>Backup & Security</span>
              </button>

              <button
                onClick={handleLogout}
                className="ml-auto px-2.5 py-1.5 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900 text-xs font-bold flex items-center gap-1 transition-colors cursor-pointer shrink-0"
                title="Log Out"
              >
                <LogOut className="w-3.5 h-3.5" />
                <span className="hidden sm:inline">Logout</span>
              </button>
            </div>

            {/* TAB CONTENT CONTAINER */}
            <div className="pt-4 overflow-y-auto flex-1 pr-1 text-xs">
              {passwordSuccess && (
                <div className="mb-4 p-3 rounded-xl bg-emerald-950/80 border border-emerald-500/50 text-emerald-300 font-semibold flex items-center justify-between">
                  <span className="flex items-center gap-2">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                    <span>{passwordSuccess}</span>
                  </span>
                </div>
              )}

              {/* TAB 1: PARTY DETAILS & VENUE */}
              {activeTab === 'event' && (
                <form onSubmit={handleSaveEvent} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#E6C363] uppercase mb-1">
                        Display Name (HERO BANNER)
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.hostName}
                        onChange={(e) => handleFormChange('hostName', e.target.value)}
                        className="w-full bg-[#251147] border border-[#E6C363]/40 rounded-xl p-2.5 text-sm text-white focus:border-[#F5CE62] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#E6C363] uppercase mb-1">
                        Full Name (HONORING CARD)
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.fullName}
                        onChange={(e) => handleFormChange('fullName', e.target.value)}
                        className="w-full bg-[#251147] border border-[#E6C363]/40 rounded-xl p-2.5 text-sm text-white focus:border-[#F5CE62] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#E6C363] uppercase mb-1">
                        Turning Age Number
                      </label>
                      <input
                        type="number"
                        required
                        value={formData.turningAge}
                        onChange={(e) => handleFormChange('turningAge', parseInt(e.target.value) || 10)}
                        className="w-full bg-[#251147] border border-[#E6C363]/40 rounded-xl p-2.5 text-sm text-white focus:border-[#F5CE62] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#E6C363] uppercase mb-1">
                        Age Word (e.g. Tenth)
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.ageText}
                        onChange={(e) => handleFormChange('ageText', e.target.value)}
                        className="w-full bg-[#251147] border border-[#E6C363]/40 rounded-xl p-2.5 text-sm text-white focus:border-[#F5CE62] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#E6C363] uppercase mb-1">
                      Event Headline / Quote
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.quote}
                      onChange={(e) => handleFormChange('quote', e.target.value)}
                      className="w-full bg-[#251147] border border-[#E6C363]/40 rounded-xl p-2.5 text-sm text-white focus:border-[#F5CE62] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#E6C363] uppercase mb-1">
                        Event Date Text
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.eventDate}
                        onChange={(e) => handleFormChange('eventDate', e.target.value)}
                        className="w-full bg-[#251147] border border-[#E6C363]/40 rounded-xl p-2.5 text-sm text-white focus:border-[#F5CE62] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#E6C363] uppercase mb-1">
                        Countdown Target ISO Date
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.rawDateISO}
                        onChange={(e) => handleFormChange('rawDateISO', e.target.value)}
                        placeholder="2026-12-12T16:00:00"
                        className="w-full bg-[#251147] border border-[#E6C363]/40 rounded-xl p-2.5 text-sm text-white focus:border-[#F5CE62] focus:outline-none font-mono"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#E6C363] uppercase mb-1">
                        Event Time Range
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.timeString}
                        onChange={(e) => handleFormChange('timeString', e.target.value)}
                        className="w-full bg-[#251147] border border-[#E6C363]/40 rounded-xl p-2.5 text-sm text-white focus:border-[#F5CE62] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#E6C363] uppercase mb-1">
                        Venue Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.locationName}
                        onChange={(e) => handleFormChange('locationName', e.target.value)}
                        className="w-full bg-[#251147] border border-[#E6C363]/40 rounded-xl p-2.5 text-sm text-white focus:border-[#F5CE62] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block font-bold text-[#E6C363] uppercase mb-1">
                      Venue Full Address
                    </label>
                    <input
                      type="text"
                      required
                      value={formData.address}
                      onChange={(e) => handleFormChange('address', e.target.value)}
                      className="w-full bg-[#251147] border border-[#E6C363]/40 rounded-xl p-2.5 text-sm text-white focus:border-[#F5CE62] focus:outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block font-bold text-[#E6C363] uppercase mb-1">
                        Party Dress Code
                      </label>
                      <input
                        type="text"
                        value={formData.dressCode || ''}
                        onChange={(e) => handleFormChange('dressCode', e.target.value)}
                        placeholder="Superhero Chic / Royal Blue & Gold"
                        className="w-full bg-[#251147] border border-[#E6C363]/40 rounded-xl p-2.5 text-sm text-white focus:border-[#F5CE62] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#E6C363] uppercase mb-1">
                        Contact Phone Number
                      </label>
                      <input
                        type="text"
                        value={formData.contactNumber || ''}
                        onChange={(e) => handleFormChange('contactNumber', e.target.value)}
                        placeholder="+62 812-3456-7890"
                        className="w-full bg-[#251147] border border-[#E6C363]/40 rounded-xl p-2.5 text-sm text-white focus:border-[#F5CE62] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="block font-bold text-[#E6C363] uppercase mb-1">
                        PayPal Account
                      </label>
                      <input
                        type="text"
                        value={formData.paypalEmail}
                        onChange={(e) => handleFormChange('paypalEmail', e.target.value)}
                        className="w-full bg-[#251147] border border-[#E6C363]/40 rounded-xl p-2.5 text-sm text-white focus:border-[#F5CE62] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#E6C363] uppercase mb-1">
                        Bank Transfer Info
                      </label>
                      <input
                        type="text"
                        value={formData.bankAccount}
                        onChange={(e) => handleFormChange('bankAccount', e.target.value)}
                        className="w-full bg-[#251147] border border-[#E6C363]/40 rounded-xl p-2.5 text-sm text-white focus:border-[#F5CE62] focus:outline-none"
                      />
                    </div>

                    <div>
                      <label className="block font-bold text-[#E6C363] uppercase mb-1">
                        Digital E-Wallet Info
                      </label>
                      <input
                        type="text"
                        value={formData.eWalletNumber}
                        onChange={(e) => handleFormChange('eWalletNumber', e.target.value)}
                        className="w-full bg-[#251147] border border-[#E6C363]/40 rounded-xl p-2.5 text-sm text-white focus:border-[#F5CE62] focus:outline-none"
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between pt-4 border-t border-[#E6C363]/30">
                    <button
                      type="button"
                      onClick={() => {
                        onResetEventDetails();
                        onClose();
                      }}
                      className="px-4 py-2.5 rounded-xl border border-rose-500/40 text-rose-300 hover:bg-rose-950/40 text-xs font-bold flex items-center gap-1.5 cursor-pointer"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      <span>Reset Defaults</span>
                    </button>

                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl gold-bg-gradient hover:gold-bg-gradient-hover text-[#190933] font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
                    >
                      <Save className="w-4 h-4" />
                      <span>SAVE ALL PARTY CHANGES</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 2: HEARTFELT EMOTIONAL LETTER */}
              {activeTab === 'letter' && (
                <form onSubmit={handleSaveEvent} className="space-y-4">
                  <div>
                    <label className="block font-bold text-[#E6C363] uppercase mb-1">
                      Custom Heartfelt Message / Letter Text
                    </label>
                    <p className="text-[11px] text-slate-300 mb-2">
                      This text appears inside the golden framed &ldquo;Heartfelt Letter&rdquo; section on the web page:
                    </p>
                    <textarea
                      rows={6}
                      required
                      value={formData.emotionalLetter || ''}
                      onChange={(e) => handleFormChange('emotionalLetter', e.target.value)}
                      placeholder="Write your special heartfelt message here..."
                      className="w-full bg-[#251147] border border-[#E6C363]/40 rounded-xl p-3 text-sm text-white leading-relaxed focus:border-[#F5CE62] focus:outline-none"
                    />
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl gold-bg-gradient hover:gold-bg-gradient-hover text-[#190933] font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
                    >
                      <Save className="w-4 h-4" />
                      <span>UPDATE LETTER TEXT</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 3: BACKGROUND MUSIC TRACK */}
              {activeTab === 'music' && (
                <form onSubmit={handleSaveEvent} className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#251147] border border-[#E6C363]/30 space-y-3">
                    <div className="flex items-center gap-2 text-sm font-bold text-[#FFF0B3]">
                      <Youtube className="w-5 h-5 text-red-400" />
                      <span>Background Music Source (YouTube Video ID)</span>
                    </div>
                    <p className="text-[11px] text-slate-300">
                      Enter a YouTube Video ID (e.g., <code className="text-[#F5CE62] font-mono font-bold">UmdxeOSpuWw</code>) to play custom background birthday music when guests visit the site!
                    </p>

                    <div>
                      <label className="block text-[11px] font-semibold text-[#E6C363] uppercase mb-1">
                        YouTube Video ID
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.youtubeMusicId || 'UmdxeOSpuWw'}
                        onChange={(e) => handleFormChange('youtubeMusicId', e.target.value)}
                        placeholder="UmdxeOSpuWw"
                        className="w-full bg-[#110524] border border-[#E6C363]/40 rounded-xl p-2.5 text-sm text-white font-mono focus:border-[#F5CE62] focus:outline-none"
                      />
                    </div>

                    <div className="pt-2 flex items-center gap-3">
                      <a
                        href={`https://www.youtube.com/watch?v=${formData.youtubeMusicId || 'UmdxeOSpuWw'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="px-3 py-1.5 rounded-lg bg-[#110524] border border-[#E6C363]/30 text-[#FFF0B3] hover:text-white text-xs flex items-center gap-1.5"
                      >
                        <Play className="w-3.5 h-3.5 text-red-400" />
                        <span>Test YouTube Link in New Tab</span>
                      </a>
                    </div>
                  </div>

                  <div className="flex justify-end pt-3">
                    <button
                      type="submit"
                      className="px-6 py-2.5 rounded-xl gold-bg-gradient hover:gold-bg-gradient-hover text-[#190933] font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-lg"
                    >
                      <Save className="w-4 h-4" />
                      <span>SAVE MUSIC TRACK</span>
                    </button>
                  </div>
                </form>
              )}

              {/* TAB 4: 3D CARTOON HEROES */}
              {activeTab === 'heroes' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="text-slate-300">
                      Edit cartoon hero characters, their emojis, roles, wish messages, and speech texts:
                    </p>
                    <button
                      onClick={handleAddHero}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add New Hero</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {localHeroes.map((hero, index) => (
                      <div
                        key={hero.id}
                        className="p-3.5 rounded-2xl bg-[#251147] border border-[#E6C363]/30 space-y-2 text-xs"
                      >
                        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
                          <div>
                            <label className="text-[10px] text-[#E6C363] uppercase font-bold">
                              Hero Name
                            </label>
                            <input
                              type="text"
                              value={hero.name}
                              onChange={(e) => handleUpdateHero(index, 'name', e.target.value)}
                              className="w-full bg-[#110524] border border-[#E6C363]/30 rounded-lg p-1.5 text-white"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-[#E6C363] uppercase font-bold">
                              Role / Title
                            </label>
                            <input
                              type="text"
                              value={hero.role}
                              onChange={(e) => handleUpdateHero(index, 'role', e.target.value)}
                              className="w-full bg-[#110524] border border-[#E6C363]/30 rounded-lg p-1.5 text-white"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-[#E6C363] uppercase font-bold">
                              Emoji Icon
                            </label>
                            <input
                              type="text"
                              value={hero.avatarIcon}
                              onChange={(e) => handleUpdateHero(index, 'avatarIcon', e.target.value)}
                              className="w-full bg-[#110524] border border-[#E6C363]/30 rounded-lg p-1.5 text-white text-center"
                            />
                          </div>

                          <div className="flex items-end justify-end">
                            <button
                              onClick={() => handleDeleteHero(hero.id)}
                              className="px-2.5 py-1.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900 font-bold text-xs flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] text-[#E6C363] uppercase font-bold">
                            Wish Card Message
                          </label>
                          <textarea
                            rows={2}
                            value={hero.message}
                            onChange={(e) => handleUpdateHero(index, 'message', e.target.value)}
                            className="w-full bg-[#110524] border border-[#E6C363]/30 rounded-lg p-1.5 text-white leading-snug"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-[#E6C363] uppercase font-bold">
                            Voice Speech Narration Text
                          </label>
                          <input
                            type="text"
                            value={hero.voiceText}
                            onChange={(e) => handleUpdateHero(index, 'voiceText', e.target.value)}
                            className="w-full bg-[#110524] border border-[#E6C363]/30 rounded-lg p-1.5 text-white"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 5: TIMELINE MILESTONES */}
              {activeTab === 'timeline' && (
                <div className="space-y-4">
                  <div className="flex items-center justify-between flex-wrap gap-2">
                    <p className="text-slate-300">
                      Edit 10-year growth timeline milestones, photos, and descriptions:
                    </p>
                    <button
                      onClick={handleAddMilestone}
                      className="px-3 py-1.5 rounded-xl bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs flex items-center gap-1 cursor-pointer shadow-md"
                    >
                      <Plus className="w-4 h-4" />
                      <span>Add Milestone</span>
                    </button>
                  </div>

                  <div className="space-y-3">
                    {localTimeline.map((m, index) => (
                      <div
                        key={index}
                        className="p-3.5 rounded-2xl bg-[#251147] border border-[#E6C363]/30 space-y-2 text-xs"
                      >
                        <div className="grid grid-cols-2 sm:grid-cols-5 gap-2">
                          <div>
                            <label className="text-[10px] text-[#E6C363] uppercase font-bold">
                              Year
                            </label>
                            <input
                              type="number"
                              value={m.year}
                              onChange={(e) => handleUpdateMilestone(index, 'year', parseInt(e.target.value) || 2026)}
                              className="w-full bg-[#110524] border border-[#E6C363]/30 rounded-lg p-1.5 text-white"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-[#E6C363] uppercase font-bold">
                              Age
                            </label>
                            <input
                              type="number"
                              value={m.age}
                              onChange={(e) => handleUpdateMilestone(index, 'age', parseInt(e.target.value) || 10)}
                              className="w-full bg-[#110524] border border-[#E6C363]/30 rounded-lg p-1.5 text-white"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-[#E6C363] uppercase font-bold">
                              Icon Emoji
                            </label>
                            <input
                              type="text"
                              value={m.icon}
                              onChange={(e) => handleUpdateMilestone(index, 'icon', e.target.value)}
                              className="w-full bg-[#110524] border border-[#E6C363]/30 rounded-lg p-1.5 text-white text-center"
                            />
                          </div>

                          <div>
                            <label className="text-[10px] text-[#E6C363] uppercase font-bold">
                              Badge Tag
                            </label>
                            <input
                              type="text"
                              value={m.badge}
                              onChange={(e) => handleUpdateMilestone(index, 'badge', e.target.value)}
                              className="w-full bg-[#110524] border border-[#E6C363]/30 rounded-lg p-1.5 text-white"
                            />
                          </div>

                          <div className="flex items-end justify-end">
                            <button
                              onClick={() => handleDeleteMilestone(index)}
                              className="px-2.5 py-1.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900 font-bold text-xs flex items-center gap-1 cursor-pointer"
                            >
                              <Trash2 className="w-3.5 h-3.5" />
                              <span>Delete</span>
                            </button>
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] text-[#E6C363] uppercase font-bold">
                            Milestone Title
                          </label>
                          <input
                            type="text"
                            value={m.title}
                            onChange={(e) => handleUpdateMilestone(index, 'title', e.target.value)}
                            className="w-full bg-[#110524] border border-[#E6C363]/30 rounded-lg p-1.5 text-white"
                          />
                        </div>

                        <div>
                          <label className="text-[10px] text-[#E6C363] uppercase font-bold block mb-1">
                            Milestone Image
                          </label>
                          <div className="flex items-center gap-2">
                            <label className="px-3 py-1.5 rounded-lg bg-[#321361] border border-[#E6C363]/40 text-[#FFF0B3] hover:bg-[#E6C363] hover:text-[#190933] text-[11px] font-bold flex items-center gap-1.5 cursor-pointer shrink-0 transition-colors">
                              <Upload className="w-3.5 h-3.5" />
                              <span>{uploadingId === `milestone_${index}` ? 'Uploading...' : 'Upload Image File'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleUploadMilestoneFile(index, e)}
                                className="hidden"
                              />
                            </label>
                            <input
                              type="text"
                              value={m.photoUrl}
                              onChange={(e) => handleUpdateMilestone(index, 'photoUrl', e.target.value)}
                              placeholder="or image URL"
                              className="flex-1 bg-[#110524] border border-[#E6C363]/30 rounded-lg p-1.5 text-white font-mono text-[11px]"
                            />
                          </div>
                        </div>

                        <div>
                          <label className="text-[10px] text-[#E6C363] uppercase font-bold">
                            Description
                          </label>
                          <textarea
                            rows={2}
                            value={m.description}
                            onChange={(e) => handleUpdateMilestone(index, 'description', e.target.value)}
                            className="w-full bg-[#110524] border border-[#E6C363]/30 rounded-lg p-1.5 text-white leading-snug"
                          />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 6: PHOTO GALLERY & 3D ROOM */}
              {activeTab === 'gallery' && (
                <div className="space-y-4">
                  <div className="p-4 rounded-2xl bg-[#251147] border border-[#E6C363]/40 space-y-3">
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div>
                        <h4 className="text-sm font-bold text-[#FFF0B3] flex items-center gap-1.5">
                          <ImageIcon className="w-4 h-4 text-[#F5CE62]" />
                          <span>Direct Image Upload to Firebase Gallery</span>
                        </h4>
                        <p className="text-[11px] text-slate-300">
                          Upload high-quality images directly from your computer or phone into the 3D gallery.
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <label className="px-3.5 py-2 rounded-xl gold-bg-gradient hover:gold-bg-gradient-hover text-[#190933] font-black text-xs flex items-center gap-1.5 cursor-pointer shadow-lg transition-transform hover:scale-105">
                          <Upload className="w-4 h-4" />
                          <span>{uploadingId === 'new_photo' ? 'Compressing...' : 'Upload Image File'}</span>
                          <input
                            type="file"
                            accept="image/*"
                            onChange={handleUploadNewPhotoFile}
                            className="hidden"
                          />
                        </label>

                        <button
                          onClick={handleAddPhoto}
                          className="px-3 py-2 rounded-xl bg-[#321361] border border-[#E6C363]/50 text-[#FFF0B3] hover:bg-[#E6C363] hover:text-[#190933] font-bold text-xs flex items-center gap-1 cursor-pointer transition-colors"
                        >
                          <Plus className="w-4 h-4" />
                          <span>Add Blank Card</span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {localPhotos.map((photo, index) => (
                      <div
                        key={photo.id}
                        className="p-3 rounded-2xl bg-[#251147] border border-[#E6C363]/30 space-y-2.5 text-xs flex flex-col justify-between"
                      >
                        <div className="flex items-center gap-3">
                          <div className="relative group shrink-0">
                            <img
                              src={photo.url || 'https://images.unsplash.com/photo-1513151233558-d860c5398176?auto=format&fit=crop&w=800&q=80'}
                              alt={photo.title}
                              className="w-20 h-20 rounded-xl object-cover border border-[#E6C363]/40"
                            />
                            <label className="absolute inset-0 bg-[#130624]/75 opacity-0 group-hover:opacity-100 transition-opacity rounded-xl flex items-center justify-center text-[#F5CE62] font-bold text-[10px] cursor-pointer text-center p-1">
                              <Upload className="w-3.5 h-3.5 mb-0.5 inline" />
                              <span>Replace</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleUploadPhotoFile(index, e)}
                                className="hidden"
                              />
                            </label>
                          </div>

                          <div className="flex-1 space-y-1.5">
                            <input
                              type="text"
                              value={photo.title}
                              onChange={(e) => handleUpdatePhoto(index, 'title', e.target.value)}
                              placeholder="Photo Title"
                              className="w-full bg-[#110524] border border-[#E6C363]/30 rounded-lg p-1 text-white font-bold text-xs"
                            />
                            <div className="flex gap-1.5">
                              <select
                                value={photo.category}
                                onChange={(e) => handleUpdatePhoto(index, 'category', e.target.value as any)}
                                className="bg-[#110524] border border-[#E6C363]/30 rounded-lg p-1 text-[#F5CE62] text-[10px]"
                              >
                                <option value="Celebration">Celebration</option>
                                <option value="Decor">Decor</option>
                                <option value="Moments">Moments</option>
                                <option value="Pre-Party">Pre-Party</option>
                                <option value="Adventures">Adventures</option>
                              </select>
                              <input
                                type="text"
                                value={photo.ageTag || ''}
                                onChange={(e) => handleUpdatePhoto(index, 'ageTag', e.target.value)}
                                placeholder="Age Tag"
                                className="w-20 bg-[#110524] border border-[#E6C363]/30 rounded-lg p-1 text-white text-[10px]"
                              />
                            </div>
                          </div>
                        </div>

                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <label className="px-2.5 py-1 rounded-md bg-[#110524] border border-[#E6C363]/30 text-[#FFF0B3] hover:text-white text-[10px] font-semibold flex items-center gap-1 cursor-pointer shrink-0">
                              <Upload className="w-3 h-3 text-[#F5CE62]" />
                              <span>{uploadingId === photo.id ? 'Uploading...' : 'Upload Image'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                onChange={(e) => handleUploadPhotoFile(index, e)}
                                className="hidden"
                              />
                            </label>
                            <input
                              type="text"
                              value={photo.url}
                              onChange={(e) => handleUpdatePhoto(index, 'url', e.target.value)}
                              placeholder="or Image URL / Base64"
                              className="flex-1 bg-[#110524] border border-[#E6C363]/20 rounded-lg p-1 text-slate-300 font-mono text-[10px]"
                            />
                          </div>
                        </div>

                        <div className="flex items-center justify-between pt-1">
                          <input
                            type="text"
                            value={photo.caption || ''}
                            onChange={(e) => handleUpdatePhoto(index, 'caption', e.target.value)}
                            placeholder="Optional Caption"
                            className="flex-1 bg-[#110524] border border-[#E6C363]/20 rounded-lg p-1 text-slate-300 text-[10px] mr-2"
                          />
                          <button
                            onClick={() => handleDeletePhoto(photo.id)}
                            className="p-1.5 rounded-lg bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900 cursor-pointer shrink-0"
                            title="Delete Photo"
                          >
                            <Trash2 className="w-3.5 h-3.5" />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* TAB 7: GUEST RSVPs */}
              {activeTab === 'wishes' && (
                <div className="space-y-3">
                  <p className="text-slate-300">
                    Review and moderate guest wishes submitted to the guestbook wall:
                  </p>

                  {wishes.length === 0 ? (
                    <div className="text-center py-8 text-slate-400 text-xs">
                      No guest wishes submitted yet.
                    </div>
                  ) : (
                    wishes.map((w) => (
                      <div
                        key={w.id}
                        className="p-3.5 rounded-2xl bg-[#251147] border border-[#E6C363]/30 flex items-start justify-between gap-3 text-xs"
                      >
                        <div className="space-y-1">
                          <div className="flex items-center gap-2">
                            <span className="font-bold text-[#FFF0B3]">{w.guestName}</span>
                            <span className="px-2 py-0.5 rounded-full bg-[#1A0B2E] text-[10px] text-[#F5CE62] font-semibold border border-[#E6C363]/20">
                              {w.attendingStatus === 'definitely' ? '✅ Attending' : '💌 Sending Blessings'}
                            </span>
                          </div>
                          <p className="text-slate-200 italic">&ldquo;{w.wishes}&rdquo;</p>
                          <span className="text-[10px] text-slate-400 block">{w.createdAt}</span>
                        </div>

                        {onDeleteWish && (
                          <button
                            onClick={() => onDeleteWish(w.id)}
                            className="p-2 rounded-xl bg-rose-950/60 border border-rose-500/40 text-rose-300 hover:bg-rose-900 transition-colors cursor-pointer shrink-0"
                            title="Delete Wish"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        )}
                      </div>
                    ))
                  )}
                </div>
              )}

              {/* TAB 8: BACKUP & SECURITY */}
              {activeTab === 'security' && (
                <div className="space-y-6">
                  {/* Password Change */}
                  <div className="p-4 rounded-2xl bg-[#251147] border border-[#E6C363]/30">
                    <h4 className="text-sm font-bold text-[#FFF0B3] mb-1 flex items-center gap-2">
                      <Key className="w-4 h-4 text-[#F5CE62]" />
                      <span>Change Admin Password</span>
                    </h4>
                    <p className="text-slate-300 mb-3">
                      Update the password required to log into this Admin Panel.
                    </p>

                    <form onSubmit={handleChangePasswordSubmit} className="space-y-3 max-w-sm">
                      <div>
                        <label className="block text-[10px] font-semibold text-[#E6C363] uppercase mb-1">
                          New Password
                        </label>
                        <input
                          type="text"
                          required
                          value={newPassword}
                          onChange={(e) => setNewPassword(e.target.value)}
                          placeholder="Enter new password"
                          className="w-full bg-[#110524] border border-[#E6C363]/40 rounded-xl p-2.5 text-sm text-white focus:border-[#F5CE62] focus:outline-none"
                        />
                      </div>

                      <button
                        type="submit"
                        className="px-5 py-2.5 rounded-xl gold-bg-gradient hover:gold-bg-gradient-hover text-[#190933] font-bold text-xs cursor-pointer shadow-lg"
                      >
                        Update Password
                      </button>
                    </form>
                  </div>

                  {/* Complete Site Export / Import Backup */}
                  <div className="p-4 rounded-2xl bg-[#251147] border border-[#E6C363]/30 space-y-4">
                    <h4 className="text-sm font-bold text-[#FFF0B3] flex items-center gap-2">
                      <Download className="w-4 h-4 text-[#F5CE62]" />
                      <span>Backup & Restore Complete Website JSON</span>
                    </h4>
                    <p className="text-slate-300">
                      Export your entire customized website state (names, characters, timeline, photos, quotes) to JSON or import a JSON backup file in 1-click!
                    </p>

                    <div className="flex gap-3 flex-wrap">
                      <button
                        onClick={handleExportJSON}
                        className="px-4 py-2.5 rounded-xl bg-[#321361] border border-[#E6C363]/50 text-[#FFF0B3] hover:bg-[#E6C363] hover:text-[#190933] font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <Download className="w-4 h-4" />
                        <span>Export Site JSON Backup</span>
                      </button>
                    </div>

                    <div className="pt-2 border-t border-[#E6C363]/20 space-y-2">
                      <label className="block font-bold text-[#E6C363]">
                        Import Site Backup JSON Text
                      </label>
                      <textarea
                        rows={3}
                        value={jsonImportText}
                        onChange={(e) => setJsonImportText(e.target.value)}
                        placeholder="Paste JSON configuration text here..."
                        className="w-full bg-[#110524] border border-[#E6C363]/30 rounded-xl p-2.5 text-white font-mono text-xs focus:outline-none"
                      />

                      {importStatus && (
                        <p className="text-xs font-semibold text-amber-300 bg-amber-950/60 p-2 rounded-xl border border-amber-500/40">
                          {importStatus}
                        </p>
                      )}

                      <button
                        onClick={handleImportJSON}
                        className="px-4 py-2 rounded-xl bg-emerald-700 hover:bg-emerald-600 text-white font-bold text-xs flex items-center gap-2 cursor-pointer shadow-md"
                      >
                        <Upload className="w-4 h-4" />
                        <span>Restore Site From JSON</span>
                      </button>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
