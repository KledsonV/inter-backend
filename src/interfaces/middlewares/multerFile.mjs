import multer from "multer";
import path from "path";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.env.PATH_IMAGE_FRONTEND);
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

export default upload;
