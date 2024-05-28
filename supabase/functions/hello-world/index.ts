import { createClient } from "https://esm.sh/@supabase/supabase-js@2";
import { corsHeaders } from '../_shared/cors.ts';

console.log("Hello from Functions!");

// Initialize Supabase client
const supabaseUrl = Deno.env.get("SUPABASE_URL");
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY");
const supabase = createClient(supabaseUrl, supabaseKey);

// Function to insert a Mobilehome
async function insertMobilehome(name: string) {
  try {
    // Insert data into 'Mobilehome' table
    const { data, error } = await supabase
      .from('Mobilehome')
      .insert([{ nom: name }])
      .select();

    if (error) {
      console.error(error);
      return { error: error.message };
    }

    return { data };
  } catch (error) {
    console.error(error);
    return { error: error.message };
  }
}

// Handle incoming requests
Deno.serve(async (req) => {
  // Handle OPTIONS request for CORS preflight
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders });
  }

  try {
    // Parse request body
    const { name } = await req.json();

    // Insert Mobilehome
    const insertResult = await insertMobilehome(name);

    // Construct response
    const responseData = insertResult.error
      ? { error: insertResult.error }
      : { message: `Mobilehome ${name} inserted successfully`, Mobilehome: insertResult.data };

    // Return response
    return new Response(JSON.stringify(responseData), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: insertResult.error ? 500 : 200,
    });
  } catch (error) {
    // Handle errors
    console.error(error);
    return new Response(JSON.stringify({ error: error.message }), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 400,
    });
  }
});
