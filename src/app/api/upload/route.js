import { NextResponse } from "next/server";
import supabaseService from '../../../lib/supabaseServiceClient';

export async function POST(request, response) {
  try {
    // UNPACKAGE THE DATA
    const data = await request.formData();
    const media = data.getAll("media"); // this is media 
    const text = data.get("text");
    const user_id = data.get("user_id");

    // Insert text content into the post table
    const { data: postData, error: postError } = await supabaseService
      .from("post")
      .insert([
        {
          text_content: text,
          user_id: user_id,
          created_at: new Date(),
        },
      ])
      .select("post_id");

    if (postError) {
      throw new Error(postError.message);
    }

    const post_id = postData[0].post_id;

    // Loop through the each media path and create media objects
    for (let i = 0; i < media.length; i++) {
      let mediaFile = media[i];
      let mediaType = "";

      // Determine the media type based on the file type
      if (mediaFile.type === "image/gif") {
        mediaType = "gif";
      } else if (mediaFile.type.startsWith("image/")) {
        mediaType = "s3";
      } else if (mediaFile.type.startsWith("video/")) {
        mediaType = "s3";
      }

      // Insert media object into the media table
      const { error: mediaError } = await supabaseService
        .from("media")
        .insert([
          {
            media_path: mediaFile.url,
            post_id: post_id,
            media_type: mediaType,
            created_at: new Date(),
          },
        ]);

      if (mediaError) {
        throw new Error(mediaError.message);
      }
    }
 
    return NextResponse.json({ message: 'Post Created' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}