import { DESTINATIONS } from '../constants';
import { Destination } from '../types';

export const DESTINATIONS_STORAGE_KEY = 'afim-rahok-destinations';

const isBrowser = () => typeof window !== 'undefined' && typeof localStorage !== 'undefined';

export const loadDestinations = (): Destination[] => {
  if (!isBrowser()) return DESTINATIONS;

  try {
    const stored = localStorage.getItem(DESTINATIONS_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
    localStorage.setItem(DESTINATIONS_STORAGE_KEY, JSON.stringify(DESTINATIONS));
  } catch (error) {
    console.warn('Failed to load destinations from storage, using defaults.', error);
  }

  return DESTINATIONS;
};

export const saveDestinations = (destinations: Destination[]) => {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(DESTINATIONS_STORAGE_KEY, JSON.stringify(destinations));
  } catch (error) {
    console.warn('Failed to save destinations to storage.', error);
  }
};

export const resetDestinationsToDefaults = () => {
  if (!isBrowser()) return;
  saveDestinations(DESTINATIONS);
};
