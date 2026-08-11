export interface EventDetails {
  hostName: string;
  fullName: string;
  turningAge: number;
  ageText: string; // e.g. "Tenth"
  quote: string;
  eventDate: string; // e.g. "12th Sunday, December 2026"
  rawDateISO: string; // "2026-12-12T17:30:00"
  locationName: string; // e.g. "Alila Villas Uluwatu"
  address: string;
  timeString: string;
  mapUrl: string;
  paypalEmail: string;
  bankAccount: string;
  eWalletNumber: string;
  dressCode?: string;
  contactNumber?: string;
  emotionalLetter?: string;
  youtubeMusicId?: string;
}

export interface CharacterWish {
  id: string;
  name: string;
  role: string;
  avatarIcon: string;
  color: string;
  bgGradient: string;
  message: string;
  voiceText: string;
  actionPose: string;
}

export interface TimelineMilestone {
  year: number;
  age: number;
  title: string;
  description: string;
  photoUrl: string;
  icon: string;
  badge: string;
}

export interface GiftMethod {
  id: string;
  label: string;
  accountNumber: string;
  accountName: string;
  instruction: string;
}

export interface RsvpSubmission {
  id: string;
  guestName: string;
  guestCount: string; // e.g. "One", "Two", "Three"
  attendingStatus: 'definitely' | 'declined' | 'deciding';
  wishes: string;
  createdAt: string;
  likes: number;
  isLiked?: boolean;
}

export interface GalleryPhoto {
  id: string;
  url: string;
  title: string;
  category: 'Celebration' | 'Decor' | 'Moments' | 'Pre-Party' | 'Adventures' | 'Pilgrimage' | 'Culture' | 'Family' | string;
  caption?: string;
  ageTag?: string;
}

export type PerformanceMode = 'high' | 'balanced' | 'low';

