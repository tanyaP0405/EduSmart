
// This file is automatically generated. Do not edit it directly.
import { createClient } from '@supabase/supabase-js';
import type { Database } from './types';

const SUPABASE_URL = "https://ykyayicrqlkditawnenc.supabase.co";
const SUPABASE_PUBLISHABLE_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InlreWF5aWNycWxrZGl0YXduZW5jIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDc2NzYzOTgsImV4cCI6MjA2MzI1MjM5OH0.DI_dm8zN45cHA54V35MkFHZqXKkGi9U3h4jj_uBqMJc";

// Import the supabase client like this:
// import { supabase } from "@/integrations/supabase/client";

export const supabase = createClient<Database>(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);
