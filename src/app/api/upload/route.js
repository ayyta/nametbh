import { NextResponse } from "next/server";
import supabaseService from '../../../lib/supabaseServiceClient';

export async function POST(request, response) {
  try {
    // UNPACKAGE THE DATA
    const data = await request.formData();
    const media = data.getAll("media"); // this is media 
    const text = data.get("text");
    const user_id = data.get("user_id");

    console.log("Received data", text, media, user_id);

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
      console.error("Error inserting post into Supabase", postError.message);
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
        console.error("Error inserting media into Supabase", mediaError.message);
        throw new Error(mediaError.message);
      }
    }
 
    return NextResponse.json({ message: 'Post Created' });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// export async function POST(request, response) {
//   try {
//     console.log("API route hit!");

//     // Attempt to read form data
//     const data = await request.formData();
//     const text = data.get("text");
//     const media = data.getAll("media");
//     const user_id = data.get("user_id");

//     console.log("Text:", text);
//     console.log("Media:", media);
//     console.log("User ID:", user_id);

//     return NextResponse.status(200).json({ message: "API route hit!" });
//   } catch (error) {
//     console.error("Error in API route:" ,error);
//     return NextResponse.status(500).json({ error: "Internal Server Error", details: error.message });
//   }
// }