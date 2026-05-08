import { createClient } from "@supabase/supabase-js";

const supabaseUrl = 'https://slvtiitpeialzearukgn.supabase.co'
const supabaseKey = 'sb_publishable_Rkv7WlglKAi4BUKVUKoCcg_P2nE-dbj'

export const supabase = createClient(supabaseUrl,supabaseKey)