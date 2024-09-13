// app/api/profile/route.js

import supabaseService from '../../../lib/supabaseServiceClient';

export async function GET(req) {
  // Extract userId from the query parameters
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), { status: 400 });
  }

  try {
    const { data, error } = await supabaseService
      .from('user')
      .select('profile_background, pfp, name')
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Error fetching user data: ${error.message}`);
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error.message);
    return new Response(JSON.stringify({ error: error.message }), { status: 500 });
  }
}
