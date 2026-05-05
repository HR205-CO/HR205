import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://rdqoibgxiuaenneyqfxn.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InJkcW9pYmd4aXVhZW5uZXlxZnhuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3Nzc4NjczMzUsImV4cCI6MjA5MzQ0MzMzNX0.hVCU2lYrGk5oUW3BLqyXzdoXW6AZOPQIyjVXiKK2j2U';

export const supabase = createClient(supabaseUrl, supabaseKey);
