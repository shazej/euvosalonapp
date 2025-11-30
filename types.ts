export interface Service {
  id: string;
  name: string;
  description: string;
  price: number;
  durationMin: number;
  imageUrl: string;
  category: 'hair' | 'beard' | 'spa' | 'nails';
}

export interface Stylist {
  id: string;
  name: string;
  role: string;
  imageUrl: string;
  rating: number;
  specialties: string[];
}

export interface TimeSlot {
  id: string;
  time: string;
  available: boolean;
}

export enum BookingStep {
  SERVICES = 0,
  STYLIST = 1,
  DATETIME = 2,
  CONFIRMATION = 3
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'model';
  text: string;
  timestamp: Date;
}

export interface ReferralStats {
  code: string;
  earnings: number;
  friendsInvited: number;
}