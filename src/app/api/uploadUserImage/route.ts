import { v2 as cloudinary } from 'cloudinary';
import { NextRequest, NextResponse } from 'next/server';

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(req: NextRequest) {
  try {
    const { imageBase64 } = await req.json();

    const uploadResponse = await cloudinary.uploader.upload(imageBase64, {
      folder: 'cozy_loops_profiles',
    });

    return NextResponse.json({ url: uploadResponse.secure_url });
  } catch (error) {
    console.error('Upload error:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error occurred';
    return NextResponse.json(
      { error: 'Upload failed', details: errorMessage },
      { status: 500 }
    );
  }
}
