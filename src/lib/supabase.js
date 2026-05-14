import { createClient } from '@supabase/supabase-js';
import { SITE } from '../config/site';

export const supabase = createClient(SITE.supabase.url, SITE.supabase.anonKey);
