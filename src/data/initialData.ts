import { EventDetails, GiftMethod, RsvpSubmission, GalleryPhoto, CharacterWish, TimelineMilestone } from '../types';
import boyPortraitImage from '../assets/images/regenerated_image_1786208736254.jpg';
import decorCardImage from '../assets/images/regenerated_image_1786208908399.jpg';

export const INITIAL_EVENT_DETAILS: EventDetails = {
  hostName: "AZGHAN",
  fullName: "Azghan",
  turningAge: 10,
  ageText: "Tenth",
  quote: "10 years of laughter, grand adventures, superhero dreams, and endless joy!",
  eventDate: "12th Sunday, December 2026",
  rawDateISO: "2026-12-12T16:00:00", // Target date for countdown
  locationName: "Grand Magical Palace Ballroom & Adventure Garden",
  address: "Jl. Belimbing Sari Tambiyak, Pecatu, South Kuta, Badung Regency, Bali 80364",
  timeString: "4:00 PM - 8:00 PM (Sunset Party)",
  mapUrl: "https://maps.google.com/?q=Alila+Villas+Uluwatu+Bali",
  paypalEmail: "azghan.gifts@paypal.me",
  bankAccount: "883-0192-4412 (Bank BCA)",
  eWalletNumber: "+62 812-9876-5432 (DANA / OVO)",
  dressCode: "Superhero Chic / Royal Blue & Gold Party Attire",
  contactNumber: "+62 812-3456-7890",
  youtubeMusicId: "SSUbntk63Yg",
  emotionalLetter: "Ten wonderful years of smiles, laughter, grand adventures, and beautiful memories. May this brand new double-digit chapter bring you exciting dreams, soaring confidence, endless victories, and boundless happiness. Keep smiling bright, keep learning, keep exploring the universe, and always believe in the superhero inside you.",
};

export const CHARACTER_WISHES: CharacterWish[] = [
  {
    id: "cap-cosmic",
    name: "Captain Cosmic",
    role: "Galactic Superhero",
    avatarIcon: "🚀",
    color: "#38BDF8",
    bgGradient: "from-sky-500/30 to-blue-600/30",
    message: "Hey Azghan, Birthday Superstar! Happy 10th Birthday! Keep soaring high among the stars, laughing loud, and unlocking your superhero powers every single day!",
    voiceText: "Hey Azghan, Birthday Superstar! Happy 10th Birthday! Keep soaring high among the stars!",
    actionPose: "Flying superhero pose with starry cosmic trail",
  },
  {
    id: "sparky-bot",
    name: "Sparky Bot",
    role: "Cyber Robo Friend",
    avatarIcon: "🤖",
    color: "#A855F7",
    bgGradient: "from-purple-500/30 to-indigo-600/30",
    message: "BEEP BOOP! Calculating maximum party level... 100% EPIC! Happy Double-Digit 10th Birthday Azghan! You are officially upgraded to Level 10 Legend!",
    voiceText: "Beep Boop! Happy double digit 10th birthday Azghan! You are officially upgraded to level 10 legend!",
    actionPose: "Dancing robot spin with neon plasma sparks",
  },
  {
    id: "leo-lion",
    name: "Leo the Adventurer",
    role: "Brave Safari Lion",
    avatarIcon: "🦁",
    color: "#F59E0B",
    bgGradient: "from-amber-500/30 to-yellow-600/30",
    message: "ROAR OF JOY! Happy 10th Birthday to the bravest explorer Azghan! May your year be filled with wild fun, treasure hunts, and unforgettable triumphs!",
    voiceText: "Roar of joy! Happy 10th birthday to the bravest explorer Azghan!",
    actionPose: "Champion lion roar with golden trophy lift",
  },
  {
    id: "zephyr-dragon",
    name: "Zephyr Dragon",
    role: "Magical Fire Drake",
    avatarIcon: "🐉",
    color: "#10B981",
    bgGradient: "from-emerald-500/30 to-teal-600/30",
    message: "Fire up the candles! Happy 10th Birthday Azghan! Wishing you a year bursting with magic, colorful fireworks, and unstoppable adventure!",
    voiceText: "Fire up the candles! Happy 10th Birthday Azghan! Wishing you a magical year!",
    actionPose: "Dragon loop-de-loop with sparkling fireflies",
  },
  {
    id: "barnaby-bear",
    name: "Barnaby Bear",
    role: "Master Gamer Bear",
    avatarIcon: "🎮",
    color: "#EC4899",
    bgGradient: "from-pink-500/30 to-[#2A1152]",
    message: "Press START on your 10th year! Happy Birthday Azghan! High scores, victory royales, and endless birthday cake await you today!",
    voiceText: "Press start on your 10th year! Happy birthday Azghan! High scores and victory royales await!",
    actionPose: "Victory gaming dance with golden confetti shower",
  },
];

