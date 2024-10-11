
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