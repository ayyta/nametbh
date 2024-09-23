// app/api/profile/media.route.js

import supabaseService from "../../../lib/supabaseServiceClient";

export async function POST(req) {
  const { userId, mediaPath, mediaType } = await req.json(); // Expecting a JSON body

  // Validate inputs
  if (!userId || !mediaPath || !mediaType) {
    return new Response(
      JSON.stringify({ error: "User ID, media path, and media type are required" }),
      { status: 400 }
    );
  }

  try {
    // Step 1: Insert into the media table
    const { data: mediaData, error: mediaError } = await supabaseService
      .from("media")
      .insert([{ media_path: mediaPath, media_type: mediaType }])
      .single(); // Get the inserted row

    // Handle insert error
    if (mediaError) {
      throw new Error(`Error inserting media: ${mediaError.message}`);
    }

    // Step 2: Update user's profile_background or pfp to reference the new media entry
    const { data: userData, error: userError } = await supabaseService
      .from("user")
      .update({
        profile_background: mediaData.id, // Assuming the media table has an 'id' primary key
        // or use 'pfp' if that's what you're updating
      })
      .eq("user_id", userId);

    // Handle update error
    if (userError) {
      throw new Error(`Error updating user data: ${userError.message}`);
    }

    // Return success response
    return new Response(JSON.stringify({ media: mediaData, user: userData }), { status: 200 });
  } catch (err) {
    console.error("Server Error:", err.message);
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
    });
  }
}
