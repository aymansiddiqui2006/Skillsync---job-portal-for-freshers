import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});

const uploadOnCloudinary = async (filePath) => {
  try {
    if (!filePath) return null;

    const response = await cloudinary.uploader.upload(filePath);

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

const deleteOnCloudinary=async(publicId)=>{
  try {
    await cloudinary.uploader.destroy(publicId)
  } catch (error) {
    console.log("Error deleting from cloudinary:", error)
  }
}

export { uploadOnCloudinary,deleteOnCloudinary };
