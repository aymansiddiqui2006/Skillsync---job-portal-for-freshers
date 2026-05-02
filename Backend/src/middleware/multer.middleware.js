import multer from "multer";
import path from "path";
import fs from "fs";

const uploadDir = path.join(process.cwd(), "public/temp");

// ensure folder exists
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, uploadDir); 
  },
  filename: function (req, file, cb) {
    const cleanName = file.originalname
      .replace(/\s+/g, "-")
      .replace(/'/g, "");

    cb(null, `${Date.now()}-${cleanName}`);
  },
});

const upload = multer({ storage });

export { upload };