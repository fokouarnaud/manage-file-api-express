require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const multer = require('multer');
const { s3Uploadv2 } = require("./s3Service");
const port = 3000;
const documentsRouter = require("./routes/documents");

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);

// custom filename

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "uploads");
//   },
//   filename: (req, file, cb) => {
//     const { originalname } = file;
//     cb(null, `${uuid()}-${originalname}`);
//   },
// });

const storage = multer.memoryStorage();

const fileFilter = (req, file, cb) => {
  if (file.mimetype === "application/pdf") {
    cb(null, true);
  } else {
    cb(new multer.MulterError("LIMIT_UNEXPECTED_FILE"), false);
  }
};


const upload = multer({
  storage,
  fileFilter,
  limits: { fileSize: 1000000000, files: 1 },
}).array("file");


app.post("/upload", async (req, res) => {
  try {
    upload(req, res, async function (error) {

      if (error instanceof multer.MulterError) {
        if (error.code === "LIMIT_FILE_SIZE") {
          return res.status(400).json({
            message: "file is too large",
          });
        }

        if (error.code === "LIMIT_FILE_COUNT") {
          return res.status(400).json({
            message: "File limit reached",
          });
        }

        if (error.code === "LIMIT_UNEXPECTED_FILE") {
          return res.status(400).json({
            message: "File must be an pdf",
          });
        }
      }

      const results = await s3Uploadv2(req.files);

      //save result info to database

      return res.json({ status: "success",results });

    });

  } catch (err) {
    console.log(err);
  }
});

app.get("/", (req, res) => {
  res.json({ message: "ok" });
});



app.use("/documents", documentsRouter);

/* Error handler middleware */
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  console.error(err.message, err.stack);
  res.status(statusCode).json({ message: err.message });

  return;
});



app.listen(process.env.PORT || port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
