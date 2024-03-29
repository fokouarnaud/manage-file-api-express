require('dotenv').config();
const express = require('express');
const cors = require('cors');
const createError = require('http-errors');
const documentsRouter = require('./routes/documents');

const app = express();
const port = 3000;

app.use(cors());
app.use(express.json());
app.use(
  express.urlencoded({
    extended: true
  })
);

// custom filename

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, 'uploads');
//   },
//   filename: (req, file, cb) => {
//     const { originalname } = file;
//     cb(null, `${uuid()}-${originalname}`);
//   },
// });

app.get('/', (req, res) => {
  res.json({ message: 'welcome' });
});

app.use('/documents', documentsRouter);

/* Error handler middleware */
app.use((req, res, next) => {
  next(createError(404, 'Not found'));
});

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  res.status(statusCode).json({
    success: false,
    error: statusCode,
    message: err.message
  });
});

const server = app.listen(process.env.PORT || port, () => {
  // eslint-disable-next-line no-console
  console.log(`Example app listening at http://localhost:${port}`);
});

module.exports = server;
