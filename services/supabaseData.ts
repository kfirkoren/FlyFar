import { supabase } from './supabaseClient';
import { DESTINATIONS, HOTELS, PACKAGES } from '../constants';
import { Destination, Hotel, Package, TripType } from '../types';

const mapPackageRow = (row: any): Package => ({
  id: row.id,
  title: row.title,
  description: row.description ?? '',
  priceStart: Number(row.price_start ?? 0),
  duration: row.duration ?? '',
  type: row.type as TripType,
  image: row.image ?? '',
  highlights: row.highlights ?? [],
  sortOrder: row.sort_order ?? undefined,
});

const mapHotelRow = (row: any): Hotel => ({
  id: row.id,
  name: row.name,
  stars: row.stars ?? 0,
  area: row.area ?? '',
  priceLevel: row.price_level ?? '',
  image: row.image ?? '',
  tags: row.tags ?? [],
  sortOrder: row.sort_order ?? undefined,
});

const mapDestinationRow = (row: any): Destination => ({
  id: row.id,
  name: row.name,
  description: row.description ?? '',
  image: row.image ?? '',
  season: row.season ?? '',
  sortOrder: row.sort_order ?? undefined,
});

export const fetchPackages = async (): Promise<Package[]> => {
  const { data, error } = await supabase
    .from('packages')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapPackageRow);
};

export const fetchHotels = async (): Promise<Hotel[]> => {
  const { data, error } = await supabase
    .from('hotels')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapHotelRow);
};

export const fetchDestinations = async (): Promise<Destination[]> => {
  const { data, error } = await supabase
    .from('destinations')
    .select('*')
    .order('sort_order', { ascending: true })
    .order('created_at', { ascending: true });
  if (error) throw error;
  return (data ?? []).map(mapDestinationRow);
};

export const addPackage = async (pkg: Omit<Package, 'id'>): Promise<Package> => {
  const { data, error } = await supabase
    .from('packages')
    .insert({
      title: pkg.title,
      description: pkg.description,
      price_start: pkg.priceStart,
      duration: pkg.duration,
      type: pkg.type,
      image: pkg.image,
      highlights: pkg.highlights,
      sort_order: pkg.sortOrder,
    })
    .select('*')
    .single();
  if (error) throw error;
  return mapPackageRow(data);
};

export const deletePackage = async (id: string) => {
  const { error } = await supabase.from('packages').delete().eq('id', id);
  if (error) throw error;
};

export const resetPackages = async (): Promise<Package[]> => {
  await supabase.from('packages').delete().neq('id', '');
  const { data, error } = await supabase
    .from('packages')
    .insert(
      PACKAGES.map((pkg) => ({
        title: pkg.title,
        description: pkg.description,
        price_start: pkg.priceStart,
        duration: pkg.duration,
        type: pkg.type,
        image: pkg.image,
        highlights: pkg.highlights,
        sort_order: pkg.sortOrder,
      }))
    )
    .select('*');
  if (error) throw error;
  return (data ?? []).map(mapPackageRow);
};

export const updatePackageOrder = async (id: string, sortOrder: number) => {
  const { data, error } = await supabase
    .from('packages')
    .update({ sort_order: sortOrder })
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return mapPackageRow(data);
};

export const addHotel = async (hotel: Omit<Hotel, 'id'>): Promise<Hotel> => {
  const { data, error } = await supabase
    .from('hotels')
    .insert({
      name: hotel.name,
      stars: hotel.stars,
      area: hotel.area,
      price_level: hotel.priceLevel,
      image: hotel.image,
      tags: hotel.tags,
      sort_order: hotel.sortOrder,
    })
    .select('*')
    .single();
  if (error) throw error;
  return mapHotelRow(data);
};

export const deleteHotel = async (id: string) => {
  const { error } = await supabase.from('hotels').delete().eq('id', id);
  if (error) throw error;
};

export const resetHotels = async (): Promise<Hotel[]> => {
  await supabase.from('hotels').delete().neq('id', '');
  const { data, error } = await supabase
    .from('hotels')
    .insert(
      HOTELS.map((hotel) => ({
        name: hotel.name,
        stars: hotel.stars,
        area: hotel.area,
        price_level: hotel.priceLevel,
        image: hotel.image,
        tags: hotel.tags,
        sort_order: hotel.sortOrder,
      }))
    )
    .select('*');
  if (error) throw error;
  return (data ?? []).map(mapHotelRow);
};

export const addDestination = async (dest: Omit<Destination, 'id'>): Promise<Destination> => {
  const { data, error } = await supabase
    .from('destinations')
    .insert({
      name: dest.name,
      description: dest.description,
      image: dest.image,
      season: dest.season,
      sort_order: dest.sortOrder,
    })
    .select('*')
    .single();
  if (error) throw error;
  return mapDestinationRow(data);
};

export const deleteDestination = async (id: string) => {
  const { error } = await supabase.from('destinations').delete().eq('id', id);
  if (error) throw error;
};

export const resetDestinations = async (): Promise<Destination[]> => {
  await supabase.from('destinations').delete().neq('id', '');
  const { data, error } = await supabase
    .from('destinations')
    .insert(
      DESTINATIONS.map((dest) => ({
        name: dest.name,
        description: dest.description,
        image: dest.image,
        season: dest.season,
        sort_order: dest.sortOrder,
      }))
    )
    .select('*');
  if (error) throw error;
  return (data ?? []).map(mapDestinationRow);
};

export const updateHotelOrder = async (id: string, sortOrder: number) => {
  const { data, error } = await supabase
    .from('hotels')
    .update({ sort_order: sortOrder })
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return mapHotelRow(data);
};

export const updateDestinationOrder = async (id: string, sortOrder: number) => {
  const { data, error } = await supabase
    .from('destinations')
    .update({ sort_order: sortOrder })
    .eq('id', id)
    .select('*')
    .single();
  if (error) throw error;
  return mapDestinationRow(data);
};