export const TIMELINE_MILESTONES: TimelineMilestone[] = [
  {
    year: 2017,
    age: 1,
    title: "Newborn Blessing & First Hugs",
    description: "Wrapped in warm blankets in dad's loving arms. Where Azghan's magical story began!",
    photoUrl: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=90",
    icon: "👶",
    badge: "Age 1 • Newborn Blessing",
  },
  {
    year: 2018,
    age: 2,
    title: "2nd Birthday Prince & Rocking Horse",
    description: "Dressed in a royal white sherwani, birthday crown, and star wand on his favorite wooden horse!",
    photoUrl: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=90",
    icon: "👑",
    badge: "Age 2 • Birthday Prince",
  },
  {
    year: 2019,
    age: 3,
    title: "Rose Garlands & Family Celebrations",
    description: "Grand welcome with fragrant rose garlands around his neck and big bright smiles!",
    photoUrl: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=90",
    icon: "🌹",
    badge: "Age 3 • Warm Welcome",
  },
  {
    year: 2020,
    age: 4,
    title: "Pony Rides & Outdoor Safari",
    description: "Riding decorated ponies with pom-poms across sunny park trails like a brave little knight!",
    photoUrl: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=90",
    icon: "🐎",
    badge: "Age 4 • Safari Knight",
  },
  {
    year: 2021,
    age: 5,
    title: "Flowerbed Dreamer in the Garden",
    description: "Lying down among colorful spring pansies and carnation flowers under open skies.",
    photoUrl: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=90",
    icon: "🌸",
    badge: "Age 5 • Garden Explorer",
  },
  {
    year: 2022,
    age: 6,
    title: "Tree Climber & Nature Adventurer",
    description: "Climbing high up tree trunks in green parks, hugging branches with pure joy!",
    photoUrl: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1200&q=90",
    icon: "🌳",
    badge: "Age 6 • Tree Climber",
  },
  {
    year: 2023,
    age: 7,
    title: "Patriotic Spirit & 14th August",
    description: "Celebrating Pakistan Independence Day with headband, green colors, and Pakistan flag!",
    photoUrl: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=1200&q=90",
    icon: "🇵🇰",
    badge: "Age 7 • Patriotic Heart",
  },
  {
    year: 2024,
    age: 8,
    title: "Blessed Umrah Journey to Makkah & Madinah",
    description: "Standing in Ihram at the Holy Kaaba in Makkah and under the giant umbrellas of Al-Masjid an-Nabawi.",
    photoUrl: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=90",
    icon: "🕌",
    badge: "Age 8 • Umrah Pilgrim",
  },
  {
    year: 2025,
    age: 9,
    title: "Pre-Party Decor & Grand Venue Setup",
    description: "Beautiful birthday setup with glowing party decor, treats, balloons, and cake!",
    photoUrl: decorCardImage,
    icon: "✨",
    badge: "Age 9 • Venue & Decor",
  },
  {
    year: 2026,
    age: 10,
    title: "AZGHAN TURNS 10 - DOUBLE DIGIT CHAMPION!",
    description: "Azghan celebrating turning 10 years old with joy, style, and double digit birthday milestones!",
    photoUrl: boyPortraitImage,
    icon: "⭐",
    badge: "Age 10 • Birthday Portrait",
  },
];

