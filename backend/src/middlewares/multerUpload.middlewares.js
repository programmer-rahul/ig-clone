import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    console.log("inside multer");
    const postType = file.mimetype.split("/")[0];
    console.log(postType);

    cb(null, "./public/post/" + postType);
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const multerUpload = multer({ storage });

export default multerUpload;
