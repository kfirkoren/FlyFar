export enum TripType {
  COUPLES = 'זוגות',
  FAMILIES = 'משפחות',
  YOUNG = 'צעירים',
  ALL = 'הכל'
}

export interface Package {
  id: string;
  title: string;
  description: string;
  priceStart: number;
  duration: string;
  type: TripType;
  image: string;
  highlights: string[];
}

export interface Destination {
  id: string;
  name: string;
  description: string;
  image: string;
  season: string;
}

export interface Hotel {
  id: string;
  name: string;
  stars: number;
  area: string;
  priceLevel: string;
  image: string;
  tags: string[];
}

export interface FaqItem {
  question: string;
  answer: string;
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}