export const GIFT_METHODS: GiftMethod[] = [
  {
    id: "paypal",
    label: "Donate via Paypal",
    accountNumber: "azghan.gifts@paypal.me",
    accountName: "Azghan",
    instruction: "Send birthday blessing & gifts directly via PayPal"
  },
  {
    id: "bca",
    label: "Bank Transfer (BCA)",
    accountNumber: "88301924412",
    accountName: "Azghan",
    instruction: "BCA Account Number for direct transfer"
  },
  {
    id: "e-wallet",
    label: "Digital Wallet (DANA / OVO)",
    accountNumber: "081298765432",
    accountName: "Azghan",
    instruction: "Instant e-wallet transfer"
  }
];

export const INITIAL_GALLERY_PHOTOS: GalleryPhoto[] = [
  {
    id: "p1",
    url: boyPortraitImage,
    title: "Azghan Birthday Boy Portrait",
    category: "Celebration",
    caption: "Azghan posing cheerfully in his birthday portrait celebrate turning 10 years old!",
  },
  {
    id: "p2",
    url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSaYTi9InJnqyyXvEHWW9EyqIMaNkMDZ2fCQwg5u1gxHeZOIPKxAGUcH3s&s=10",
    title: "Golden Birthday Cake & Treats",
    category: "Celebration",
    caption: "Delicious custom birthday cake adorned with golden candles and festive treats.",
  },
  {
    id: "p3",
    url: decorCardImage,
    title: "Birthday Party Celebration Decor",
    category: "Celebration",
    caption: "Magical birthday venue setup filled with sparkling lights, balloons, and decorations.",
  },
  {
    id: "p4",
    url: "https://images.unsplash.com/photo-1564769625905-50e93615e769?auto=format&fit=crop&w=1200&q=90",
    title: "Blessed Umrah at Holy Kaaba, Makkah",
    category: "Pilgrimage",
    caption: "Azghan standing in front of the Holy Kaaba in Masjid al-Haram during a sacred family Umrah trip.",
  },
  {
    id: "p5",
    url: "https://images.unsplash.com/photo-1591604466107-ec97de577aff?auto=format&fit=crop&w=1200&q=90",
    title: "Golden Hour at Al-Masjid an-Nabawi, Madinah",
    category: "Pilgrimage",
    caption: "Standing peacefully under the giant umbrellas of the Prophet's Mosque in Madinah during sunset.",
  },
  {
    id: "p6",
    url: "https://images.unsplash.com/photo-1530103862676-de8c9debad1d?auto=format&fit=crop&w=1200&q=90",
    title: "2nd Birthday Prince & Rocking Horse",
    category: "Celebration",
    caption: "Dressed in a royal white sherwani and party crown, riding his wooden horse with star wand!",
  },
  {
    id: "p7",
    url: "https://images.unsplash.com/photo-1500382017468-9049fed747ef?auto=format&fit=crop&w=1200&q=90",
    title: "Flowerbed Dreamer in the Garden",
    category: "Adventures",
    caption: "Lying down among vibrant red, purple, and white carnation flowers in the stone garden bed.",
  },
  {
    id: "p8",
    url: "https://images.unsplash.com/photo-1472162072942-cd5147eb3902?auto=format&fit=crop&w=1200&q=90",
    title: "Tree Hugger & Park Explorer",
    category: "Adventures",
    caption: "Climbing high up a giant tree trunk in the green park with a happy bright grin.",
  },
  {
    id: "p9",
    url: "https://images.unsplash.com/photo-1553284965-83fd3e82fa5a?auto=format&fit=crop&w=1200&q=90",
    title: "Pony Safari Ride in the Park",
    category: "Adventures",
    caption: "Riding a decorated brown pony with colourful pom-poms across the outdoor safari trails.",
  },
  {
    id: "p10",
    url: "https://images.unsplash.com/photo-1511886929837-354d827aae26?auto=format&fit=crop&w=1200&q=90",
    title: "14th August Pakistan Independence Celebration",
    category: "Culture",
    caption: "Wearing green & white shirt with 14th August headband alongside his loving brothers.",
  },
  {
    id: "p11",
    url: "https://images.unsplash.com/photo-1507679799987-c73779587ccf?auto=format&fit=crop&w=1200&q=90",
    title: "Dapper Gentleman in Bowtie & Vest",
    category: "Moments",
    caption: "Looking super smart in a green formal vest, bowtie, dark trousers, and formal shoes.",
  },
  {
    id: "p12",
    url: "https://images.unsplash.com/photo-1519689680058-324335c77eba?auto=format&fit=crop&w=1200&q=90",
    title: "Newborn Blessing in Dad's Arms",
    category: "Family",
    caption: "Wrapped in a cozy blanket with a little cap in his dad's gentle embrace.",
  },
  {
    id: "p13",
    url: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?auto=format&fit=crop&w=1200&q=90",
    title: "Rose Garlands Welcome",
    category: "Celebration",
    caption: "Toddler Azghan wearing big pink and red rose garlands around his neck at a family event.",
  },
  {
    id: "p14",
    url: "https://images.unsplash.com/photo-1503454537195-1dcabb73ffb9?auto=format&fit=crop&w=1200&q=90",
    title: "Playground Rope Ladder Champion",
    category: "Adventures",
    caption: "Climbing rope structures on the playground in his cool blue sweatshirt and cargo jeans.",
  },
  {
    id: "p15",
    url: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1200&q=90",
    title: "Traditional Kurta Pajama & Prayer Cap",
    category: "Culture",
    caption: "Standing proudly in a black Kurta Pajama with embroidered Topi and arms crossed.",
  },
  {
    id: "p16",
    url: "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=1200&q=90",
    title: "Level 10 Double Digit Birthday Party",
    category: "Celebration",
    caption: "Sparkling lights, golden balloons, and 10th birthday festivities with loved ones!",
  }
];

