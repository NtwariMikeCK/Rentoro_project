import formidable from "formidable";
import fs from "fs";
import path from "path";

export const config = {
  api: {
    bodyParser: false, // Disable the default body parser
  },
};

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  try {
    const form = formidable({
      uploadDir: path.join(process.cwd(), "public/uploads"),
      keepExtensions: true,
      maxFiles: 10,
      maxFileSize: 10 * 1024 * 1024, // 10MB
    });

    // Create uploads directory if it doesn't exist
    if (!fs.existsSync(form.uploadDir)) {
      fs.mkdirSync(form.uploadDir, { recursive: true });
    }

    const [fields, files] = await new Promise((resolve, reject) => {
      form.parse(req, (err, fields, files) => {
        if (err) reject(err);
        resolve([fields, files]);
      });
    });

    // Convert fields from formData to JSON
    const carData = {
      make: fields.make?.[0],
      model: fields.model?.[0],
      year: fields.year?.[0],
      licensePlate: fields.licensePlate?.[0],
      location: fields.location?.[0],
      availability: JSON.parse(fields.availability?.[0] || "{}"),
      pricing: JSON.parse(fields.pricing?.[0] || "{}"),
      photos: Object.values(files).map(
        (file) => `/uploads/${path.basename(file[0].filepath)}`
      ),
    };

    // Validate required fields
    const requiredFields = [
      "make",
      "model",
      "year",
      "licensePlate",
      "location",
    ];
    const missingFields = requiredFields.filter((field) => !carData[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        message: `Missing required fields: ${missingFields.join(", ")}`,
      });
    }

    // In a real application, you would:
    // 1. Validate user authentication
    // 2. Upload photos to cloud storage
    // 3. Save car data to database
    // 4. Handle errors properly
    // 5. Send confirmation email

    // For now, we'll simulate a successful creation
    return res.status(200).json({
      message: "Car listing created successfully",
      data: carData,
    });
  } catch (error) {
    console.error("Error creating car listing:", error);
    return res.status(500).json({
      message: "Error creating car listing",
    });
  }
}
