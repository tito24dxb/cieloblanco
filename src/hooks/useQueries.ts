// Re-export Supabase queries for backward compatibility
export * from './useSupabaseQueries';

// Legacy compatibility - these will need to be updated to use Supabase
// For now, keeping the old interface but connecting to Supabase backend
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../lib/supabase';