export const INITIAL_RSVP_WISHES: RsvpSubmission[] = [
  {
    id: "w1",
    guestName: "Alexander & Maya",
    guestCount: "Two",
    attendingStatus: "definitely",
    wishes: "Happy 10th Birthday Azghan! Welcome to the double digits! May this year bring you endless laughter, cool video games, superhero adventures, and unforgettable memories! See you at the party!",
    createdAt: "2 hours ago",
    likes: 12,
    isLiked: false
  },
  {
    id: "w2",
    guestName: "Samantha & Family",
    guestCount: "Three",
    attendingStatus: "definitely",
    wishes: "Wishing the happiest 10th birthday to Azghan! You are such an incredible, smart, and funny boy. Can't wait to celebrate on Sunday at 4 PM!",
    createdAt: "5 hours ago",
    likes: 8,
    isLiked: false
  },
  {
    id: "w3",
    guestName: "Uncle Marcus & Aunt Clara",
    guestCount: "Four+",
    attendingStatus: "definitely",
    wishes: "Happy Birthday Azghan! So proud of the awesome young man you're becoming. Keep reaching for the stars!",
    createdAt: "1 day ago",
    likes: 15,
    isLiked: true
  },
  {
    id: "w4",
    guestName: "Coach Daniel",
    guestCount: "One",
    attendingStatus: "definitely",
    wishes: "Happy 10th Champ! Keep scoring goals on and off the field. Have a roaring fun birthday!",
    createdAt: "2 days ago",
    likes: 9,
    isLiked: false
  }
];

