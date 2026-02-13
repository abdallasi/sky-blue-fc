import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';

// Types for all editable content
export interface HeroContent {
  headline: string;
  subheadline: string;
  button1: string;
  button2: string;
  badge: string;
}

export interface StatItem {
  value: string;
  label: string;
}

export interface SnapshotContent {
  headline: string;
  description: string;
  achievements: string[];
}

export interface VisionMissionContent {
  vision: string;
  mission: string[];
}

export interface AboutContent {
  heroTitle: string;
  heroSubtitle: string;
  storyTitle: string;
  storyParagraphs: string[];
  founderName: string;
  founderTitle: string;
  founderBio: string;
}

export interface Milestone {
  year: string;
  title: string;
  description: string;
}

export interface Facility {
  name: string;
  location: string;
  description: string;
}

export interface ManagementMember {
  name: string;
  role: string;
}

export interface Player {
  number: number;
  name: string;
  position: string;
  role?: string;
  captain?: boolean;
}

export interface NotablePlayer {
  name: string;
  age: number;
  position: string;
  matches: number;
  goals: number;
  assists: number;
}

export interface AcademyContent {
  heroTitle: string;
  heroSubtitle: string;
  philosophy: string;
  successHighlight: string;
}

export interface PathwayStep {
  step: number;
  title: string;
  description: string;
}

export interface ContactInfo {
  email: string;
  phone: string;
  location: string;
  locationDetail: string;
}

export interface GalleryImage {
  id: string;
  src: string;
  alt: string;
  category: string;
  caption?: string;
}

export interface ImageAssets {
  heroBackground?: string;
  founderPhoto?: string;
  academyHero?: string;
  teamHero?: string;
  statsHero?: string;
  contactHero?: string;
  aboutStoryImages?: string[];
  galleryImages?: GalleryImage[];
}

export interface SiteContent {
  hero: HeroContent;
  stats: StatItem[];
  snapshot: SnapshotContent;
  visionMission: VisionMissionContent;
  about: AboutContent;
  milestones: Milestone[];
  facilities: Facility[];
  management: ManagementMember[];
  startingXI: Player[];
  extendedSquad: Player[];
  notablePlayers: NotablePlayer[];
  academy: AcademyContent;
  pathway: PathwayStep[];
  contact: ContactInfo;
  images: ImageAssets;
}

