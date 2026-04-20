export type City = 'sanaa' | 'aden' | 'taiz' | 'hodeidah' | 'ibb' | 'mukalla' | 'dhamar' | 'other';
export type Category = 'education' | 'tech' | 'design' | 'health' | 'home' | 'transport' | 'other';
export type ServiceStatus = 'open' | 'in_progress' | 'completed' | 'confirmed' | 'cancelled';

export interface User {
  _id: string;
  tokenIdentifier: string;
  name?: string;
  email?: string;
  bio?: string;
  photoUrl?: string;
  city?: City;
  points: number;
  ratingSum: number;
  ratingCount: number;
  isAdmin?: boolean;
}

export interface Service {
  _id: string;
  requesterId: string;
  title: string;
  description: string;
  category: Category;
  city: City;
  points: number;
  status: ServiceStatus;
  providerId?: string;
  requesterConfirmed?: boolean;
  providerConfirmed?: boolean;
  _creationTime: number;
}

export interface Message {
  _id: string;
  serviceId: string;
  senderId: string;
  text: string;
  _creationTime: number;
}

export interface PointTransaction {
  _id: string;
  userId: string;
  amount: number;
  reason: string;
  relatedServiceId?: string;
  _creationTime: number;
}
