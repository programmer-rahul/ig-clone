import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("inside multer");
    const postType = file.mimetype.split("/")[0];

    cb(null, "./public/post/" + postType);

    console.log("req", req);
    console.log("file", file);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const multerUpload = multer({ storage });

export default multerUpload;
