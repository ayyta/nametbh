import { NextResponse } from "next/server";
import supabaseService from '../../../lib/supabaseServiceClient';

export async function POST(request, response) {
  // UNPACKAGE THE DATA
  const data = await request.formData();
  const media = data.getAll("media"); // [media/"ddfa31"] 
  const text = data.get("text");  // "sometext"
  const user_id = data.get("user_id"); 

  console.log("Media length:", media.length);
  console.log("Media:", media);
  try {
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


    console.log("Media length:", media.length);
    // Loop through the each media path and create media objects
    for (let i = 0; i < media.length; i++) {
      let mediaFile = media[i];

      if (mediaFile.type.startsWith("image/") || mediaFile.type.startsWith("video/")) {
        console.log("Media file:", mediaFile.type);
        // Insert media object into the media table
        const { error: mediaError } = await supabaseService
        .from("media")
        .insert([
          {
            media_path: mediaFile.url,
            post_id: post_id,
            media_type: "s3",
            created_at: new Date(),
          },
        ]);
      } else if (mediaFile.type === "image/gif") {
        // Insert media object into the media table
        const { error: mediaError } = await supabaseService
        .from("media")
        .insert([
          {
            gif_url: mediaFile.url,
            post_id: post_id,
            media_type: "gif",
            created_at: new Date(),
          },
        ]);
      }

      if (mediaError) {
        console.error("Error inserting media into Supabase", mediaError.message);
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