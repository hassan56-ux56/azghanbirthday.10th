import {
  collection,
  doc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
  deleteDoc,
  onSnapshot,
  query,
  orderBy,
  serverTimestamp,
} from "firebase/firestore";
import { db } from "./firebase";
import {
  EventDetails,
  CharacterWish,
  TimelineMilestone,
  RsvpSubmission,
  GalleryPhoto,
  GiftMethod,
} from "../types";
import {
  INITIAL_EVENT_DETAILS,
  CHARACTER_WISHES,
  TIMELINE_MILESTONES,
  INITIAL_GALLERY_PHOTOS,
  INITIAL_RSVP_WISHES,
} from "../data/initialData";

// Collection Names
const COLLECTIONS = {
  SETTINGS: "appConfig",
  WISHES: "wishes",
  TIMELINE: "timelineEvents",
  GALLERY: "galleryPhotos",
  GIFTS: "gifts",
  RSVPS: "rsvps",
};

// --------------------------------------------------------------------------
// Seed Initial Data into Firestore if collection is empty
// --------------------------------------------------------------------------
export async function seedInitialFirestoreData() {
  try {
    // 1. Settings (Honoring & Event Details)
    const settingsDocRef = doc(db, COLLECTIONS.SETTINGS, "eventDetails");
    const settingsSnap = await getDocs(collection(db, COLLECTIONS.SETTINGS));
    if (settingsSnap.empty) {
      await setDoc(settingsDocRef, INITIAL_EVENT_DETAILS);
    }

    // 2. Timeline Milestones
    const timelineSnap = await getDocs(collection(db, COLLECTIONS.TIMELINE));
    if (timelineSnap.empty) {
      for (const item of TIMELINE_MILESTONES) {
        await setDoc(doc(db, COLLECTIONS.TIMELINE, `year_${item.year}`), item);
      }
    }

    // 3. Gallery Photos
    const gallerySnap = await getDocs(collection(db, COLLECTIONS.GALLERY));
    if (gallerySnap.empty) {
      for (const photo of INITIAL_GALLERY_PHOTOS) {
        await setDoc(doc(db, COLLECTIONS.GALLERY, photo.id), photo);
      }
    }

    // 4. Character Wishes
    const wishesSnap = await getDocs(collection(db, COLLECTIONS.WISHES));
    if (wishesSnap.empty) {
      for (const wish of CHARACTER_WISHES) {
        await setDoc(doc(db, COLLECTIONS.WISHES, wish.id), wish);
      }
    }

    // 5. RSVPs
    const rsvpsSnap = await getDocs(collection(db, COLLECTIONS.RSVPS));
    if (rsvpsSnap.empty) {
      for (const rsvp of INITIAL_RSVP_WISHES) {
        await setDoc(doc(db, COLLECTIONS.RSVPS, rsvp.id), rsvp);
      }
    }
  } catch (error) {
    console.error("Firestore seeding error:", error);
  }
}

// --------------------------------------------------------------------------
// Real-time Subscriptions & Subscriptions Listeners
// --------------------------------------------------------------------------

// 1. Event Details
export function subscribeEventDetails(callback: (data: EventDetails) => void) {
  const docRef = doc(db, COLLECTIONS.SETTINGS, "eventDetails");
  return onSnapshot(
    docRef,
    (snapshot) => {
      if (snapshot.exists()) {
        const data = snapshot.data() as EventDetails;
        if (!data.youtubeMusicId || data.youtubeMusicId === "UmdxeOSpuWw") {
          data.youtubeMusicId = "SSUbntk63Yg";
          setDoc(docRef, { youtubeMusicId: "SSUbntk63Yg" }, { merge: true }).catch(console.warn);
        }
        callback(data);
      } else {
        // Fallback and seed
        setDoc(docRef, INITIAL_EVENT_DETAILS);
        callback(INITIAL_EVENT_DETAILS);
      }
    },
    (err) => {
      console.warn("EventDetails subscription warning:", err);
      callback(INITIAL_EVENT_DETAILS);
    }
  );
}

export async function updateEventDetailsInDb(data: Partial<EventDetails>) {
  const docRef = doc(db, COLLECTIONS.SETTINGS, "eventDetails");
  await setDoc(docRef, data, { merge: true });
}

// 2. Character Wishes
export function subscribeWishes(callback: (wishes: CharacterWish[]) => void) {
  const colRef = collection(db, COLLECTIONS.WISHES);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const list: CharacterWish[] = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() } as CharacterWish);
      });
      if (list.length > 0) {
        callback(list);
      } else {
        callback(CHARACTER_WISHES);
      }
    },
    () => callback(CHARACTER_WISHES)
  );
}

