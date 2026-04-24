import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

const configureCloudinary = () => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
  });
};

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    configureCloudinary();

    const response = await cloudinary.uploader.upload(filePath, {
      resource_type: "auto",
    });

    // delete AFTER successful upload
    fs.unlinkSync(filePath);

    return response;
  } catch (error) {
    console.log("Cloudinary error:", error);

    // delete only if file exists
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }

    return null;
  }
};

const deleteOnCloudinary = async (publicId) => {
  try {
    configureCloudinary();
    await cloudinary.uploader.destroy(publicId, {
      resource_type: "raw",
    });
  } catch (error) {
    console.log("Error deleting from cloudinary:", error);
  }
};

export { uploadOnCloudinary, deleteOnCloudinary };
