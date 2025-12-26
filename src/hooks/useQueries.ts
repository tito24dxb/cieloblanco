// Re-export Supabase queries for backward compatibility
export * from './useSupabaseQueries';

// Re-export Supabase types for use in components
export type { Product, Order, Lead, WhatsAppContact, SiteSetting, GalleryImage } from '../lib/supabase';
