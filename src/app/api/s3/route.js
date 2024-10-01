import { NextResponse } from 'next/server';

import {
  uploadFilesToS3,
  getPresignedUrl,
  deleteFilesFromS3,
} from '@/lib/s3Functions';

// Send file to S3 bucket
export async function POST(req, res) {
  try {
    // Get file and path from request
    const data = await req.formData();
    const files = data.getAll('files');
    const path = data.get('path');

    let fileList = [];

    // Upload file to S3
    for (const file of files) {
      const response = await uploadFilesToS3(file, path);
      const uploadData = await response.json();

      // Return error if there was an issue with uploading file to S3
      if (response.error || uploadData.error) {
        return NextResponse.json({ error: response.error }, { status: 500 });
      }

      // Add path (objectKey) to fileList if no error
      fileList.push(uploadData.objectKey);
    }

    return NextResponse.json({ data: fileList }, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Get image link (presigned URL) from S3 bucket
export async function GET(req, res) {
  try {
    const url = new URL(req.url);
    const paths = url.searchParams.getAll('paths');

    let pathsList = [];

    // Get files from S3
    for (const s3Path of paths) {
      const url = await getPresignedUrl(s3Path);
      if (!url) {
        continue;
      }
      // Add image data to imageList if no error
      pathsList.push(url);
    }
    return NextResponse.json({ data: pathsList }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// Delete file from S3 bucket
export async function DELETE(req, res) {
  try {
    const url = new URL(req.url);
    const paths = url.searchParams.getAll('paths');

    // Delete files from S3
    for (const s3Path of paths) {
      const response = await deleteFilesFromS3(s3Path);
      if (response.error) {
        return NextResponse.json({ error: response.error }, { status: 500 });
      }
    }
    return NextResponse.json({ data: 'success' }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
