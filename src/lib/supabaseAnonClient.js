
import { createClient } from '@supabase/supabase-js';
const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_ANON_KEY;
const supabaseAnon = createClient(supabaseUrl, supabaseKey);

export default supabaseAnon;