const express = require("express");
const app = express();
const cors = require("cors");
const multer = require('multer');

const port = 3000;
const documentsRouter = require("./routes/documents");

app.use(cors());
app.use(express.static('public'));
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true,
  })
);


const storage = multer.diskStorage({
  destination: (req, file, cb) => {
      cb(null, 'public')
  },
  filename: (req, file, cb) => {
      cb(null, Date.now() + '-' + file.originalname)
  }
});

const upload = multer({storage}).array('file');

app.post('/upload', (req, res,next) => {
    upload(req, res, (err) => {
        if (err) {
            return next(err);
        }

        return res.send(req.files);
    })
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
