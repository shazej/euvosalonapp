import { Service, Stylist, ReferralStats } from './types';

export const SERVICES: Service[] = [
  {
    id: 's1',
    name: 'Precision Haircut',
    description: 'Expert consultation followed by a precision cut and style.',
    price: 45,
    durationMin: 45,
    imageUrl: 'https://picsum.photos/id/1027/400/300',
    category: 'hair'
  },
  {
    id: 's2',
    name: 'Beard Sculpting',
    description: 'Hot towel treatment, trim, and razor line-up.',
    price: 30,
    durationMin: 30,
    imageUrl: 'https://picsum.photos/id/1005/400/300',
    category: 'beard'
  },
  {
    id: 's3',
    name: 'Rejuvenating Facial',
    description: 'Deep cleanse, exfoliation, and hydration mask.',
    price: 75,
    durationMin: 60,
    imageUrl: 'https://picsum.photos/id/1062/400/300',
    category: 'spa'
  },
  {
    id: 's4',
    name: 'Luxury Manicure',
    description: 'Nail shaping, cuticle care, and hand massage.',
    price: 35,
    durationMin: 40,
    imageUrl: 'https://picsum.photos/id/1070/400/300',
    category: 'nails'
  }
];

export const STYLISTS: Stylist[] = [
  {
    id: 'st1',
    name: 'Elena Rostova',
    role: 'Senior Stylist',
    rating: 4.9,
    specialties: ['Precision Cuts', 'Coloring'],
    imageUrl: 'https://picsum.photos/id/64/150/150'
  },
  {
    id: 'st2',
    name: 'Marcus Chen',
    role: 'Barber Specialist',
    rating: 4.8,
    specialties: ['Fades', 'Beard Sculpting'],
    imageUrl: 'https://picsum.photos/id/91/150/150'
  },
  {
    id: 'st3',
    name: 'Sarah Jenkins',
    role: 'Esthetician',
    rating: 5.0,
    specialties: ['Facials', 'Skincare'],
    imageUrl: 'https://picsum.photos/id/338/150/150'
  }
];

export const MOCK_REFERRAL: ReferralStats = {
  code: 'LUXE-2024-JDOE',
  earnings: 120,
  friendsInvited: 3
};

export const TIME_SLOTS = [
  '09:00 AM', '10:00 AM', '11:00 AM', '01:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'
];