const defaultContent: SiteContent = {
  hero: {
    headline: "AMTAY FC — Fast. Fierce. Unstoppable.",
    subheadline: "From Kano to National Stardom: Developing Nigeria's future football legends.",
    button1: "Meet the Squad",
    button2: "Our Vision",
    badge: "International League"
  },
  stats: [
    { value: '310', label: 'Clean Sheets' },
    { value: '120', label: 'Match Unbeaten Streak' },
    { value: '98', label: 'Championships Won' },
    { value: '68%', label: 'Win Rate' },
    { value: '298', label: 'Total Goals Scored' },
  ],
  snapshot: {
    headline: "A Club Built for Excellence.",
    description: "AMTAY FC is one of Kano's fastest-rising football institutions. Built in 2023 with a mission to develop young athletes, the club has earned recognition for its professionalism, dominance, and player development approach.",
    achievements: [
      "Promotion to the International League",
      "Strong performance in the Ahlan League",
      "Four players invited to Nigeria's U-17 screening at the Abuja Goal Project Stadium",
      "Rapid growth and national-level visibility"
    ]
  },
  visionMission: {
    vision: "To become Nigeria's leading football club in talent development, professionalism, and community impact.",
    mission: [
      "Develop young football talent.",
      "Achieve excellence in national & international competitions.",
      "Inspire pride in fans and the community."
    ]
  },
  about: {
    heroTitle: "Building the Future of Nigerian Football",
    heroSubtitle: "From humble beginnings to national recognition, discover the journey of AMTAY FC.",
    storyTitle: "Our Club Story",
    storyParagraphs: [
      "AMTAY FC was founded in 2023 by Engr. Dr. Abdulwahab Tayyeb, a visionary leader, philanthropist, and football enthusiast committed to youth empowerment.",
      "Established to identify, train, and elevate young players, the club quickly gained recognition for its strong performances in the Kano Ahlan League.",
      "With disciplined management and a clear philosophy, the club earned a deserved promotion to the International League—marking a major milestone in its mission to shape the next generation of Nigerian stars."
    ],
    founderName: "Engr. Dr. Abdulwahab Tayyeb",
    founderTitle: "Founder & Chairman",
    founderBio: "A visionary engineer and philanthropist, Dr. Abdulwahab Tayyeb created AMTAY FC to empower youth through structured football development. His commitment to community upliftment and excellence has shaped the club's identity and its rapidly rising status among Nigeria's most promising football institutions."
  },
  milestones: [
    { year: '2023', title: 'Club Founded', description: 'AMTAY FC established by Engr. Dr. Abdulwahab Tayyeb' },
    { year: '2023', title: 'Ahlan League Debut', description: 'First competitive season in Kano Ahlan League' },
    { year: '2023', title: 'National Recognition', description: '4 players invited to Nigeria U-17 screening' },
    { year: '2024', title: 'League Champions', description: 'Recognized as top team in the league' },
    { year: '2024', title: 'International League', description: 'Promotion to International League' },
  ],
  facilities: [
    { name: 'Training Ground', location: 'Federal College of Education, Kano', description: 'Professional-grade training facilities' },
    { name: 'Fitness Center', location: 'Meeqat Gym', description: 'State-of-the-art fitness equipment' },
    { name: 'Youth Academy', location: 'Dedicated Development Center', description: 'Programs for emerging talents' },
    { name: 'Medical Recovery Hub', location: 'Integrated Care Facility', description: 'Free recovery and rehabilitation' },
  ],
  management: [
    { name: 'Engr. Dr. Muhd Tayyeb', role: 'President' },
    { name: 'Auwal T. Tahir', role: 'Team Secretary & Media Team' },
    { name: 'Barr. Bashir Adam', role: 'Legal Advisor' },
    { name: 'Abubakar Nuhu Muhammad', role: 'Financial Secretary' },
    { name: 'Engr. Mustapha Abubakar', role: 'Treasurer' },
    { name: 'Abdulraheem A. Bashir', role: 'Secretary Technical Crew' },
    { name: 'Lawal S. Imam', role: 'Chairman Technical Crew' },
    { name: 'Mikail Muhammad', role: 'Team Head Coach' },
    { name: 'Nafiu Bala', role: 'Assistant Coach' },
  ],
  startingXI: [
    { number: 1, name: 'Mikel', position: 'GK', role: 'Goalkeeper' },
    { number: 2, name: 'Ibrahim Pepe', position: 'RB', role: 'Right Back' },
    { number: 3, name: 'Abdallah Barriser', position: 'CB', role: 'Centre Back' },
    { number: 4, name: 'Umara', position: 'CB', role: 'Centre Back', captain: true },
    { number: 5, name: 'Alkasim Kabo', position: 'LB', role: 'Left Back' },
    { number: 6, name: 'Nafiu Champion', position: 'DM', role: 'Defensive Midfielder' },
    { number: 7, name: 'Wasilu', position: 'CM', role: 'Central Midfielder' },
    { number: 8, name: 'ZA Boy', position: 'CM', role: 'Central Midfielder' },
    { number: 9, name: 'Aliyu Goma', position: 'RW', role: 'Right Wing' },
    { number: 10, name: 'Hassan Dembele', position: 'ST', role: 'Striker' },
    { number: 11, name: 'Al Qasim Bakabo', position: 'LW', role: 'Left Wing' },
  ],
  extendedSquad: [
    { number: 12, name: 'Abul Onana', position: 'GK' },
    { number: 13, name: 'Abdallah Barrister', position: 'DF' },
    { number: 14, name: 'Sulaiman Bachirawa', position: 'DF' },
    { number: 15, name: 'Ali Me Kaji', position: 'MF' },
    { number: 16, name: 'Abibu', position: 'MF' },
    { number: 17, name: 'Dan Kishiya', position: 'FW' },
    { number: 18, name: 'Warleed', position: 'FW' },
  ],
  notablePlayers: [
    { name: 'Umar Malami Ahmad', age: 19, position: 'LB', matches: 210, goals: 10, assists: 61 },
    { name: 'Aliyu Goma', age: 17, position: 'MF', matches: 199, goals: 11, assists: 7 },
    { name: 'Ahmadu Abdulmumin', age: 23, position: 'MF', matches: 143, goals: 9, assists: 13 },
    { name: 'Michael Bartholomew Paul', age: 19, position: 'MF', matches: 232, goals: 45, assists: 23 },
    { name: "Nafi'u Muhammad Usman", age: 19, position: 'LB', matches: 192, goals: 40, assists: 18 },
    { name: 'Aliyu Muhammad', age: 19, position: 'FW', matches: 97, goals: 12, assists: 9 },
    { name: 'Wasilu Yakubu Mahmud', age: 12, position: 'RB', matches: 199, goals: 2, assists: 7 },
    { name: "Sa'ad Tijjani", age: 19, position: 'MF', matches: 232, goals: 45, assists: 23 },
    { name: 'Aliyu Muhammad Jamo', age: 19, position: 'MF', matches: 203, goals: 55, assists: 25 },
  ],
  academy: {
    heroTitle: "AMTAY Academy",
    heroSubtitle: "Developing the next generation of Nigerian football stars through structured training and professional pathways.",
    philosophy: "AMTAY Academy focuses on structured player development, technical excellence, discipline, and national exposure. Every player progresses through a proven pathway designed to maximize potential.",
    successHighlight: "Four AMTAY Academy players were invited to Nigeria's U-17 National Team Screening at the Abuja Goal Project Stadium—an early validation of the club's development model."
  },
  pathway: [
    { step: 1, title: 'Talent Discovery', description: 'Scouts identify promising young players across Kano' },
    { step: 2, title: 'Academy Training', description: 'Structured development with professional coaches' },
    { step: 3, title: 'Senior Team Integration', description: 'Top performers join the first team squad' },
    { step: 4, title: 'National Trials & Exposure', description: 'Opportunities at national team screenings' },
    { step: 5, title: 'Professional Opportunities', description: 'Pathways to professional contracts' },
  ],
  contact: {
    email: 'info@amtayfc.com',
    phone: '+234 XXX XXX XXXX',
    location: 'Kano, Nigeria',
    locationDetail: 'Federal College of Education'
  },
  images: {}
};

