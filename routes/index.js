const express = require("express");
const path = require("path");
const router = express.Router();

const multer = require("multer");
const { downloadFile } = require("../controllers/fileController");
const { validateToken } = require("../middleware/validateToken");

const multerStorage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, "../", "uploads"));
  },
  filename: (req, file, cb) => {
    console.log("file-----", file);
    const ext = file.mimetype.split("/")[1];
    cb(null, `${file.fieldname}-${Date.now()}.${ext}`);
  },
});

const multerFilter = (req, file, cb) => {
  if (
    file.mimetype.split("/")[1] === "pdf" ||
    file.mimetype.split("/")[1] === "png" ||
    file.mimetype.split("/")[1] === "html"
  ) {
    console.log(true);
    cb(null, true);
  } else {
    cb(new Error("Not a PDF File!!"), false);
  }
};

const upload = multer({
  storage: multerStorage,
  fileFilter: multerFilter,
});

// Route to upload a file - pdf,html,csv,png
router.post(
  "/upload",
  validateToken,
  upload.single("myFile"),
  async (req, res) => {
    try {
      res.status(200).json({
        status: "success",
        message: "File uploaded successfully!!",
      });
    } catch (error) {
      res.json({
        error,
      });
    }
  }
);

// Route to download a file - html,pdf,png
router.get("/download", validateToken, downloadFile);

router.get("/", async (req, res) => {
  res.send("Api");
});

module.exports = router;
