import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_CLOUD_KEY,
    api_secret: process.env.CLOUDINARY_CLOUD_SECRET
});

const uploadOnCloudinary = async (file) => {
  try {
    if (!file) return null;
    console.log("uploading file:", file) 
    const fileUpload = await cloudinary.uploader.upload(file);
    fs.unlinkSync(file);
    return fileUpload;
  } catch (error) {
    console.log("Cloudinary error:", error)
    fs.unlinkSync(file);
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