export async function saveWishToDb(wish: Omit<CharacterWish, "id"> & { id?: string }) {
  const id = wish.id || `wish_${Date.now()}`;
  await setDoc(doc(db, COLLECTIONS.WISHES, id), { ...wish, id });
}

export async function deleteWishFromDb(id: string) {
  await deleteDoc(doc(db, COLLECTIONS.WISHES, id));
}

// 3. Timeline Milestones
export function subscribeTimeline(callback: (timeline: TimelineMilestone[]) => void) {
  const colRef = collection(db, COLLECTIONS.TIMELINE);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const list: TimelineMilestone[] = [];
      snapshot.forEach((docSnap) => {
        list.push(docSnap.data() as TimelineMilestone);
      });
      list.sort((a, b) => a.year - b.year);
      if (list.length > 0) {
        callback(list);
      } else {
        callback(TIMELINE_MILESTONES);
      }
    },
    () => callback(TIMELINE_MILESTONES)
  );
}

export async function saveTimelineItemToDb(item: TimelineMilestone) {
  await setDoc(doc(db, COLLECTIONS.TIMELINE, `year_${item.year}`), item);
}

export async function deleteTimelineItemFromDb(year: number) {
  await deleteDoc(doc(db, COLLECTIONS.TIMELINE, `year_${year}`));
}

// 4. Gallery Photos
export function subscribeGallery(callback: (photos: GalleryPhoto[]) => void) {
  const colRef = collection(db, COLLECTIONS.GALLERY);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const list: GalleryPhoto[] = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() } as GalleryPhoto);
      });
      if (list.length > 0) {
        callback(list);
      } else {
        callback(INITIAL_GALLERY_PHOTOS);
      }
    },
    () => callback(INITIAL_GALLERY_PHOTOS)
  );
}

export async function saveGalleryPhotoToDb(photo: Omit<GalleryPhoto, "id"> & { id?: string }) {
  const id = photo.id || `photo_${Date.now()}`;
  await setDoc(doc(db, COLLECTIONS.GALLERY, id), { ...photo, id });
}

export async function deleteGalleryPhotoFromDb(id: string) {
  await deleteDoc(doc(db, COLLECTIONS.GALLERY, id));
}

// 5. RSVPs
export function subscribeRsvps(callback: (rsvps: RsvpSubmission[]) => void) {
  const colRef = collection(db, COLLECTIONS.RSVPS);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const list: RsvpSubmission[] = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() } as RsvpSubmission);
      });
      if (list.length > 0) {
        callback(list);
      } else {
        callback(INITIAL_RSVP_WISHES);
      }
    },
    () => callback(INITIAL_RSVP_WISHES)
  );
}

export async function addRsvpToDb(rsvp: Omit<RsvpSubmission, "id" | "createdAt" | "likes">) {
  const id = `rsvp_${Date.now()}`;
  const newRsvp: RsvpSubmission = {
    ...rsvp,
    id,
    createdAt: new Date().toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    }),
    likes: 0,
  };
  await setDoc(doc(db, COLLECTIONS.RSVPS, id), newRsvp);
  return newRsvp;
}

export async function toggleRsvpLikeInDb(id: string, currentLikes: number, isCurrentlyLiked: boolean) {
  const docRef = doc(db, COLLECTIONS.RSVPS, id);
  const newLikes = isCurrentlyLiked ? Math.max(0, currentLikes - 1) : currentLikes + 1;
  await updateDoc(docRef, { likes: newLikes });
}

export async function deleteRsvpFromDb(id: string) {
  await deleteDoc(doc(db, COLLECTIONS.RSVPS, id));
}

// 6. Gift Methods
export function subscribeGifts(callback: (gifts: GiftMethod[]) => void) {
  const colRef = collection(db, COLLECTIONS.GIFTS);
  return onSnapshot(
    colRef,
    (snapshot) => {
      const list: GiftMethod[] = [];
      snapshot.forEach((docSnap) => {
        list.push({ id: docSnap.id, ...docSnap.data() } as GiftMethod);
      });
      callback(list);
    },
    () => callback([])
  );
}

export async function saveGiftToDb(gift: Omit<GiftMethod, "id"> & { id?: string }) {
  const id = gift.id || `gift_${Date.now()}`;
  await setDoc(doc(db, COLLECTIONS.GIFTS, id), { ...gift, id });
}

export async function deleteGiftFromDb(id: string) {
  await deleteDoc(doc(db, COLLECTIONS.GIFTS, id));
}