interface ContentContextType {
  content: SiteContent;
  updateContent: (newContent: Partial<SiteContent>) => void;
  resetContent: () => void;
}

const ContentContext = createContext<ContentContextType | undefined>(undefined);

const STORAGE_KEY = 'amtay-fc-content';

// Deep merge utility: preserves new default keys while keeping user-edited values
const deepMerge = (defaults: any, overrides: any): any => {
  const result = { ...defaults };
  for (const key of Object.keys(overrides)) {
    if (
      result[key] &&
      typeof result[key] === 'object' &&
      !Array.isArray(result[key]) &&
      typeof overrides[key] === 'object' &&
      !Array.isArray(overrides[key])
    ) {
      result[key] = deepMerge(result[key], overrides[key]);
    } else {
      result[key] = overrides[key];
    }
  }
  return result;
};

export const ContentProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [content, setContent] = useState<SiteContent>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        try {
          // Deep merge: saved CMS values override defaults, but new default keys are preserved
          const parsed = JSON.parse(saved);
          return deepMerge(defaultContent, parsed);
        } catch {
          return defaultContent;
        }
      }
    }
    return defaultContent;
  });

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(content));
  }, [content]);

  const updateContent = (newContent: Partial<SiteContent>) => {
    setContent(prev => ({ ...prev, ...newContent }));
  };

  const resetContent = () => {
    setContent(defaultContent);
    localStorage.removeItem(STORAGE_KEY);
  };

  return (
    <ContentContext.Provider value={{ content, updateContent, resetContent }}>
      {children}
    </ContentContext.Provider>
  );
};

export const useContent = () => {
  const context = useContext(ContentContext);
  if (context === undefined) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
