// app/api/profile/route.js

import supabaseService from '../../../../lib/supabaseServiceClient';

export async function GET(req) {
  // Extract userId from the query parameters
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');

  if (!userId) {
    return new Response(JSON.stringify({ error: 'User ID is required' }), {
      status: 400,
    });
  }

  try {
    const { data, error } = await supabaseService
      .from('user')
      .select('profile_background, pfp, username, email, name')
      .eq('user_id', userId);

    if (error) {
      throw new Error(`Error fetching user data: ${error.message}`);
    }

    return new Response(JSON.stringify(data), { status: 200 });
  } catch (error) {
    console.error(error.message);
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
    });
  }
}
export async function PUT(req) {
  const { searchParams } = new URL(req.url);
  const userId = searchParams.get('userId');
  const field = searchParams.get('field');
  const value = searchParams.get('value');

  // Validate inputs
  if (!userId || !field || !value) {
    return new Response(
      JSON.stringify({ error: 'User ID, field, and value are required' }),
      { status: 400 },
    );
  }

  try {
    // Check if the field already exists for another user
    const { data: existingUser, error: fetchError } = await supabaseService
      .from('user')
      .select('user_id')
      .eq(field, value)
      .maybeSingle(); // Use maybeSingle to handle no rows gracefully

    // Handle fetch error
    if (fetchError) {
      throw new Error(`Error fetching user: ${fetchError.message}`);
    }

    // If another user already has this field (username or email), return a conflict
    if (existingUser && existingUser.user_id !== userId) {
      return new Response(
        JSON.stringify({
          error: `${field === 'username' ? 'Username' : 'Email'} is already taken`,
        }),
        { status: 409 }, // Conflict
      );
    }

    // Proceed with the update if the field is available
    const { data, error: updateError } = await supabaseService
      .from('user')
      .update({ [field]: value })
      .eq('user_id', userId);

    // Handle update error
    if (updateError) {
      throw new Error(`Error updating user data: ${updateError.message}`);
    }

    // Return the updated data
    return new Response(JSON.stringify(data), { status: 200 });
  } catch (err) {
    // Log the error and return a generic 500 response for any other issues
    console.error('Server Error:', err.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
