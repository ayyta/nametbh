import { uploadFileToS3 } from "@/lib/s3Functions";
import { NextResponse } from 'next/server';


export async function POST(req, res) {
  try {
    // Get file and path from request
    const data = await req.formData()
    const files = data.getAll("files");
    const path = data.get("path");

    let fileList = []
    // Upload file to S3
    console.log("files", files);
    for (const file of files) {
      const response = await uploadFileToS3(file, path); 
      const uploadData = await response.json();

      if (response.error || uploadData.error) {
        return NextResponse.json({error: response.error}, { status: 500 });
      }

      fileList.push(uploadData.objectKey);     
    }

    console.log("fiilelist", fileList);
    return NextResponse.json({data: fileList}, { status: 200 });

  } catch (error) {
    console.error(error);
    return NextResponse.json({error: error.message}, { status: 500 });
  }
}