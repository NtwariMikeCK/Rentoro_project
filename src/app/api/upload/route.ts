import { NextResponse } from "next/server";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export async function POST(request: Request) {
  try {
    const formData = await request.formData();
    const files = formData.getAll("images") as File[];

    if (!files || files.length === 0) {
      return NextResponse.json({ error: "No files uploaded" }, { status: 400 });
    }

    const uploadResults = await Promise.all(
      files.map(async (file) => {
        try {
          const buffer = await file.arrayBuffer();
          const base64String = Buffer.from(buffer).toString("base64");

          const result = await cloudinary.uploader.upload(
            `data:${file.type};base64,${base64String}`,
            {
              folder: "uploads",
              resource_type: "auto",
            },
          );

          return {
            url: result.secure_url,
            publicId: result.public_id,
          };
        } catch {
          return null;
        }
      }),
    );

    const successfulUploads = uploadResults.filter(Boolean);

    return NextResponse.json({
      success: true,
      images: successfulUploads,
    });
  } catch (error: any) {
    return NextResponse.json(
      { error: error.message || "Internal server error" },
      { status: 500 },
    );
  }
}

