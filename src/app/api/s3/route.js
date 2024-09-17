import { uploadFilesToS3, getFilesFromS3, getPresignedUrl } from "@/lib/s3Functions";
import { NextResponse } from 'next/server';


export async function POST(req, res) {
  try {
    // Get file and path from request
    const data = await req.formData()
    const files = data.getAll("files");
    const path = data.get("path");

    let fileList = []

    // Upload file to S3
    for (const file of files) {
      const response = await uploadFilesToS3(file, path); 
      const uploadData = await response.json();

      // Return error if there was an issue with uploading file to S3
      if (response.error || uploadData.error) {
        return NextResponse.json({error: response.error}, { status: 500 });
      }

      // Add path (objectKey) to fileList if no error
      fileList.push(uploadData.objectKey);     
    }

    return NextResponse.json({data: fileList}, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({error: error.message}, { status: 500 });
  }
}

export async function GET(req, res) {
  try {
    const url = new URL(req.url);
    const images = url.searchParams.getAll("image");

    let imageList = [];

    // Get files from S3
    for (const s3Path of images) {
      const url = await getPresignedUrl(s3Path);
      // Add image data to imageList if no error
      imageList.push(url);
    }

    return NextResponse.json({data: imageList}, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({error: error.message}, { status: 500 });
  }
}