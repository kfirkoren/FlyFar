import { HOTELS } from '../constants';
import { Hotel } from '../types';

export const HOTELS_STORAGE_KEY = 'afim-rahok-hotels';

const isBrowser = () => typeof window !== 'undefined' && typeof localStorage !== 'undefined';

export const loadHotels = (): Hotel[] => {
  if (!isBrowser()) return HOTELS;

  try {
    const stored = localStorage.getItem(HOTELS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
    localStorage.setItem(HOTELS_STORAGE_KEY, JSON.stringify(HOTELS));
  } catch (error) {
    console.warn('Failed to load hotels from storage, using defaults.', error);
  }

  return HOTELS;
};

export const saveHotels = (hotels: Hotel[]) => {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(HOTELS_STORAGE_KEY, JSON.stringify(hotels));
  } catch (error) {
    console.warn('Failed to save hotels to storage.', error);
  }
};

export const resetHotelsToDefaults = () => {
  if (!isBrowser()) return;
  saveHotels(HOTELS);
};
