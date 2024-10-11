// app/api/profile/media.route.js

import supabaseService from '../../../../lib/supabaseServiceClient';

export async function GET(req) {
  const { searchParams } = new URL(req.url);
  const pfpId = searchParams.get('pfpId'); // Get pfpId from query params
  const bannerId = searchParams.get('bannerId'); // Get bannerId from query params

  // Validate that at least one ID is provided
  if (!pfpId && !bannerId) {
    return new Response(
      JSON.stringify({
        error: 'At least one of pfpId or bannerId is required',
      }),
      { status: 400 },
    );
  }

  const results = {};

  try {
    // Fetch media_path for pfpId if provided
    if (pfpId) {
      const { data: pfpData, error: pfpError } = await supabaseService
        .from('media')
        .select('media_path')
        .eq('media_id', pfpId)
        .single();

      if (pfpError) {
        return new Response(JSON.stringify({ error: pfpError.message }), {
          status: 500,
        });
      }
      results.pfpPath = pfpData.media_path;
    }

    // Fetch media_path for bannerId if provided
    if (bannerId) {
      const { data: bannerData, error: bannerError } = await supabaseService
        .from('media')
        .select('media_path')
        .eq('media_id', bannerId)
        .single();

      if (bannerError) {
        return new Response(JSON.stringify({ error: bannerError.message }), {
          status: 500,
        });
      }
      results.bannerPath = bannerData.media_path;
    }

    // Return results
    return new Response(JSON.stringify({ data: results }), { status: 200 });
  } catch (error) {
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}

export async function POST(req) {
  const { userId, mediaPath, mediaType, apiCall } = await req.json(); // Expecting a JSON body

  // Validate inputs
  if (!userId || !mediaPath || !mediaType) {
    return new Response(
      JSON.stringify({
        error: 'User ID, media path, and media type are required',
      }),
      { status: 400 },
    );
  }

  try {
    // Insert into the media table
    const { data: mediaData, error: mediaError } = await supabaseService
      .from('media')
      .insert([{ media_path: mediaPath, media_type: mediaType }])
      .select('media_id') // Select the ID of the inserted row
      .single(); // Ensure we're getting a single result

    // Handle insert error
    if (mediaError) {
      throw new Error(`Error inserting media: ${mediaError.message}`);
    }

    // Update the user's pfp with the inserted media ID
    const fieldToUpdate =
      apiCall === 'pfp'
        ? { pfp: mediaData.media_id }
        : { profile_background: mediaData.media_id };
    const { error: userUpdateError } = await supabaseService
      .from('user')
      .update(fieldToUpdate) // Update the pfp/background field with the media ID
      .eq('user_id', userId);

    // Handle user update error
    if (userUpdateError) {
      throw new Error(
        `Error updating user profile picture: ${userUpdateError.message}`,
      );
    }

    // Return success response
    return new Response(JSON.stringify({ media: mediaData }), { status: 200 });
  } catch (err) {
    console.error('Server Error:', err.message);
    return new Response(JSON.stringify({ error: 'Internal Server Error' }), {
      status: 500,
    });
  }
}
