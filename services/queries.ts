import { useQuery } from '@tanstack/react-query';
import { fetchPackages, fetchHotels, fetchDestinations } from './supabaseData';

const defaultQueryOptions = {
  staleTime: 5 * 60 * 1000, // 5 דקות — לא נשבור cache בכל ניווט
  gcTime: 10 * 60 * 1000,   // שמירת cache 10 דקות
  retry: 1,                 // נסיון נוסף אחד בלבד
};

export const usePackagesQuery = () =>
  useQuery({
    queryKey: ['packages'],
    queryFn: fetchPackages,
    ...defaultQueryOptions,
  });

export const useHotelsQuery = () =>
  useQuery({
    queryKey: ['hotels'],
    queryFn: fetchHotels,
    ...defaultQueryOptions,
  });

export const useDestinationsQuery = () =>
  useQuery({
    queryKey: ['destinations'],
    queryFn: fetchDestinations,
    ...defaultQueryOptions,
  });
