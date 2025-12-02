import { PACKAGES } from '../constants';
import { Package } from '../types';

export const PACKAGES_STORAGE_KEY = 'afim-rahok-packages';

const isBrowser = () => typeof window !== 'undefined' && typeof localStorage !== 'undefined';

export const loadPackages = (): Package[] => {
  if (!isBrowser()) return PACKAGES;

  try {
    const stored = localStorage.getItem(PACKAGES_STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed)) {
        return parsed;
      }
    }
    localStorage.setItem(PACKAGES_STORAGE_KEY, JSON.stringify(PACKAGES));
  } catch (error) {
    console.warn('Failed to load packages from storage, using defaults.', error);
  }

  return PACKAGES;
};

export const savePackages = (packages: Package[]) => {
  if (!isBrowser()) return;
  try {
    localStorage.setItem(PACKAGES_STORAGE_KEY, JSON.stringify(packages));
  } catch (error) {
    console.warn('Failed to save packages to storage.', error);
  }
};

export const resetPackagesToDefaults = () => {
  if (!isBrowser()) return;
  savePackages(PACKAGES);
};
