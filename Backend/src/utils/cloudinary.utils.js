import fs from "fs";
import { v2 as cloudinary } from "cloudinary";

const uploadOnCloudinary = async (file) => {
  try {
    if (!file) return null;
    const fileUpload = await cloudinary.uploader.upload(file);
    console.log("file uploaded!! ", fileUpload.url);
    fs.unlinkSync(file);
    return fileUpload;
  } catch (error) {
    fs.unlinkSync(file);
    return null;
  }
};

export { uploadOnCloudinary };
